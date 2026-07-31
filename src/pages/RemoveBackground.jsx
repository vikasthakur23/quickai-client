import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import { Eraser, Sparkles, Upload } from "lucide-react";
import axios from "../api/axios.js";

const RemoveBackground = () => {
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Upload an image first.");

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post("/api/ai/remove-image-background", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        <div className="flex items-center gap-2 text-signal">
          <Eraser className="w-5 h-5" />
          <h2 className="font-display font-semibold text-paper">Background Remover</h2>
        </div>

        <label className="text-sm text-muted">Upload image</label>
        <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-line rounded-lg py-8 cursor-pointer text-muted hover:border-signal transition">
          <Upload className="w-5 h-5" />
          <span className="text-xs">{file ? file.name : "Click to choose a file"}</span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-signal text-ink font-semibold py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Removing..." : "Remove background"}
        </button>
        <p className="text-xs text-muted">Premium feature — requires an active subscription.</p>
      </form>

      <div className="rounded-lg border border-line bg-panel p-6 min-h-[300px] flex items-center justify-center bg-[repeating-conic-gradient(#2C2A38_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]">
        {image ? (
          <img src={image} alt="Result" className="rounded-lg max-h-[420px] object-contain" />
        ) : (
          <p className="text-muted text-sm bg-panel px-3 py-1 rounded">Result will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
