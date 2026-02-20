"use client";

import Image from "next/image";

type HeroBannerProps = {
  onSeeMovies: () => void;
};

export default function HeroBanner({ onSeeMovies }: HeroBannerProps) {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />

      <div className="hero-video-frame">
        <Image
          src="/clown.gif"   // ✅ on utilise directement le chemin public
          alt="Bande-annonce"
          width={1200}
          height={700}
          priority
          unoptimized
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="hero-content">
        <h1>Des films à acheter en un clic.</h1>
        <p>
          Explore une sélection unique de films et finalise ton achat en
          quelques secondes.
        </p>

        <button className="btn btn-primary hero-btn" onClick={onSeeMovies}>
          Voir les films
        </button>
      </div>
    </section>
  );
}