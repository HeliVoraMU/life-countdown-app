import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOTIVATIONAL_QUOTES } from '../utils/countdown';
import CountdownGrid from '../components/CountdownGrid';
import { LogOut, Settings, Zap } from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [quote] = useState(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Hey, <span className="text-white">{user.name}</span>
            </h1>
            <p className="text-neutral-400 mt-1">Make every moment count</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white px-6 py-2 rounded font-medium flex items-center gap-2 transition"
            >
              <Settings className="w-5 h-5" />
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium flex items-center gap-2 transition"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <CountdownGrid dateOfBirth={user.date_of_birth} />

        <div className="mt-12 bg-gradient-to-r from-red-900/10 to-black border border-red-900 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Today's Reminder</h2>
              <p className="text-xl text-red-400 leading-relaxed italic">"{quote}"</p>
              <p className="text-neutral-400 mt-4">
                Remember: life is the ultimate commodity. Every second that passes is a second you can never get back. Use your time intentionally and focus on what truly matters.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
