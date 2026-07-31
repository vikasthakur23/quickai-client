import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import { ScanSearch, Sparkles, Upload } from "lucide-react";
import axios from "../api/axios.js";

const RemoveObject = () => {
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Upload an image first.");
    if (!object.trim()) return toast.error("Describe the object to remove.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("object", object);

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post("/api/ai/remove-image-object", formData, {
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
        <div className="flex items-center gap-2 text-circuit">
          <ScanSearch className="w-5 h-5" />
          <h2 className="font-display font-semibold text-paper">Object Remover</h2>
        </div>

        <label className="text-sm text-muted">Upload image</label>
        <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-line rounded-lg py-8 cursor-pointer text-muted hover:border-circuit transition">
          <Upload className="w-5 h-5" />
          <span className="text-xs">{file ? file.name : "Click to choose a file"}</span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <label className="text-sm text-muted">Object to remove</label>
        <input
          value={object}
          onChange={(e) => setObject(e.target.value)}
          placeholder="e.g. the red car in the background"
          className="bg-ink border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-circuit"
        />

        <button
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-circuit text-ink font-semibold py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Removing..." : "Remove object"}
        </button>
        <p className="text-xs text-muted">Premium feature — requires an active subscription.</p>
      </form>

      <div className="rounded-lg border border-line bg-panel p-6 min-h-[300px] flex items-center justify-center">
        {image ? (
          <img src={image} alt="Result" className="rounded-lg max-h-[420px] object-contain" />
        ) : (
          <p className="text-muted text-sm">Result will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
