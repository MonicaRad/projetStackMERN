"use client";

import { useState } from "react";

type AuthMode = "login" | "register";

type AuthModalProps = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (m: AuthMode) => void;
  onSuccess: (msg: string) => void;
};

export default function AuthModal({
  open,
  mode,
  onClose,
  onModeChange,
  onSuccess,
}: AuthModalProps) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (!open) return null;

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Connexion réussie, bienvenue ${loginForm.email} !`);
    onClose();
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Inscription réussie, bienvenue ${registerForm.firstName} !`);
    onClose();
  };

  const isLogin = mode === "login";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => onModeChange("login")}
            type="button"
          >
            Connexion
          </button>
          <button
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => onModeChange("register")}
            type="button"
          >
            Inscription
          </button>
        </div>

        {isLogin ? (
          <form className="modal-form" onSubmit={submitLogin}>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={loginForm.email}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-field">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Se connecter
            </button>
          </form>
        ) : (
          <form className="modal-form" onSubmit={submitRegister}>
            <div className="form-row">
              <div className="form-field">
                <label>Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={registerForm.firstName}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-field">
                <label>Nom</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={registerForm.lastName}
                  onChange={handleRegisterChange}
                />
              </div>
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={registerForm.email}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-field">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                value={registerForm.password}
                onChange={handleRegisterChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Créer un compte
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
