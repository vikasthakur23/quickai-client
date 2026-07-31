import React from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b border-line">
      <span
        onClick={() => navigate("/")}
        className="cursor-pointer font-display text-lg font-semibold tracking-tight"
      >
        Quick<span className="text-signal">AI</span>
      </span>

      {user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full bg-signal text-ink px-5 py-2 text-sm font-medium hover:brightness-95 transition"
        >
          Get started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
