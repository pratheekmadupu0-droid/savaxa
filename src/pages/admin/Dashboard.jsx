import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiBox, FiUsers, FiDownload, FiActivity } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    dealers: 0,
    downloads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const [productsSnap, dealersSnap, downloadsSnap] = await Promise.all([
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'dealers')),
          getDocs(collection(db, 'downloads'))
        ]);
        
        setStats({
          products: productsSnap.size,
          dealers: dealersSnap.size,
          downloads: downloadsSnap.size,
        });
      } catch (error) {
        console.warn('Failed to fetch stats (check firebase config or permissions):', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Products', value: stats.products, icon: <FiBox />, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Registered Dealers', value: stats.dealers, icon: <FiUsers />, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
    { title: 'Total Downloads', value: stats.downloads, icon: <FiDownload />, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Active Users', value: '2', icon: <FiActivity />, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border ${card.bg} backdrop-blur-sm transition-transform hover:-translate-y-1`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                <div className="text-2xl">{card.icon}</div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white">
                {loading ? <span className="animate-pulse bg-gray-700 h-8 w-16 rounded block"></span> : card.value}
              </p>
            </div>
          </div>
        ))}
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
