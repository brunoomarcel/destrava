import React, { useState } from "react";
import expertImage from "../assets/expert-lizandra.jpg";
import { supabase } from "./lib/supabase";
import ThankYou, { playSuccessChime } from "./ThankYou";
import NeuralBackground from "./NeuralBackground";

const initialFormData = {
  name: "",
  email: "",
  whatsapp: "",
  consent: false,
};

function App() {
  const [isSubmitted, setIsSubmitted] = useState(window.location.pathname === "/obrigado");
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleWhatsappChange = (event) => {
    const onlyDigits = event.target.value.replace(/\D/g, "").slice(0, 11);

    setFormData((currentData) => ({
      ...currentData,
      whatsapp: onlyDigits,
    }));
  };

  const handleSubmit = async (event) => {
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

    if (!formData.consent) {
      setMessage("Autorize o recebimento de informações sobre o evento.");
      setHasError(true);
      return;
    }

    setIsSubmitting(true);

    // Dispara durante a interação do usuário para evitar o bloqueio de autoplay.
    try {
      playSuccessChime();
    } catch {
      // A animação da página de obrigado continua mesmo sem áudio.
    }

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      whatsapp,
      consent: true,
      source: "destrava-landing",
    });

    setIsSubmitting(false);

    if (error) {
      setMessage("Não foi possível concluir agora. Tente novamente em instantes.");
      setHasError(true);
      return;
    }

    setFormData(initialFormData);
    window.history.pushState({}, "", "/obrigado");
    setIsSubmitted(true);
    setMessage(`${name}, você entrou na lista para ser avisado neste teste local.`);
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <main className="capture-page" id="top">
      <NeuralBackground />
      <section className="capture-hero" aria-labelledby="hero-title">
        <div className="capture-content">
          <div className="hero-meta">
            <a className="brand" href="#top" aria-label="Método Destrava">
              <span className="brand-mark">P</span>
            </a>
            <p className="eyebrow">Evento online gratuito</p>
          </div>
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
              maxLength={11}
              pattern="[0-9]{10,11}"
              value={formData.whatsapp}
              onChange={handleWhatsappChange}
            />
          </label>

          <label className="consent-field">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={(event) =>
                setFormData((currentData) => ({
                  ...currentData,
                  consent: event.target.checked,
                }))
              }
            />
            <span>Aceito receber informações sobre o evento e comunicações relacionadas.</span>
          </label>

          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Quero acesso exclusivo"}
          </button>
          <p className={`form-message${hasError ? " error" : ""}`} role="status" aria-live="polite">
            {message}
          </p>
        </form>

      </section>
      <div className="site-footer">
        © {new Date().getFullYear()} Método Destrava. Todos os direitos reservados.
      </div>
    </main>
  );
}

export default App;
