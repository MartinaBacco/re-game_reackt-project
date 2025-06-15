import { Link } from 'react-router-dom';
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresSidebar() {

  const initialUrl = `https://api.rawg.io/api/genres?key=bd5e564bfd3948ae8d943cbd4c2abd50`;

  const { loading, data, error } = useFetchSolution(initialUrl);

  return (
    <aside className="w-60 bg-base-200 p-4 rounded-xl shadow-md sticky top-20 h-fit self-start">
      <h2 className="text-lg font-bold mb-4">Generi</h2>

      {loading && <p className="text-sm">Loading...</p>}
      {error && <p className="text-error">{error}</p>}

      <ul className="menu space-y-1">
        {data &&
          data.results.map((genre) => (
            <li key={genre.id}>
              <Link to={`/genres/${genre.slug}`} className="capitalize hover:bg-base-300 rounded px-2 py-1 block">
                {genre.name}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}
