import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { 
  FiPlus, 
  FiTrash2, 
  FiEdit2,
  FiUsers, 
  FiPhone, 
  FiFileText, 
  FiMapPin, 
  FiCheckCircle, 
  FiClock,
  FiMail,
  FiGrid,
  FiImage,
  FiUploadCloud,
  FiLink
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DealersAdmin() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newDealer, setNewDealer] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Platinum Hub',
    warehouseSize: '',
    license: '',
    address: '',
    status: 'Verified'
  });
  
  const [file, setFile] = useState(null);
  const [imageInputType, setImageInputType] = useState('upload'); // 'upload' or 'url'
  const [pastedImageUrl, setPastedImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
      setDealers([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const unsubscribe = onSnapshot(collection(db, 'dealers'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = data.sort((a, b) => {
        if (a.status === 'Verified' && b.status !== 'Verified') return 1;
        if (a.status !== 'Verified' && b.status === 'Verified') return -1;
        return new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0);
      });
      setDealers(sorted);
      setLoading(false);
    }, (err) => {
      console.warn(err);
      setError(err.message || 'Error connecting to Firestore database');
      toast.error('Failed to sync dealers list');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEditDealer = (dealer) => {
    setEditingId(dealer.id);
    setNewDealer({
      name: dealer.name || '',
      phone: dealer.phone || '',
      email: dealer.email || '',
      type: dealer.type || 'Platinum Hub',
      warehouseSize: dealer.warehouseSize || '',
      license: dealer.license || '',
      address: dealer.address || '',
      status: dealer.status || 'Verified'
    });
    setImageInputType('url');
    setPastedImageUrl(dealer.logo || '');
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSaveDealer = async (e) => {
    e.preventDefault();
    if (!db) {
      toast.error('Database not configured');
      return;
    }
    
    // Capture state before closing modal
    const payloadCopy = { ...newDealer };
    const editIdCopy = editingId;
    const fileCopy = file;
    const inputTypeCopy = imageInputType;
    const pastedUrlCopy = pastedImageUrl;

    // Instantly close modal and reset UI for 0ms latency feel
    resetForm();
    toast.success(editIdCopy ? 'Updating hub in background...' : 'Registering hub in background...', { icon: '⏳' });

    try {
      if (inputTypeCopy === 'upload' && fileCopy && !storage) {
        throw new Error('Firebase Storage is not configured for image uploads.');
      }

      let finalLogoUrl = pastedUrlCopy;
      
      // Upload Logo to Firebase Storage
      if (inputTypeCopy === 'upload' && fileCopy) {
        const imageRef = ref(storage, `dealer_logos/${Date.now()}_${fileCopy.name}`);
        await uploadBytesResumable(imageRef, fileCopy);
        finalLogoUrl = await getDownloadURL(imageRef);
      }

      const dealerPayload = {
        ...payloadCopy,
        logo: finalLogoUrl,
        updatedAt: new Date().toISOString()
      };

      if (editIdCopy) {
        await updateDoc(doc(db, 'dealers', editIdCopy), dealerPayload);
        toast.success('Dealer successfully updated!');
      } else {
        dealerPayload.registeredAt = new Date().toISOString();
        await addDoc(collection(db, 'dealers'), dealerPayload);
        toast.success('Dealer successfully registered!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to sync dealer with database: ' + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewDealer({
      name: '',
      phone: '',
      email: '',
      type: 'Platinum Hub',
      warehouseSize: '',
      license: '',
      address: '',
      status: 'Verified'
    });
    setFile(null);
    setPastedImageUrl('');
    setIsModalOpen(false);
  };

  const handleVerifyDealer = async (id) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'dealers', id), {
        status: 'Verified'
      });
      toast.success('Dealer status updated to Verified');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to remove this dealer?')) return;
    try {
      await deleteDoc(doc(db, 'dealers', id));
      toast.success('Dealer removed from network');
    } catch (error) {
      toast.error('Error removing dealer');
    }
  };

  return (
    <div className="animate-fade-in text-white font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-white uppercase">
            Dealers Hub Registry
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Authorized Savaxa Retailers & Partners: <span className="text-blue-500 font-extrabold">{dealers.length} hubs</span>
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center transition duration-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-600/10"
        >
          <FiPlus className="mr-2 text-sm" /> Add New Hub
        </button>
      </div>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-red-400 text-xs space-y-2">
          <h4 className="font-extrabold text-sm flex items-center gap-1.5 uppercase">
            <FiClock /> Database Connectivity Diagnostics
          </h4>
          <p className="leading-relaxed">
            There was an issue connecting to your Firestore database. Detail: <code className="bg-red-950 px-1.5 py-0.5 rounded font-mono text-[10px] text-red-200">{error}</code>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-mono">Fetching dealer accounts...</p>
          </div>
        ) : dealers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 flex flex-col items-center bg-gray-900/60 border border-gray-800 rounded-[24px]">
            <FiUsers className="text-5xl mb-4 opacity-30 text-blue-500" />
            <h3 className="font-bold text-sm text-gray-300">NO PARTNERS REGISTERED</h3>
          </div>
        ) : (
          dealers.map((dealer) => (
            <div key={dealer.id} className="bg-gray-900 border border-gray-800/80 p-6 rounded-[24px] relative group hover:border-blue-600/40 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={() => handleEditDealer(dealer)} className="text-gray-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-500/10 transition" title="Edit Dealer"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(dealer.id)} className="text-gray-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition" title="Remove Dealer"><FiTrash2 /></button>
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  {dealer.logo ? (
                    <img src={dealer.logo} alt={dealer.name} className="w-12 h-12 object-cover rounded-2xl border border-gray-800" />
                  ) : (
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 text-xl font-bold border border-blue-500/20">
                      {dealer.name ? dealer.name.charAt(0).toUpperCase() : 'D'}
                    </div>
                  )}
                  <div className="flex flex-col items-end gap-1.5 mr-16">
                    <span className="text-[8px] font-mono tracking-widest text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase font-bold">{dealer.type || 'Platinum Hub'}</span>
                    {dealer.status === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 text-[8px] font-mono tracking-widest text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold"><FiCheckCircle className="text-[10px]" /> Verified</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[8px] font-mono tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold"><FiClock className="text-[10px]" /> Pending</span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-extrabold tracking-wide mb-4 font-display text-white line-clamp-1">{dealer.name}</h3>
                
                <div className="space-y-2.5 text-xs text-gray-400">
                  <div className="flex items-center gap-2"><FiPhone className="text-gray-500 text-sm flex-shrink-0" /><span className="font-semibold">{dealer.phone}</span></div>
                  <div className="flex items-center gap-2 truncate"><FiMail className="text-gray-550 text-sm flex-shrink-0" /><span className="font-mono text-gray-400">{dealer.email}</span></div>
                  {dealer.warehouseSize && <div className="flex items-center gap-2"><FiGrid className="text-gray-500 text-sm flex-shrink-0" /><span>Depot Size: <strong className="text-gray-300 font-semibold">{dealer.warehouseSize} Sq Ft</strong></span></div>}
                  {dealer.license && <div className="flex items-center gap-2"><FiFileText className="text-gray-500 text-sm flex-shrink-0" /><span>License: <strong className="text-gray-300 font-mono">{dealer.license}</strong></span></div>}
                  {dealer.address && <div className="flex items-start gap-2 pt-1.5 border-t border-gray-800/60 mt-2"><FiMapPin className="text-gray-500 text-sm flex-shrink-0 mt-0.5" /><span className="text-gray-450 leading-relaxed font-light">{dealer.address}</span></div>}
                </div>
              </div>

              {dealer.status !== 'Verified' && (
                <button onClick={() => handleVerifyDealer(dealer.id)} className="w-full mt-5 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-sky-400 hover:text-white border border-blue-500/20 hover:border-transparent font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-2">
                  <FiCheckCircle /> Approve Store
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-[28px] p-8 w-full max-w-lg shadow-2xl relative my-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold tracking-tight font-display mb-6">
              {editingId ? 'Edit Partner Hub' : 'Register New Partner Hub'}
            </h2>
            
            <form onSubmit={handleSaveDealer} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Business / Owner Name</label>
                <input required type="text" value={newDealer.name} onChange={e => setNewDealer({...newDealer, name: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs" />
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">Dealer Image / Logo (Optional)</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button type="button" onClick={() => setImageInputType('upload')} className={`py-2 px-3 rounded-xl border font-bold text-[10px] tracking-wider flex items-center justify-center gap-1.5 transition ${imageInputType === 'upload' ? 'bg-blue-600/15 border-blue-500 text-blue-400' : 'bg-gray-950 border-gray-800 text-gray-400'}`}><FiUploadCloud /> Upload Logo</button>
                  <button type="button" onClick={() => setImageInputType('url')} className={`py-2 px-3 rounded-xl border font-bold text-[10px] tracking-wider flex items-center justify-center gap-1.5 transition ${imageInputType === 'url' ? 'bg-blue-600/15 border-blue-500 text-blue-400' : 'bg-gray-950 border-gray-800 text-gray-400'}`}><FiLink /> Paste Image Link</button>
                </div>
                {imageInputType === 'upload' ? (
                  <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
                ) : (
                  <input type="url" value={pastedImageUrl} onChange={e => setPastedImageUrl(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 text-xs font-mono" placeholder="Direct Image URL" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">WhatsApp Phone</label>
                  <input required type="tel" value={newDealer.phone} onChange={e => setNewDealer({...newDealer, phone: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs" />
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Email Address</label>
                  <input required type="email" value={newDealer.email} onChange={e => setNewDealer({...newDealer, email: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Dealer Type</label>
                  <select value={newDealer.type} onChange={e => setNewDealer({...newDealer, type: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs">
                    <option value="Platinum Hub">Platinum Hub</option>
                    <option value="Gold Partner">Gold Partner</option>
                    <option value="Certified Stockist">Certified Stockist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Warehouse Size (Sq Ft)</label>
                  <input type="number" value={newDealer.warehouseSize} onChange={e => setNewDealer({...newDealer, warehouseSize: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Pesticide License Number</label>
                <input type="text" value={newDealer.license} onChange={e => setNewDealer({...newDealer, license: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs font-mono" />
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">Physical Depot Address</label>
                <input type="text" value={newDealer.address} onChange={e => setNewDealer({...newDealer, address: e.target.value})} className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-xs" />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800/60">
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200 text-xs font-bold uppercase tracking-wider">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl flex items-center transition duration-300 text-xs font-bold uppercase tracking-wider disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Hub' : 'Register Hub'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
