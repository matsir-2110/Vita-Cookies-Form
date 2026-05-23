"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor completá todos los campos.");
      return;
    }

    setLoading(true);

    // TODO: reemplazá esta lógica con tu autenticación real
    await new Promise((r) => setTimeout(r, 1000));

    // Ejemplo: credenciales hardcodeadas para prueba
    if (username === "admin" && password === "admin123") {
      // Redirigir al panel
      window.location.href = "/admin";
    } else {
      setError("Credenciales incorrectas. Verificá tu usuario y contraseña.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#f0ebe0" }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <span className="text-2xl">🍪</span>
        <span
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#3a5a34", fontFamily: "Georgia, serif" }}
        >
          Vita Cookies
        </span>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-10"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 24px 0 rgba(60, 80, 40, 0.08)",
          border: "1px solid #e8e2d8",
        }}
      >
        {/* Encabezado */}
        <div className="text-center mb-8">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: "#5a7a52" }}
          >
            Acceso Restringido
          </p>
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              color: "#1a2318",
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Panel del administrador
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Ingresá con tus credenciales para gestionar el estudio.
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-5">
          {/* Usuario */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
              style={{ color: "#374151" }}
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full px-5 py-3 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#f9f7f4",
                border: "1.5px solid #e2ddd6",
                color: "#1a2318",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#5a7a52";
                e.target.style.boxShadow = "0 0 0 3px rgba(90,122,82,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2ddd6";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: "#374151" }}
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full px-5 py-3 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#f9f7f4",
                border: "1.5px solid #e2ddd6",
                color: "#1a2318",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#5a7a52";
                e.target.style.boxShadow = "0 0 0 3px rgba(90,122,82,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2ddd6";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-center" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-all mt-2"
            style={{
              backgroundColor: loading ? "#7a9e74" : "#4a6e43",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              if (!loading)
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#3a5a34";
            }}
            onMouseLeave={(e) => {
              if (!loading)
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#4a6e43";
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>

      {/* Volver al inicio */}
      <Link
        href="/"
        className="mt-8 text-sm transition-colors"
        style={{ color: "#6b7280" }}
        onMouseEnter={(e) =>
          ((e.target as HTMLAnchorElement).style.color = "#3a5a34")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLAnchorElement).style.color = "#6b7280")
        }
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
