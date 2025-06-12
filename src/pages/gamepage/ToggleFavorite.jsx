import { useContext, useState } from "react";
import {FaHeart, FaRegHeart } from "react-icons/fa"
import FavoritesContext from "../../context/FavoriteContext";

export default function ToggleFavorite({ data }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => data && +el.fame_id === data.id);

    return (
        <div>
            {isFavorite() ? (
                <button onClick={() => removeFavorite(data.id)}>
                    <FaHeart />
                </button>
            ) : (
            <button onClick={() => addFavorites(data)}>
                <FaRegHeart />
            </button>
            )}
        </div>
    
    )
}