import React, { useEffect, useState } from "react";

const PROMPTS = [
  "write a 600-word article on ocean cleanup tech",
  "5 blog titles about remote-work burnout",
  "a poster of a lighthouse in a thunderstorm",
  "remove the tourist from this photo",
  "review my resume for a PM role",
];

// The single memorable element on the landing page: a fake terminal
// that "generates" itself, one prompt at a time — dramatizing the
// exact interaction every tool in the product is built on.
const PromptConsole = () => {
  const [promptIndex, setPromptIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    const current = PROMPTS[promptIndex];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 35);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1200);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 900);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 15);
      } else {
        setPromptIndex((i) => (i + 1) % PROMPTS.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, promptIndex]);

  return (
    <div className="w-full max-w-xl rounded-xl border border-line bg-panel shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-circuit/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-pro/70" />
        <span className="ml-3 font-mono text-xs text-muted">quickai — prompt</span>
      </div>
      <div className="px-5 py-6 font-mono text-sm md:text-base min-h-[88px]">
        <span className="text-circuit">$ </span>
        <span className="text-paper">{text}</span>
        <span className="cursor-blink" />
      </div>
    </div>
  );
};

export default PromptConsole;
