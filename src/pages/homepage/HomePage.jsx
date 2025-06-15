import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";
import GenresSidebar from "../../components/GenresSidebar";
import GenresDropdownMobile from "../../components/GenresDropdownMobile";

export default function HomePage() {
  const initialUrl = `https://api.rawg.io/api/games?key=bd5e564bfd3948ae8d943cbd4c2abd50&dates=2024-01-01,2024-12-31&page=1`;

  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">Home Page</h1>

      <div className="flex gap-6">
        <div className="hidden md:block w-64"><GenresSidebar /></div>
        
        <div className="block md:hidden mb-4"><GenresDropdownMobile /></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {error && <article className="text-error">{error}</article>}
          {data &&
            data.results.map((game) => <CardGame key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
}
