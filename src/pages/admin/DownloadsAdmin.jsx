import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiPlus, FiTrash2, FiFileText, FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DownloadsAdmin() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDownload, setNewDownload] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    if (!db) {
      setDownloads([
        { id: '1', title: 'Product Brochure 2026', description: 'Complete catalog of all Savaxa crop care products.', url: '#' },
        { id: '2', safety: 'Safety Guidelines', description: 'Important safety instructions for handling pesticides.', url: '#' }
      ]);
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(collection(db, 'downloads'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDownloads(data);
    } catch (error) {
      console.warn(error);
      toast.error('Failed to fetch downloads');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDownload = async (e) => {
    e.preventDefault();
    if (!db || !storage) {
      toast.error('Firebase not fully configured (Database or Storage missing)');
      return;
    }
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // 1. Upload file to Storage
      const storageRef = ref(storage, `downloads/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error('File upload failed: ' + error.message);
          setIsSubmitting(false);
        },
        async () => {
          // 2. Get URL and save to Firestore
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          const docData = {
            ...newDownload,
            url: downloadURL,
            fileName: file.name,
            createdAt: new Date().toISOString()
          };

          const docRef = await addDoc(collection(db, 'downloads'), docData);
          setDownloads([{ id: docRef.id, ...docData }, ...downloads]);
          
          // Reset
          setNewDownload({ title: '', description: '' });
          setFile(null);
          setIsModalOpen(false);
          toast.success('Brochure added successfully!');
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      toast.error('Error adding download');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await deleteDoc(doc(db, 'downloads', id));
      setDownloads(downloads.filter(d => d.id !== id));
      toast.success('Download removed');
    } catch (error) {
      toast.error('Error removing download');
    }
  };

  return (
    <div className="animate-fade-in text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Downloads & Brochures</h1>
          <p className="text-gray-400 mt-1">Manage PDF brochures and resource files.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-xl flex items-center transition-colors shadow-lg shadow-primary/20"
        >
          <FiPlus className="mr-2" /> Add Brochure
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-8 text-center text-gray-500">Loading resources...</div>
        ) : downloads.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 flex flex-col items-center bg-gray-900 border border-gray-800 rounded-2xl">
            <FiFileText className="text-5xl mb-4 opacity-50" />
            <p>No brochures uploaded yet.</p>
          </div>
        ) : (
          downloads.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex items-start group hover:border-gray-700 transition-colors">
              <div className="p-4 bg-red-500/10 text-red-500 rounded-xl mr-5">
                <FiFileText className="text-3xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  View File &rarr;
                </a>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-gray-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete File"
              >
                <FiTrash2 className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-scale-in">
            <h2 className="text-2xl font-bold mb-6">Upload Brochure</h2>
            
            <form onSubmit={handleAddDownload} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={newDownload.title}
                  onChange={e => setNewDownload({...newDownload, title: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. 2026 Product Catalog"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  value={newDownload.description}
                  onChange={e => setNewDownload({...newDownload, description: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                  placeholder="Briefly describe the contents..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">PDF File</label>
                <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center hover:border-primary transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {file ? (
                    <p className="text-primary font-medium">{file.name}</p>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FiUploadCloud className="text-3xl mb-2" />
                      <p className="text-sm">Click or drag PDF to upload</p>
                    </div>
                  )}
                </div>
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
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-xl flex items-center transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? `Uploading ${Math.round(uploadProgress)}%` : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
