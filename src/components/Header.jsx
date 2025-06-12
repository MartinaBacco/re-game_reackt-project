import React, { useContext } from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert(`Logout error 👎🏻! ${error.message}`);
            console.error("Logout error:", error);
        } else {
            alert("Logged out 👍🏻!");
        }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Re-Game</Link>
      </div>
      <div className="flex gap-2">
        <Searchbar />

        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="btn">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/account" className="btn">
                  Settings
                </Link>
              </li>
              <li>
                <a className="btn" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <ul>
            <li>
              <Link to="/login" className="btn btn-outline btn-primary">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
