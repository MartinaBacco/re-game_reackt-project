import { useContext, useEffect } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoriteContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const favoriteGameUI = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!session || !session.user) {
            navigate('/login');
        }
    }, [session, navigate]);

    if (!session || !session.user) {
        return (
            <div className="container">
                <p>Redirecting to login or loading session...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>Hey {session?.user?.user_metadata?.first_name || session?.user?.email || 'User'}</h2>
            <details className="dropdown">
                <summary>Favorites</summary>
                {favorites.length == 0 && <p>Non ci sono preferiti al momento...</p>}
                <ul>
                    {favorites.map((game) => (
                        <li key={game.game_id} style={favoriteGameUI}>
                            <div>
                                <img width={50} height={50} src="game.game_image" alt="game.game_name" />
                                <p>{game.game_name}</p>
                            </div>
                            <button className="secondary" onClick={() => removeFavorite(game.game_id)}>
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    )
}