import React from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/react";
import PromptConsole from "./PromptConsole.jsx";

const Hero = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const handleStart = () => (user ? navigate("/ai") : openSignIn());

  return (
    <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 gap-8">
      <span className="font-mono text-xs tracking-widest text-circuit uppercase">
        six tools. one prompt bar.
      </span>
      <h1 className="text-4xl md:text-6xl font-semibold max-w-3xl leading-tight">
        Say what you want. <span className="text-signal">QuickAI</span> makes it.
      </h1>
      <p className="max-w-xl text-muted text-base md:text-lg">
        Articles, blog titles, images, resume reviews, and photo cleanup —
        all built from a single line of text.
      </p>

      <PromptConsole />

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <button
          onClick={handleStart}
          className="rounded-full bg-signal text-ink px-7 py-3 text-sm font-semibold hover:brightness-95 transition"
        >
          Start creating — free
        </button>
        <button
          onClick={() => navigate("/ai/community")}
          className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-paper hover:border-muted transition"
        >
          Browse the community
        </button>
      </div>
    </section>
  );
};

export default Hero;
