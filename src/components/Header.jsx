import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/supabase-client";

export default function Header() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error getting session:", error);
        setSession(null);
    } else { 
        console.log("Current session:", data.session);
        setSession(data.session);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert(`Logout error 👎🏻! ${error.message}`);
            console.error("Logout error:", error);
        } else {
            alert("Logged out 👍🏻!");
            setSession(null);
            navigate("/");
        }
  };

  useEffect(() => {
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event, "Session:", session);
        setSession(session);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Rehack-ame</Link>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a className="btn">Settings</a>
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
              <Link to="/login" className="btn">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
