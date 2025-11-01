const FILE_STORAGE_KEY = "code-webeditor-project-files";
const ACTIVE_FILE_STORAGE_KEY = "code-webeditor-active-file";
const TEMPLATE_STORAGE_KEY = "code-webeditor-template";
const NO_FILE_PLACEHOLDER = "Erstelle über das + eine neue Datei, um zu starten.";

const DEFAULT_SNIPPETS = {
  html: `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Neues Dokument</title>
  </head>
  <body>
    <main>
      <h1>Neues Dokument</h1>
      <p>Starte hier mit deinem HTML-Inhalt.</p>
    </main>
  </body>
</html>
`,
  css: "/* Neue CSS-Datei */\n",
  js: "// Neue JavaScript-Datei\n",
  json: "{}\n",
  txt: "",
};

const EXAMPLE_PROJECT = {
  "index.html": `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Brightside Studio</title>
  </head>
  <body class="page" data-theme="dark" data-page="home">
    <header class="hero" id="top">
      <nav class="hero__nav">
        <span class="hero__logo">Brightside</span>
        <ul class="hero__links">
          <li><a data-nav="home" href="index.html">Start</a></li>
          <li><a data-nav="services" href="services.html">Leistungen</a></li>
          <li><a data-nav="cases" href="cases.html">Cases</a></li>
          <li><a data-nav="team" href="team.html">Team</a></li>
        </ul>
        <div class="hero__actions">
          <button class="button button--ghost" data-theme-toggle type="button">
            Modus wechseln
          </button>
          <button class="button button--primary" data-open-brief type="button">
            Projekt starten
          </button>
        </div>
      </nav>
      <div class="hero__content">
        <div class="hero__copy">
          <span class="hero__eyebrow">Design · Strategie · Tech</span>
          <h1>Digitale Produkte, die Menschen lieben</h1>
          <p>
            Wir kombinieren Design Sprints mit präziser Umsetzung und helfen Marken dabei,
            Ideen schneller in erstklassige Erlebnisse zu verwandeln.
          </p>
          <div class="hero__buttons">
            <button class="button button--primary" data-open-brief type="button">
              Kostenloses Briefing anfragen
            </button>
            <button class="button button--ghost" data-theme-toggle type="button">
              Theme umschalten
            </button>
          </div>
          <dl class="hero__stats">
            <div>
              <dt>Launches</dt>
              <dd data-count-to="48">0</dd>
            </div>
            <div>
              <dt>zufriedene Kunden</dt>
              <dd data-count-to="92">0</dd>
            </div>
            <div>
              <dt>Teamgröße</dt>
              <dd data-count-to="24">0</dd>
            </div>
          </dl>
        </div>
        <div class="hero__visual">
          <div class="orbit">
            <span>Brand Sprint</span>
            <span>UX Audit</span>
            <span>Growth Loop</span>
            <span>MVP Launch</span>
          </div>
        </div>
      </div>
    </header>
    <section id="services" class="section services">
      <div class="section__header">
        <span class="section__eyebrow">Leistungen</span>
        <h2>Mit welchem Baustein starten wir?</h2>
        <p>Modulare Pakete, die sich nahtlos zu deinem Produktplan zusammensetzen lassen.</p>
      </div>
      <div class="services__grid">
        <article class="service-card">
          <h3>Product Discovery</h3>
          <p>Hypothesen validieren, Roadmaps schärfen und den Fokus auf echte Nutzerbedürfnisse legen.</p>
          <ul>
            <li>Research Sprints</li>
            <li>Journey Mapping</li>
            <li>Opportunity Sizing</li>
          </ul>
        </article>
        <article class="service-card">
          <h3>Experience Design</h3>
          <p>Vom UX-Flow bis zum finalen UI-System: alles aus einer Hand, iterativ und testbasiert.</p>
          <ul>
            <li>Prototyping</li>
            <li>Design Systems</li>
            <li>Accessibility Audits</li>
          </ul>
        </article>
        <article class="service-card">
          <h3>Launch & Growth</h3>
          <p>Wir liefern stabile MVPs, messen Erfolg und bauen datengetriebene Wachstums-Loops.</p>
          <ul>
            <li>Tech Enablement</li>
            <li>Performance Tracking</li>
            <li>Growth Experiments</li>
          </ul>
        </article>
      </div>
    </section>
    <section id="cases" class="section cases">
      <div class="section__header">
        <span class="section__eyebrow">Cases</span>
        <h2>Ein Blick in aktuelle Projekte</h2>
        <div class="cases__filters">
          <button class="chip is-active" data-filter="all" type="button">Alle</button>
          <button class="chip" data-filter="brand" type="button">Brand</button>
          <button class="chip" data-filter="product" type="button">Product</button>
          <button class="chip" data-filter="growth" type="button">Growth</button>
        </div>
      </div>
      <div class="cases__grid">
        <article class="work-card" data-case="brand">
          <span class="work-card__tag">Brand Refresh</span>
          <h3>Northern Lights</h3>
          <p>Neue Markenwelt für einen nachhaltigen Energy-Drink inkl. multisensorischer Kampagne.</p>
        </article>
        <article class="work-card" data-case="product">
          <span class="work-card__tag">App Experience</span>
          <h3>Wave Mobility</h3>
          <p>E-Scooter Plattform mit proaktiven Routen-Empfehlungen und Loyalty-Layer.</p>
        </article>
        <article class="work-card" data-case="growth">
          <span class="work-card__tag">Growth Loop</span>
          <h3>Fresco Delivery</h3>
          <p>Experiment-getriebene Kampagnen, die den CAC in acht Wochen halbierten.</p>
        </article>
        <article class="work-card" data-case="product">
          <span class="work-card__tag">SaaS Dashboard</span>
          <h3>Pulse Finance</h3>
          <p>Datenvisualisierung mit modularer Architektur und Dark-Mode-by-default.</p>
        </article>
      </div>
    </section>
    <section id="team" class="section highlight">
      <div class="highlight__media"></div>
      <div class="highlight__content">
        <span class="section__eyebrow">Team</span>
        <h2>Strategen, Designer und Engineers unter einem Dach</h2>
        <p>
          Wir arbeiten in integrierten Crews und bringen Branding, Experience Design und Entwicklung an einen Tisch.
          Jedes Projekt erhält ein dediziertes Kernteam mit direkten Entscheidungswegen.
        </p>
        <ul class="highlight__list">
          <li>30+ zertifizierte Design-Sprint-Facilitators</li>
          <li>Eigene Research-Community mit 2.000 Testpersonen</li>
          <li>Engineering-Gilde für Frontend, Backend und QA</li>
        </ul>
      </div>
    </section>
    <section class="section testimonials">
      <div class="section__header">
        <span class="section__eyebrow">Feedback</span>
        <h2>Was unsere Partner sagen</h2>
      </div>
      <div class="testimonials__grid">
        <figure>
          <blockquote>„Die Geschwindigkeit und Qualität sind außergewöhnlich. Unser MVP ging in 10 Wochen live.“</blockquote>
          <figcaption>— Sofia Kramer, CPO bei Wave Mobility</figcaption>
        </figure>
        <figure>
          <blockquote>„Brightside hat unser verteiltes Team hinter einer klaren Produktvision vereint.“</blockquote>
          <figcaption>— Rahul Singh, Gründer von Pulse Finance</figcaption>
        </figure>
      </div>
    </section>
    <section class="section newsletter">
      <div class="newsletter__card">
        <div>
          <span class="section__eyebrow">Insights</span>
          <h2>Neues aus dem Studio</h2>
          <p>Einmal im Monat: Taktiken, Templates und Growth-Experimente direkt in dein Postfach.</p>
        </div>
        <form class="newsletter__form">
          <label>
            <span class="visually-hidden">E-Mail-Adresse</span>
            <input type="email" name="email" placeholder="hallo@unternehmen.de" required />
          </label>
          <button class="button button--primary" type="submit">Abonnieren</button>
        </form>
      </div>
    </section>
    <footer class="site-footer">
      <p>&copy; <span data-year></span> Brightside Studio · Gemeinsam in 6 Wochen von der Idee zum Launch.</p>
    </footer>
    <aside id="brief" class="brief-panel" data-brief-panel aria-hidden="true">
      <div class="brief-panel__card">
        <button class="brief-panel__close" data-brief-close type="button" aria-label="Dialog schließen">×</button>
        <h3>Projekt-Quickbrief</h3>
        <p>Erzähl uns in drei Fragen, worum es geht. Wir melden uns innerhalb eines Tages.</p>
        <form class="brief-form" data-brief-form>
          <label>
            Projektname
            <input name="project" required />
          </label>
          <label>
            Ziel
            <select name="goal" required>
              <option value="">Bitte wählen</option>
              <option>Produktidee validieren</option>
              <option>Produkt skalieren</option>
              <option>Brand erneuern</option>
              <option>Team erweitern</option>
            </select>
          </label>
          <label>
            Budget-Rahmen
            <div class="brief-form__choices">
              <label><input type="radio" name="budget" value="25k" required /> 25.000 €</label>
              <label><input type="radio" name="budget" value="50k" /> 50.000 €</label>
              <label><input type="radio" name="budget" value="custom" /> individuelles Angebot</label>
            </div>
          </label>
          <button class="button button--primary" type="submit">Briefing senden</button>
        </form>
      </div>
    </aside>
    <div class="brief-backdrop" data-brief-backdrop aria-hidden="true"></div>
  </body>
</html>
`,
  "services.html": `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Brightside Studio · Leistungen</title>
  </head>
  <body class="page" data-theme="dark" data-page="services">
    <header class="hero hero--subpage">
      <nav class="hero__nav">
        <span class="hero__logo">Brightside</span>
        <ul class="hero__links">
          <li><a data-nav="home" href="index.html">Start</a></li>
          <li><a data-nav="services" href="services.html">Leistungen</a></li>
          <li><a data-nav="cases" href="cases.html">Cases</a></li>
          <li><a data-nav="team" href="team.html">Team</a></li>
        </ul>
        <div class="hero__actions">
          <button class="button button--ghost" data-theme-toggle type="button">
            Modus wechseln
          </button>
          <button class="button button--primary" data-open-brief type="button">
            Projekt starten
          </button>
        </div>
      </nav>
      <div class="hero__content subpage-intro">
        <div class="hero__copy">
          <span class="hero__eyebrow">Service Pakete</span>
          <h1>Von der Idee zum skalierbaren Produkt</h1>
          <p>
            Wähle aus kuratierten Modulen oder kombiniere sie zu einem individuellen Projektfahrplan.
          </p>
        </div>
      </div>
    </header>
    <main class="subpage-main">
      <section class="section services services--detail">
        <div class="section__header">
          <span class="section__eyebrow">Packages</span>
          <h2>Drei Wege zum Produktstart</h2>
        </div>
        <div class="services__grid">
          <article class="service-card service-card--highlight">
            <h3>Discovery Sprint</h3>
            <p>In zehn Tagen zu validierten Hypothesen, klickbarem Prototyp und klarer Roadmap.</p>
            <ul>
              <li>Research & Opportunity Mapping</li>
              <li>Prototyping & Remote Testing</li>
              <li>Priorisierte Produktstrategie</li>
            </ul>
            <footer>ab 18.000 € · 2 Wochen</footer>
          </article>
          <article class="service-card">
            <h3>Experience Lab</h3>
            <p>Vertiefte UX/UI-Ausarbeitung inkl. Design System und Übergabe an Engineering.</p>
            <ul>
              <li>UX-Flows & Content Strategy</li>
              <li>Visual Language & Design Tokens</li>
              <li>Accessibility Review</li>
            </ul>
            <footer>ab 32.000 € · 4 Wochen</footer>
          </article>
          <article class="service-card">
            <h3>Launch Companion</h3>
            <p>Implementierung, QA und Growth-Basis für Beta-Launch & Live-Gang.</p>
            <ul>
              <li>Frontend & Backend Enablement</li>
              <li>Experiment-Setup & Tracking</li>
              <li>Lifecycle Automations</li>
            </ul>
            <footer>ab 45.000 € · 6 Wochen</footer>
          </article>
        </div>
      </section>
      <section class="section process">
        <div class="section__header">
          <span class="section__eyebrow">Arbeitsweise</span>
          <h2>Schlanke Schritte, klare Verantwortlichkeiten</h2>
        </div>
        <ol class="process__steps">
          <li>
            <h3>1 · Alignment</h3>
            <p>Kick-off Workshop, Zieldefinition und Setup gemeinsamer Workspaces.</p>
          </li>
          <li>
            <h3>2 · Build</h3>
            <p>Interdisziplinäre Crews arbeiten in 2-Wochen-Zyklen mit wöchentlichen Reviews.</p>
          </li>
          <li>
            <h3>3 · Launch</h3>
            <p>QA, Beta-Release, KPI-Tracking und Übergabe an Growth-Team / Produktorganisation.</p>
          </li>
        </ol>
      </section>
      <section class="section cta">
        <div class="cta__card">
          <div>
            <h2>Starte mit einem kostenlosen Discovery Call</h2>
            <p>Wir zeigen dir ähnliche Projekte, Tools und greifen deine KPI-Challenges auf.</p>
          </div>
          <button class="button button--primary" data-open-brief type="button">Termin vereinbaren</button>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <p>&copy; <span data-year></span> Brightside Studio</p>
    </footer>
    <aside class="brief-panel" data-brief-panel aria-hidden="true">
      <div class="brief-panel__card">
        <button class="brief-panel__close" data-brief-close type="button" aria-label="Dialog schließen">×</button>
        <h3>Projekt-Quickbrief</h3>
        <form class="brief-form" data-brief-form>
          <label>Projektname<input name="project" required /></label>
          <label>Ziel<select name="goal" required><option value="">Bitte wählen</option><option>Produktidee validieren</option><option>Produkt skalieren</option><option>Brand erneuern</option><option>Team erweitern</option></select></label>
          <div class="brief-form__choices">
            <label><input type="radio" name="budget" value="25k" required /> 25.000 €</label>
            <label><input type="radio" name="budget" value="50k" /> 50.000 €</label>
            <label><input type="radio" name="budget" value="custom" /> individuelles Angebot</label>
          </div>
          <button class="button button--primary" type="submit">Briefing senden</button>
        </form>
      </div>
    </aside>
    <div class="brief-backdrop" data-brief-backdrop aria-hidden="true"></div>
  </body>
</html>
`,
  "cases.html": `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Brightside Studio · Cases</title>
  </head>
  <body class="page" data-theme="dark" data-page="cases">
    <header class="hero hero--subpage">
      <nav class="hero__nav">
        <span class="hero__logo">Brightside</span>
        <ul class="hero__links">
          <li><a data-nav="home" href="index.html">Start</a></li>
          <li><a data-nav="services" href="services.html">Leistungen</a></li>
          <li><a data-nav="cases" href="cases.html">Cases</a></li>
          <li><a data-nav="team" href="team.html">Team</a></li>
        </ul>
        <div class="hero__actions">
          <button class="button button--ghost" data-theme-toggle type="button">
            Modus wechseln
          </button>
          <button class="button button--primary" data-open-brief type="button">
            Projekt starten
          </button>
        </div>
      </nav>
      <div class="hero__content subpage-intro">
        <div class="hero__copy">
          <span class="hero__eyebrow">Case Library</span>
          <h1>Wachstum, das wir gemeinsam geschaffen haben</h1>
          <p>Eine Auswahl an Projekten aus den Bereichen Branding, Product und Growth.</p>
        </div>
      </div>
    </header>
    <main class="subpage-main">
      <section class="section cases">
        <div class="case-gallery">
          <article class="case-tile case-tile--brand">
            <header>Cosmic Roastery</header>
            <p>End-to-End Rebranding & Packaging Experience mit AR-basiertem Produktlaunch.</p>
          </article>
          <article class="case-tile case-tile--product">
            <header>Mint Health</header>
            <p>Telemedizin-Plattform mit personalisierter Therapieplanung und Care-Coach.</p>
          </article>
          <article class="case-tile case-tile--growth">
            <header>Sunny Solar</header>
            <p>Growth Engine & Referral-Programm, das die Abschlussquote verdoppelt hat.</p>
          </article>
          <article class="case-tile case-tile--product">
            <header>Atlas Freight</header>
            <p>Logistik-Dashboard für Flottenanalysen mit Simulationen in Echtzeit.</p>
          </article>
        </div>
      </section>
      <section class="section metrics">
        <div class="section__header">
          <span class="section__eyebrow">Impact</span>
          <h2>Messbare Ergebnisse</h2>
        </div>
        <dl class="metrics__grid">
          <div>
            <dt>+218%</dt>
            <dd>höhere Aktivierungsrate nach UX-Redesign</dd>
          </div>
          <div>
            <dt>8 Wochen</dt>
            <dd>Durchschnittliche Zeit bis zum MVP Launch</dd>
          </div>
          <div>
            <dt>3,8x</dt>
            <dd>Return on Design Invest für Growth-Programme</dd>
          </div>
        </dl>
      </section>
      <section class="section timeline">
        <div class="section__header">
          <span class="section__eyebrow">Ablauf</span>
          <h2>So läuft ein Projekt mit uns ab</h2>
        </div>
        <div class="timeline__grid">
          <article>
            <h3>Kick-off & Value Mapping</h3>
            <p>In 48 Stunden identifizieren wir Chancenfelder und definieren Kern-KPIs.</p>
          </article>
          <article>
            <h3>Build Sprints</h3>
            <p>Cross-funktionale Squads arbeiten fokussiert in zweiwöchigen Iterationen.</p>
          </article>
          <article>
            <h3>Launch & Growth</h3>
            <p>Rollout mit QA, Tracking-Setup und datengetriebenen Experiments.</p>
          </article>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <p>&copy; <span data-year></span> Brightside Studio</p>
    </footer>
    <aside class="brief-panel" data-brief-panel aria-hidden="true">
      <div class="brief-panel__card">
        <button class="brief-panel__close" data-brief-close type="button" aria-label="Dialog schließen">×</button>
        <h3>Projekt-Quickbrief</h3>
        <form class="brief-form" data-brief-form>
          <label>Projektname<input name="project" required /></label>
          <label>Ziel<select name="goal" required><option value="">Bitte wählen</option><option>Produktidee validieren</option><option>Produkt skalieren</option><option>Brand erneuern</option><option>Team erweitern</option></select></label>
          <div class="brief-form__choices">
            <label><input type="radio" name="budget" value="25k" required /> 25.000 €</label>
            <label><input type="radio" name="budget" value="50k" /> 50.000 €</label>
            <label><input type="radio" name="budget" value="custom" /> individuelles Angebot</label>
          </div>
          <button class="button button--primary" type="submit">Briefing senden</button>
        </form>
      </div>
    </aside>
    <div class="brief-backdrop" data-brief-backdrop aria-hidden="true"></div>
  </body>
</html>
`,
  "team.html": `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Brightside Studio · Team</title>
  </head>
  <body class="page" data-theme="dark" data-page="team">
    <header class="hero hero--subpage">
      <nav class="hero__nav">
        <span class="hero__logo">Brightside</span>
        <ul class="hero__links">
          <li><a data-nav="home" href="index.html">Start</a></li>
          <li><a data-nav="services" href="services.html">Leistungen</a></li>
          <li><a data-nav="cases" href="cases.html">Cases</a></li>
          <li><a data-nav="team" href="team.html">Team</a></li>
        </ul>
        <div class="hero__actions">
          <button class="button button--ghost" data-theme-toggle type="button">
            Modus wechseln
          </button>
          <button class="button button--primary" data-open-brief type="button">
            Projekt starten
          </button>
        </div>
      </nav>
      <div class="hero__content subpage-intro">
        <div class="hero__copy">
          <span class="hero__eyebrow">People & Culture</span>
          <h1>Ein Team aus hybriden Talenten</h1>
          <p>Strategen, Researchers, Designer und Engineers arbeiten in flexiblen Crews zusammen.</p>
        </div>
      </div>
    </header>
    <main class="subpage-main">
      <section class="section team">
        <div class="section__header">
          <span class="section__eyebrow">Teamstruktur</span>
          <h2>Kleine Squads mit großer Wirkung</h2>
        </div>
        <div class="team-grid">
          <article class="team-member">
            <h3>Strategy Crew</h3>
            <p>Research, KPIs, Positionierung und Opportunity Mapping.</p>
            <ul>
              <li>Product Strategists</li>
              <li>User Researchers</li>
              <li>Brand Strategists</li>
            </ul>
          </article>
          <article class="team-member">
            <h3>Design Crew</h3>
            <p>Experience-, Interface- und Motion-Design mit System.</p>
            <ul>
              <li>UX & UI Designer</li>
              <li>Design System Engineers</li>
              <li>Motion Specialists</li>
            </ul>
          </article>
          <article class="team-member">
            <h3>Build Crew</h3>
            <p>Frontend, Backend und QA arbeiten eng mit Growth zusammen.</p>
            <ul>
              <li>Fullstack Engineers</li>
              <li>Platform Engineers</li>
              <li>QA & Automation Experts</li>
            </ul>
          </article>
        </div>
      </section>
      <section class="section culture">
        <div class="section__header">
          <span class="section__eyebrow">Culture</span>
          <h2>Unsere Prinzipien</h2>
        </div>
        <ul class="culture__list">
          <li>
            <h3>Transparenz</h3>
            <p>Wöchentliche Open Reviews mit Stakeholdern auf Kundenseite.</p>
          </li>
          <li>
            <h3>Experimentieren</h3>
            <p>Rapid Prototyping verbunden mit echten Nutzertests.</p>
          </li>
          <li>
            <h3>Enablement</h3>
            <p>Wir befähigen Teams, nach dem Projekt eigenständig weiterzuarbeiten.</p>
          </li>
        </ul>
      </section>
      <section class="section cta">
        <div class="cta__card">
          <div>
            <h2>Werde Teil unserer Crew</h2>
            <p>Wir wachsen kontinuierlich und freuen uns über neue Perspektiven.</p>
          </div>
          <a class="button button--primary" href="mailto:talent@brightside.studio">Initiativ bewerben</a>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <p>&copy; <span data-year></span> Brightside Studio</p>
    </footer>
    <aside class="brief-panel" data-brief-panel aria-hidden="true">
      <div class="brief-panel__card">
        <button class="brief-panel__close" data-brief-close type="button" aria-label="Dialog schließen">×</button>
        <h3>Projekt-Quickbrief</h3>
        <form class="brief-form" data-brief-form>
          <label>Projektname<input name="project" required /></label>
          <label>Ziel<select name="goal" required><option value="">Bitte wählen</option><option>Produktidee validieren</option><option>Produkt skalieren</option><option>Brand erneuern</option><option>Team erweitern</option></select></label>
          <div class="brief-form__choices">
            <label><input type="radio" name="budget" value="25k" required /> 25.000 €</label>
            <label><input type="radio" name="budget" value="50k" /> 50.000 €</label>
            <label><input type="radio" name="budget" value="custom" /> individuelles Angebot</label>
          </div>
          <button class="button button--primary" type="submit">Briefing senden</button>
        </form>
      </div>
    </aside>
    <div class="brief-backdrop" data-brief-backdrop aria-hidden="true"></div>
  </body>
</html>
`,
  "styles.css": `:root {
  color-scheme: dark;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --bg: #020617;
  --surface: rgba(6, 14, 32, 0.78);
  --surface-strong: rgba(10, 16, 32, 0.92);
  --border: rgba(148, 163, 184, 0.16);
  --primary: #60a5fa;
  --primary-strong: #3b82f6;
  --accent: #f9a8d4;
  --text: #f8fafc;
  --muted: #94a3b8;
}

.page {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at 12% 16%, rgba(96, 165, 250, 0.35), transparent 55%),
    radial-gradient(circle at 88% 8%, rgba(248, 113, 113, 0.28), transparent 55%),
    linear-gradient(180deg, rgba(8, 11, 25, 0.95), #020617 70%);
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 5rem;
}

.page[data-theme="light"] {
  --bg: #f8fafc;
  --surface: rgba(255, 255, 255, 0.9);
  --surface-strong: rgba(255, 255, 255, 0.96);
  --border: rgba(15, 23, 42, 0.12);
  --primary: #2563eb;
  --primary-strong: #1d4ed8;
  --accent: #ec4899;
  --text: #0f172a;
  --muted: #475569;
  background: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.18), transparent 55%),
    radial-gradient(circle at 90% 15%, rgba(236, 72, 153, 0.22), transparent 60%),
    linear-gradient(180deg, #f8fafc, #e2e8f0 70%);
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li,
dl,
dt,
dd {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  letter-spacing: -0.01em;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

button,
a.button {
  font-family: inherit;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 14px;
  border: 1px solid transparent;
  padding: 0.75rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button--primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: #0b1120;
  box-shadow: 0 18px 40px rgba(96, 165, 250, 0.3);
}

.button--ghost {
  background: transparent;
  border-color: var(--border);
  color: var(--text);
}

.button:hover {
  transform: translateY(-1px);
}

.hero {
  padding: 3.5rem clamp(1.5rem, 5vw, 4rem) 2.5rem;
  display: grid;
  gap: 3rem;
}

.hero--subpage {
  gap: 2.4rem;
}

.hero__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1rem, 3vw, 3rem);
}

.hero__logo {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero__links {
  display: flex;
  gap: 1.4rem;
  font-weight: 500;
}

.hero__links a {
  position: relative;
  padding-bottom: 0.2rem;
  color: var(--muted);
}

.hero__links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease, background 0.25s ease;
}

.hero__links a:hover::after,
.hero__links a.is-current::after {
  transform: scaleX(1);
}

.hero__links a.is-current {
  color: var(--text);
}

.hero__actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.hero__content {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: center;
}

.subpage-intro {
  grid-template-columns: minmax(260px, 520px);
}

.hero__eyebrow {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  color: var(--accent);
}

.hero__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.4rem 0 0;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.2rem;
  margin: 2.5rem 0 0;
}

.hero__stats dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--muted);
}

.hero__stats dd {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.35rem 0 0;
}

.hero__visual {
  justify-self: center;
}

.orbit {
  width: clamp(220px, 24vw, 320px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px dashed rgba(148, 163, 184, 0.3);
  display: grid;
  place-items: center;
  position: relative;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.18), transparent 60%);
}

.orbit span {
  position: absolute;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(9, 16, 32, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 18px 45px rgba(2, 6, 23, 0.42);
  font-size: 0.85rem;
}

.orbit span:nth-child(1) { top: 8%; left: 52%; transform: translate(-50%, 0); }
.orbit span:nth-child(2) { bottom: 12%; left: 18%; }
.orbit span:nth-child(3) { top: 46%; right: -4%; transform: translate(0, -50%); }
.orbit span:nth-child(4) { bottom: 10%; right: 16%; }

.section {
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  display: grid;
  gap: 2rem;
}

.section__header {
  display: grid;
  gap: 0.7rem;
  max-width: 700px;
}

.section__eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--muted);
}

.services__grid,
.cases__grid,
.testimonials__grid,
.team-grid {
  display: grid;
  gap: 1.5rem;
}

.services__grid {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.service-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.8rem;
  display: grid;
  gap: 1rem;
  box-shadow: 0 24px 50px rgba(2, 6, 23, 0.28);
}

.service-card footer {
  margin-top: 0.6rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.service-card ul {
  margin: 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.35rem;
}

.service-card--highlight {
  background: var(--surface-strong);
  border-color: rgba(96, 165, 250, 0.35);
}

.cases__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip {
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  padding: 0.35rem 0.9rem;
  font-size: 0.85rem;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip.is-active,
.chip:hover {
  color: var(--text);
  border-color: rgba(96, 165, 250, 0.6);
  background: rgba(96, 165, 250, 0.12);
}

.cases__grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.work-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.6rem;
  display: grid;
  gap: 0.8rem;
  min-height: 180px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.work-card__tag {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 40px rgba(2, 6, 23, 0.25);
}

.highlight {
  background: var(--surface-strong);
  border-radius: 24px;
  border: 1px solid var(--border);
  padding: clamp(1.5rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
  align-items: center;
}

.highlight__media {
  min-height: 220px;
  border-radius: 20px;
  background: radial-gradient(circle at 30% 20%, rgba(96, 165, 250, 0.35), transparent 55%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.45), rgba(236, 72, 153, 0.45));
}

.highlight__list {
  margin: 1.4rem 0 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.4rem;
}

.testimonials__grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.testimonials blockquote {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
}

.newsletter__card {
  background: var(--surface-strong);
  border-radius: 22px;
  border: 1px solid var(--border);
  padding: clamp(1.8rem, 4vw, 2.6rem);
  display: grid;
  gap: 1.6rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.newsletter__form {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.newsletter__form input {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  min-width: clamp(200px, 30vw, 260px);
  color: inherit;
}

.team-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.team-member {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.8rem;
  display: grid;
  gap: 0.8rem;
}

.team-member ul {
  padding-left: 1.1rem;
  display: grid;
  gap: 0.3rem;
}

.culture__list {
  display: grid;
  gap: 1rem;
}

.culture__list li {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.5rem;
}

.case-gallery {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.case-tile {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.8rem;
  display: grid;
  gap: 0.6rem;
  min-height: 180px;
  box-shadow: 0 22px 45px rgba(2, 6, 23, 0.28);
}

.case-tile header {
  font-weight: 600;
  font-size: 1.05rem;
}

.case-tile--brand { border-color: rgba(249, 168, 212, 0.35); }
.case-tile--product { border-color: rgba(96, 165, 250, 0.35); }
.case-tile--growth { border-color: rgba(74, 222, 128, 0.35); }

.metrics__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
}

.metrics__grid dt {
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.timeline__grid {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.timeline__grid article {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.6rem;
  min-height: 150px;
  display: grid;
  gap: 0.6rem;
}

.process__steps {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  counter-reset: step;
}

.process__steps li {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.6rem;
  display: grid;
  gap: 0.6rem;
}

.cta__card {
  background: var(--surface-strong);
  border-radius: 22px;
  border: 1px solid var(--border);
  padding: clamp(1.6rem, 4vw, 2.4rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
}

.site-footer {
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  color: var(--muted);
  font-size: 0.9rem;
}

.brief-panel,
.brief-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.brief-backdrop {
  background: rgba(2, 6, 23, 0.6);
  backdrop-filter: blur(14px);
}

.brief-panel__card {
  position: absolute;
  right: clamp(1rem, 6vw, 4rem);
  bottom: clamp(1rem, 6vw, 4rem);
  background: var(--surface-strong);
  border-radius: 22px;
  border: 1px solid var(--border);
  padding: clamp(1.5rem, 4vw, 2.4rem);
  width: min(420px, 92vw);
  box-shadow: 0 28px 80px rgba(2, 6, 23, 0.45);
  display: grid;
  gap: 1.2rem;
}

.brief-panel.is-open,
.brief-backdrop.is-open {
  pointer-events: all;
  opacity: 1;
}

.brief-panel__close {
  position: absolute;
  top: 0.8rem;
  right: 0.9rem;
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 1.8rem;
  cursor: pointer;
}

.brief-form {
  display: grid;
  gap: 1rem;
}

.brief-form label {
  display: grid;
  gap: 0.45rem;
  font-size: 0.9rem;
}

.brief-form input,
.brief-form select {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  color: inherit;
}

.brief-form__choices {
  display: grid;
  gap: 0.35rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.subpage-main {
  display: grid;
  gap: 3rem;
}

@media (max-width: 900px) {
  .hero__nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero__actions {
    width: 100%;
    justify-content: space-between;
  }

  .hero__buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .newsletter__form {
    flex-direction: column;
  }

  .brief-panel__card {
    right: 50%;
    transform: translateX(50%);
    bottom: clamp(1rem, 6vw, 2rem);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 2.5rem 1.5rem 2rem;
  }

  .orbit span {
    font-size: 0.75rem;
  }
}
`,
  "script.js": `document.addEventListener("DOMContentLoaded", () => {
  const page = document.body;
  const themeToggles = document.querySelectorAll('[data-theme-toggle]');
  const navLinks = document.querySelectorAll('[data-nav]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const caseCards = document.querySelectorAll('[data-case]');
  const counters = document.querySelectorAll('[data-count-to]');
  const briefPanel = document.querySelector('[data-brief-panel]');
  const briefBackdrop = document.querySelector('[data-brief-backdrop]');
  const briefOpeners = document.querySelectorAll('[data-open-brief]');
  const briefCloser = document.querySelector('[data-brief-close]');
  const briefForm = document.querySelector('[data-brief-form]');
  const newsletterForm = document.querySelector('.newsletter__form');
  const currentPage = page?.dataset?.page || 'home';

  const applyTheme = (mode) => {
    page.dataset.theme = mode;
  };

  const toggleTheme = () => {
    const next = page.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  themeToggles.forEach((btn) => btn.addEventListener('click', toggleTheme));

  navLinks.forEach((link) => {
    const isCurrent = link.dataset.nav === currentPage;
    link.classList.toggle('is-current', isCurrent);
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const anchor = event.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;
    if (/\\.html($|[?#])/i.test(href)) {
      event.preventDefault();
      const normalized = href.replace(/^\\.\\//, '');
      window.parent.postMessage(
        { source: 'webeditor-preview', action: 'navigate', file: normalized },
        '*'
      );
    }
  });

  if (currentPage === 'home') {
    const animateCounters = () => {
      counters.forEach((counter) => {
        const target = Number(counter.dataset.countTo || 0);
        let frame = 0;
        const duration = 48;
        const step = () => {
          frame += 1;
          const progress = Math.min(frame / duration, 1);
          const eased = Math.pow(progress, 0.85);
          counter.textContent = Math.round(target * eased);
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      });
    };
    animateCounters();

    const applyFilter = (filter) => {
      filterButtons.forEach((btn) => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      caseCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.case === filter;
        card.style.display = matches ? 'grid' : 'none';
      });
    };

    filterButtons.forEach((btn) =>
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter))
    );
    applyFilter('all');
  }

  const toggleBrief = (open) => {
    if (!briefPanel || !briefBackdrop) return;
    briefPanel.classList.toggle('is-open', open);
    briefBackdrop.classList.toggle('is-open', open);
    briefPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    briefBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  briefOpeners.forEach((btn) => btn.addEventListener('click', () => toggleBrief(true)));
  briefCloser?.addEventListener('click', () => toggleBrief(false));
  briefBackdrop?.addEventListener('click', () => toggleBrief(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleBrief(false);
    }
  });

  briefForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    console.table(data);
    toggleBrief(false);
    event.currentTarget.reset();
  });

  newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    console.log('Newsletter-Abo für ' + email);
    event.currentTarget.reset();
  });

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
`,
};

