import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  FiPlus, 
  FiTrash2, 
  FiUsers, 
  FiPhone, 
  FiFileText, 
  FiMapPin, 
  FiCheckCircle, 
  FiClock,
  FiMail,
  FiGrid
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DealersAdmin() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    if (!db) {
      setDealers([]);
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(collection(db, 'dealers'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDealers(data);
    } catch (error) {
      console.warn(error);
      toast.error('Failed to load registered dealers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDealer = async (e) => {
    e.preventDefault();
    if (!db) {
      toast.error('Database not configured');
      return;
    }
    setIsSubmitting(true);
    try {
      const dealerPayload = {
        ...newDealer,
        registeredAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'dealers'), dealerPayload);
      setDealers([{ id: docRef.id, ...dealerPayload }, ...dealers]);
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
      setIsModalOpen(false);
      toast.success('Dealer registered successfully!');
    } catch (error) {
      toast.error('Error adding dealer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyDealer = async (id) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'dealers', id), {
        status: 'Verified'
      });
      setDealers(dealers.map(d => d.id === id ? { ...d, status: 'Verified' } : d));
      toast.success('Dealer status updated to Verified');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to remove this dealer?')) return;
    
    try {
      await deleteDoc(doc(db, 'dealers', id));
      setDealers(dealers.filter(d => d.id !== id));
      toast.success('Dealer removed from network');
    } catch (error) {
      toast.error('Error removing dealer');
    }
  };

  return (
    <div className="animate-fade-in text-white font-sans">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-white uppercase">
            Dealers Hub Registry
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Authorized Savaxa Retailers & Partners: <span className="text-emerald-500 font-extrabold">{dealers.length} hubs</span>
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl flex items-center transition duration-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/10"
        >
          <FiPlus className="mr-2 text-sm" /> Add New Hub
        </button>
      </div>

      {/* Grid of registered dealers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-mono">Fetching dealer accounts...</p>
          </div>
        ) : dealers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 flex flex-col items-center bg-gray-900/60 border border-gray-800 rounded-[24px]">
            <FiUsers className="text-5xl mb-4 opacity-30 text-emerald-500" />
            <h3 className="font-bold text-sm text-gray-300">NO PARTNERS REGISTERED</h3>
            <p className="text-[11px] text-gray-500 mt-1 max-w-xs leading-relaxed font-light">
              There are currently no active dealership profiles in your database. Click 'Add New Hub' or register on the dealers page to see them here.
            </p>
          </div>
        ) : (
          dealers.map((dealer) => (
            <div 
              key={dealer.id} 
              className="bg-gray-900 border border-gray-800/80 p-6 rounded-[24px] relative group hover:border-emerald-600/40 transition duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(dealer.id)}
                  className="absolute top-5 right-5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  title="Remove Dealer"
                >
                  <FiTrash2 className="text-lg" />
                </button>
                
                {/* Logo and Type Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 text-xl font-bold border border-emerald-500/20">
                    {dealer.name ? dealer.name.charAt(0).toUpperCase() : 'D'}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[8px] font-mono tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase font-bold">
                      {dealer.type || 'Platinum Hub'}
                    </span>
                    
                    {/* Status Badge */}
                    {dealer.status === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 text-[8px] font-mono tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold">
                        <FiCheckCircle className="text-[10px]" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[8px] font-mono tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold">
                        <FiClock className="text-[10px]" /> Pending Verification
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-extrabold tracking-wide mb-4 font-display text-white line-clamp-1">{dealer.name}</h3>
                
                {/* Details Matrix */}
                <div className="space-y-2.5 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-gray-500 text-sm flex-shrink-0" />
                    <span className="font-semibold">{dealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <FiMail className="text-gray-550 text-sm flex-shrink-0" />
                    <span className="font-mono text-gray-400">{dealer.email}</span>
                  </div>
                  
                  {dealer.warehouseSize && (
                    <div className="flex items-center gap-2">
                      <FiGrid className="text-gray-500 text-sm flex-shrink-0" />
                      <span>Depot Size: <strong className="text-gray-300 font-semibold">{dealer.warehouseSize} Sq Ft</strong></span>
                    </div>
                  )}
                  
                  {dealer.license && (
                    <div className="flex items-center gap-2">
                      <FiFileText className="text-gray-500 text-sm flex-shrink-0" />
                      <span>License: <strong className="text-gray-300 font-mono">{dealer.license}</strong></span>
                    </div>
                  )}

                  {dealer.address && (
                    <div className="flex items-start gap-2 pt-1.5 border-t border-gray-800/60 mt-2">
                      <FiMapPin className="text-gray-500 text-sm flex-shrink-0 mt-0.5" />
                      <span className="text-gray-450 leading-relaxed font-light">{dealer.address}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Verify Action Button */}
              {dealer.status !== 'Verified' && (
                <button
                  onClick={() => handleVerifyDealer(dealer.id)}
                  className="w-full mt-5 py-2.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-450 hover:text-white border border-emerald-500/20 hover:border-transparent font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-2"
                >
                  <FiCheckCircle /> Approve Store
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-[28px] p-8 w-full max-w-md shadow-2xl relative animate-scale-in">
            
            <h2 className="text-2xl font-extrabold tracking-tight font-display mb-6">Register New Partner Hub</h2>
            
            <form onSubmit={handleAddDealer} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                  Business / Owner Name
                </label>
                <input
                  required
                  type="text"
                  value={newDealer.name}
                  onChange={e => setNewDealer({...newDealer, name: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs"
                  placeholder="e.g. Savaxa Agri Hub"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    required
                    type="tel"
                    value={newDealer.phone}
                    onChange={e => setNewDealer({...newDealer, phone: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={newDealer.email}
                    onChange={e => setNewDealer({...newDealer, email: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs font-mono"
                    placeholder="e.g. store@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                    Dealer Type
                  </label>
                  <select
                    value={newDealer.type}
                    onChange={e => setNewDealer({...newDealer, type: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs"
                  >
                    <option value="Platinum Hub">Platinum Hub</option>
                    <option value="Gold Partner">Gold Partner</option>
                    <option value="Certified Stockist">Certified Stockist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                    Warehouse Size (Sq Ft)
                  </label>
                  <input
                    type="number"
                    value={newDealer.warehouseSize}
                    onChange={e => setNewDealer({...newDealer, warehouseSize: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs"
                    placeholder="e.g. 1500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                  Pesticide License Number
                </label>
                <input
                  type="text"
                  value={newDealer.license}
                  onChange={e => setNewDealer({...newDealer, license: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs font-mono"
                  placeholder="e.g. LIC/CROP/2026/893"
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1">
                  Physical Depot Address
                </label>
                <input
                  type="text"
                  value={newDealer.address}
                  onChange={e => setNewDealer({...newDealer, address: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition duration-300 text-xs"
                  placeholder="e.g. Guntur Delta, Andhra Pradesh"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl flex items-center transition duration-300 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register Hub'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
