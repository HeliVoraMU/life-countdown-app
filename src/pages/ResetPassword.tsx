import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const hash = window.location.hash;
      if (!hash.includes('type=recovery')) {
        setIsValidToken(false);
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-neutral-900 border border-red-900 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Invalid Reset Link</h1>
            <p className="text-red-400 mb-6">This password reset link has expired or is invalid.</p>
            <button
              onClick={() => navigate('/forgot-password')}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Request New Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-red-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Set New Password</h1>
          <p className="text-red-400 mb-8">Enter your new password below</p>

          {success ? (
            <div className="bg-green-900 border border-green-700 rounded p-4">
              <p className="text-green-200">Password reset successfully! Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm font-medium">New Password</label>
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

              <div>
                <label className="block text-white mb-2 text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-red-500 w-5 h-5" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
