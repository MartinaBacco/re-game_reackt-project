import { useState, useEffect, useContext } from "react";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/supabase-client";
import Avatar from "../../components/Avatar";

export default function AccountPage() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false
        const getProfile = async () => {
            setLoading(true);
            if (!session || !session.user) { 
                console.warn("No session or user found to fetch profile.");
                setLoading(false);
                return;
            }

            const { user } = session

            const { data, error } = await supabase
            .from('profiles')
            .select(`username, first_name, last_name, avatar_url`)
            .eq('id', user.id)
            .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session]);

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault()

        setLoading(true);
        if (!session || !session.user) {
            alert("No active session to update profile.");
            setLoading(false);
            return;
        }
        const { user } = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
            alert("Profile updated successfully!");
        }
        setLoading(false)
    };

    if (!session) {
        return (
            <div className="contianer">
                <p>Loading session...</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        )
    }

    return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-base-100 rounded-xl shadow-lg my-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Profile Settings</h2>

      <div className="flex justify-center mb-6">
        <Avatar
          uid={session.user.id}
          url={avatar_url}
          size={150}
          onUpload={(event, newUrl) => updateProfile(event, newUrl)}
        />
      </div>

      <form onSubmit={updateProfile} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={session.user.email}
            disabled
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="first_name" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            required
            value={first_name || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            required
            value={last_name || ""}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full md:w-auto"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}