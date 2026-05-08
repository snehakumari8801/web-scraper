
export default function StoryCard({ story, onBookmark, onView }) {
  return (
    <div
      onClick={() => onView(story._id)}
      className="cursor-pointer bg-[#12121a] border border-[#1f1f2b] rounded-xl p-4 sm:p-5 hover:border-[#d4a33d] transition"
    >
      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2">
        {story.title}
      </h2>

      {/* Meta */}
      <div className="text-xs sm:text-sm text-gray-400 space-y-1 mb-4">
        <p>⭐ {story.points} points</p>
        <p>👤 {story.author}</p>
        <p>⏱ {story.postedAt}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(story._id);
          }}
          className="flex-1 bg-white/10 hover:bg-white/20 text-xs sm:text-sm py-2 rounded-lg"
        >
          Bookmark
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(story._id);
          }}
          className="flex-1 bg-[#d4a33d] text-black text-xs sm:text-sm font-semibold py-2 rounded-lg"
        >
          View
        </button>
      </div>
    </div>
  );
}