const EMPTY_PROJECT = {};

function isHTMLFile(name) {
  return typeof name === "string" && /\.html?$/i.test(name.trim());
}

function normalizePreviewFile(fileName) {
  if (!fileName) {
    return null;
  }
  const cleaned = fileName
    .trim()
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\.\//, "")
    .replace(/^[./]+/, "")
    .split(/[?#]/)[0];
  if (!cleaned) {
    return null;
  }
  return cleaned;
}

function findFirstHTMLFile(files = projectFiles) {
  return Object.keys(files || {}).find((name) => isHTMLFile(name)) || null;
}

function determinePreviewFileForProject(files, preferred) {
  if (preferred && isHTMLFile(preferred) && files && preferred in files) {
    return preferred;
  }
  if (files && Object.prototype.hasOwnProperty.call(files, "index.html")) {
    return "index.html";
  }
  return findFirstHTMLFile(files);
}

function loadPanelVisibility() {
  try {
    const stored = window.localStorage?.getItem(LAYOUT_TOGGLE_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Konnte Layout-Konfiguration nicht laden:", error);
  }
  return {};
}

function savePanelVisibility(config) {
  try {
    const payload = {};
    Object.entries(config).forEach(([key, value]) => {
      if (value === false) {
        payload[key] = false;
      }
    });
    if (Object.keys(payload).length) {
      window.localStorage?.setItem(
        LAYOUT_TOGGLE_STORAGE_KEY,
        JSON.stringify(payload)
      );
    } else {
      window.localStorage?.removeItem(LAYOUT_TOGGLE_STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Konnte Layout-Konfiguration nicht speichern:", error);
  }
}

function updateWorkspaceLayout(config = panelVisibilityConfig) {
  const workspace = document.querySelector(".workspace");
  if (!workspace) {
    return;
  }

  const fileVisible = config["file-sidebar"] !== false;
  const editorVisible = config["editor-panel"] !== false;
  const previewVisible = config["preview-panel"] !== false;
  const consoleVisible = config["console-panel"] !== false;
  const chatVisible = config["chat-panel"] !== false;

  const hasSplitColumn = previewVisible && consoleVisible;
  const topAreas = [];
  const bottomAreas = [];
  const columns = [];

  if (fileVisible) {
    columns.push("minmax(220px, 260px)");
    topAreas.push("file-sidebar");
    if (hasSplitColumn) {
      bottomAreas.push("file-sidebar");
    }
  }

  if (editorVisible) {
    columns.push("minmax(0, 1.1fr)");
    topAreas.push("editor-panel");
    if (hasSplitColumn) {
      bottomAreas.push("editor-panel");
    }
  }

  if (previewVisible || consoleVisible) {
    columns.push("minmax(320px, 0.95fr)");
    topAreas.push(previewVisible ? "preview-panel" : "console-panel");
    if (hasSplitColumn) {
      bottomAreas.push("console-panel");
    }
  }

  if (chatVisible) {
    columns.push("minmax(260px, 0.85fr)");
    topAreas.push("chat-panel");
    if (hasSplitColumn) {
      bottomAreas.push("chat-panel");
    }
  }

  if (!topAreas.length) {
    workspace.style.removeProperty("--workspace-columns");
    workspace.style.removeProperty("--workspace-rows");
    workspace.style.setProperty("--workspace-areas", "none");
    return;
  }

  workspace.style.setProperty("--workspace-columns", columns.join(" "));

  if (hasSplitColumn) {
    const bottomRow =
      bottomAreas.length === topAreas.length ? bottomAreas.join(" ") : topAreas.join(" ");
    workspace.style.setProperty(
      "--workspace-rows",
      "minmax(0, 1fr) minmax(220px, 0.65fr)"
    );
    workspace.style.setProperty(
      "--workspace-areas",
      `"${topAreas.join(" ")}" "${bottomRow}"`
    );
  } else {
    workspace.style.setProperty("--workspace-rows", "minmax(0, 1fr)");
    workspace.style.setProperty("--workspace-areas", `"${topAreas.join(" ")}"`);
  }

  const consolePanel = document.querySelector(PANEL_SELECTOR_MAP["console-panel"]);
  if (consolePanel) {
    if (consoleVisible && !previewVisible) {
      consolePanel.style.minHeight = "320px";
    } else {
      consolePanel.style.minHeight = "";
    }
  }
}

function applyPanelVisibility(config = panelVisibilityConfig) {
  Object.entries(PANEL_SELECTOR_MAP).forEach(([key, selector]) => {
    const element = document.querySelector(selector);
    if (!element) {
      return;
    }
    const visible = config[key] !== false;
    element.classList.toggle("is-hidden", !visible);
  });

  const toggles = document.querySelectorAll('[data-toggle-target]');
  toggles.forEach((toggle) => {
    const target = toggle.dataset.toggleTarget;
    if (!target) {
      return;
    }
    const visible = config[target] !== false;
    if (toggle.checked !== visible) {
      toggle.checked = visible;
    }
  });

  updateWorkspaceLayout(config);
}

function initializeLayoutToggles() {
  const toggles = document.querySelectorAll('[data-toggle-target]');
  if (!toggles.length) {
    applyPanelVisibility(panelVisibilityConfig);
    return;
  }

  toggles.forEach((toggle) => {
    const target = toggle.dataset.toggleTarget;
    if (!target) {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(PANEL_SELECTOR_MAP, target)) {
      toggle.checked = true;
      toggle.disabled = true;
      return;
    }
    const visible = panelVisibilityConfig[target] !== false;
    toggle.checked = visible;
    toggle.addEventListener("change", () => {
      panelVisibilityConfig[target] = toggle.checked;
      savePanelVisibility(panelVisibilityConfig);
      applyPanelVisibility(panelVisibilityConfig);
      const label = toggle.parentElement?.textContent?.trim() || target;
      showToast(toggle.checked ? `${label} eingeblendet` : `${label} ausgeblendet`);
    });
  });

  applyPanelVisibility(panelVisibilityConfig);
}

async function ensurePermission(handle, mode = "read") {
  if (!handle || typeof handle.requestPermission !== "function") {
    return true;
  }
  try {
    if (typeof handle.queryPermission === "function") {
      const current = await handle.queryPermission({ mode });
      if (current === "granted") {
        return true;
      }
      if (current === "denied") {
        return false;
      }
    }
    const requested = await handle.requestPermission({ mode });
    return requested === "granted";
  } catch (error) {
    console.warn("Berechtigung konnte nicht eingeholt werden:", error);
    return false;
  }
}

async function collectDirectoryEntries(directoryHandle, prefix, result) {
  if (!(await ensurePermission(directoryHandle, "read"))) {
    return;
  }

  const iterator = typeof directoryHandle.values === "function"
    ? directoryHandle.values()
    : null;

  if (!iterator) {
    console.warn("Directory-Handle unterstützt keine Iteration und wird übersprungen.");
    return;
  }

  for await (const entry of iterator) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.kind === "file") {
      if (!(await ensurePermission(entry, "read"))) {
        continue;
      }
      try {
        const file = await entry.getFile();
        if (
          file.type &&
          !file.type.startsWith("text/") &&
          !TEXT_FILE_EXTENSIONS.test(relativePath)
        ) {
          console.warn(`Übersprungen (nicht-textuell): ${relativePath}`);
          continue;
        }
        if (
          file.size > 2_097_152 &&
          !TEXT_FILE_EXTENSIONS.test(relativePath)
        ) {
          console.warn(`Übersprungen (Datei zu groß oder unbekanntes Format): ${relativePath}`);
          continue;
        }
        const text = await file.text();
        result.files[relativePath] = text;
        result.handles.set(relativePath, entry);
        result.all.push(relativePath);
        if (isHTMLFile(relativePath)) {
          result.htmlCandidates.push(relativePath);
        }
      } catch (error) {
        console.error(`Datei konnte nicht gelesen werden: ${relativePath}`, error);
      }
    } else if (entry.kind === "directory") {
      await collectDirectoryEntries(entry, relativePath, result);
    }
  }
}

async function importDirectoryContents(directoryHandle) {
  const result = {
    files: {},
    handles: new Map(),
    htmlCandidates: [],
    all: [],
  };
  await collectDirectoryEntries(directoryHandle, "", result);
  return result;
}

function createFileIcon(inner) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    <path d="M14 2v6h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    ${inner}
  </svg>`;
}

function hexToRgba(color, alpha) {
  if (!color) {
    return `rgba(255, 255, 255, ${alpha})`;
  }

  let hex = color.replace("#", "").trim();
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (hex.length !== 6) {
    return `rgba(255, 255, 255, ${alpha})`;
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const LANGUAGE_METADATA = {
  html: {
    label: "HTML",
    aceMode: "ace/mode/html",
    color: "#f97316",
    icon: createFileIcon(`
      <path d="M11 11l-2.8 1.8L11 14.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13 11l2.8 1.8L13 14.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    `),
  },
  css: {
    label: "CSS",
    aceMode: "ace/mode/css",
    color: "#38bdf8",
    icon: createFileIcon(`
      <path d="M9.5 11.5h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <path d="M9.5 14.5h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <path d="M9.5 17.5h4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    `),
  },
  js: {
    label: "JS",
    aceMode: "ace/mode/javascript",
    color: "#facc15",
    icon: createFileIcon(`
      <text x="9" y="16.5" font-family="Inter, system-ui, sans-serif" font-size="7" font-weight="700" fill="currentColor">JS</text>
    `),
  },
  json: {
    label: "JSON",
    aceMode: "ace/mode/json",
    color: "#8b5cf6",
    icon: createFileIcon(`
      <path d="M10.5 11.5h-1.5v6h1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13.5 11.5h1.5v6h-1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13.5 14.5h-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    `),
  },
  txt: {
    label: "Text",
    aceMode: "ace/mode/text",
    color: "#94a3b8",
    icon: createFileIcon(`
      <path d="M9.5 11.5h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <path d="M9.5 14.5h6.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <path d="M9.5 17.5h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    `),
  },
};

const statusPill = document.getElementById("status-pill");
const toastEl = document.getElementById("toast");
const consoleLogEl = document.getElementById("console-log");
const fileListEl = document.getElementById("file-list");
const newFileButton = document.getElementById("new-file-button");
const resetFilesButton = document.getElementById("reset-files-button");
const brandHomeButton = document.getElementById("brand-home");
const openFolderButton = document.getElementById("open-folder-button");
const openLocalButton = document.getElementById("open-local-button");
const saveLocalButton = document.getElementById("save-local-button");
const localFileInput = document.getElementById("local-file-input");

const renameFileButton = document.getElementById("rename-file-button");
const startScreenEl = document.getElementById("start-screen");
const startResumeButton = document.getElementById("start-resume-button");
const startExampleButton = document.getElementById("start-example-button");
const startBlankButton = document.getElementById("start-blank-button");
const startFolderButton = document.getElementById("start-folder-button");
const startMetaFolder = document.getElementById("start-meta-folder");

let toastTimeout;
let currentTemplate = loadTemplateType();
const storedProject = loadProjectFiles();
const projectInitializedFromStorage = !!(storedProject && Object.keys(storedProject).length);
let projectFiles = projectInitializedFromStorage
  ? storedProject
  : { ...getTemplateFiles("blank") };

if (!projectInitializedFromStorage) {
  currentTemplate = "blank";
}

let activeFile = loadActiveFileName(projectFiles);
let isStartScreenActive = true;
let runButton;
let resetButton;
let formatButton;
let previewFrame;
let previewUpdateTimer = null;
let currentPreviewFile = determinePreviewFileForProject(projectFiles, activeFile);
const fileHandles = new Map();
const canOpenWithFileSystemAccess = typeof window.showOpenFilePicker === "function";
const canSaveWithFileSystemAccess = typeof window.showSaveFilePicker === "function";
const canOpenDirectory = typeof window.showDirectoryPicker === "function";

const PANEL_SELECTOR_MAP = {
  "file-sidebar": ".file-sidebar",
  "editor-panel": ".editor-panel",
  "preview-panel": ".preview-panel",
  "console-panel": ".console-panel",
  "chat-panel": ".chat-panel",
};

const LAYOUT_TOGGLE_STORAGE_KEY = "code-webeditor-layout-panels";

const panelVisibilityConfig = {
  "file-sidebar": true,
  "editor-panel": true,
  "preview-panel": true,
  "console-panel": true,
  "chat-panel": true,
  ...loadPanelVisibility(),
};

const TEXT_FILE_EXTENSIONS = /\.(html?|css|jsx?|tsx?|ts|json|ya?ml|md|txt|svg|xml|cjs|mjs)$/i;

const PREVIEW_UPDATE_DELAY = 350;

if (!canOpenDirectory) {
  openFolderButton?.setAttribute("disabled", "true");
  if (openFolderButton && !openFolderButton.title) {
    openFolderButton.title = "Ordnerimport wird von diesem Browser nicht unterstützt.";
  }
  startFolderButton?.classList.add("hidden");
  startFolderButton?.setAttribute("disabled", "true");
  startMetaFolder?.classList.add("hidden");
}

function setStatus(message, type = "info") {
  if (!statusPill) return;
  statusPill.textContent = message;
  statusPill.classList.remove("info", "success", "warning", "error");
  statusPill.classList.add(type);
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2600);
}

