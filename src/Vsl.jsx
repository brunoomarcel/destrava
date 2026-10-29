import React, { useEffect } from "react";
import expertImage from "../assets/expert-lizandra.jpg";
import guaranteeSeal from "../assets/selo-garantia-destrava.png";
import paymentMethods from "../assets/formas-pagamento-destrava.png";
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
      "section:not(.vsl-hero), footer, .vsl-benefit, .vsl-how-grid article, .vsl-card, .vsl-proof-grid > div, .vsl-intro > div, .vsl-offer-list li, .vsl-faq"
    )];
    revealNodes.forEach((node, index) => {
      node.classList.add("vsl-reveal");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    const zoomNodes = [...page.querySelectorAll(".vsl-portrait, .vsl-guarantee-seal, .vsl-offer-box")];
    zoomNodes.forEach((node) => node.classList.add("vsl-zoom"));

    const timeline = page.querySelector(".vsl-timeline");
    const timelineItems = timeline ? [...timeline.children] : [];
    timeline?.classList.add("vsl-timeline-animated");
    timelineItems.forEach((node, index) => {
      node.classList.add("vsl-timeline-step");
      node.style.setProperty("--step-delay", `${index * 160}ms`);
    });
    let timelineProgress = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target === timeline && !window.matchMedia("(max-width: 780px)").matches) timeline.style.setProperty("--timeline-progress", "1");
          const stepIndex = timelineItems.indexOf(entry.target);
          if (stepIndex >= 0 && window.matchMedia("(max-width: 780px)").matches) {
            timelineProgress = Math.max(timelineProgress, (stepIndex + 1) / timelineItems.length);
            timeline.style.setProperty("--timeline-progress", String(timelineProgress));
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px" });

    [...revealNodes, ...zoomNodes, ...(timeline ? [timeline] : []), ...timelineItems].forEach((node) => observer.observe(node));
    requestAnimationFrame(() => page.querySelector(".vsl-hero")?.classList.add("vsl-hero-enter"));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="vsl-page">
      <section id="top" className="vsl-hero">
        <div className="vsl-hero-inner">
            <h1>Elimine o ciclo de procrastinação e coloque o projeto que você está adiando em movimento</h1>
            <p className="vsl-hero-lead">Em 6 semanas, você vai entender o que trava sua ação, dar o próximo passo e aprender a retomar — sem culpa, perfeição ou motivação.</p>
            <a className="vsl-cta vsl-hero-buy" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a>
            <ul className="vsl-hero-points">
              <li>Criado por Lizandra Soares, psicóloga e neuropsicóloga com mais de 7 anos de atuação.</li>
              <li>Mais de 1.500 vidas impactadas na prática clínica.</li>
              <li>Mais de 1.200 pessoas no método Vencendo a Procrastinação.</li>
            </ul>
        </div>
      </section>
      <section className="vsl-section vsl-method-intro">
        <div className="vsl-centered">
          <h2>O que é o Método <em>Destrava?</em></h2>
          <p className="vsl-method-lead">Uma jornada guiada de 6 semanas para entender o que trava sua ação, colocar um projeto real em movimento e aprender a continuar mesmo quando a rotina sair do plano.</p>
        </div>
        <div className="vsl-method-grid">
          <article><span className="vsl-method-icon" aria-hidden="true">◉</span><strong>Entenda o que trava você</strong><p>Observe o ciclo de adiamento sem culpa e descubra o que acontece antes de você parar.</p></article>
          <article><span className="vsl-method-icon" aria-hidden="true">↗</span><strong>Aplique em um projeto real</strong><p>Transforme o aprendizado em passos concretos para algo importante que você quer colocar em movimento.</p></article>
          <article><span className="vsl-method-icon" aria-hidden="true">↻</span><strong>Aprenda a retomar</strong><p>Quando um imprevisto acontecer, ajuste o plano sem transformar uma pausa em desistência.</p></article>
        </div>
      </section>

      <section className="vsl-section vsl-benefits">
        <div className="vsl-centered"><p className="vsl-eyebrow">O que acontece dentro da jornada</p><h2>Conheça os primeiros passos para entender e superar a <em>procrastinação</em></h2></div>
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
        <div className="vsl-centered"><p className="vsl-eyebrow">Aprender e aplicar</p><h2>Como o Método Destrava funciona na <em>prática</em></h2></div>
        <div className="vsl-how-grid">
          <article><span>01</span><h3>Escolha seu Projeto-Roma</h3><p>Defina uma tarefa, decisão, conversa ou projeto que você quer colocar em movimento durante a jornada.</p></article>
          <article><span>02</span><h3>Fotografe onde você trava</h3><p>Observe o momento exato do adiamento e os pensamentos, emoções e ações que aparecem antes dele.</p></article>
          <article><span>03</span><h3>Reconfigure e implemente</h3><p>Troque a cobrança por perguntas práticas, escolha a menor ação concreta e avance por etapas.</p></article>
          <article><span>04</span><h3>Aprenda a retomar</h3><p>Use o Protocolo de Recuperação para ajustar o plano quando um imprevisto interromper seu ritmo.</p></article>
        </div>
      </section>

      <section className="vsl-schedule vsl-section">
        <div className="vsl-centered"><p className="vsl-eyebrow">Cronograma da jornada</p><h2>O que você vai aprender e colocar em prática em cada <em>etapa</em></h2></div>
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
            <h2>Por que você adia até aquilo que é importante para <em>você?</em></h2>
            <p className="vsl-copy">Você não está fugindo do trabalho. Talvez esteja fugindo do desconforto.</p>
          </div>
          <div>
            <p className="vsl-copy">Sabe aquele projeto, conversa ou decisão importante que você vem adiando? Às vezes, ele envolve se expor, fazer uma escolha ou lidar com a possibilidade de algo não sair como você espera. E isso pode trazer desconforto.</p>
            <p className="vsl-copy">Adiar traz alívio por alguns minutos. Mas a pendência continua lá, o prazo se aproxima e a culpa aparece. O Método Destrava começa ajudando você a reconhecer esse ciclo para aprender a agir de outra forma.</p>
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
            <h2>Conheça Lizandra Soares, a neuropsicóloga por trás do <em>Destrava</em></h2>
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
        <div className="vsl-centered"><p className="vsl-eyebrow">Experiência que sustenta o método</p><h2>A experiência que deu origem ao Método <em>Destrava</em></h2><p className="vsl-proof-lead">O Destrava foi construído a partir da prática clínica, do estudo do funcionamento da mente e da experiência de acompanhar pessoas diante de projetos e decisões importantes.</p></div>
        <div className="vsl-proof-grid">
          <div><strong>7+</strong><span>anos de atuação</span></div>
          <div><strong>1.500+</strong><span>vidas impactadas na clínica</span></div>
          <div><strong>1.200+</strong><span>pessoas no método Vencendo a Procrastinação</span></div>
        </div>
        <p className="vsl-proof-note">Lizandra Soares · Neuropsicóloga e fundadora do Espaço Casulli</p>
      </section>

      <section id="oferta" className="vsl-offer vsl-section">
        <p className="vsl-eyebrow">Primeira turma</p>
        <h2>Não deixe seu projeto para depois — <em>comece agora</em></h2>
        <div id="checkout" className="vsl-offer-box">
          <h3>6 semanas de acompanhamento para colocar um projeto real em movimento</h3>
          <p className="vsl-offer-intro">Você recebe aulas, acompanhamento e protocolos práticos para entender o que trava sua ação, começar com mais clareza e aprender a retomar sem culpa.</p>
          <ul className="vsl-offer-list"><li>Movimento 1: Fotografar</li><li>Movimento 2: Entender</li><li>Movimento 3: Reconfigurar</li><li>Movimento 4: Implementar</li><li>Movimento 5: Expandir</li><li>Projeto-Roma para aplicação prática</li><li>Protocolo de Decisão e Protocolo de Recuperação</li></ul>
          <p className="vsl-price-anchor"><s>De R$ 1.800</s> por apenas</p>
          <div className="vsl-price"><strong><small>12x de</small> R$ 51,40</strong><span>R$ 497 à vista</span></div>
          <a className="vsl-cta" href="https://pay.hotmart.com/Q108052512F?checkoutMode=10">QUERO DESTRAVAR <span aria-hidden="true">→</span></a>
          <div className="vsl-payment-methods">
            <img src={paymentMethods} alt="Pix e bandeiras de cartão aceitas no checkout" />
            <p>Pagamento seguro via Pix ou cartão de crédito</p>
          </div>
          <p className="vsl-guarantee">Garantia de 30 dias. Se aplicar as orientações e não perceber resultado, você pode pedir o reembolso dentro do prazo.</p>
        </div>
      </section>

      <section className="vsl-guarantee-section vsl-section">
        <div className="vsl-guarantee-card">
          <img className="vsl-guarantee-seal" src={guaranteeSeal} alt="Garantia de 30 dias do Método Destrava" />
          <div><p className="vsl-eyebrow">Você pode conhecer com segurança</p><h2>Conheça a garantia de <em>30 dias</em> do Destrava</h2><p className="vsl-copy">Você tem 30 dias a partir da compra para conhecer a jornada. Se colocar as orientações em prática e não perceber resultado, basta pedir o reembolso dentro desse prazo. O valor será devolvido sem questionamentos.</p><a className="vsl-cta" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section className="vsl-final-cta"><p className="vsl-eyebrow">Seu projeto não precisa esperar pela rotina perfeita</p><h2>Um dia fora do plano não precisa virar uma semana fora do caminho.</h2><a className="vsl-cta" href={checkoutUrl}>QUERO DESTRAVAR <span aria-hidden="true">→</span></a></section>

      <section className="vsl-section">
        <div className="vsl-centered"><p className="vsl-eyebrow">Antes de começar</p><h2>Dúvidas frequentes sobre o Método <em>Destrava</em></h2></div>
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
