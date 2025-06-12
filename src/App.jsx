import { Routing } from './routes/Routing';
import SessionProvider from './context/SessionProvider';
import FavoritesProvider from './context/FavoriteProvider';

export default function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
 }

