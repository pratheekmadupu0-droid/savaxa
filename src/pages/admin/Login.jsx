import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { FiLock, FiAlertCircle } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already logged in, we could redirect but we'll let AdminLayout handle it
  // But just in case, we could check auth.currentUser
  if (auth?.currentUser) {
    return <Navigate to="/admin" replace />;
  }

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast.error('Firebase is not configured. Check src/firebase.js');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully logged in!');
      // AdminLayout will automatically redirect to /admin via router
    } catch (err) {
      console.error(err);
      let errorMsg = 'Failed to log in. Please try again.';
      if (err.code === 'auth/operation-not-allowed') {
        errorMsg = 'Google Sign-in is not enabled in your Firebase Console. Go to Build > Authentication > Sign-in method and enable Google.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMsg = 'This domain is not authorized in your Firebase Console. Go to Authentication > Settings > Authorized domains and add this domain.';
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

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary">
            <FiLock className="text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-white text-center">Admin Portal</h1>
          <p className="text-gray-400 mt-2 text-center text-sm">
            Restricted access. Please sign in with an authorized Google account.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-start">
            <FiAlertCircle className="mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
          ) : (
            <>
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            Secure login provided by Firebase Authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
