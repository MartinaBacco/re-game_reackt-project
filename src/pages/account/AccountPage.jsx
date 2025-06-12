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
        <div className="container">
            <h2>Profile Settings</h2>
            <Avatar
                uid={session.user.id}
                url={avatar_url}
                size={150}
                onUpload={(event, newUrl) => {
                    updateProfile(event, newUrl);
                }}
            />
            <form onSubmit={updateProfile} className="form-widget">
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={session.user.email} disabled />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                    id="username"
                    type="text" 
                    required
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input 
                    id="first_name"
                    type="text" 
                    required
                    value={first_name || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                    id="last_name"
                    type="text" 
                    required
                    value={last_name || ""}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div>
                    <button 
                    type="submit"
                    disabled={loading}
                    >
                        {loading ? "loading ..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    
    )
}