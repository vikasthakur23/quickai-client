import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import axios from "../api/axios.js";

const Community = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreations = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setCreations(data.creations);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) fetchCreations();
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  if (loading) return <p className="text-muted text-sm">Loading community creations...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Community</h1>
        <p className="text-muted text-sm mt-1">Images published by everyone using QuickAI.</p>
      </div>

      {creations.length === 0 ? (
        <p className="text-muted text-sm">No published creations yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {creations.map((c) => (
            <div
              key={c._id}
              className="relative rounded-lg overflow-hidden border border-line group"
            >
              <img src={c.content} alt={c.prompt} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                <p className="text-xs text-paper line-clamp-2">{c.prompt}</p>
                <button
                  onClick={() => toggleLike(c._id)}
                  className="mt-2 flex items-center gap-1 text-xs text-paper self-start"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      c.likes?.includes(user?.id) ? "fill-signal text-signal" : ""
                    }`}
                  />
                  {c.likes?.length || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
