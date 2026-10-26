import React, { useEffect } from "react";
import expertImage from "../assets/expert-lizandra.jpg";
import guaranteeSeal from "../assets/selo-garantia-destrava.png";
import "./Vsl.css";

const checkoutUrl = "#checkout";

const faqs = [
  ["Vou ter tempo para fazer isso?", "Você vai precisar separar um tempo para as aulas e para praticar, mas não precisa transformar sua rotina inteira de uma vez. A jornada trabalha com passos que façam sentido para a sua realidade."],
  ["Por que o Destrava seria diferente de outros cursos?", "Você vai usar um projeto seu como exemplo durante as seis semanas e terá acompanhamento nesse processo. A proposta é aprender e aplicar, não apenas assistir a explicações."],
  ["Preciso ter um negócio ou um projeto grande?", "Não. Pode ser um projeto pessoal, uma decisão que você vem adiando ou algo do trabalho. O importante é que faça sentido para você."],
  ["O Destrava é terapia?", "Não. O Destrava é uma jornada de aprendizagem sobre produtividade, com aulas e acompanhamento. Não substitui psicoterapia quando ela for necessária."],
  ["E se eu começar e depois perder o ritmo?", "A retomada faz parte do método. Um dia difícil não precisa significar que você perdeu tudo: a proposta é aprender a ajustar o plano e continuar."],
  ["Como funciona a garantia?", "Você tem 30 dias a partir da compra. Se aplicar as orientações e não perceber resultado, pode pedir o reembolso dentro desse prazo."],
];

