import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import axios from "../api/axios.js";

const GenerateImages = () => {
  const { getToken } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return toast.error("Describe the image first.");

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setImage(data.content);
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
          <ImageIcon className="w-5 h-5" />
          <h2 className="font-display font-semibold text-paper">Image Generator</h2>
        </div>

        <label className="text-sm text-muted">Describe your image</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="e.g. a lighthouse on a cliff during a thunderstorm, oil painting"
          className="bg-ink border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-pro resize-none"
        />

        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            className="accent-pro"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          Publish to community gallery
        </label>

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-pro text-ink font-semibold py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Generating..." : "Generate image"}
        </button>
        <p className="text-xs text-muted">Premium feature — requires an active subscription.</p>
      </form>

      <div className="rounded-lg border border-line bg-panel p-6 min-h-[300px] flex items-center justify-center">
        {image ? (
          <img src={image} alt="Generated" className="rounded-lg max-h-[420px] object-contain" />
        ) : (
          <p className="text-muted text-sm">Your generated image will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
