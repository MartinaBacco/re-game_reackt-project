import { useEffect } from "react";
import { useParams } from "react-router";
import CardGame from '../../components/CardGame';
import useFetchSolution from "../../hook/useFetchSolution";

export default function GenrePage() {
    const { genre } = useParams();

    const initialUrl = `https://api.rawg.io/api/games?key=bd5e564bfd3948ae8d943cbd4c2abd50&genres=${genre}&page=1`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {

    const newUrl = `https://api.rawg.io/api/games?key=bd5e564bfd3948ae8d943cbd4c2abd50&genres=${genre}&page=1`;
        updateUrl(newUrl);
    }, [genre, updateUrl]);

    if (loading) {
        return <p className="text-center p-4">Caricamento giochi per il genere "{genre}"...</p>;
    }

    if (error) {
        return <h1 className="text-center text-error p-4">Errore durante il caricamento dei giochi: {error}</h1>;
    }

    if (!data || !data.results || data.results.length === 0) {
        return <p className="text-center p-4">Nessun gioco trovato per il genere "{genre}".</p>;
    }

    return (
        <div className="container mx-auto p-4"> 
            <h1 className="text-3xl font-bold mb-6 capitalize">Welcome to: {genre.replace(/-/g, ' ')}</h1> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
}