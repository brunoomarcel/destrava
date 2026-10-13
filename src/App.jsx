import React, { useState } from "react";
import expertImage from "../assets/expert-lizandra.jpg";
import heroImage from "../assets/produtividade-evento.png";

const initialFormData = {
  name: "",
  email: "",
  whatsapp: "",
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const whatsapp = formData.whatsapp.trim();
    const digits = whatsapp.replace(/\D/g, "");

    setHasError(false);

    if (!name || !email || !whatsapp) {
      setMessage("Preencha nome, e-mail e WhatsApp para eu te avisar sobre o evento.");
      setHasError(true);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Confira o e-mail antes de continuar.");
      setHasError(true);
      return;
    }

    if (digits.length < 10) {
      setMessage("Confira o WhatsApp com DDD.");
      setHasError(true);
      return;
    }

    setFormData(initialFormData);
    setMessage(`${name}, você entrou na lista para ser avisado neste teste local.`);
  };

  return (
    <main className="capture-page" id="top">
      <section className="capture-hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>

        <div className="capture-content">
          <a className="brand" href="#top" aria-label="Método Destrava">
            <span className="brand-mark">P</span>
            <span>Método Destrava</span>
          </a>

          <p className="eyebrow">Evento online gratuito</p>
          <h1 id="hero-title">Eu vou te mostrar como transformar procrastinação em execução</h1>
          <p className="hero-copy">
            No dia <strong>29/10</strong>, você vai participar de uma aula exclusiva, onde vou te mostrar como destravar foco,
            disciplina e produtividade com mais clareza. Preencha seus dados para receber os avisos em primeira mão.
          </p>
          <div className="expert-card" aria-label="Expert do evento">
            <img src={expertImage} alt="Lizandra Soares conduzindo uma aula" />
            <div>
              <strong>Com Lizandra Soares</strong>
              <span>Neuropsicóloga</span>
            </div>
          </div>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="form-heading">
            <h2>Preencha seus dados</h2>
          </div>

          <label>
            Nome
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Seu nome"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="nome@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            WhatsApp
            <input
              type="tel"
              name="whatsapp"
              autoComplete="tel"
              inputMode="tel"
              placeholder="(00) 00000-0000"
              required
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </label>

          <button className="button button-primary" type="submit">
            Quero acesso exclusivo
          </button>
          <p className={`form-message${hasError ? " error" : ""}`} role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </section>
    </main>
  );
}

export default App;
