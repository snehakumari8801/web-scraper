import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Bookmarks() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(res.data);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (storyId) => {
    await API.delete(`/users/bookmarks/${storyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStories((prev) => prev.filter((s) => s._id !== storyId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-[#e8e4dc] font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-2 border-[rgba(212,163,61,0.2)] border-t-[#d4a33d] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[13px] text-[#6b6760] tracking-wider">Fetching your reading list…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-[#e8e4dc] font-sans relative overflow-x-hidden">
      {/* Ambient Orbs */}
      <div className="fixed w-[520px] h-[520px] bg-radial-gradient from-[rgba(212,163,61,0.12)] to-transparent blur-[90px] pointer-events-none z-0 -top-[120px] -right-[100px]" />
      <div className="fixed w-[420px] h-[420px] bg-radial-gradient from-[rgba(160,110,200,0.08)] to-transparent blur-[90px] pointer-events-none z-0 bottom-[60px] -left-[120px]" />

      {/* Inner Container */}
      <div className="relative z-[1] max-w-[1100px] mx-auto px-7 py-16 pb-28 sm:px-6 sm:py-14 sm:pb-24">
        
        {/* Header */}
        <header className="mb-14">
          <div className="mb-5">
            <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#d4a33d] bg-[rgba(212,163,61,0.1)] border border-[rgba(212,163,61,0.25)] px-3 py-1 rounded-full">
              Reading List
            </span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-[clamp(2.4rem,5vw,3.8rem)] font-bold text-[#f0ece3] leading-[1.1] tracking-[-0.02em] mb-3">
            Your Bookmarks
          </h1>
          <p className="text-sm text-[#5a5650] font-light tracking-wide mb-9">
            {stories.length === 0
              ? "Nothing saved yet"
              : `${stories.length} ${stories.length === 1 ? "story" : "stories"} saved`}
          </p>
          <div className="h-px bg-gradient-to-r from-[rgba(212,163,61,0.4)] via-[rgba(212,163,61,0.08)] to-transparent" />
        </header>

        {/* Empty State */}
        {stories.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-5xl mb-5 opacity-50">🔖</div>
            <p className="font-['Playfair_Display',serif] text-2xl font-medium text-[#c8c3ba] mb-2.5">
              Nothing here yet
            </p>
            <p className="text-sm text-[#4e4a46] font-light leading-relaxed max-w-[280px] mx-auto">
              Stories you bookmark will appear here for easy access.
            </p>
          </div>
        ) : (
          /* Grid */
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, i) => (
              <article
                key={story._id}
                className="relative bg-[#111116] border border-[rgba(255,255,255,0.07)] rounded-2xl p-7 pb-5 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:border-[rgba(212,163,61,0.3)] hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Card Glow */}
                <div className="absolute -top-10 -left-10 w-[150px] h-[150px] bg-radial-gradient from-[rgba(212,163,61,0.07)] to-transparent rounded-full pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Index */}
                <div className="font-['Playfair_Display',serif] text-[11px] font-medium text-[rgba(212,163,61,0.45)] tracking-[0.1em]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col gap-2">
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-['Playfair_Display',serif] text-[1.05rem] font-medium text-[#e8e4dc] leading-tight line-clamp-3 hover:text-[#d4a33d] transition-colors duration-200"
                  >
                    {story.title}
                  </a>
                  <p className="text-xs font-light text-[#3f3c39] tracking-wide">
                    by {story.author || "unknown"}
                  </p>
                </div>

                {/* Footer */}
                <footer className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#d4a33d] bg-[rgba(212,163,61,0.08)] border border-[rgba(212,163,61,0.18)] px-2.5 py-1 rounded-full">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {story.points || 0}
                  </span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => removeBookmark(story._id)}
                      className="bg-none border-none p-0 text-xs font-normal text-[#4a3030] cursor-pointer tracking-wide hover:text-[#c0504a] transition-colors duration-200"
                    >
                      Remove
                    </button>
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#d4a33d] no-underline tracking-wide hover:text-[#f0c96a] hover:gap-2 transition-all duration-200"
                    >
                      Read
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </a>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Add custom keyframes to your global CSS or use a plugin */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease both;
        }
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
}