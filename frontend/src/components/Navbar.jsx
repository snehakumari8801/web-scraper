import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#0b0b0f] border-b border-[rgba(212,163,61,0.15)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.25)] flex items-center justify-center">
              <span className="text-[#d4a33d] text-base sm:text-lg">📚</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#f0ece3] font-['Playfair_Display',serif]">
              StoryHub
            </h2>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {token && (
              <div className="flex items-center gap-4">
                <Link to="/" className="text-[#e8e4dc] hover:text-[#d4a33d] transition-colors text-sm font-medium">
                  Home
                </Link>
                <Link to="/bookmarks" className="text-[#e8e4dc] hover:text-[#d4a33d] transition-colors text-sm font-medium">
                  Bookmarks
                </Link>
               
              </div>
            )}

            <div className="flex items-center gap-3">
              {!token ? (
                <>
                  <Link 
                    to="/login"
                    className="px-4 py-2 rounded-lg bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.25)] text-[#d4a33d] text-sm font-medium hover:bg-[rgba(212,163,61,0.15)] transition-all"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-[#d4a33d] text-[#0b0b0f] text-sm font-medium hover:bg-[#f0c96a] transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-[rgba(212,163,61,0.05)]">
                    <span className="text-xs text-[#d4a33d]">👤</span>
                    <span className="text-sm text-[#e8e4dc]">{user?.username || user?.email}</span>
                  </div>
                  <Link 
                    to="/"
                    className="px-4 py-2 rounded-lg bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.25)] text-[#d4a33d] text-sm font-medium hover:bg-[rgba(212,163,61,0.15)] transition-all"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          {token && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.25)] text-[#d4a33d] hover:bg-[rgba(212,163,61,0.15)] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

          {!token && (
            <div className="flex md:hidden items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 rounded-lg bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.25)] text-[#d4a33d] text-xs font-medium">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1.5 rounded-lg bg-[#d4a33d] text-[#0b0b0f] text-xs font-medium">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {token && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(212,163,61,0.1)]">
            <div className="px-4 py-2 mb-3 rounded-lg bg-[rgba(212,163,61,0.05)]">
              <p className="text-xs text-[#d4a33d]">Logged in as</p>
              <p className="text-sm text-[#e8e4dc] font-medium">{user?.username || user?.email}</p>
            </div>

            <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-[rgba(212,163,61,0.1)]">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-[#e8e4dc] hover:text-[#d4a33d] hover:bg-[rgba(212,163,61,0.05)] rounded-lg">
                Home
              </Link>
              <Link to="/bookmarks" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-[#e8e4dc] hover:text-[#d4a33d] hover:bg-[rgba(212,163,61,0.05)] rounded-lg">
                Bookmarks
              </Link>
              <Link to="/stories" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-[#e8e4dc] hover:text-[#d4a33d] hover:bg-[rgba(212,163,61,0.05)] rounded-lg">
                Stories
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-full px-4 py-3 rounded-lg bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.25)] text-[#d4a33d] text-sm font-medium text-center">
                Profile
              </Link>
              <button onClick={handleLogout} className="w-full px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}