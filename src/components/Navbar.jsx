import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-brand-600 text-lg">
          LearnHub
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-brand-600">
                Dashboard
              </Link>
              <Link to="/courses" className="hover:text-brand-600">
                Courses
              </Link>
              <Link to="/enrolled" className="hover:text-brand-600">
                My Learning
              </Link>
              <Link to="/progress" className="hover:text-brand-600">
                Progress
              </Link>
              <span className="text-slate-500 hidden sm:inline">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-brand-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
