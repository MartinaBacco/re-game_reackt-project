import { useContext, useState } from "react";
import {FaHeart, FaRegHeart } from "react-icons/fa"
import FavoritesContext from "../../context/FavoriteContext";

export default function ToggleFavorite({ data }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => data && +el.game_id === data.id);

    return (
    <button
      onClick={() => isFavorite() ? removeFavorite(data.id) : addFavorites(data)}
      className="btn btn-primary flex items-center gap-2"
      aria-label={isFavorite() ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      {isFavorite() ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      {isFavorite() ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    </button>
  );
}