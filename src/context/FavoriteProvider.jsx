import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoriteContext";

export default function FavoritesProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = useCallback(async () => {

    if (!session || !session.user) {
            setFavorites([]);
            return;
        }

    let { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(data || []);
    }
  }, [session]);

  const addFavorites = async (game) => {
    await supabase
      .from("favorites")
      .insert([
        {
          user_id: session.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();

      if (error) {
            console.error("Error adding favorite:", error);
            alert(`Errore nell'aggiungere il favorito: ${error.message}`);
        } else {
            setFavorites((prev) => [...prev, ...data]);
            alert("Gioco aggiunto ai favoriti!"); 
        }
  };

  const removeFavorite = async (gameId) => {
    if (!session || !session.user) {
            alert("Devi essere loggato per rimuovere dai favoriti.");
            return;
        }
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameId)
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error removing favorite:", error);
            alert(`Errore nel rimuovere il favorito: ${error.message}`);
        } else {
            setFavorites((prev) => prev.filter((fav) => fav.game_id !== gameId));
            alert("Gioco rimosso dai favoriti!"); 
        }
    };

  useEffect(() => {
    if (session) {
            getFavorites();
        } else {
            setFavorites([]);
        }

        const channel = supabase
            .channel("public_favorites_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                (payload) => {
                    getFavorites();
                }
            )
            .subscribe();
            return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [getFavorites, session]);

  return (
    <FavoritesContext.Provider
    value={{
        favorites,
        setFavorites,
        addFavorites,
        removeFavorite,
    }}
    >
        { children }
    </FavoritesContext.Provider>
  )
}
