"use client";

import Link from "next/link";
import { useState } from "react";
import { getMovieById } from "@/lib/movieService";
import PurchaseModal from "@/app/components/PurchaseModal";

type MovieDetailsPageProps = {
  params: { id: string };
};

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movieFromService = getMovieById(params.id);

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "" });

  if (!movieFromService) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white border rounded-xl p-6 max-w-md w-full">
          <h1 className="text-xl font-bold mb-2">Film introuvable</h1>
          <p className="text-gray-600 mb-4">Ce film n’existe pas.</p>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            ← Retour à l’accueil
          </Link>
        </div>
      </main>
    );
  }

  // ✅ ton type Movie a bien title/year/price/poster
  const title = movieFromService.title;
  const year = movieFromService.year;
  const price = movieFromService.price;

  // ✅ image (poster)
  const cover = movieFromService.poster ?? "https://via.placeholder.com/800x450";

  // ✅ objet movie envoyé au modal (il utilise movie.title/movie.price/movie.year/movie.cover)
  const movie = {
    ...movieFromService,
    cover, // on ajoute cover (OK, c'est un objet local, pas ton type)
  };

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3500);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/" className="text-blue-600 font-semibold hover:underline">
          ← Retour à l’accueil
        </Link>

        <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="aspect-[16/9] bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt={title} className="h-full w-full object-cover" />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-extrabold">{title}</h1>

            <p className="text-gray-600 mt-2">
              {movieFromService.genre ?? "Film"} • {year}
              {movieFromService.duration ? ` • ${movieFromService.duration} min` : ""}
            </p>

            <p className="text-gray-700 mt-4">{movieFromService.description}</p>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-2xl font-extrabold">{price.toFixed(2)} €</p>

              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Acheter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ PurchaseModal : props exactes */}
      <PurchaseModal
        open={open}
        movie={movie}
        onClose={() => setOpen(false)}
        onSuccess={showToast}
      />

      {toast.open && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-3 rounded-xl shadow-lg">
          {toast.message}
        </div>
      )}
    </main>
  );
}