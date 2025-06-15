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
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-4">
        Hey, {session?.user?.user_metadata?.first_name || session?.user?.email || "User"} 👋
      </h2>

      <div className="collapse collapse-arrow bg-base-200 rounded-box shadow-md">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Favorites</div>
        <div className="collapse-content">
          {favorites.length === 0 ? (
            <p className="text-gray-500 italic">Non ci sono preferiti al momento...</p>
          ) : (
            <ul className="grid gap-4 mt-4">
              {favorites.map((game) => (
                <li
                  key={game.game_id}
                  className="flex items-center justify-between p-2 rounded bg-base-100 shadow"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={game.game_image}
                      alt={game.game_name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p className="font-medium">{game.game_name}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => removeFavorite(game.game_id)}
                  >
                    <FaTrashAlt className="mr-1" />
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}