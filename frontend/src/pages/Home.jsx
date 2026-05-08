


import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import StoryCard from "../components/StoryCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, []);

  // ---------------- FETCH STORIES ----------------
  const fetchStories = async () => {
    try {
      const res = await API.get("/stories", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setStories(res.data.stories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- BOOKMARK ----------------
  const handleBookmark = async (storyId) => {
    try {
      // ❗ IF NOT LOGGED IN → SEND TO LOGIN
      if (!token) {
        alert("Please login first to bookmark stories");
        navigate("/login");
        return;
      }

      await API.post(
        `/stories/${storyId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Bookmark updated ✅");

    } catch (err) {
      console.error("Bookmark failed:", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  // ---------------- VIEW STORY ----------------
  const handleView = (id) => {
    navigate(`/stories/${id}`);
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-t-[#d4a33d] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-3 sm:px-6 py-6">
      <Navbar />

      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl sm:text-3xl font-bold text-[#d4a33d] mb-6 mt-6 sm:mt-10">
          Top Stories
        </h1>

        {/* GRID */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onBookmark={handleBookmark}
              onView={handleView}
            />
          ))}

        </div>

      </div>
    </div>
  );
}