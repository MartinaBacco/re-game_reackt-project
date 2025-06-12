import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame"

export default function HomePage() {

    const initialUrl = `https://api.rawg.io/api/games?key=bd5e564bfd3948ae8d943cbd4c2abd50&dates=2024-01-01,2024-12-31&page=1`;

    const { data, loading, error } = useFetchSolution(initialUrl);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Home Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            { error && <article>{ error }</article>}
            { data && data.results.map((game) => (
                <CardGame key={game.id} game={game}/>
            ))}
            </div>
        </div>
    );
}