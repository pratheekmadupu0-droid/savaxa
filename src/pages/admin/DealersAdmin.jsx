import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiTrash2, FiUsers, FiMapPin, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DealersAdmin() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDealer, setNewDealer] = useState({ name: '', location: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    if (!db) {
      setDealers([
        { id: '1', name: 'AgriCorp Solutions', location: 'Hyderabad, TS', phone: '+91 9876543210', email: 'contact@agricorp.in' },
        { id: '2', name: 'GreenFarm Suppliers', location: 'Vijayawada, AP', phone: '+91 9123456789', email: 'sales@greenfarm.in' }
      ]);
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(collection(db, 'dealers'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDealers(data);
    } catch (error) {
      console.warn(error);
      toast.error('Failed to fetch dealers');
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
      const docRef = await addDoc(collection(db, 'dealers'), newDealer);
      setDealers([{ id: docRef.id, ...newDealer }, ...dealers]);
      setNewDealer({ name: '', location: '', phone: '', email: '' });
      setIsModalOpen(false);
      toast.success('Dealer registered successfully!');
    } catch (error) {
      toast.error('Error adding dealer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!db) return;
    if (!window.confirm('Are you sure you want to remove this dealer?')) return;
    
    try {
      await deleteDoc(doc(db, 'dealers', id));
      setDealers(dealers.filter(d => d.id !== id));
      toast.success('Dealer removed');
    } catch (error) {
      toast.error('Error removing dealer');
    }
  };

  return (
    <div className="animate-fade-in text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dealers Management</h1>
          <p className="text-gray-400 mt-1">Total Registered Dealers: <span className="text-primary font-bold">{dealers.length}</span></p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-xl flex items-center transition-colors shadow-lg shadow-primary/20"
        >
          <FiPlus className="mr-2" /> Add Dealer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-8 text-center text-gray-500">Loading dealers...</div>
        ) : dealers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 flex flex-col items-center bg-gray-900 border border-gray-800 rounded-2xl">
            <FiUsers className="text-5xl mb-4 opacity-50" />
            <p>No dealers registered yet.</p>
          </div>
        ) : (
          dealers.map((dealer) => (
            <div key={dealer.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative group hover:border-gray-700 transition-colors">
              <button
                onClick={() => handleDelete(dealer.id)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete Dealer"
              >
                <FiTrash2 className="text-xl" />
              </button>
              
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 text-2xl border border-primary/20">
                {dealer.name.charAt(0).toUpperCase()}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{dealer.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-gray-500" />
                  {dealer.location}
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-2 text-gray-500" />
                  {dealer.phone}
                </div>
                <div className="flex items-center truncate">
                  <span className="mr-2 text-gray-500 font-bold">@</span>
                  {dealer.email}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-scale-in">
            <h2 className="text-2xl font-bold mb-6">Register New Dealer</h2>
            
            <form onSubmit={handleAddDealer} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Dealer Name</label>
                <input
                  required
                  type="text"
                  value={newDealer.name}
                  onChange={e => setNewDealer({...newDealer, name: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. AgriCorp Solutions"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Location</label>
                <input
                  required
                  type="text"
                  value={newDealer.location}
                  onChange={e => setNewDealer({...newDealer, location: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Hyderabad, TS"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input
                    required
                    type="tel"
                    value={newDealer.phone}
                    onChange={e => setNewDealer({...newDealer, phone: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                    placeholder="e.g. +91 98765..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={newDealer.email}
                    onChange={e => setNewDealer({...newDealer, email: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                    placeholder="contact@..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-xl flex items-center transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register Dealer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
