import React from "react";
import { NavLink } from "react-router-dom";
import { useClerk, useUser } from "@clerk/react";
import { LayoutGrid, Users, LogOut } from "lucide-react";
import { AiToolsList } from "../assets/tools.js";

const linkBase =
  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition text-muted hover:text-paper hover:bg-line/50";
const linkActive = "!text-signal !bg-line";

const Sidebar = ({ open }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static z-20 w-64 h-screen border-r border-line bg-panel flex flex-col justify-between transition-transform`}
    >
      <div>
        <div className="px-5 py-5 border-b border-line font-display font-semibold text-lg">
          Quick<span className="text-signal">AI</span>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          <NavLink
            to="/ai"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
          >
            <LayoutGrid className="w-4 h-4" /> Dashboard
          </NavLink>
          {AiToolsList.map(({ title, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
            >
              <Icon className="w-4 h-4" /> {title}
            </NavLink>
          ))}
          <NavLink
            to="/ai/community"
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
          >
            <Users className="w-4 h-4" /> Community
          </NavLink>
        </nav>
      </div>

      <div className="p-3 border-t border-line">
        <button
          onClick={() => openUserProfile()}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-line/50 text-left"
        >
          <img
            src={user?.imageUrl}
            alt=""
            className="w-8 h-8 rounded-full border border-line"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{user?.fullName}</p>
            <p className="text-xs text-muted truncate">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </button>
        <button
          onClick={() => signOut()}
          className="w-full mt-1 flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted hover:text-paper hover:bg-line/50 transition"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
