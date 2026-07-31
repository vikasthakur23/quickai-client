import React from "react";
import { AiToolsList } from "../assets/tools.js";
import ToolCard from "./ToolCard.jsx";

const ToolsSection = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 border-t border-line">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold">The toolkit</h2>
        <p className="text-muted mt-2">Everything you need, powered by one prompt bar.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {AiToolsList.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
};

export default ToolsSection;
