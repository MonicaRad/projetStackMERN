// front-react/app/page.tsx
import Link from 'next/link';

// Typage basé sur les entités de ton collègue
export interface Movie {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export default async function Home() {
  // Plus tard, tu remplaceras ceci par un fetch vers l'API de ton collègue :
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
  // const movies: Movie[] = await res.json();

  // Données factices en attendant l'API du back
  const mockMovies: Movie[] = [
    { _id: "1", title: "Inception", description: "Le vol de rêves.", price: 12.99 },
    { _id: "2", title: "Interstellar", description: "Voyage au-delà des étoiles.", price: 14.99 },
  ];

  return (
    <main className="p-10 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Catalogue de Films</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockMovies.map((movie) => (
          <div key={movie._id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600 mb-4">{movie.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-600">{movie.price} €</span>
              {/* Lien vers la page de détails que nous allons créer */}
              <Link 
                href={`/movies/${movie._id}`}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}