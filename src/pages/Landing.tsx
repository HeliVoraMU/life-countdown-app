import { Link } from 'react-router-dom';
import { Clock, Heart, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-neutral-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-red-500">LifeCount</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="text-neutral-400 hover:text-white transition">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Make Every</span> <br />
            <span className="text-red-500">Moment</span> <span className="text-white">Count</span>
          </h1>
          <p className="text-2xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Time is your most valuable asset. Watch it visually, feel the urgency, and make it matter.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Start Your Countdown
            </Link>
            <a
              href="#features"
              className="border border-red-600 text-red-400 hover:text-red-300 hover:border-red-500 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Learn More
            </a>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 my-20">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-red-500 transition">
            <Clock className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Real-Time Countdown</h3>
            <p className="text-neutral-400">
              Watch your countdown in real-time. Days, hours, minutes, and seconds all displayed in a stunning GitHub-style visualization.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-red-500 transition">
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Motivational Quotes</h3>
            <p className="text-neutral-400">
              Receive daily inspiration reminding you that life is precious and time shouldn't be wasted on things that don't matter.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-red-500 transition">
            <Zap className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Visual Urgency</h3>
            <p className="text-neutral-400">
              The red visual countdown creates a sense of urgency, pushing you to prioritize what truly matters in your life.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/20 to-black border border-red-900 rounded-lg p-12 text-center mb-20">
          <blockquote className="text-3xl font-semibold text-white mb-4">
            "Time flies like an arrow. Fruit flies like a banana. Make it count like your life depends on it."
          </blockquote>
          <p className="text-red-400">Remember: You don't have unlimited time. Use it wisely.</p>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-8">Ready to make every moment count?</h2>
          <Link
            to="/signup"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition inline-block"
          >
            Start Your Journey
          </Link>
        </div>
      </div>

      <footer className="border-t border-neutral-900 py-8 px-6 text-center text-neutral-500">
        <p>&copy; 2024 LifeCount. Make every moment count.</p>
      </footer>
    </div>
  );
}
