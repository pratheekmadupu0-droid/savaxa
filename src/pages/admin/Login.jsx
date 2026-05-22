import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { FiLock, FiAlertCircle, FiMail } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (auth?.currentUser) {
    return <Navigate to="/admin" replace />;
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!auth) {
      toast.error('Firebase is not configured. Check src/firebase.js');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in!');
    } catch (err) {
      console.error(err);
      let errorMsg = 'Invalid email or password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMsg = 'Incorrect admin credentials.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Please try again later.';
      } else {
        errorMsg = `Error: ${err.message}`;
      }
      setError(errorMsg);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-[28px] shadow-2xl w-full max-w-md relative z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/savax-logo.png" 
            alt="Savax Logo" 
            className="h-14 w-auto object-contain mb-4"
          />
          <h1 className="text-3xl font-extrabold text-white text-center font-display uppercase tracking-wider">Admin Portal</h1>
          <p className="text-gray-400 mt-2 text-center text-sm">
            Restricted access. Please enter your admin credentials.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-start">
            <FiAlertCircle className="mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1.5 ml-1">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <FiMail />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="admin@savaxa.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <FiLock />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-70 disabled:hover:bg-primary"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-[10px] uppercase tracking-widest font-mono text-gray-600">
            Encrypted by Firebase Auth
          </p>
        </div>
      </div>
    </div>
  );
}
