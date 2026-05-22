import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiPlus, FiTrash2, FiBox, FiUploadCloud, FiLink, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'insecticides',
    description: '',
    usage: '',
    howToBeUsed: '',
    cropEffects: ''
  });
  const [file, setFile] = useState(null);
  const [imageInputType, setImageInputType] = useState('upload'); // 'upload' or 'url'
  const [pastedImageUrl, setPastedImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!db) {
      setProducts([]);
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(collection(db, 'products'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      console.warn(error);
      toast.error('Failed to fetch products catalog');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!db) {
      toast.error('Database connection not established');
      return;
    }

    // Validation
    if (imageInputType === 'url' && !pastedImageUrl) {
      toast.error('Please enter a valid image URL');
      return;
    }
    if (imageInputType === 'upload' && !file) {
      toast.error('Please select an image file or choose to paste a web URL');
      return;
    }

    const tempId = `temp_${Date.now()}`;
    const productPayload = {
      ...newProduct,
      createdAt: new Date().toISOString()
    };

    // OPTION A: DIRECT IMAGE URL PASTED (INSTANT 0ms WAIT)
    if (imageInputType === 'url') {
      const docData = {
        ...productPayload,
        img: pastedImageUrl
      };

      // Optimistically update list, close modal, and notify instantly!
      setProducts(prev => [{ id: tempId, ...docData }, ...prev]);
      resetForm();
      toast.success('Product registered successfully!');

      // Save in background
      try {
        const docRef = await addDoc(collection(db, 'products'), docData);
        setProducts(prev => prev.map(p => p.id === tempId ? { ...p, id: docRef.id } : p));
      } catch (error) {
        console.error(error);
        toast.error('Failed to sync product with database. Removing from list.');
        setProducts(prev => prev.filter(p => p.id !== tempId));
      }
      return;
    }

    // OPTION B: FILE UPLOAD (Requires Storage)
    if (!storage) {
      toast.error('Firebase Storage is not configured. Please paste a direct URL instead.');
      return;
    }

    const selectedFile = file;
    
    // Close modal, reset form, and show active progress toast instantly!
    resetForm();
    const loadingToastId = toast.loading('Uploading product image & registering in background...');

    try {
      const storageRef = ref(storage, `products/${Date.now()}_${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.warn('Storage Upload Error: ', error);
          toast.dismiss(loadingToastId);
          toast.error('Background upload failed. Use "Paste Image Link" to bypass Storage rules!');
        },
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const docData = {
              ...productPayload,
              img: imageUrl
            };

            const docRef = await addDoc(collection(db, 'products'), docData);
            setProducts(prev => [{ id: docRef.id, ...docData }, ...prev]);
            
            toast.dismiss(loadingToastId);
            toast.success(`Product "${productPayload.name}" successfully registered!`);
          } catch (err) {
            toast.dismiss(loadingToastId);
            toast.error('Failed to register product: ' + err.message);
          }
        }
      );
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToastId);
      toast.error('Background upload failed. Try pasting a direct link.');
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      category: 'insecticides',
      description: '',
      usage: '',
      howToBeUsed: '',
      cropEffects: ''
    });
    setFile(null);
    setPastedImageUrl('');
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product removed from catalog');
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
            Manage your Savaxa products catalog: <span className="text-blue-500 font-extrabold">{products.length} registered blends</span>
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center transition duration-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/10"
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
                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase text-gray-400 font-mono">Actions</th>
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
                      <p className="text-[11px] text-gray-500 mt-1 max-w-xs leading-relaxed font-light">
                        There are currently no active products in your database. Click 'Add New Product' to register one.
                      </p>
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
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=80&q=80";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20 flex-shrink-0 font-bold">
                          P
                        </div>
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
                    <td className="py-4 px-6">
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

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-[28px] p-8 w-full max-w-lg shadow-2xl relative my-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold tracking-tight font-display mb-6">Register New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Product Name</label>
                  <input
                    required
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs"
                    placeholder="e.g. Savaxa Super"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs"
                  >
                    <option value="insecticides">Insecticides</option>
                    <option value="herbicides">Herbicides</option>
                    <option value="fungicides">Fungicides</option>
                    <option value="biostimulants">Biostimulants</option>
                  </select>
                </div>
              </div>

              {/* Image Input Type Selector */}
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">Image Selection Method</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageInputType('upload')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition ${
                      imageInputType === 'upload'
                        ? 'bg-blue-600/15 border-emerald-550 text-emerald-450'
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <FiUploadCloud /> Upload Local File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputType('url')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition ${
                      imageInputType === 'url'
                        ? 'bg-blue-600/15 border-emerald-550 text-emerald-450'
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <FiLink /> Paste Image Link
                  </button>
                </div>

                {imageInputType === 'upload' ? (
                  <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center hover:border-blue-500 transition-colors cursor-pointer relative bg-gray-950">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {file ? (
                      <p className="text-blue-500 font-semibold text-xs flex items-center justify-center gap-1.5"><FiImage /> {file.name}</p>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-2 space-y-2">
                        <FiUploadCloud className="text-3xl text-blue-500" />
                        <p className="text-[10px] text-gray-400">Drag & drop your product image here or click</p>
                        <span className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition duration-200 pointer-events-none">
                          Browse Image
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={pastedImageUrl}
                      onChange={e => setPastedImageUrl(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs font-mono"
                      placeholder="Paste Unsplash or direct image URL (e.g. https://example.com/photo.jpg)"
                    />
                    <p className="text-[9px] text-gray-500 font-mono mt-1">
                      💡 Tip: Use public web links from Unsplash, Imgur, or direct servers to skip Firebase Storage limits.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Product Description</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none text-xs leading-relaxed"
                  placeholder="A premium agrochemical formula developed to optimize crops..."
                ></textarea>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Usage / Recommended Crops</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.usage}
                  onChange={e => setNewProduct({...newProduct, usage: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none text-xs leading-relaxed"
                  placeholder="Target Pests: Sucking bugs, caterpillars. Crops: Paddy, Chillies..."
                ></textarea>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">How to be used (Directions)</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.howToBeUsed}
                  onChange={e => setNewProduct({...newProduct, howToBeUsed: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none text-xs leading-relaxed"
                  placeholder="Dilute 1.5 - 2.0 ml per liter of clean water and spray evenly..."
                ></textarea>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Effects to the plant / crop</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.cropEffects}
                  onChange={e => setNewProduct({...newProduct, cropEffects: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none text-xs leading-relaxed"
                  placeholder="Promotes vigorous root development, increases chlorophyll absorption..."
                ></textarea>
              </div>

              {isSubmitting && imageInputType === 'upload' && (
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-4">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_6px_#2563eb]" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800/60">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl flex items-center transition duration-300 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isSubmitting ? `Saving ${Math.round(uploadProgress)}%` : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
