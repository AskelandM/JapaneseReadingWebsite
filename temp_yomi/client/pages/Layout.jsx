import { Outlet, Link, useLocation } from "react-router";
import { FaHome, FaUser, FaTrophy } from "react-icons/fa";
import { useState, useEffect } from "react";
import supabase from './supabaseclient.js';
import './index.css'

const Layout = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from("usersLogin")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!userData) {
        await supabase.from("usersLogin").insert([
          {
            id: user.id,
            email: user.email,
          },
        ]);
      } else {
        console.log("found user!");
      }
    };

    checkUser();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-300 text-white shadow-md p-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <Link
              to="/"
              className={`transition-colors text-2xl hover:text-orange-400 ${isActive("/") ? "text-orange-500" : ""}`}
              onMouseEnter={() => setHoveredIcon("home")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaHome />
            </Link>

            <Link
              to="/leaderboard"
              className={`transition-colors text-2xl hover:text-orange-400 ${isActive("/leaderboard") ? "text-orange-500" : ""}`}
              onMouseEnter={() => setHoveredIcon("leaderboard")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaTrophy />
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-wide">YOMI</h1>

          <div>
            <Link
              to="/profile"
              className={`transition-colors text-2xl hover:text-orange-400 ${isActive("/profile") ? "text-orange-500" : ""}`}
              onMouseEnter={() => setHoveredIcon("profile")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaUser />
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
