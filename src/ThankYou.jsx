function ThankYou() {
  return (
    <main className="thank-you-page">
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
