import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-red-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-red-400 mb-8">We'll send you a link to reset your password</p>

          {success ? (
            <div className="bg-green-900 border border-green-700 rounded p-4 mb-6">
              <p className="text-green-200">
                Check your email for a password reset link. If you don't see it, check your spam folder.
              </p>
            </div>
          ) : (
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

              {error && <div className="bg-red-900 border border-red-700 rounded p-3 text-red-200 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2 rounded transition-colors"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-red-400 hover:text-red-300 text-sm font-semibold">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
