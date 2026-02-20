"use client";

import { useMemo, useState } from "react";
import PurchaseModal from "./components/PurchaseModal";
import AuthModal from "./components/AuthModal";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieFilters from "./components/MovieFilters";

/* --------- DONNÉES MOCK FRONT-ONLY --------- */
const MOCK_MOVIES = [
  { id: "1", title: "Inception", year: 2010, price: 9.99 },
  { id: "2", title: "Interstellar", year: 2014, price: 11.99 },
  { id: "3", title: "The Dark Knight", year: 2008, price: 8.99 },
  { id: "4", title: "Dune: Part Two", year: 2024, price: 12.99 },
  { id: "5", title: "Avatar", year: 2009, price: 7.99 },
  { id: "6", title: "Gladiator", year: 2000, price: 6.99 },
];

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "" });

  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // plus de backend : on utilise directement MOCK_MOVIES
  const movies = MOCK_MOVIES;

  const openModalForMovie = (movie: any) => {
    setSelectedMovie(movie);
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalOpen(false);
    setSelectedMovie(null);
  };

  const openAuth = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3500);
  };

  const scrollToHome = () => {
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMovies = () => {
    const el = document.getElementById("films");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredMovies = useMemo(
    () =>
      movies.filter((m) => {
        const title = (m.title || "").toLowerCase();
        const matchTitle = title.includes(search.toLowerCase());

        const y = Number(m.year ?? 0);
        let matchYear = true;

        if (yearFilter === "2020+") matchYear = y >= 2020;
        else if (yearFilter === "2010-2019") matchYear = y >= 2010 && y <= 2019;
        else if (yearFilter === "avant-2010") matchYear = y < 2010;

        return matchTitle && matchYear;
      }),
    [movies, search, yearFilter]
  );

  return (
    <div className="app">
      <Navbar
        onAuthClick={openAuth}
        onScrollHome={scrollToHome}
        onScrollMovies={scrollToMovies}
      />

      <HeroBanner onSeeMovies={scrollToMovies} />

      <main className="content">
        <section id="films" className="movie-section">
          <h2>Catalogue de films</h2>

          <MovieFilters
            search={search}
            year={yearFilter}
            onSearchChange={setSearch}
            onYearChange={setYearFilter}
          />

          <div className="movie-grid">
            {filteredMovies.map((m) => (
              <MovieCard key={m.id} movie={m} onBuy={openModalForMovie} />
            ))}
          </div>
        </section>
      </main>

      <PurchaseModal
        open={isPurchaseModalOpen}
        movie={selectedMovie}
        onClose={closePurchaseModal}
        onSuccess={showToast}
      />

      <AuthModal
        open={isAuthOpen}
        mode={authMode}
        onClose={closeAuth}
        onModeChange={setAuthMode}
        onSuccess={showToast}
      />

      {toast.open && <div className="toast">{toast.message}</div>}
    </div>
  );
}
