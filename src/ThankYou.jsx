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
  return (
    <main className="thank-you-page">
      <div className="celebration-particles" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <span key={index} />)}
      </div>
      <section className="thank-you-card" aria-labelledby="thank-you-title">
        <div className="thank-you-check" aria-hidden="true">✓</div>
        <p className="eyebrow">Inscrição confirmada</p>
        <h1 id="thank-you-title">Você deu o primeiro passo.</h1>
        <p className="thank-you-lead">Sua vaga na lista do evento está garantida.</p>
        <div className="thank-you-next-step">
          <strong>Agora falta só uma coisa:</strong>
          <span>entrar no grupo para receber os avisos, o link e os lembretes do lançamento.</span>
        </div>
        <p className="thank-you-date">O evento acontece em 29/10.</p>
        <a
          className="button button-primary"
          href="https://chat.whatsapp.com/FIXAPXQCjpJLaOX6ZTIRyx"
          target="_blank"
          rel="noreferrer"
        >
          Quero receber os avisos no grupo
        </a>
        <small>É gratuito e você pode sair quando quiser.</small>
      </section>
    </main>
  );
}

export default ThankYou;