export default function Vsl() {
  useEffect(() => {
    const page = document.querySelector(".vsl-page");
    if (!page || !("IntersectionObserver" in window)) return undefined;

    const revealNodes = [...page.querySelectorAll(
      "section:not(.vsl-hero), footer, .vsl-benefit, .vsl-how-grid article, .vsl-card, .vsl-proof-grid > div"
    )];
    revealNodes.forEach((node, index) => {
      node.classList.add("vsl-reveal");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    const zoomNodes = [...page.querySelectorAll(".vsl-portrait, .vsl-guarantee-seal")];
    zoomNodes.forEach((node) => node.classList.add("vsl-zoom"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px" });

    [...revealNodes, ...zoomNodes].forEach((node) => observer.observe(node));
    requestAnimationFrame(() => page.querySelector(".vsl-hero")?.classList.add("vsl-hero-enter"));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="vsl-page">
      <section id="top" className="vsl-hero">
        <div className="vsl-hero-inner">
            <h1>Elimine o ciclo de procrastinação e coloque em movimento o projeto que você vem adiando</h1>
            <p className="vsl-hero-lead">Em 6 semanas, você vai entender o que trava sua ação, dar o próximo passo e aprender a retomar — sem culpa, perfeição ou motivação.</p>
            <div id="video" className="vsl-player" role="region" aria-label="Apresentação do Método Destrava">
              {/* Substituir pelo player da VSL quando o vídeo for fornecido. */}
              <div className="vsl-player-placeholder">
                <span className="vsl-player-title">Método Destrava — Produtividade sem Culpa</span>
                <span>Apresentação com Lizandra Soares · VSL de aproximadamente 30 minutos</span>
                <span className="vsl-player-status">Vídeo em breve</span>
              </div>
            </div>
            <a className="vsl-cta vsl-hero-buy" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a>
            <ul className="vsl-hero-points">
              <li>Descubra onde você costuma parar antes de concluir.</li>
              <li>Entenda por que o adiamento traz alívio agora e culpa depois.</li>
              <li>Aprenda a escolher a menor ação concreta e retomar após um imprevisto.</li>
            </ul>
        </div>
      </section>

      <section className="vsl-section vsl-benefits">
        <div className="vsl-centered"><p className="vsl-eyebrow">O que acontece dentro da jornada</p><h2>Um caminho para entender, praticar e <em>retomar.</em></h2></div>
        <div className="vsl-benefit-grid">
          {[
            ["Fotografar", "Descubra onde você costuma parar, usando mapas simples para observar o travamento e a cobrança."],
            ["Entender", "Investigue o que sustenta o padrão e troque a pergunta “por que sou assim?” por uma pergunta mais útil."],
            ["Reconfigurar", "Aprenda novas formas de decidir, começar sem perfeição e responder ao desconforto."],
          ].map(([title, description]) => <article className="vsl-benefit" key={title}><span>✓</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
        </div>
        <a className="vsl-cta vsl-cta-centered" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a>
      </section>

      <section className="vsl-how vsl-section">
        <div className="vsl-centered"><p className="vsl-eyebrow">Como funciona</p><h2>Você aprende enquanto aplica em algo que importa para <em>você.</em></h2></div>
        <div className="vsl-how-grid">
          <article><span>01</span><h3>Escolha seu Projeto-Roma</h3><p>Defina uma tarefa, decisão, conversa ou projeto que você quer colocar em movimento durante a jornada.</p></article>
          <article><span>02</span><h3>Fotografe onde você trava</h3><p>Observe o momento exato do adiamento e os pensamentos, emoções e ações que aparecem antes dele.</p></article>
          <article><span>03</span><h3>Reconfigure e implemente</h3><p>Troque a cobrança por perguntas práticas, escolha a menor ação concreta e avance por etapas.</p></article>
          <article><span>04</span><h3>Aprenda a retomar</h3><p>Use o Protocolo de Recuperação para ajustar o plano quando um imprevisto interromper seu ritmo.</p></article>
        </div>
      </section>

      <section className="vsl-schedule vsl-section">
        <div className="vsl-centered"><p className="vsl-eyebrow">Cronograma da jornada</p><h2>Seis semanas para transformar compreensão em <em>movimento.</em></h2></div>
        <div className="vsl-timeline">
          <div><span>Semanas 1 e 2</span><strong>Fotografar + Entender</strong><p>Mapeie onde você para e compreenda o que sustenta o padrão de adiamento.</p></div>
          <div><span>Semana 3</span><strong>Reconfigurar</strong><p>Aprenda outras formas de responder ao desconforto, decidir e começar sem exigir perfeição.</p></div>
          <div><span>Semanas 4 e 5</span><strong>Implementar</strong><p>Coloque o Projeto-Roma em prática com passos concretos e aplicáveis à sua rotina.</p></div>
          <div><span>Semana 6</span><strong>Expandir</strong><p>Trabalhe a retomada, ajuste o plano e desenvolva uma forma sustentável de continuar.</p></div>
        </div>
        <p className="vsl-schedule-note">A jornada combina aulas, acompanhamento e aplicação prática em um projeto real escolhido por você.</p>
      </section>

      <section className="vsl-section">
        <div className="vsl-intro">
          <div>
            <p className="vsl-eyebrow">Talvez você reconheça isso</p>
            <h2>Você não está fugindo do trabalho. Talvez esteja fugindo do <em>desconforto.</em></h2>
          </div>
          <div>
            <p className="vsl-copy">Uma proposta comercial, um serviço novo, uma decisão importante: quando a tarefa envolve se expor, escolher um caminho ou correr o risco de ouvir um “não”, pode surgir um desconforto que as tarefas dos outros não provocam.</p>
            <p className="vsl-copy">O adiamento pode trazer alívio por alguns minutos. Depois, a pendência continua aberta, o prazo diminui e a culpa aparece. O método começa olhando para esse ciclo com clareza.</p>
            <ul className="vsl-tangible-list">
              <li>Você abre o arquivo, mas começa a responder mensagens.</li>
              <li>Revisa várias vezes porque ainda não parece perfeito.</li>
              <li>Um imprevisto acontece e o plano inteiro parece perdido.</li>
            </ul>
          </div>
        </div>
        <div className="vsl-cards">
          {[
            ["01", "Implementar", "Coloque um projeto real em movimento com ações concretas, sem esperar por um dia perfeito."],
            ["02", "Expandir", "Aprenda a retomar depois de um imprevisto, sem transformar um dia fora do plano em uma semana fora do caminho."],
            ["03", "Projeto-Roma", "Escolha algo importante para você e use esse projeto como ponto de aplicação durante a jornada."],
          ].map(([number, title, description]) => (
            <article className="vsl-card" key={number}>
              <span className="vsl-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vsl-authority vsl-section">
        <div className="vsl-authority-grid">
          <div className="vsl-portrait">
            <img src={expertImage} alt="Lizandra Menezes Soares" />
            <div className="vsl-portrait-label"><strong>Lizandra Soares</strong><span>Psicóloga · Neuropsicóloga · CRP 19/003267</span></div>
          </div>
          <div>
            <p className="vsl-eyebrow">Quem conduz esse processo</p>
            <h2>O método nasceu da contradição entre saber planejar e conseguir <em>executar.</em></h2>
            <p className="vsl-copy">Lizandra Soares é neuropsicóloga, tem mais de 7 anos de atuação e já contribuiu para a transformação de mais de 1.500 vidas. Também ajudou mais de 1.200 pessoas por meio do curso Vencendo a Procrastinação.</p>
            <ul className="vsl-checklist">
              <li>Jornada de 6 semanas com aulas e acompanhamento</li>
              <li>Aplicação em um projeto real escolhido por você</li>
              <li>Protocolos para decisão, implementação e recuperação</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="vsl-proof vsl-section">
        <div className="vsl-centered"><p className="vsl-eyebrow">Experiência que sustenta o método</p><h2>Você não precisa aprender com alguém que só fala de <em>produtividade.</em></h2><p className="vsl-proof-lead">O Destrava foi construído a partir da prática clínica, do estudo do funcionamento da mente e da experiência de acompanhar pessoas diante de projetos e decisões importantes.</p></div>
        <div className="vsl-proof-grid">
          <div><strong>7+</strong><span>anos de atuação</span></div>
          <div><strong>1.500+</strong><span>vidas impactadas na clínica</span></div>
          <div><strong>1.200+</strong><span>pessoas no curso Vencendo a Procrastinação</span></div>
        </div>
        <p className="vsl-proof-note">Lizandra Soares · Neuropsicóloga e fundadora do Espaço Casulli</p>
      </section>

      <section id="oferta" className="vsl-offer vsl-section">
        <p className="vsl-eyebrow">Primeira turma do método</p>
        <h2>Se você já tentou várias vezes, talvez não precise de mais uma <em>dica.</em></h2>
        <div id="checkout" className="vsl-offer-box">
          <span className="vsl-offer-kicker">Método Destrava</span>
          <h3>6 semanas para aprender, praticar e colocar um projeto em movimento</h3>
          <p className="vsl-offer-intro">O Método Destrava reúne aulas e acompanhamento para você sair do ciclo de tentar, travar e se punir, com um caminho aplicado à sua vida.</p>
          <ul className="vsl-offer-list"><li>Movimento 1: Fotografar</li><li>Movimento 2: Entender</li><li>Movimento 3: Reconfigurar</li><li>Movimento 4: Implementar</li><li>Movimento 5: Expandir</li><li>Projeto-Roma para aplicação prática</li><li>Protocolo de Decisão e Protocolo de Recuperação</li></ul>
          <div className="vsl-price"><strong>R$ 497</strong> à vista <span>ou 12x de R$ 51,40</span></div>
          <a className="vsl-cta" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a>
          <p className="vsl-guarantee">Garantia de 30 dias. Se aplicar as orientações e não perceber resultado, você pode pedir o reembolso dentro do prazo.</p>
        </div>
      </section>

      <section className="vsl-guarantee-section vsl-section">
        <div className="vsl-guarantee-card">
          <img className="vsl-guarantee-seal" src={guaranteeSeal} alt="Garantia de 30 dias do Método Destrava" />
          <div><p className="vsl-eyebrow">Você pode conhecer com segurança</p><h2>Se você aplicar e não perceber resultado, seu investimento está <em>protegido.</em></h2><p className="vsl-copy">Você tem 30 dias a partir da compra para conhecer a jornada. Se colocar as orientações em prática e não perceber resultado, basta pedir o reembolso dentro desse prazo. O valor será devolvido sem questionamentos.</p><a className="vsl-cta" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section className="vsl-final-cta"><p className="vsl-eyebrow">Seu projeto não precisa esperar pela rotina perfeita</p><h2>Um dia fora do plano não precisa virar uma semana fora do caminho.</h2><a className="vsl-cta" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a></section>

      <section className="vsl-section">
        <div className="vsl-centered"><p className="vsl-eyebrow">Dúvidas frequentes</p><h2>Antes de <em>começar</em></h2></div>
        <div className="vsl-faq-grid">
          {faqs.map(([question, answer]) => (
            <details className="vsl-faq" key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <footer className="vsl-footer">
        <p className="vsl-serif vsl-footer-title">Destrava · Lizandra Soares</p>
        <p>Conteúdo informativo. O acompanhamento psicológico é individualizado e começa após avaliação e alinhamento profissional.</p>
        <small>© {new Date().getFullYear()} Casulli Espaço Terapêutico · Aracaju, Sergipe</small>
      </footer>
    </main>
  );
}
