"use client";

type NavbarProps = {
  onAuthClick: () => void;
  onScrollHome: () => void;
  onScrollMovies: () => void;
};

export default function Navbar({
  onAuthClick,
  onScrollHome,
  onScrollMovies,
}: NavbarProps) {
  return (
    <header className="nav">
      <div className="nav-left">
        <span className="nav-logo" onClick={onScrollHome}>
          BUYMOVIES
        </span>
        <nav className="nav-links">
          <button onClick={onScrollHome}>Accueil</button>
          <button onClick={onScrollMovies}>Films</button>
        </nav>
      </div>
     
    </header>
  );
}
