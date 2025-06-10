import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=bd5e564bfd3948ae8d943cbd4c2abd50`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
 
  useEffect(() => {

    const newUrl =
      `https://api.rawg.io/api/games/${id}?key=bd5e564bfd3948ae8d943cbd4c2abd50`;
    updateUrl(newUrl);
  }, [id]);

  return (
    <>

      {loading && <p>Caricamento...</p>}
      {error && <h1>{error}</h1>}
      {data && (
      <div className="style-gamepage">
        <div className="style-game-info">
          <p>{data && data.released}</p>
          <h1>{data && data.name}</h1>
          <p>Rating: {data && data.rating}</p>
          <p>About :</p>
          <p>{data && data.description_raw}</p>
        </div>
        <div className="style-game-image">
          <img src={data && data.background_image} alt="" />
        </div>
      </div>
      )}
    </>
  );
}
