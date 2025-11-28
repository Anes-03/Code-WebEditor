// Neues Dashboard-Beispielprojekt - kompakte Version

const DASHBOARD_PROJECT = {
    "index.html": `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8"/>
  <title>Dashboard Analytics</title>
</head>
<body data-theme="dark">
  <div class="app">
    <nav class="sidenav">
      <h1>📊 Dashboard</h1>
      <a href="#" class="nav-link active">Übersicht</a>
      <a href="#" class="nav-link">Analytics</a>
      <a href="#" class="nav-link">Benutzer</a>
      <button class="theme-btn" data-theme-toggle>🌙 Dark Mode</button>
    </nav>
    
    <main class="content">
      <header>
        <h2>Dashboard Übersicht</h2>
        <select data-period>
          <option>Letzte 7 Tage</option>
          <option>Letzte 30 Tage</option>
        </select>
      </header>

      <div class="stats">
        <div class="card">
          <span class="label">Benutzer</span>
          <div class="value" data-counter="4250">0</div>
          <span class="change positive">↑ 12.5%</span>
        </div>
        <div class="card">
          <span class="label">Umsatz</span>
          <div class="value" data-counter="28400" data-prefix="€">€0</div>
          <span class="change positive">↑ 8.2%</span>
        </div>
        <div class="card">
          <span class="label">Konversionen</span>
          <div class="value" data-counter="847">0</div>
          <span class="change negative">↓ 3.1%</span>
        </div>
        <div class="card">
          <span class="label">Avg. Session</span>
          <div class="value" data-counter="5" data-suffix="m">0m</div>
          <span class="change positive">↑ 5.4%</span>
        </div>
      </div>

      <div class="chart-card">
        <h3>Benutzeraktivität</h3>
        <canvas id="chart" width="700" height="200"></canvas>
      </div>

      <div class="activity">
        <h3>Letzte Aktivitäten</h3>
        <div class="activity-item">
          <span>🎉</span>
          <div><strong>Neue Registrierung</strong><small>vor 2 Min</small></div>
        </div>
        <div class="activity-item">
          <span>💳</span>
          <div><strong>Zahlung: €299</strong><small>vor 15 Min</small></div>
        </div>
        <div class="activity-item">
          <span>📧</span>
          <div><strong>E-Mail Kampagne gesendet</strong><small>vor 1 Std</small></div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`,

    "styles.css": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  transition: background 0.3s, color 0.3s;
}

body[data-theme="light"] {
  background: #f1f5f9;
  color: #1e293b;
}

.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

.sidenav {
  background: #1e293b;
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

body[data-theme="light"] .sidenav {
  background: white;
  border-color: #e2e8f0;
}

.sidenav h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.nav-link {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #94a3b8;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.nav-link.active {
  background: #6366f1;
  color: white;
}

.theme-btn {
  margin-top: auto;
  padding: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: #6366f1;
}

.content {
  padding: 2rem;
  max-width: 1400px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

header h2 {
  font-size: 1.875rem;
}

select {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: #1e293b;
  color: inherit;
}

body[data-theme="light"] select {
  background: white;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

body[data-theme="light"] .card {
  background: white;
  border-color: #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.card .label {
  color: #94a3b8;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card .value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.card .change {
  font-size: 0.875rem;
  font-weight: 600;
}

.positive { color: #10b981; }
.negative { color: #ef4444; }

.chart-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

body[data-theme="light"] .chart-card {
  background: white;
  border-color: #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.chart-card h3 {
  margin-bottom: 1rem;
}

#chart {
  width: 100%;
  height: auto;
}

.activity {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

body[data-theme="light"] .activity {
  background: white;
  border-color: #e2e8f0;
}

.activity h3 {
  margin-bottom: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}

.activity-item:hover {
  background: rgba(99, 102, 241, 0.05);
}

.activity-item span {
  font-size: 1.5rem;
}

.activity-item strong {
  display: block;
  margin-bottom: 0.25rem;
}

.activity-item small {
  color: #94a3b8;
  font-size: 0.75rem;
}`,

    "script.js": `document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeBtn = document.querySelector('[data-theme-toggle]');
  themeBtn?.addEventListener('click', () => {
    const current = document.body.dataset.theme;
    document.body.dataset.theme = current === 'dark' ? 'light' : 'dark';
    themeBtn.textContent = current === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // Animierte Counter
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1200;
    const increment = target / (duration / 16);

    const animate = () => {
      current += increment;
      if (current < target) {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        requestAnimationFrame(animate);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    };
    animate();
  });

  // Simple Chart
  const canvas = document.getElementById('chart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const data = [65, 59, 80, 81, 76, 85, 90];
    const max = Math.max(...data);
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const barWidth = (width - padding * 2) / data.length;

    // Klare Hintergrund
    ctx.clearRect(0, 0, width, height);

    data.forEach((value, i) => {
      const barHeight = (value / max) * (height - padding * 2);
      const x = padding + i * barWidth;
      const y = height - padding - barHeight;

      // Gradient
      const gradient = ctx.createLinearGradient(0, y, 0, height);
      gradient.addColorStop(0, '#6366f1');
      gradient.addColorStop(1, '#8b5cf6');

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
    });
  }

  console.log('Dashboard initialisiert ✨');
  console.table({ Benutzer: 4250, Umsatz: 28400, Konversionen: 847 });
});`
};
