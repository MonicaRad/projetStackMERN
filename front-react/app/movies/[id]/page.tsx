// front-react/app/movies/[id]/page.tsx
import Link from 'next/link';
import PurchaseForm from '../../components/PurchaseForm';

// Typage des paramètres d'URL pour Next.js 16
interface PageProps {
  params: { id: string };
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = params;

  // Plus tard : fetch(`.../movies/${id}`)
  const mockMovie = { 
    _id: id, 
    title: id === "1" ? "Inception" : "Interstellar", 
    description: "Un chef-d'œuvre cinématographique incontournable.", 
    price: id === "1" ? 12.99 : 14.99 
  };

  return (
    <main className="p-10 font-sans max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        &larr; Retour au catalogue
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
        {/* Colonne d'infos */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{mockMovie.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {mockMovie.description}
          </p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">
            ID Référence: {mockMovie._id}
          </div>
        </div>

        {/* Colonne d'achat (On injecte le composant Client ici !) */}
        <div>
          <PurchaseForm 
            movieId={mockMovie._id} 
            movieTitle={mockMovie.title} 
            price={mockMovie.price} 
          />
        </div>
      </div>
    </main>
  );
}