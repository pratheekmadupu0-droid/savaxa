import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiBox, FiUsers, FiDownload, FiActivity, FiClock, FiPlusCircle } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    dealers: 0,
    downloads: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => {
      setStats(prev => ({ ...prev, products: snap.size }));
    }, (error) => console.error('Products stat error:', error));

    const unsubDealers = onSnapshot(collection(db, 'dealers'), (snap) => {
      setStats(prev => ({ ...prev, dealers: snap.size }));
    }, (error) => console.error('Dealers stat error:', error));

    const unsubDownloads = onSnapshot(collection(db, 'downloads'), (snap) => {
      setStats(prev => ({ ...prev, downloads: snap.size }));
      setLoading(false);
    }, (error) => {
      console.error('Downloads stat error:', error);
      setLoading(false);
    });

    const recentProductsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(4));
    const unsubRecentProducts = onSnapshot(recentProductsQuery, (snap) => {
      const items = snap.docs.map(doc => ({ id: doc.id, type: 'Product', action: 'added', ...doc.data(), timestamp: doc.data().createdAt || doc.data().updatedAt }));
      updateActivityFeed('products', items);
    });

    const recentDealersQuery = query(collection(db, 'dealers'), orderBy('registeredAt', 'desc'), limit(4));
    const unsubRecentDealers = onSnapshot(recentDealersQuery, (snap) => {
      const items = snap.docs.map(doc => ({ id: doc.id, type: 'Hub', action: 'registered', ...doc.data(), timestamp: doc.data().registeredAt || doc.data().updatedAt }));
      updateActivityFeed('dealers', items);
    });

    return () => {
      unsubProducts();
      unsubDealers();
      unsubDownloads();
      unsubRecentProducts();
      unsubRecentDealers();
    };
  }, []);

  const updateActivityFeed = (source, newItems) => {
    setRecentActivity(prev => {
      const filtered = prev.filter(item => item.source !== source);
      const combined = [...filtered, ...newItems.map(i => ({...i, source}))];
      return combined.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)).slice(0, 6);
    });
  };

  const cards = [
    { title: 'Total Products', value: stats.products, icon: <FiBox />, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Registered Dealers', value: stats.dealers, icon: <FiUsers />, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Total Downloads', value: stats.downloads, icon: <FiDownload />, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Active Admins', value: '1', icon: <FiActivity />, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight font-display text-white uppercase">Dashboard Overview</h1>
        <p className="text-gray-400 text-xs mt-1">Real-time statistics and recent ecosystem activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className={`p-6 rounded-[24px] border ${card.bg} relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-2">{card.title}</p>
                <h3 className="text-4xl font-extrabold text-white font-display">
                  {loading ? '-' : card.value}
                </h3>
              </div>
              <div className={`text-3xl ${card.color} opacity-80 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800/80 rounded-[24px] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800/60 flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
            <FiClock className="text-blue-500" /> Recent Uploads & Activity
          </h2>
        </div>
        <div className="p-2">
          {loading ? (
            <div className="py-12 text-center text-gray-500 text-xs font-mono">Loading activity feed...</div>
          ) : recentActivity.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-xs font-mono">No recent activity found.</div>
          ) : (
            <div className="divide-y divide-gray-800/40">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-800/20 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${item.type === 'Product' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                      {item.type === 'Product' ? <FiBox /> : <FiUsers />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">
                        {item.name} <span className="text-gray-500 font-normal text-xs ml-1">was {item.action}</span>
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-wider">{item.type} • {new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-gray-600 bg-gray-800/50 px-3 py-1 rounded-full uppercase">
                    New
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!db && (
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl text-yellow-500">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            <FiActivity className="mr-2" />
            Firebase Not Configured
          </h3>
          <p className="text-sm">
            The dashboard is currently running in fallback mode because Firebase is not configured. Please add your credentials to `src/firebase.js`.
          </p>
        </div>
      )}
    </div>
  );
}
