import { Link } from 'react-router';
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresDropdown() {

  const initialUrl = `https://api.rawg.io/api/genres?key=bd5e564bfd3948ae8d943cbd4c2abd50`;

  const { loading, data, error } = useFetchSolution(initialUrl);

  return (
    <>

     <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        Genres
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56"
      >
        {loading && (
          <li>
            <small className="px-2">Loading...</small>
          </li>
        )}
        {error && (
          <li>
            <small className="px-2 text-error">{error}</small>
          </li>
        )}
        {data &&
          data.results.map((genre) => (
            <li key={genre.id}>
              <Link to={`/game/${genre.slug}`} className="capitalize">
                {genre.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
      {/* <select defaultValue="Select Genres" className="select">
        <option disabled={true}>Select Genres</option>
        {error && <small>{error}</small>}
        {genres && genres.results.map((genre) => (
            <option key={genre.id}>
      <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
    </option>
        ))}
      </select> */}
    </>
  );
}
