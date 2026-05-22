import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiPlus, FiTrash2, FiEdit2, FiFileText, FiUploadCloud, FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DownloadsAdmin() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newDownload, setNewDownload] = useState({ 
    title: '', 
    category: 'Product Brochures',
    description: '' 
  });
  
  const [file, setFile] = useState(null);
  const [fileInputType, setFileInputType] = useState('upload'); // 'upload' or 'url'
  const [pastedFileUrl, setPastedFileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!db) {
      setDownloads([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'downloads'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setDownloads(sorted);
      setLoading(false);
    }, (error) => {
      console.warn(error);
      toast.error('Failed to sync brochures registry');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEditDownload = (item) => {
    setEditingId(item.id);
    setNewDownload({
      title: item.title || '',
      category: item.category || 'Product Brochures',
      description: item.description || ''
    });
    setFileInputType('url');
    setPastedFileUrl(item.url || '');
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSaveDownload = async (e) => {
    e.preventDefault();
    if (!db) {
      toast.error('Database connection not established');
      return;
    }

    if (fileInputType === 'url' && !pastedFileUrl && !editingId) {
      toast.error('Please enter a valid file URL');
      return;
    }
    if (fileInputType === 'upload' && !file && !editingId) {
      toast.error('Please select a PDF file or choose to paste a direct link');
      return;
    }

    setIsSubmitting(true);
    let finalUrl = pastedFileUrl;
    let finalFileName = file ? file.name : (editingId ? downloads.find(d => d.id === editingId)?.fileName : 'Direct URL Link');

    try {
      if (fileInputType === 'upload' && file) {
        if (!storage) throw new Error('Firebase Storage is not configured.');
        const storageRef = ref(storage, `downloads/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (error) => reject(error),
            () => resolve()
          );
        });
        finalUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      const downloadPayload = {
        ...newDownload,
        url: finalUrl,
        fileName: finalFileName,
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateDoc(doc(db, 'downloads', editingId), downloadPayload);
        toast.success(`Brochure updated successfully!`);
      } else {
        downloadPayload.createdAt = new Date().toISOString();
        await addDoc(collection(db, 'downloads'), downloadPayload);
        toast.success(`Brochure registered successfully!`);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save brochure: ' + err.message);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewDownload({ title: '', category: 'Product Brochures', description: '' });
    setFile(null);
    setPastedFileUrl('');
    setIsModalOpen(false);
    setUploadProgress(0);
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await deleteDoc(doc(db, 'downloads', id));
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
            Manage your Savaxa digital downloads: <span className="text-blue-500 font-extrabold">{downloads.length} active brochures</span>
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center transition duration-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/10"
        >
          <FiPlus className="mr-2 text-sm" /> Add Brochure
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center space-y-2">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-mono">Fetching brochures...</p>
          </div>
        ) : downloads.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 flex flex-col items-center bg-gray-900 border border-gray-850/80 rounded-[24px]">
            <FiFileText className="text-5xl mb-4 opacity-30 text-blue-500" />
            <h3 className="font-bold text-sm text-gray-300">NO RESOURCES REGISTERED</h3>
          </div>
        ) : (
          downloads.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-850/80 p-6 rounded-[24px] flex items-start group hover:border-blue-600/40 transition duration-300 relative">
              <div className="p-4 bg-blue-500/15 text-blue-500 rounded-2xl mr-5 border border-blue-500/20 shadow-inner flex-shrink-0">
                <FiFileText className="text-3xl" />
              </div>
              <div className="flex-1 overflow-hidden pr-8">
                <span className="text-[8px] font-mono tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold mb-2 inline-block">
                  {item.category || 'Brochure'}
                </span>
                <h3 className="text-xl font-extrabold tracking-wide mb-1 font-display line-clamp-1 flex items-center gap-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2 font-light leading-relaxed">{item.description}</p>
                <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-500 hover:text-cyan-400 text-xs font-bold uppercase tracking-wider transition-colors">
                  View File &rarr;
                </a>
              </div>
              <div className="absolute top-5 right-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button onClick={() => handleEditDownload(item)} className="text-gray-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-500/10 transition" title="Edit File"><FiEdit2 /></button>
                <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition" title="Remove File"><FiTrash2 /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-[28px] p-8 w-full max-w-md shadow-2xl relative my-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold tracking-tight font-display mb-6">
              {editingId ? 'Edit Brochure' : 'Upload Brochure'}
            </h2>
            
            <form onSubmit={handleSaveDownload} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Title</label>
                <input required type="text" value={newDownload.title} onChange={e => setNewDownload({...newDownload, title: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs" />
              </div>
              
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">File Category</label>
                <select value={newDownload.category} onChange={e => setNewDownload({...newDownload, category: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs">
                  <option value="Product Brochures">Product Brochures</option>
                  <option value="Technical Sheets">Technical Sheets</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Catalogues">Catalogues</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Description</label>
                <textarea required rows="3" value={newDownload.description} onChange={e => setNewDownload({...newDownload, description: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none text-xs leading-relaxed"></textarea>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">File Source</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button type="button" onClick={() => setFileInputType('upload')} className={`py-2 px-3 rounded-xl border font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition ${fileInputType === 'upload' ? 'bg-blue-600/15 border-blue-500 text-blue-400' : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-700'}`}><FiUploadCloud /> Upload PDF File</button>
                  <button type="button" onClick={() => setFileInputType('url')} className={`py-2 px-3 rounded-xl border font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition ${fileInputType === 'url' ? 'bg-blue-600/15 border-blue-500 text-blue-400' : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-700'}`}><FiLink /> Paste File Link</button>
                </div>
                {fileInputType === 'upload' ? (
                  <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
                ) : (
                  <input type="url" value={pastedFileUrl} onChange={e => setPastedFileUrl(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs font-mono" placeholder="Paste Direct PDF URL" />
                )}
              </div>

              {isSubmitting && fileInputType === 'upload' && (
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-4">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_6px_#2563eb]" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800/60">
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200 text-xs font-bold uppercase tracking-wider">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl flex items-center transition duration-300 text-xs font-bold uppercase tracking-wider disabled:opacity-50">
                  {isSubmitting ? `Saving ${Math.round(uploadProgress)}%` : editingId ? 'Update File' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
