import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await register(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#111116] border border-[rgba(212,163,61,0.15)] rounded-2xl p-8 shadow-xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[rgba(212,163,61,0.08)] border-2 border-[rgba(212,163,61,0.25)] flex items-center justify-center">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-[#f0ece3] mb-2">Register</h2>
            <p className="text-sm text-[#5a5650]">Create your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="👤 Username"
              required
              onChange={e => setForm({...form, username: e.target.value})}
              className="w-full px-4 py-3 bg-[#0b0b0f] border border-[rgba(212,163,61,0.2)] rounded-lg text-[#e8e4dc] placeholder-[#3f3c39] focus:outline-none focus:border-[#d4a33d] transition-colors"
            />
            
            <input
              type="email"
              placeholder="📧 Email"
              required
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-3 bg-[#0b0b0f] border border-[rgba(212,163,61,0.2)] rounded-lg text-[#e8e4dc] placeholder-[#3f3c39] focus:outline-none focus:border-[#d4a33d] transition-colors"
            />
            
            <input
              type="password"
              placeholder="🔒 Password"
              required
              onChange={e => setForm({...form, password: e.target.value})}
              className="w-full px-4 py-3 bg-[#0b0b0f] border border-[rgba(212,163,61,0.2)] rounded-lg text-[#e8e4dc] placeholder-[#3f3c39] focus:outline-none focus:border-[#d4a33d] transition-colors"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#d4a33d] text-[#0b0b0f] font-semibold rounded-lg hover:bg-[#f0c96a] transition-all disabled:opacity-50 mt-6"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#d4a33d] hover:text-[#f0c96a] transition-colors">
              Already have an account? Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}