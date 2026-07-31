import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import axios from "../api/axios.js";
import { AiToolsList } from "../assets/tools.js";
import ToolCard from "../components/ToolCard.jsx";
import { Sparkles } from "lucide-react";

const Dashboard = () => {
  const { getToken } = useAuth();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreations = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-user-creations", {
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

  useEffect(() => {
    fetchCreations();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Pick a tool to get started.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {AiToolsList.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-signal" /> Recent creations
        </h2>
        {loading ? (
          <p className="text-muted text-sm">Loading...</p>
        ) : creations.length === 0 ? (
          <p className="text-muted text-sm">Nothing generated yet — try a tool above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {creations.slice(0, 8).map((c) => (
              <div
                key={c._id}
                className="rounded-lg border border-line bg-panel p-4 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-circuit uppercase">{c.type}</span>
                  <span className="text-xs text-muted">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-paper truncate">{c.prompt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