function loadProjectFiles() {
  try {
    const stored = window.localStorage?.getItem(FILE_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Konnte gespeicherte Dateien nicht laden:", error);
  }
  return null;
}

function saveProjectFiles() {
  try {
    const hasFiles = projectFiles && Object.keys(projectFiles).length;
    if (hasFiles) {
      window.localStorage?.setItem(
        FILE_STORAGE_KEY,
        JSON.stringify(projectFiles)
      );
    } else {
      window.localStorage?.removeItem(FILE_STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Konnte Projektdateien nicht speichern:", error);
  }
}

function loadTemplateType() {
  try {
    const stored = window.localStorage?.getItem(TEMPLATE_STORAGE_KEY);
    if (stored === "example" || stored === "blank") {
      return stored;
    }
  } catch (error) {
    console.warn("Konnte Template-Typ nicht laden:", error);
  }
  return "example";
}

function saveTemplateType(template) {
  try {
    window.localStorage?.setItem(TEMPLATE_STORAGE_KEY, template);
  } catch (error) {
    console.warn("Konnte Template-Typ nicht speichern:", error);
  }
}

function getTemplateFiles(template = currentTemplate) {
  return template === "blank" ? EMPTY_PROJECT : EXAMPLE_PROJECT;
}

function loadActiveFileName(files) {
  try {
    const stored = window.localStorage?.getItem(ACTIVE_FILE_STORAGE_KEY);
    if (stored && files[stored]) {
      return stored;
    }
  } catch (error) {
    console.warn("Konnte aktive Datei nicht laden:", error);
  }

  const names = Object.keys(files || {});
  if (names.length === 0) {
    return null;
  }

  return names[0];
}

function saveActiveFileName(name) {
  try {
    if (!name) {
      window.localStorage?.removeItem(ACTIVE_FILE_STORAGE_KEY);
    } else {
      window.localStorage?.setItem(ACTIVE_FILE_STORAGE_KEY, name);
    }
  } catch (error) {
    console.warn("Konnte aktive Datei nicht speichern:", error);
  }
}

function getFileExtension(fileName) {
  if (!fileName) {
    return "txt";
  }
  const parts = fileName.split(".");
  if (parts.length <= 1) {
    return "txt";
  }
  return parts.pop().toLowerCase();
}

function getLanguageMeta(fileName) {
  if (!fileName) {
    return LANGUAGE_METADATA.html;
  }
  const ext = getFileExtension(fileName);
  return LANGUAGE_METADATA[ext] || LANGUAGE_METADATA.txt;
}

function getDefaultContentForFile(fileName) {
  if (!fileName) {
    return "";
  }
  const templateFiles = getTemplateFiles();
  if (fileName in templateFiles) {
    return templateFiles[fileName];
  }
  const ext = getFileExtension(fileName);
  return DEFAULT_SNIPPETS[ext] ?? DEFAULT_SNIPPETS.txt;
}

function createFileListItem(fileName) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const meta = getLanguageMeta(fileName);

  button.type = "button";
  button.className = `file-item${fileName === activeFile ? " active" : ""}`;
  button.dataset.file = fileName;
  button.setAttribute("role", "option");
  button.setAttribute("aria-selected", fileName === activeFile ? "true" : "false");

  const iconSpan = document.createElement("span");
  iconSpan.className = "file-icon";
  iconSpan.innerHTML = meta.icon;
  iconSpan.style.color = meta.color;
  iconSpan.setAttribute("aria-hidden", "true");

  const nameSpan = document.createElement("span");
  nameSpan.className = "file-name";
  nameSpan.textContent = fileName;

  const languageSpan = document.createElement("span");
  languageSpan.className = "file-language";
  languageSpan.textContent = meta.label;
  languageSpan.style.color = meta.color;
  languageSpan.style.backgroundColor = hexToRgba(meta.color, 0.12);
  languageSpan.style.borderColor = hexToRgba(meta.color, 0.32);

  button.append(iconSpan, nameSpan, languageSpan);
  li.appendChild(button);

  button.addEventListener("click", () => {
    if (activeFile === fileName) {
      return;
    }
    activeFile = fileName;
    saveActiveFileName(activeFile);
    syncEditorWithActiveFile({ focus: true });
    renderFileList();
    if (isHTMLFile(activeFile)) {
      currentPreviewFile = activeFile;
      updatePreview({ resetLogs: true, silent: true });
      setStatus(`Seite geöffnet: ${fileName}`, "info");
    } else {
      schedulePreviewUpdate();
      setStatus(`Datei geöffnet: ${fileName}`, "info");
    }
  });

  return li;
}

function renderFileList() {
  if (!fileListEl) {
    return;
  }

  fileListEl.innerHTML = "";
  const entries = Object.keys(projectFiles);

  if (!entries.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Keine Dateien vorhanden";
    fileListEl.appendChild(emptyItem);
    return;
  }

  const sorted = entries.sort((a, b) => {
    if (a === "index.html") return -1;
    if (b === "index.html") return 1;
    return a.localeCompare(b);
  });

  sorted.forEach((fileName) => {
    fileListEl.appendChild(createFileListItem(fileName));
  });
}

function syncEditorWithActiveFile(options = {}) {
  if (!window.ace || !editorInstance) {
    return;
  }

  if (!activeFile) {
    editorInstance.session.setMode(LANGUAGE_METADATA.html.aceMode);
    editorInstance.session.setValue("", -1);
    editorInstance.setOption("placeholder", NO_FILE_PLACEHOLDER);
    editorInstance.setReadOnly(true);
    runButton && (runButton.disabled = true);
    resetButton && (resetButton.disabled = true);
    formatButton && (formatButton.disabled = true);
    renameFileButton && (renameFileButton.disabled = true);
    saveLocalButton && (saveLocalButton.disabled = true);
    if (options.focus) {
      typeof editorInstance.blur === "function" && editorInstance.blur();
    }
    return;
  }

  editorInstance.setReadOnly(false);
  editorInstance.setOption("placeholder", "");
  runButton && (runButton.disabled = false);
  resetButton && (resetButton.disabled = false);
  formatButton && (formatButton.disabled = false);
  renameFileButton && (renameFileButton.disabled = false);
  saveLocalButton && (saveLocalButton.disabled = false);
  const meta = getLanguageMeta(activeFile);
  const fallback = getDefaultContentForFile(activeFile);
  const nextValue = projectFiles[activeFile] ?? fallback;
  editorInstance.session.setMode(meta.aceMode);
  editorInstance.session.setValue(nextValue, -1);

  if (options.focus) {
    editorInstance.focus();
  }
}

function handleEditorChange() {
  if (!activeFile || isStartScreenActive) {
    return;
  }
  projectFiles[activeFile] = editorInstance.getValue();
  saveProjectFiles();
  schedulePreviewUpdate();
}

function handleCreateFile() {
  const suggestion = activeFile
    ? activeFile.includes(".")
      ? activeFile.replace(/\.[^.]+$/, (match) => `-kopie${match}`)
      : `${activeFile}-kopie`
    : "index.html";
  const fileName = window.prompt(
    "Wie soll die neue Datei heißen?",
    suggestion || "neue-datei.html"
  );
  if (!fileName) {
    return;
  }

  const trimmed = fileName.trim();
  if (!trimmed) {
    setStatus("Ungültiger Dateiname", "warning");
    showToast("Ungültiger Dateiname");
    return;
  }
  if (projectFiles[trimmed]) {
    setStatus("Dateiname bereits vorhanden", "warning");
    showToast("Eine Datei mit diesem Namen existiert bereits.");
    return;
  }

  const content = getDefaultContentForFile(trimmed);
  projectFiles = {
    ...projectFiles,
    [trimmed]: content,
  };

  activeFile = trimmed;
  saveProjectFiles();
  saveActiveFileName(activeFile);
  renderFileList();
  syncEditorWithActiveFile({ focus: true });
  if (isHTMLFile(activeFile)) {
    currentPreviewFile = activeFile;
    updatePreview({ resetLogs: true, silent: true });
  } else {
    schedulePreviewUpdate();
  }
  setStatus(`Neue Datei erstellt: ${trimmed}`, "success");
  showToast("Datei hinzugefügt");
}

function handleRenameFile() {
  if (!activeFile) {
    setStatus("Keine Datei zum Umbenennen", "warning");
    showToast("Erstelle oder öffne eine Datei.");
    return;
  }

  if (!(activeFile in projectFiles)) {
    setStatus("Aktive Datei nicht gefunden", "error");
    showToast("Aktive Datei konnte nicht gefunden werden.");
    return;
  }

  const oldName = activeFile;
  const existingHandle = fileHandles.get(oldName);

  const newName = window.prompt("Neuer Dateiname?", activeFile);
  if (!newName) {
    return;
  }

  const trimmed = newName.trim();
  if (!trimmed) {
    setStatus("Ungültiger Dateiname", "warning");
    showToast("Ungültiger Dateiname");
    return;
  }

  if (trimmed === activeFile) {
    return;
  }

  if (projectFiles[trimmed]) {
    setStatus("Dateiname bereits vorhanden", "warning");
    showToast("Eine Datei mit diesem Namen existiert bereits.");
    return;
  }

  const currentContent = projectFiles[activeFile];
  const renamedEntries = Object.entries(projectFiles).map(([name, content]) => {
    if (name === activeFile) {
      return [trimmed, content];
    }
    return [name, content];
  });

  projectFiles = Object.fromEntries(renamedEntries);
  activeFile = trimmed;
  saveProjectFiles();
  saveActiveFileName(activeFile);
  fileHandles.delete(oldName);
  if (existingHandle) {
    fileHandles.set(trimmed, existingHandle);
  }
  renderFileList();
  syncEditorWithActiveFile({ focus: true });
  if (currentPreviewFile === oldName) {
    currentPreviewFile = isHTMLFile(trimmed)
      ? trimmed
      : determinePreviewFileForProject(projectFiles, trimmed);
  }
  if (isHTMLFile(activeFile)) {
    currentPreviewFile = activeFile;
    updatePreview({ resetLogs: true, silent: true });
  } else {
    schedulePreviewUpdate();
  }
  setStatus(`Datei umbenannt in ${trimmed}`, "success");
  showToast("Datei umbenannt");
}

function handleResetProject() {
  const confirmed = window.confirm(
    "Möchtest du das Projekt wirklich zurücksetzen? Alle Dateien werden auf die Vorlage gesetzt."
  );
  if (!confirmed) {
    return;
  }

  const templateSnapshot = { ...getTemplateFiles() };
  projectFiles = templateSnapshot;
  const templateNames = Object.keys(projectFiles);
  activeFile = templateNames.length ? templateNames[0] : null;
  fileHandles.clear();
  saveProjectFiles();
  saveActiveFileName(activeFile);
  saveTemplateType(currentTemplate);
  renderFileList();
  syncEditorWithActiveFile({ focus: false });
  currentPreviewFile = determinePreviewFileForProject(projectFiles, activeFile);
  if (activeFile) {
    runCode();
    setStatus("Projekt zurückgesetzt", "info");
    showToast("Standarddateien wiederhergestellt");
  } else {
    resetConsole();
    setStatus("Leeres Projekt gestartet", "info");
    showToast("Leeres Projekt bereit");
  }
}

function showStartScreen() {
  if (!startScreenEl) return;
  if (previewUpdateTimer) {
    clearTimeout(previewUpdateTimer);
    previewUpdateTimer = null;
  }
  updateStartScreenOptions();
  startScreenEl.classList.add("visible");
  startScreenEl.setAttribute("aria-hidden", "false");
  isStartScreenActive = true;
  document.body?.classList.add("start-screen-open");
}

function hideStartScreen() {
  if (!startScreenEl) return;
  startScreenEl.classList.remove("visible");
  startScreenEl.setAttribute("aria-hidden", "true");
  isStartScreenActive = false;
  document.body?.classList.remove("start-screen-open");
}

function schedulePreviewUpdate() {
  if (isStartScreenActive || !activeFile) {
    return;
  }
  if (previewUpdateTimer) {
    clearTimeout(previewUpdateTimer);
  }
  previewUpdateTimer = window.setTimeout(() => {
    previewUpdateTimer = null;
    updatePreview({ silent: true });
  }, PREVIEW_UPDATE_DELAY);
}

async function importFileHandle(handle) {
  try {
    const hasPermission = await ensurePermission(handle, "read");
    if (!hasPermission) {
      setStatus("Zugriff verweigert", "warning");
      showToast("Keine Berechtigung für Datei");
      return;
    }
    const file = await handle.getFile();
    const text = await file.text();
    const name = file.name;

    projectFiles = {
      ...projectFiles,
      [name]: text,
    };
    fileHandles.set(name, handle);
    activeFile = name;
    currentTemplate = "blank";
    saveTemplateType(currentTemplate);
    currentPreviewFile = isHTMLFile(name)
      ? name
      : determinePreviewFileForProject(projectFiles, currentPreviewFile);
    saveProjectFiles();
    saveActiveFileName(activeFile);
    renderFileList();
    syncEditorWithActiveFile({ focus: true });
    hideStartScreen();
    if (isHTMLFile(name)) {
      updatePreview({ resetLogs: true, silent: true });
    } else {
      schedulePreviewUpdate();
    }
    setStatus(`Datei geladen: ${name}`, "success");
    showToast("Lokale Datei geöffnet");
  } catch (error) {
    if (error?.name === "AbortError") {
      return;
    }
    console.error("Lokale Datei konnte nicht geladen werden:", error);
    setStatus("Datei konnte nicht geladen werden", "error");
    showToast("Fehler beim Öffnen der Datei");
  }
}

async function handleOpenLocalFile() {
  if (canOpenWithFileSystemAccess) {
    try {
      const handles = await window.showOpenFilePicker({
        multiple: true,
      });
      if (!handles?.length) {
        return;
      }
      for (const handle of handles) {
        // eslint-disable-next-line no-await-in-loop
        await importFileHandle(handle);
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
      console.error("Dateiauswahl abgebrochen oder fehlgeschlagen:", error);
      setStatus("Datei konnte nicht geöffnet werden", "error");
      showToast("Fehler beim Öffnen");
    }
  } else if (localFileInput) {
    localFileInput.value = "";
    localFileInput.click();
    setStatus("Wähle eine Datei vom Gerät", "info");
  } else {
    setStatus("Lokaler Dateizugriff nicht verfügbar", "warning");
    showToast("Browser unterstützt kein lokales Dateisystem");
  }
}

async function handleOpenLocalFolder() {
  if (!canOpenDirectory) {
    setStatus("Ordnerimport wird nicht unterstützt", "warning");
    showToast("Ordnerimport nicht verfügbar");
    return;
  }

  try {
    const directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
    if (!directoryHandle) {
      return;
    }

    const permissionGranted = await ensurePermission(directoryHandle, "readwrite");
    if (!permissionGranted) {
      setStatus("Zugriff auf Ordner verweigert", "warning");
      showToast("Ordnerzugriff verweigert");
      return;
    }

    const imported = await importDirectoryContents(directoryHandle);
    const importedNames = imported.all;

    if (!importedNames.length) {
      setStatus("Keine passenden Dateien gefunden", "warning");
      showToast("Ordner enthält keine unterstützten Dateien");
      return;
    }

    projectFiles = { ...imported.files };
    fileHandles.clear();
    imported.handles.forEach((handle, path) => {
      fileHandles.set(path, handle);
    });

    const preferredHtml = imported.htmlCandidates[0];
    const fallbackFile = importedNames[0];
    const previewTarget = determinePreviewFileForProject(
      projectFiles,
      preferredHtml || fallbackFile
    );
    activeFile = previewTarget || preferredHtml || fallbackFile || null;
    currentPreviewFile = previewTarget;

    currentTemplate = "blank";
    saveProjectFiles();
    saveTemplateType(currentTemplate);
    saveActiveFileName(activeFile);
    renderFileList();
    syncEditorWithActiveFile({ focus: true });

    if (activeFile && isHTMLFile(activeFile)) {
      updatePreview({ resetLogs: true, silent: true });
    } else if (activeFile) {
      schedulePreviewUpdate();
    } else if (previewFrame) {
      previewFrame.srcdoc = "";
    }

    hideStartScreen();
    const importedCount = importedNames.length;
    const folderName = directoryHandle.name || "lokaler Ordner";
    setStatus(`Ordner importiert: ${folderName}`, "success");
    showToast(`${importedCount} Datei${importedCount === 1 ? "" : "en"} importiert`);
  } catch (error) {
    if (error?.name === "AbortError") {
      return;
    }
    console.error("Ordner konnte nicht importiert werden:", error);
    setStatus("Ordnerimport fehlgeschlagen", "error");
    showToast("Ordnerimport fehlgeschlagen");
  }
}

async function handleSaveLocalFile() {
  if (!activeFile) {
    setStatus("Keine aktive Datei zum Speichern", "warning");
    showToast("Keine Datei ausgewählt");
    return;
  }

  const content = editorInstance.getValue();

  if (canSaveWithFileSystemAccess) {
    try {
      let handle = fileHandles.get(activeFile);
      if (!handle) {
        handle = await window.showSaveFilePicker({
          suggestedName: activeFile,
        });
        fileHandles.set(activeFile, handle);
      }
      const hasPermission = await ensurePermission(handle, "readwrite");
      if (!hasPermission) {
        setStatus("Speichern verweigert", "warning");
        showToast("Keine Berechtigung zum Speichern");
        return;
      }
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      setStatus(`Datei gespeichert: ${activeFile}`, "success");
      showToast("Lokal gespeichert");
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
      console.error("Speichern fehlgeschlagen:", error);
      setStatus("Speichern fehlgeschlagen", "error");
      showToast("Fehler beim Speichern");
    }
    return;
  }

  downloadFile(activeFile, content);
  setStatus("Download gestartet", "info");
  showToast("Datei heruntergeladen");
}

function handleLocalFileInputChange(event) {
  const input = event.target;
  const files = Array.from(input.files || []);
  if (!files.length) {
    return;
  }

  (async () => {
    for (const file of files) {
      try {
        if (
          file.type &&
          !file.type.startsWith("text/") &&
          !TEXT_FILE_EXTENSIONS.test(file.name)
        ) {
          console.warn(`Übersprungen (nicht-textuell): ${file.name}`);
          continue;
        }
        if (file.size > 2_097_152 && !TEXT_FILE_EXTENSIONS.test(file.name)) {
          console.warn(`Übersprungen (Datei zu groß oder unbekanntes Format): ${file.name}`);
          continue;
        }
        const text = await file.text();
        const name = file.name;
        projectFiles = {
          ...projectFiles,
          [name]: text,
        };
        fileHandles.delete(name);
        activeFile = name;
        currentTemplate = "blank";
        saveTemplateType(currentTemplate);
        currentPreviewFile = isHTMLFile(name)
          ? name
          : determinePreviewFileForProject(projectFiles, currentPreviewFile);
        saveProjectFiles();
        saveActiveFileName(activeFile);
        renderFileList();
        syncEditorWithActiveFile({ focus: true });
        hideStartScreen();
        if (isHTMLFile(name)) {
          updatePreview({ resetLogs: true, silent: true });
        } else {
          schedulePreviewUpdate();
        }
        setStatus(`Datei geladen: ${name}`, "success");
        showToast("Datei importiert");
      } catch (error) {
        console.error("Datei konnte nicht gelesen werden:", error);
        setStatus("Datei konnte nicht geladen werden", "error");
        showToast("Fehler beim Lesen der Datei");
      }
    }
  })().finally(() => {
    input.value = "";
  });
}

function downloadFile(name, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name || "datei.txt";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function beginProjectFromTemplate(templateType) {
  currentTemplate = templateType;
  const templateFiles = { ...getTemplateFiles(templateType) };
  projectFiles = templateFiles;
  activeFile = loadActiveFileName(projectFiles);
  fileHandles.clear();
  renderFileList();
  syncEditorWithActiveFile({ focus: false });
  saveProjectFiles();
  saveTemplateType(currentTemplate);
  saveActiveFileName(activeFile);
  currentPreviewFile = determinePreviewFileForProject(projectFiles, activeFile);
  hideStartScreen();
  if (activeFile && isHTMLFile(activeFile)) {
    runCode();
    if (templateType === "example") {
      setStatus("Beispielprojekt geladen", "success");
      showToast("Beispielprojekt geöffnet");
    } else {
      setStatus("Projektvorlage geladen", "info");
      showToast("Vorlage geladen");
    }
  } else {
    resetConsole();
    if (previewFrame) {
      previewFrame.srcdoc = "";
    }
    setStatus("Leeres Projekt gestartet", "info");
    showToast("Leeres Projekt erstellt");
  }
}

function handleStartExample() {
  beginProjectFromTemplate("example");
}

function handleStartBlank() {
  beginProjectFromTemplate("blank");
}

function updateStartScreenOptions() {
  if (!startResumeButton) {
    return;
  }

  const stored = loadProjectFiles();
  const hasStoredProject = !!(stored && Object.keys(stored).length);
  if (hasStoredProject) {
    startResumeButton.classList.remove("hidden");
  } else {
    startResumeButton.classList.add("hidden");
  }

  if (startFolderButton) {
    if (canOpenDirectory) {
      startFolderButton.classList.remove("hidden");
      startFolderButton.removeAttribute("disabled");
    } else {
      startFolderButton.classList.add("hidden");
      startFolderButton.setAttribute("disabled", "true");
    }
  }

  if (startMetaFolder) {
    startMetaFolder.classList.toggle("hidden", !canOpenDirectory);
  }
}

function handleStartResume() {
  const stored = loadProjectFiles();
  if (!stored || !Object.keys(stored).length) {
    showToast("Kein gespeichertes Projekt vorhanden.");
    return;
  }

  projectFiles = stored;
  currentTemplate = loadTemplateType();
  activeFile = loadActiveFileName(projectFiles);
  fileHandles.clear();
  renderFileList();
  syncEditorWithActiveFile({ focus: false });
  currentPreviewFile = determinePreviewFileForProject(projectFiles, activeFile);
  hideStartScreen();
  saveActiveFileName(activeFile);

  if (activeFile) {
    runCode();
    setStatus("Gespeichertes Projekt geladen", "success");
    showToast("Projekt fortgesetzt");
  } else {
    resetConsole();
    if (previewFrame) {
      previewFrame.srcdoc = "";
    }
    setStatus("Leeres Projekt gestartet", "info");
    showToast("Leeres Projekt bereit");
  }
}

function initializeEditor() {
  if (!window.ace) {
    throw new Error("Ace Editor konnte nicht geladen werden.");
  }

  const editor = window.ace.edit("editor");
  editor.setTheme("ace/theme/one_dark");
  editor.session.setUseSoftTabs(true);
  editor.session.setTabSize(2);
  editor.setOption("fontSize", "15px");
  editor.setOption("showPrintMargin", false);
  editor.setOption("wrap", true);
  editor.renderer.setScrollMargin(16, 16);

  editor.setOption("placeholder", NO_FILE_PLACEHOLDER);

  const hasActiveFile = Boolean(activeFile);
  const meta = hasActiveFile ? getLanguageMeta(activeFile) : LANGUAGE_METADATA.html;
  const initialValue = hasActiveFile
    ? projectFiles[activeFile] ?? getDefaultContentForFile(activeFile)
    : "";
  editor.session.setMode(meta.aceMode);
  editor.session.setValue(initialValue, -1);

  editor.setReadOnly(!hasActiveFile);

  return editor;
}

const editorInstance = initializeEditor();
editorInstance.session.on("change", handleEditorChange);
renderFileList();
saveActiveFileName(activeFile);
runButton = document.getElementById("run-button");
resetButton = document.getElementById("reset-button");
formatButton = document.getElementById("format-button");
previewFrame = document.getElementById("preview-frame");
syncEditorWithActiveFile();
if (currentPreviewFile) {
  updatePreview({ resetLogs: true, silent: true });
} else if (previewFrame) {
  previewFrame.srcdoc = "";
}

function resetConsole() {
  if (consoleLogEl) {
    consoleLogEl.textContent = "";
  }
}

function appendConsoleMessage(level, message) {
  if (!consoleLogEl) return;
  const icon = {
    log: "➜",
    info: "ℹ️",
    warn: "⚠️",
    error: "⛔",
  }[level] || "➜";
  consoleLogEl.textContent += `${icon} ${message}\n`;
  consoleLogEl.scrollTop = consoleLogEl.scrollHeight;
}

function buildPreviewDocument(entryFile) {
  const targetFile = isHTMLFile(entryFile)
    ? entryFile
    : determinePreviewFileForProject(projectFiles, "index.html");

  const cssBlocks = Object.entries(projectFiles)
    .filter(([name]) => /\.css$/i.test(name))
    .map(([, content]) => (content || "").trim())
    .filter(Boolean);

  const jsBlocks = Object.entries(projectFiles)
    .filter(([name]) => /\.m?js$/i.test(name))
    .map(([, content]) => (content || "").trim())
    .filter(Boolean);

const stylesMarkup = cssBlocks.length
    ? `<style data-origin="webeditor-styles">
${cssBlocks.join("\n\n")}
</style>`
    : "";

const scriptsMarkup = jsBlocks.length
    ? `<script data-origin="webeditor-scripts">
${jsBlocks.join("\n\n")}
</scr` + `ipt>`
    : "";

  const consoleBridgeSource = `(function() {
    const send = (level, data) => window.parent.postMessage(
      { source: "webeditor-preview", level, data },
      "*"
    );

    ["log", "info", "warn", "error"].forEach((level) => {
      const original = console[level];
      console[level] = function () {
        const args = Array.prototype.slice.call(arguments);
        const formatted = args
          .map(function (item) {
            if (typeof item === "object" && item !== null) {
              try {
                return JSON.stringify(item, null, 2);
              } catch (error) {
                return String(item);
              }
            }
            return String(item);
          })
          .join(" ");
        send(level, formatted);
        if (original) {
          original.apply(console, args);
        }
      };
    });

    window.addEventListener("error", function (event) {
      send(
        "error",
        event.message + " (" + event.filename + ":" + event.lineno + ")"
      );
    });

    document.addEventListener(
      "click",
      function (event) {
        if (event.defaultPrevented) {
          return;
        }
        const anchor = event.target.closest("a");
        if (!anchor) {
          return;
        }
        const href = anchor.getAttribute("href");
        if (!href) {
          return;
        }
        if (/\.html($|[?#])/i.test(href)) {
          event.preventDefault();
          const normalized = href.replace(/^\.\//, "");
          window.parent.postMessage(
            { source: "webeditor-preview", action: "navigate", file: normalized },
            "*"
          );
        }
      },
      true
    );
  })();`;

  const consoleScriptTag = `<script>
${consoleBridgeSource}
</scr` + `ipt>`;

  if (!targetFile) {
    const message = activeFile
      ? `Für die Datei <code>${activeFile}</code> steht keine HTML-Vorschau zur Verfügung.`
      : "Keine HTML-Datei vorhanden.";
    const placeholderStyles = `<style>
      :root { color-scheme: dark; font-family: Inter, system-ui, sans-serif; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0f172a; color: #e2e8f0; }
      .preview-placeholder { max-width: 540px; padding: 3rem 2.4rem; text-align: center; background: rgba(15, 23, 42, 0.78); border-radius: 18px; border: 1px solid rgba(148, 163, 184, 0.22); box-shadow: 0 32px 90px rgba(2, 6, 23, 0.55); display: grid; gap: 1.4rem; }
      .preview-placeholder h2 { margin: 0; font-size: 1.6rem; }
      .preview-placeholder p { margin: 0; line-height: 1.6; }
      .preview-placeholder code { background: rgba(148, 163, 184, 0.18); border-radius: 6px; padding: 0.2rem 0.4rem; }
    </style>`;

    return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Live Vorschau</title>
    ${stylesMarkup}
    ${placeholderStyles}
  </head>
  <body>
    ${consoleScriptTag}
    <main class="preview-placeholder">
      <h2>Keine HTML-Vorschau</h2>
      <p>${message}</p>
      <p>Füge eine <code>.html</code>-Datei hinzu oder wechsle zu einer vorhandenen Seite, um die Vorschau zu aktivieren.</p>
    </main>
    ${scriptsMarkup}
  </body>
</html>`;
  }

  const baseHTMLSource = projectFiles[targetFile];
  const fallbackHTML = getDefaultContentForFile(targetFile) ?? "";
  const baseHTML = baseHTMLSource !== undefined ? baseHTMLSource : fallbackHTML;

  if (!/<body[\s>]/i.test(baseHTML)) {
    return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Live Vorschau</title>
    ${stylesMarkup}
  </head>
  <body>
    ${consoleScriptTag}
    ${baseHTML}
    ${scriptsMarkup}
  </body>
</html>`;
  }

  let output = baseHTML;

  if (stylesMarkup) {
    if (/<\/head>/i.test(output)) {
      output = output.replace(/<\/head>/i, `${stylesMarkup}
</head>`);
    } else {
      output = output.replace(
        /<body([^>]*)>/i,
        function (match, attrs) {
          return `${stylesMarkup}
<body${attrs}>`;
        }
      );
    }
  }

  output = output.replace(/<body([^>]*)>/i, function (match, attrs) {
    return `<body${attrs}>${consoleScriptTag}`;
  });

  if (scriptsMarkup) {
    if (/<\/body>/i.test(output)) {
      output = output.replace(/<\/body>/i, `${scriptsMarkup}
</body>`);
    } else {
      output = `${output}
${scriptsMarkup}`;
    }
  }

  return output;
}


function updatePreview({ resetLogs = false, silent = false } = {}) {
  if (!activeFile) {
    return;
  }

  if (previewUpdateTimer) {
    clearTimeout(previewUpdateTimer);
    previewUpdateTimer = null;
  }

  projectFiles[activeFile] = editorInstance.getValue();
  saveProjectFiles();

  if (resetLogs) {
    resetConsole();
  }

  let entryFile = currentPreviewFile;
  if (!isHTMLFile(entryFile)) {
    entryFile = determinePreviewFileForProject(projectFiles, activeFile);
  }

  if (!entryFile) {
    return;
  }

  currentPreviewFile = entryFile;

  const compiled = buildPreviewDocument(entryFile);
  if (previewFrame && compiled) {
    previewFrame.srcdoc = compiled;
  }

  if (!silent) {
    setStatus("Vorschau aktualisiert", "success");
    showToast("Code ausgeführt");
  }
}

function runCode() {
  if (!activeFile) {
    setStatus("Keine Datei zum Ausführen", "warning");
    showToast("Erstelle oder öffne eine Datei.");
    return;
  }

  if (isHTMLFile(activeFile)) {
    currentPreviewFile = activeFile;
  }

  updatePreview({ resetLogs: true });
}

function handlePreviewNavigate(fileName) {
  const normalized = normalizePreviewFile(fileName);
  if (!normalized) {
    return;
  }

  let target = normalized;
  if (!isHTMLFile(target) && !target.includes(".")) {
    target = `${target}.html`;
  }

  if (!isHTMLFile(target)) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(projectFiles, target)) {
    const fallback = getDefaultContentForFile(target);
    if (fallback) {
      projectFiles = {
        ...projectFiles,
        [target]: fallback,
      };
      saveProjectFiles();
      renderFileList();
    } else {
      setStatus(`Datei nicht gefunden: ${target}`, "warning");
      showToast("Datei nicht vorhanden");
      return;
    }
  }

  if (activeFile && activeFile !== target) {
    projectFiles[activeFile] = editorInstance.getValue();
    saveProjectFiles();
  }

  currentPreviewFile = target;
  activeFile = target;
  saveActiveFileName(activeFile);
  renderFileList();
  syncEditorWithActiveFile({ focus: false });
  updatePreview({ resetLogs: true, silent: true });
  setStatus(`Seite geladen: ${target}`, "info");
}

async function formatCode() {
  if (!window.html_beautify) {
    setStatus("Formatter nicht verfügbar", "warning");
    showToast("Formatter konnte nicht geladen werden.");
    return;
  }

  if (!activeFile) {
    setStatus("Keine Datei zum Formatieren", "warning");
    showToast("Erstelle oder öffne eine HTML-Datei.");
    return;
  }

  const meta = getLanguageMeta(activeFile);
  if (!/html$/i.test(meta.aceMode)) {
    setStatus("Formatter unterstützt aktuell nur HTML", "warning");
    showToast("Formatter kann nur HTML-Dateien formatieren.");
    return;
  }

  const current = editorInstance.getValue();
  const formatted = window.html_beautify(current, {
    indent_size: 2,
    wrap_line_length: 100,
    preserve_newlines: true,
  });
  editorInstance.setValue(formatted.trim(), -1);
  setStatus("Code formatiert", "success");
  showToast("Formatter angewendet");
}

function resetEditor() {
  if (!activeFile) {
    setStatus("Keine Datei zum Zurücksetzen", "warning");
    showToast("Erstelle oder öffne eine Datei.");
    return;
  }

  const defaultContent = getDefaultContentForFile(activeFile);
  projectFiles[activeFile] = defaultContent;
  editorInstance.session.setValue(defaultContent, -1);
  saveProjectFiles();
  setStatus(`Datei zurückgesetzt: ${activeFile}`, "info");
  showToast("Vorlage wiederhergestellt");
  runCode();
}

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.source !== "webeditor-preview") {
    return;
  }

  if (data.action === "navigate") {
    handlePreviewNavigate(data.file);
    return;
  }

  if (data.level) {
    appendConsoleMessage(data.level, data.data);
  }
});

runButton?.addEventListener("click", runCode);
resetButton?.addEventListener("click", resetEditor);
formatButton?.addEventListener("click", formatCode);
newFileButton?.addEventListener("click", handleCreateFile);
resetFilesButton?.addEventListener("click", handleResetProject);
renameFileButton?.addEventListener("click", handleRenameFile);
openLocalButton?.addEventListener("click", handleOpenLocalFile);
saveLocalButton?.addEventListener("click", handleSaveLocalFile);
localFileInput?.addEventListener("change", handleLocalFileInputChange);
brandHomeButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showStartScreen();
  setStatus("Projekt auswählen", "info");
});
startFolderButton?.addEventListener("click", handleOpenLocalFolder);
startResumeButton?.addEventListener("click", handleStartResume);
startExampleButton?.addEventListener("click", handleStartExample);
startBlankButton?.addEventListener("click", handleStartBlank);
openFolderButton?.addEventListener("click", handleOpenLocalFolder);
initializeLayoutToggles();

showStartScreen();

if (!projectInitializedFromStorage) {
  setStatus("Projekt auswählen", "info");
} else {
  setStatus("Gespeichertes Projekt verfügbar", "info");
}
