import LazyLoadImage from "./LazyLoadGameImage";
import { Link } from 'react-router';

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");

  const { background_image: image } = game;

  return (

    <div className="card bg-base-100 w-96 shadow-sm" key={game.id}>
      { <LazyLoadImage image={image} /> }
      <div className="card-body">
        <h2 className="card-title">
          {game.name}
        </h2>
        <p>
          {game.released}
        </p>
        <button className="btn btn-soft btn-primary"><Link to={`/games/${game.slug}/${game.id}`}>Vedi di piu</Link></button>
        <div className="card-actions justify-end">
            {game.genres && game.genres.map((genre) => (
                <div key={genre.id} className="badge badge-outline">{genre.name}</div>
            ))}
          
        </div>
      </div>
    </div>
  );
}
