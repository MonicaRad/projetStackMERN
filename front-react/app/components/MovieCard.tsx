"use client";

const COVER_BY_TITLE: Record<string, string> = {
  Inception:
    "https://image.tmdb.org/t/p/w342/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
  Interstellar:
    "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "The Dark Knight":
    "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "Dune: Part Two":
    "https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  Avatar:
    "https://image.tmdb.org/t/p/w342/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  Gladiator:
    "https://image.tmdb.org/t/p/w342/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
};

function getRandomPosterForTitle(title = "") {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  const id = (hash % 1000) + 1;
  return `https://picsum.photos/seed/${id}/342/513`;
}

type MovieCardProps = {
  movie: { id: string; title: string; year: number; price: number };
  onBuy: (movie: any) => void;
};

export default function MovieCard({ movie, onBuy }: MovieCardProps) {
  const title = movie.title || "";
  const cover = COVER_BY_TITLE[title] || getRandomPosterForTitle(title);
  const year = movie.year ?? "";
  const price = Number(movie.price ?? 9.99);

  return (
    <article className="movie-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cover} alt={title} className="movie-cover" />
      <div className="movie-body">
        <h3>{title}</h3>
        <p className="movie-year">{year}</p>
        <p className="movie-price">{price.toFixed(2)} €</p>
        <button
          className="btn btn-primary btn-small"
          onClick={() => onBuy({ ...movie, cover, year, price })}
        >
          Acheter
        </button>
      </div>
    </article>
  );
}
