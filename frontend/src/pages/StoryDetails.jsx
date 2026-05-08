import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";

export default function StoryDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // ✅ important safety check
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API response:", res.data);

      setStory(res.data);
    } catch (err) {
      console.error("Error fetching story:", err);
      setStory(null);
    } finally {
      setLoading(false);
    }
  };

  console.log(story)
  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-t-[#d4a33d] rounded-full animate-spin" />
      </div>
    );
  }

  // EMPTY STATE
  if (!story) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center">
        Story not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-4 py-6">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-[#12121a] p-6 sm:p-8 rounded-xl border border-[#1f1f2b]">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#d4a33d] mb-4">
          {story.title}
        </h1>

        {/* Meta */}
        <div className="text-sm text-gray-400 space-y-2 mb-6">
          <p>⭐ {story.points} points</p>
          <p>👤 {story.author}</p>
          <p>⏱ {story.postedAt}</p>
        </div>

        {/* URL */}
        <a
          href={story.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 break-all hover:underline"
        >
          {story.url}
        </a>

     

      </div>
    </div>
  );
}