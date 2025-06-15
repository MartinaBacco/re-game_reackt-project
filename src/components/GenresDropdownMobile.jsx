import { Link } from "react-router-dom";
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresDropdownMobile() {
  const initialUrl = `https://api.rawg.io/api/genres?key=bd5e564bfd3948ae8d943cbd4c2abd50`;
  const { loading, data, error } = useFetchSolution(initialUrl);

  return (
    <div className="block md:hidden mb-4">
      <details className="dropdown bg-base-200 p-2 rounded shadow">
        <summary className="btn btn-primary w-full">Filtra per genere</summary>
        <ul className="menu bg-base-100 p-2 mt-2 rounded shadow w-full">
          {loading && <li>Loading...</li>}
          {error && <li className="text-error">{error}</li>}
          {data &&
            data.results.map((genre) => (
              <li key={genre.id}>
                <Link
                  to={`/genres/${genre.slug}`}
                  className="capitalize hover:bg-base-300 rounded px-2 py-1 block"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
        </ul>
      </details>
    </div>
  );
}