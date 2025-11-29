import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-red-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-red-400 mb-8">Sign in to continue your countdown</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-red-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded pl-10 pr-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-red-500 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded pl-10 pr-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <div className="bg-red-900 border border-red-700 rounded p-3 text-red-200 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2 rounded transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <Link to="/forgot-password" className="block text-center text-red-400 hover:text-red-300 text-sm">
              Forgot your password?
            </Link>
            <p className="text-center text-neutral-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-red-400 hover:text-red-300 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
