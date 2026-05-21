import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiPlus, FiTrash2, FiBox, FiUploadCloud } from 'react-icons/fi';
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
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!db || !storage) {
      toast.error('Firebase not fully configured');
      return;
    }
    if (!file) {
      toast.error('Please upload an image for the product');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // 1. Upload image to Storage
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error('Image upload failed: ' + error.message);
          setIsSubmitting(false);
        },
        async () => {
          // 2. Get URL and save to Firestore
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          
          const docData = {
            ...newProduct,
            img: imageUrl,
            createdAt: new Date().toISOString()
          };

          const docRef = await addDoc(collection(db, 'products'), docData);
          setProducts([{ id: docRef.id, ...docData }, ...products]);
          
          // Reset
          setNewProduct({
            name: '',
            category: 'insecticides',
            description: '',
            usage: '',
            howToBeUsed: '',
            cropEffects: ''
          });
          setFile(null);
          setIsModalOpen(false);
          toast.success('Product added successfully!');
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      console.error(error);
      toast.error('Error adding product');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="animate-fade-in text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-gray-400 mt-1">Manage your Savaxa products catalog.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-xl flex items-center transition-colors shadow-lg shadow-primary/20"
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                <th className="py-4 px-6 font-semibold text-sm text-gray-400">Product</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-400">Category</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-400">Usage</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <FiBox className="text-4xl mb-2 opacity-50" />
                      <p>No products found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      {product.img && (
                        <img src={product.img} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-gray-700" />
                      )}
                      <div>
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      <span className="px-3 py-1 rounded-full bg-gray-800 text-xs border border-gray-700 capitalize">{product.category}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-300 truncate max-w-xs">{product.usage}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Delete Product"
                      >
                        <FiTrash2 />
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
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative my-8 animate-scale-in">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                  <input
                    required
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="e.g. Savaxa Super"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="insecticides">Insecticides</option>
                    <option value="herbicides">Herbicides</option>
                    <option value="fungicides">Fungicides</option>
                    <option value="biostimulants">Biostimulants</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Product Image</label>
                <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center hover:border-primary transition-colors cursor-pointer relative">
                  <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={e => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {file ? (
                    <p className="text-primary font-medium text-sm">{file.name}</p>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FiUploadCloud className="text-3xl mb-2" />
                      <p className="text-xs">Click or drag image file to upload</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Product Description</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none text-sm"
                  placeholder="e.g. A broad spectrum insecticide..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Usage</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.usage}
                  onChange={e => setNewProduct({...newProduct, usage: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none text-sm"
                  placeholder="e.g. Target pests, Recommended crops..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">How to be used</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.howToBeUsed}
                  onChange={e => setNewProduct({...newProduct, howToBeUsed: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none text-sm"
                  placeholder="e.g. Dilute 2ml per Litre of water and spray thoroughly..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Effects to the plant or crop</label>
                <textarea
                  required
                  rows="2"
                  value={newProduct.cropEffects}
                  onChange={e => setNewProduct({...newProduct, cropEffects: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none text-sm"
                  placeholder="e.g. Increases chlorophyll content and root density..."
                ></textarea>
              </div>

              {isSubmitting && (
                <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFile(null);
                  }}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-xl flex items-center transition-colors disabled:opacity-50 text-sm"
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
