import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Show, SignIn } from "@clerk/react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Show when="signed-in">
        <div className="flex h-screen bg-ink text-paper">
          <Sidebar open={sidebarOpen} />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line md:hidden">
              <span
                onClick={() => navigate("/")}
                className="font-display font-semibold cursor-pointer"
              >
                Quick<span className="text-signal">AI</span>
              </span>
              <button onClick={() => setSidebarOpen((o) => !o)}>
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            <main className="flex-1 overflow-y-auto p-5 md:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </Show>
      <Show when="signed-out">
        <div className="min-h-screen flex items-center justify-center bg-ink">
          <SignIn />
        </div>
      </Show>
    </>
  );
};

export default Layout;
