import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiPlus, FiTrash2, FiFileText, FiUploadCloud, FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DownloadsAdmin() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDownload, setNewDownload] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [fileInputType, setFileInputType] = useState('upload'); // 'upload' or 'url'
  const [pastedFileUrl, setPastedFileUrl] = useState('');
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
      toast.error('Failed to load brochures registry');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDownload = async (e) => {
    e.preventDefault();
    if (!db) {
      toast.error('Database connection not established');
      return;
    }

    if (fileInputType === 'url' && !pastedFileUrl) {
      toast.error('Please enter a valid file URL');
      return;
    }
    if (fileInputType === 'upload' && !file) {
      toast.error('Please select a PDF file or choose to paste a direct link');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    // OPTION A: DIRECT URL PASTED (E.G. GOOGLE DRIVE, EXTERNAL SERVERS)
    if (fileInputType === 'url') {
      try {
        const docData = {
          ...newDownload,
          url: pastedFileUrl,
          fileName: 'Direct URL Link',
          createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'downloads'), docData);
        setDownloads([{ id: docRef.id, ...docData }, ...downloads]);
        
        resetForm();
        toast.success('Brochure added successfully!');
      } catch (error) {
        toast.error('Failed to register download link: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // OPTION B: STORAGE UPLOAD
    if (!storage) {
      toast.error('Firebase Storage is not configured. Please paste a direct PDF / File URL instead.');
      setIsSubmitting(false);
      return;
    }

    try {
      const storageRef = ref(storage, `downloads/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.warn('Storage Upload Error: ', error);
          toast.error('Storage upload not active. Select "Paste File Link" to bypass Storage limits!');
          setIsSubmitting(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            const docData = {
              ...newDownload,
              url: downloadURL,
              fileName: file.name,
              createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, 'downloads'), docData);
            setDownloads([{ id: docRef.id, ...docData }, ...downloads]);
            
            resetForm();
            toast.success('Brochure added successfully!');
          } catch (err) {
            toast.error('Error saving records: ' + err.message);
          } finally {
            setIsSubmitting(false);
          }
        }
      );
    } catch (error) {
      toast.error('Failed to upload file. Try pasting a direct PDF Link instead.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewDownload({ title: '', description: '' });
    setFile(null);
    setPastedFileUrl('');
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await deleteDoc(doc(db, 'downloads', id));
      setDownloads(downloads.filter(d => d.id !== id));
      toast.success('Download removed successfully');
    } catch (error) {
      toast.error('Error removing download');
    }
  };

  return (
    <div className="animate-fade-in text-white font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-white uppercase font-sans">Downloads & Brochures</h1>
          <p className="text-gray-400 text-xs mt-1">
            Manage your Savaxa digital downloads: <span className="text-emerald-500 font-extrabold">{downloads.length} active brochures</span>
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl flex items-center transition duration-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/10"
        >
          <FiPlus className="mr-2 text-sm" /> Add Brochure
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center space-y-2">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-mono">Fetching brochures...</p>
          </div>
        ) : downloads.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 flex flex-col items-center bg-gray-900 border border-gray-805/80 rounded-[24px]">
            <FiFileText className="text-5xl mb-4 opacity-30 text-emerald-500" />
            <h3 className="font-bold text-sm text-gray-300">NO RESOURCES REGISTERED</h3>
            <p className="text-[11px] text-gray-500 mt-1 max-w-xs leading-relaxed font-light">
              There are currently no brochures uploaded. Click 'Add Brochure' to publish one.
            </p>
          </div>
        ) : (
          downloads.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-900 border border-gray-805/80 p-6 rounded-[24px] flex items-start group hover:border-emerald-600/40 transition duration-300 relative"
            >
              <div className="p-4 bg-emerald-500/15 text-emerald-500 rounded-2xl mr-5 border border-emerald-500/20 shadow-inner flex-shrink-0">
                <FiFileText className="text-3xl" />
              </div>
              <div className="flex-1 overflow-hidden pr-8">
                <h3 className="text-xl font-extrabold tracking-wide mb-1 font-display line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2 font-light leading-relaxed">{item.description}</p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-500 hover:text-emerald-450 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View Brochure &rarr;
                </a>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-5 right-5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                title="Remove File"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-[28px] p-8 w-full max-w-md shadow-2xl relative animate-scale-in">
            <h2 className="text-2xl font-extrabold tracking-tight font-display mb-6">Upload Brochure</h2>
            
            <form onSubmit={handleAddDownload} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={newDownload.title}
                  onChange={e => setNewDownload({...newDownload, title: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs"
                  placeholder="e.g. 2026 Product Catalog"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  value={newDownload.description}
                  onChange={e => setNewDownload({...newDownload, description: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none text-xs leading-relaxed"
                  placeholder="Briefly describe the contents of this brochure..."
                ></textarea>
              </div>

              {/* File Input Type Selector */}
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">Brochure Selection Method</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setFileInputType('upload')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition ${
                      fileInputType === 'upload'
                        ? 'bg-emerald-600/15 border-emerald-550 text-emerald-450'
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <FiUploadCloud /> Upload PDF File
                  </button>
                  <button
                    type="button"
                    onClick={() => setFileInputType('url')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition ${
                      fileInputType === 'url'
                        ? 'bg-emerald-600/15 border-emerald-550 text-emerald-450'
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <FiLink /> Paste File Link
                  </button>
                </div>

                {fileInputType === 'upload' ? (
                  <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center hover:border-emerald-500 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={e => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {file ? (
                      <p className="text-emerald-500 font-semibold text-xs flex items-center justify-center gap-1.5"><FiFileText /> {file.name}</p>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <FiUploadCloud className="text-2xl mb-1 text-emerald-550" />
                        <p className="text-[10px]">Click or drag PDF brochure to upload</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={pastedFileUrl}
                      onChange={e => setPastedFileUrl(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs font-mono"
                      placeholder="Paste Google Drive, Dropbox, or custom PDF web URL"
                    />
                    <p className="text-[9px] text-gray-500 font-mono mt-1">
                      💡 Tip: Pasting external links bypasses Storage upload limits and works with zero setup!
                    </p>
                  </div>
                )}
              </div>

              {isSubmitting && fileInputType === 'upload' && (
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-4">
                  <div 
                    className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_6px_#10b981]" 
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
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl flex items-center transition duration-300 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
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
