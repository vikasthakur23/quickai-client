import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import Markdown from "markdown-to-jsx";
import { Hash, Sparkles } from "lucide-react";
import axios from "../api/axios.js";

const CATEGORIES = ["General", "Technology", "Business", "Health", "Travel", "Lifestyle"];

const BlogTitles = () => {
  const { getToken } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return toast.error("Enter a keyword first.");

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { keyword, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setContent(data.content);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-line bg-panel p-6 flex flex-col gap-4 h-fit"
      >
        <div className="flex items-center gap-2 text-circuit">
          <Hash className="w-5 h-5" />
          <h2 className="font-display font-semibold text-paper">Blog Title Generator</h2>
        </div>

        <label className="text-sm text-muted">Keyword</label>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. remote work"
          className="bg-ink border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-circuit"
        />

        <label className="text-sm text-muted">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs border ${
                category === c ? "border-circuit text-circuit" : "border-line text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-circuit text-ink font-semibold py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Generating..." : "Generate titles"}
        </button>
      </form>

      <div className="rounded-lg border border-line bg-panel p-6 min-h-[300px]">
        <h3 className="font-display font-semibold mb-3">Output</h3>
        {content ? (
          <div className="prose prose-invert prose-sm max-w-none text-paper">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <p className="text-muted text-sm">Your blog titles will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
