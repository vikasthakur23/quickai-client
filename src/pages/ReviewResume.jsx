import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import Markdown from "markdown-to-jsx";
import { FileUp, Sparkles } from "lucide-react";
import axios from "../api/axios.js";

const ReviewResume = () => {
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Upload your resume first.");

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        <div className="flex items-center gap-2 text-pro">
          <FileUp className="w-5 h-5" />
          <h2 className="font-display font-semibold text-paper">Resume Analyzer</h2>
        </div>

        <label className="text-sm text-muted">Upload resume (PDF, max 5MB)</label>
        <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-line rounded-lg py-8 cursor-pointer text-muted hover:border-pro transition">
          <FileUp className="w-5 h-5" />
          <span className="text-xs">{file ? file.name : "Click to choose a PDF"}</span>
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-pro text-ink font-semibold py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Analyzing..." : "Analyze resume"}
        </button>
        <p className="text-xs text-muted">Premium feature — requires an active subscription.</p>
      </form>

      <div className="rounded-lg border border-line bg-panel p-6 min-h-[300px]">
        <h3 className="font-display font-semibold mb-3">Analysis</h3>
        {content ? (
          <div className="prose prose-invert prose-sm max-w-none text-paper">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <p className="text-muted text-sm">Your resume feedback will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
