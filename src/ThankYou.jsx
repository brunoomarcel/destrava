import { useEffect, useRef } from "react";
import NeuralBackground from "./NeuralBackground";

export function playSuccessChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const now = audioContext.currentTime;
  const notes = [659.25, 783.99];

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * 0.12;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.45);
  });

  window.setTimeout(() => audioContext.close(), 900);
}

function ThankYou() {
  const hasTrackedLead = useRef(false);

  useEffect(() => {
    if (hasTrackedLead.current || typeof window.fbq !== "function") return;

    window.fbq("track", "Lead");
    // Avoid duplicate conversions when StrictMode runs effects twice.
    hasTrackedLead.current = true;
  }, []);

  return (
    <main className="thank-you-page">
      <NeuralBackground />
      <section className="thank-you-card" aria-labelledby="thank-you-title">
        <div className="thank-you-check" aria-hidden="true">✓</div>
        <p className="eyebrow">Inscrição confirmada</p>
        <h1 id="thank-you-title">Você deu o primeiro passo.</h1>
        <p className="thank-you-lead">Sua vaga na lista do evento está garantida.</p>
        <div className="thank-you-next-step">
          <strong>Agora faça estas duas coisas:</strong>
          <span>Entre no grupo para receber os avisos, o link da aula e os lembretes do lançamento.</span>
          <span>Depois, confira sua caixa de entrada: enviamos um e-mail com uma pesquisa rápida.</span>
        </div>
        <p className="thank-you-date">O evento acontece em 29/10.</p>
        <a
          className="button button-primary"
          href="https://chat.whatsapp.com/KDWsG4CZ0vUF0xSm6gxkYv"
          target="_blank"
          rel="noreferrer"
        >
          ENTRAR NO GRUPO
        </a>
        <p className="thank-you-email-tip">
          Não encontrou o e-mail? Procure por <strong>suporte@casullione.com</strong> no spam ou na aba Promoções.
        </p>
      </section>
    </main>
  );
}

export default ThankYou;
