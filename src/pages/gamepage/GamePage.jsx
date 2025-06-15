import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import RealtimeChat from "../../components/RealtimeChat";
import ToggleFavorite from "./ToggleFavorite"

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=bd5e564bfd3948ae8d943cbd4c2abd50`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    const newUrl = `https://api.rawg.io/api/games/${id}?key=bd5e564bfd3948ae8d943cbd4c2abd50`;
    updateUrl(newUrl);
  }, [id, updateUrl]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <h1>Error: {error.message || "An unknown error occurred."}</h1>;
  }

  if (!data) {
    return <p>No game data available.</p>;
  }

  return (
    <>
      <div className="min-h-screen bg-base-100 text-base-content">
        <div className="relative h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden mb-8">
          <img
            src={data.background_image}
            alt={data.name || "Game Image"}
            className="w-full h-full object-cover object-center"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral ">{data.name} <span className="badge badge-primary badge-outline">⭐ {data.rating}</span></h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-primary mb-4">About the Game</h2>
          <p className="leading-relaxed whitespace-pre-wrap text-gray-800">{data.description_raw}</p>
        </div>

        <div className="card bg-base-200 shadow-lg p-4 space-y-3">
          <div >
          <ToggleFavorite data={data} />
        </div>
          <h3 className="text-xl font-semibold text-primary">Game Details</h3>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-semibold text-neutral">Release:</span> {data.released}</p>
            <p><span className="font-semibold text-neutral">Rating:</span> {data.rating}</p>
            
            <p><span className="font-semibold text-neutral">Genres:</span> {data.genres.map(g => g.name).join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <RealtimeChat data={data} />
      </div>
    </div>
    </>
  );
}
