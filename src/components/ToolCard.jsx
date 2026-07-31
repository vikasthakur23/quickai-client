import React from "react";
import { useNavigate } from "react-router-dom";

const accentMap = {
  signal: "text-signal border-signal/30 hover:border-signal",
  circuit: "text-circuit border-circuit/30 hover:border-circuit",
  pro: "text-pro border-pro/30 hover:border-pro",
};

const ToolCard = ({ title, description, Icon, path, accent }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={`cursor-pointer rounded-lg border bg-panel p-6 flex flex-col gap-4 transition ${accentMap[accent]}`}
    >
      <Icon className={`w-6 h-6 ${accentMap[accent].split(" ")[0]}`} />
      <div>
        <h3 className="font-display font-semibold text-paper">{title}</h3>
        <p className="text-sm text-muted mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;
