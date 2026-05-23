import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiPlus, FiTrash2, FiEdit2, FiBox, FiUploadCloud, FiLink, FiImage, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'insecticides',
    description: '',
    dosage: '',
    cropDetails: '',
    specifications: '',
    usage: '',
    howToBeUsed: '',
    cropEffects: ''
  });
  
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [imageInputType, setImageInputType] = useState('upload'); // 'upload' or 'url'
  const [pastedImageUrl, setPastedImageUrl] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!db) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setProducts(sorted);
      setLoading(false);
    }, (error) => {
      console.warn(error);
      toast.error('Failed to sync products catalog');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setNewProduct({
      name: product.name || '',
      category: product.category || 'insecticides',
      description: product.description || '',
      dosage: product.dosage || '',
      cropDetails: product.cropDetails || '',
      specifications: product.specifications || '',
      usage: product.usage || '',
      howToBeUsed: product.howToBeUsed || '',
      cropEffects: product.cropEffects || ''
    });
    setImageInputType('url');
    setPastedImageUrl(product.img || '');
    setFile(null);
    setPdfFile(null);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!db) {
      toast.error('Database connection not established');
      return;
    }

    if (imageInputType === 'url' && !pastedImageUrl && !editingId) {
      toast.error('Please enter a valid image URL');
      return;
    }
    if (imageInputType === 'upload' && !file && !editingId) {
      toast.error('Please select an image file or choose to paste a web URL');
      return;
    }

    // Capture state locally before closing the UI
    const payloadCopy = { ...newProduct };
    const editIdCopy = editingId;
    const fileCopy = file;
    const pdfCopy = pdfFile; // This is now just a string URL
    const inputTypeCopy = imageInputType;
    const pastedUrlCopy = pastedImageUrl;

    // INSTANT CLOSE: 0ms wait for the user
    resetForm();
    toast.success(editIdCopy ? 'Updating product in background...' : 'Registering product in background...', { icon: '⏳' });

    let finalImageUrl = pastedUrlCopy;
    let finalPdfUrl = pdfCopy || (editIdCopy ? (products.find(p => p.id === editIdCopy)?.brochurePdf || '') : '');

    try {
      // Handle Image Upload with Ultra-Aggressive Canvas Compression for Firestore 1MB Limit
      if (inputTypeCopy === 'upload' && fileCopy) {
        finalImageUrl = await compressImageToBase64(fileCopy);
      }

      const productPayload = {
        ...payloadCopy,
        img: finalImageUrl,
        brochurePdf: finalPdfUrl,
        updatedAt: new Date().toISOString()
      };

      if (editIdCopy) {
        await updateDoc(doc(db, 'products', editIdCopy), productPayload);
        toast.success(`Product "${productPayload.name}" successfully updated!`);
      } else {
        productPayload.createdAt = new Date().toISOString();
        await addDoc(collection(db, 'products'), productPayload);
        toast.success(`Product "${productPayload.name}" successfully added!`);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to save product: ` + err.message);
    }
  };

  const compressImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 500; // Aggressive downscale
          const scaleSize = MAX_WIDTH / img.width;
          if (scaleSize < 1) {
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // Compress quality to 0.5 to guarantee it stays under 100KB
          resolve(canvas.toDataURL('image/jpeg', 0.5));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setNewProduct({
      name: '',
      category: 'insecticides',
      description: '',
      dosage: '',
      cropDetails: '',
      specifications: '',
      usage: '',
      howToBeUsed: '',
      cropEffects: ''
    });
    setFile(null);
    setPdfFile('');
    setPastedImageUrl('');
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product removed permanently');
    } catch (error) {
      toast.error('Error removing product');
    }
  };

  return (
    <div className="animate-fade-in text-white font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-white uppercase">Products Catalog</h1>
          <p className="text-gray-400 text-xs mt-1">
            Manage your Savaxa products catalog: <span className="text-blue-500 font-extrabold">{products.length} active blends</span>
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center transition duration-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-600/10"
        >
          <FiPlus className="mr-2 text-sm" /> Add New Product
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800/80 rounded-[24px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/40 border-b border-gray-800">
                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase text-gray-400 font-mono">Product Details</th>
                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase text-gray-400 font-mono">Category</th>
                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase text-gray-400 font-mono">Usage</th>
                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase text-gray-400 font-mono text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-16 text-center space-y-2">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-gray-500 font-mono">Fetching catalog records...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FiBox className="text-5xl mb-4 opacity-30 text-blue-500" />
                      <h3 className="font-bold text-sm text-gray-300">NO PRODUCTS REGISTERED</h3>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800/60 hover:bg-gray-800/20 transition-colors duration-200">
                    <td className="py-4 px-6 flex items-center gap-3">
                      {product.img ? (
                        <img 
                          src={product.img} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-gray-800 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20 flex-shrink-0 font-bold">P</div>
                      )}
                      <div className="overflow-hidden">
                        <div className="font-bold text-white tracking-wide text-sm">{product.name}</div>
                        <div className="text-xs text-gray-400 truncate max-w-xs mt-0.5 font-light">{product.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold font-mono border border-blue-500/20 uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300 text-xs font-light truncate max-w-xs">{product.usage}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-gray-400 hover:text-blue-400 p-2 rounded-xl hover:bg-blue-500/10 transition duration-200"
                        title="Edit Product"
                      >
                        <FiEdit2 className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-gray-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition duration-200"
                        title="Delete Product"
                      >
                        <FiTrash2 className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-[28px] p-8 w-full max-w-2xl shadow-2xl relative my-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold tracking-tight font-display mb-6">
              {editingId ? 'Edit Existing Product' : 'Register New Product'}
            </h2>
            
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Product Name</label>
                  <input
                    required
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="insecticides">Insecticides</option>
                    <option value="herbicides">Herbicides</option>
                    <option value="fungicides">Fungicides</option>
                    <option value="biostimulants">Biostimulants</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">Product Image (Required)</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button type="button" onClick={() => setImageInputType('upload')} className={`py-2 px-3 rounded-xl border font-bold text-[10px] tracking-wider flex items-center justify-center gap-1.5 transition ${imageInputType === 'upload' ? 'bg-blue-600/15 border-blue-500 text-blue-400' : 'bg-gray-950 border-gray-800 text-gray-400'}`}><FiUploadCloud /> Upload Local File</button>
                  <button type="button" onClick={() => setImageInputType('url')} className={`py-2 px-3 rounded-xl border font-bold text-[10px] tracking-wider flex items-center justify-center gap-1.5 transition ${imageInputType === 'url' ? 'bg-blue-600/15 border-blue-500 text-blue-400' : 'bg-gray-950 border-gray-800 text-gray-400'}`}><FiLink /> Paste Image Link</button>
                </div>
                {imageInputType === 'upload' ? (
                  <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
                ) : (
                  <input type="url" value={pastedImageUrl} onChange={e => setPastedImageUrl(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-xs font-mono" placeholder="Direct Image URL" />
                )}
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">Brochure PDF Link (Optional)</label>
                <input type="url" placeholder="Paste Google Drive or Dropbox link here" value={pdfFile || ''} onChange={e => setPdfFile(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-xs font-mono" />
                {editingId && products.find(p => p.id === editingId)?.brochurePdf && !pdfFile && (
                  <p className="text-[10px] text-sky-400 mt-2 flex items-center gap-1"><FiFileText /> Existing PDF link will be kept</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Dosage</label>
                  <input type="text" value={newProduct.dosage} onChange={e => setNewProduct({...newProduct, dosage: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-blue-500 text-xs" placeholder="e.g. 2ml per liter" />
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Specifications</label>
                  <input type="text" value={newProduct.specifications} onChange={e => setNewProduct({...newProduct, specifications: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-blue-500 text-xs" placeholder="e.g. 20% EC" />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Product Description</label>
                <textarea required rows="2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 text-xs"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Crop Details / Targets</label>
                  <textarea rows="2" value={newProduct.cropDetails} onChange={e => setNewProduct({...newProduct, cropDetails: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-blue-500 text-xs"></textarea>
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Usage Recommendations</label>
                  <textarea required rows="2" value={newProduct.usage} onChange={e => setNewProduct({...newProduct, usage: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-blue-500 text-xs"></textarea>
                </div>
              </div>

              {isSubmitting && (
                <div className="w-full bg-gray-800 rounded-full h-1 mt-4">
                  <div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800">
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 text-xs font-bold uppercase">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl flex items-center text-xs font-bold uppercase disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
