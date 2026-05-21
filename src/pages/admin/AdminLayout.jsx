import { useState, useEffect } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { FiHome, FiBox, FiUsers, FiDownload, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const ALLOWED_EMAILS = ['pratheekmadupu0@gmail.com', 'savaxacropcare2023@gmail.com'];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      // Firebase not configured yet
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Bypass auth check if firebase is not configured for demo purposes (optional)
  // But strictly we enforce it if auth exists. If not configured, we'll let it pass to show UI or they can't login anyway.
  // Actually, if they are not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!ALLOWED_EMAILS.includes(user.email)) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <FiX className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          You do not have permission to access the Savaxa Admin Panel. Please sign in with an authorized account.
        </p>
        <button
          onClick={handleLogout}
          className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Dealers', path: '/admin/dealers', icon: <FiUsers /> },
    { name: 'Downloads', path: '/admin/downloads', icon: <FiDownload /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col fixed md:relative z-50 h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800 h-16">
          {isSidebarOpen && (
            <span className="text-xl font-bold text-primary truncate">Admin Panel</span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400"
          >
            <FiMenu className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                title={!isSidebarOpen ? link.name : ''}
              >
                <span className="text-xl">{link.icon}</span>
                {isSidebarOpen && <span className="ml-3 font-medium">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors ${
              !isSidebarOpen && 'justify-center'
            }`}
            title={!isSidebarOpen ? 'Logout' : ''}
          >
            <FiLogOut className="text-xl" />
            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <h2 className="text-xl font-semibold capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
