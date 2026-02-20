"use client";

import { useState } from "react";

type PurchaseModalProps = {
  open: boolean;
  movie: any | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
};

export default function PurchaseModal({
  open,
  movie,
  onClose,
  onSuccess,
}: PurchaseModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
  });

  if (!open || !movie) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(
      `Merci ${form.firstName} ! Ton achat de "${movie.title}" (${Number(
        movie.price
      ).toFixed(2)} €) a été enregistré.`
    );
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Achat du film</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-movie">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={movie.cover} alt={movie.title} />
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <p className="movie-price">
              {Number(movie.price).toFixed(2)} €
            </p>
          </div>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Numéro de carte (factice)</label>
            <input
              type="text"
              name="cardNumber"
              required
              value={form.cardNumber}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Confirmer l’achat
          </button>
        </form>
      </div>
    </div>
  );
}
