import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Mail, ArrowLeft, Trash2 } from 'lucide-react';

export default function Profile() {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.date_of_birth || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateProfile({
        name,
        date_of_birth: dateOfBirth,
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
      setLoading(false);
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 10);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-red-400 hover:text-red-300 mb-4 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">Profile Settings</h1>
          <p className="text-neutral-400 mt-1">Manage your account information</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Account Information</h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-neutral-500 w-5 h-5" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-neutral-800 border border-neutral-700 rounded pl-10 pr-4 py-2 text-neutral-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-red-500 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded pl-10 pr-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-red-500 w-5 h-5" />
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={maxDate.toISOString().split('T')[0]}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded pl-10 pr-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  required
                />
              </div>
            </div>

            {error && <div className="bg-red-900 border border-red-700 rounded p-3 text-red-200 text-sm">{error}</div>}

            {success && <div className="bg-green-900 border border-green-700 rounded p-3 text-green-200 text-sm">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2 rounded transition-colors"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Danger Zone</h2>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-red-900 hover:bg-red-800 border border-red-700 text-red-300 font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-400 font-semibold">
                Are you sure? This action cannot be undone. All your data will be permanently deleted.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2 rounded transition-colors"
                >
                  {loading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
