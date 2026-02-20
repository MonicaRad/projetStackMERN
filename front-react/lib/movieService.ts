import type { Movie } from "@/types/movie";

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description: "Un voleur qui infiltre les rêves.",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Science-fiction",
    duration: 148,
    createdAt: new Date().toISOString(),
    active: true,
    price: 9.99,
    poster: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
  },
  {
    id: "2",
    title: "Interstellar",
    description: "Voyage à travers l’espace et le temps.",
    year: 2014,
    director: "Christopher Nolan",
    genre: "Science-fiction",
    duration: 169,
    createdAt: new Date().toISOString(),
    active: true,
    price: 11.99,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
  },
  {
    id: "3",
    title: "Parasite",
    description: "Deux familles, deux mondes… une tension qui explose.",
    year: 2019,
    director: "Bong Joon-ho",
    genre: "Thriller",
    duration: 132,
    createdAt: new Date().toISOString(),
    active: true,
    price: 8.99,
    poster: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=800",
  },
];

let moviesState = [...mockMovies];

export function getMovies(): Movie[] {
  return moviesState.filter((m) => m.active !== false);
}

export function getMovieById(id: string): Movie | undefined {
  return moviesState.find((m) => m.id === id);
}
