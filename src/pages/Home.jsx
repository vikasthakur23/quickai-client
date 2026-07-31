import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import ToolsSection from "../components/ToolsSection.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <Hero />
      <ToolsSection />
      <footer className="text-center text-muted text-xs py-8 border-t border-line font-mono">
        built with QuickAI — a full stack AI SaaS project
      </footer>
    </div>
  );
};

export default Home;
