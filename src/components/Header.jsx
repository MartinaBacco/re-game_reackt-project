import React, { useContext, useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Avatar from "./Avatar"

export default function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function fetchAvatar() {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching avatar:", error.message);
      } else {
        setAvatarUrl(data?.avatar_url);
      }
    }

    fetchAvatar();
  }, [session]);


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert(`Logout error 👎🏻! ${error.message}`);
            console.error("Logout error:", error);
        } else {
            alert("Logged out 👍🏻!");
            navigate("/login");
        }
  };

  return  (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
          🎮 Re-Game
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Searchbar />

        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Avatar url={avatarUrl} size={40} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="hover:bg-base-200 rounded">
                Profile
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:bg-base-200 rounded">
                  Settings
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:bg-base-200 rounded">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
