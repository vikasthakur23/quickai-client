import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import Markdown from "markdown-to-jsx";
import { FileText, Sparkles } from "lucide-react";
import axios from "../api/axios.js";

const LENGTHS = [
  { label: "Short (500 words)", value: 500 },
  { label: "Medium (1000 words)", value: 1000 },
  { label: "Long (1600 words)", value: 1600 },
];

const WriteArticle = () => {
  const { getToken } = useAuth();
  const [title, setTitle] = useState("");
  const [length, setLength] = useState(LENGTHS[0].value);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Enter a title first.");

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt: title, length },
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
        <div className="flex items-center gap-2 text-signal">
          <FileText className="w-5 h-5" />
          <h2 className="font-display font-semibold text-paper">Article Generator</h2>
        </div>

        <label className="text-sm text-muted">Article title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. The future of ocean cleanup technology"
          className="bg-ink border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-signal"
        />

        <label className="text-sm text-muted">Article length</label>
        <div className="flex flex-col gap-2">
          {LENGTHS.map((l) => (
            <label
              key={l.value}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm cursor-pointer ${
                length === l.value ? "border-signal text-signal" : "border-line text-muted"
              }`}
            >
              <input
                type="radio"
                name="length"
                className="accent-signal"
                checked={length === l.value}
                onChange={() => setLength(l.value)}
              />
              {l.label}
            </label>
          ))}
        </div>

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-signal text-ink font-semibold py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Generating..." : "Generate article"}
        </button>
      </form>

      <div className="rounded-lg border border-line bg-panel p-6 min-h-[400px]">
        <h3 className="font-display font-semibold mb-3">Output</h3>
        {content ? (
          <div className="prose prose-invert prose-sm max-w-none text-paper">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <p className="text-muted text-sm">Your generated article will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
