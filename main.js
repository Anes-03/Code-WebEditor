const FILE_STORAGE_KEY = "code-webeditor-project-files";
const ACTIVE_FILE_STORAGE_KEY = "code-webeditor-active-file";
const TEMPLATE_STORAGE_KEY = "code-webeditor-template";
const NO_FILE_PLACEHOLDER = "Erstelle über das + eine neue Datei, um zu starten.";
const GEMINI_API_KEY_STORAGE_KEY = "code-webeditor-gemini-api-key";
const GEMINI_MODEL_STORAGE_KEY = "code-webeditor-gemini-model";
const CHAT_PROVIDER_GEMINI = {
  id: "gemini",
  name: "Google Gemini",
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  requiresKey: true,
};
const GEMINI_MODELS_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_DEFAULT_MODELS = [
  { name: "models/gemini-1.5-flash-latest", display: "Gemini 1.5 Flash (Latest)" },
  { name: "models/gemini-1.5-pro-latest", display: "Gemini 1.5 Pro (Latest)" },
  { name: "models/gemini-1.0-pro", display: "Gemini 1.0 Pro" },
];
let cachedGeminiModels = [];

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
  "styles.css": `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; transition: background 0.3s, color 0.3s; }
body[data-theme="light"] { background: #f1f5f9; color: #1e293b; }
.app { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
.sidenav { background: #1e293b; padding: 2rem 1.5rem; border-right: 1px solid rgba(148, 163, 184, 0.1); display: flex; flex-direction: column; gap: 0.5rem; }
body[data-theme="light"] .sidenav { background: white; border-color: #e2e8f0; }
.sidenav h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
.nav-link { padding: 0.75rem 1rem; border-radius: 0.5rem; text-decoration: none; color: #94a3b8; transition: all 0.2s; }
.nav-link:hover { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
.nav-link.active { background: #6366f1; color: white; }
.theme-btn { margin-top: auto; padding: 0.75rem; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 0.5rem; background: transparent; color: inherit; cursor: pointer; transition: all 0.2s; }
.theme-btn:hover { background: rgba(99, 102, 241, 0.1); border-color: #6366f1; }
.content { padding: 2rem; max-width: 1400px; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
header h2 { font-size: 1.875rem; }
select { padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid rgba(148, 163, 184, 0.2); background: #1e293b; color: inherit; }
body[data-theme="light"] select { background: white; }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.card { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(148, 163, 184, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
body[data-theme="light"] .card { background: white; border-color: #e2e8f0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05); }
.card .label { color: #94a3b8; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
.card .value { font-size: 2rem; font-weight: 700; margin: 0.5rem 0; }
.card .change { font-size: 0.875rem; font-weight: 600; }
.positive { color: #10b981; }
.negative { color: #ef4444; }
.chart-card { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; border: 1px solid rgba(148, 163, 184, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
body[data-theme="light"] .chart-card { background: white; border-color: #e2e8f0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05); }
.chart-card h3 { margin-bottom: 1rem; }
#chart { width: 100%; height: auto; }
.activity { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(148, 163, 184, 0.1); }
body[data-theme="light"] .activity { background: white; border-color: #e2e8f0; }
.activity h3 { margin-bottom: 1rem; }
.activity-item { display: flex; gap: 1rem; padding: 1rem; border-radius: 0.5rem; transition: background 0.2s; }
.activity-item:hover { background: rgba(99, 102, 241, 0.05); }
.activity-item span { font-size: 1.5rem; }
.activity-item strong { display: block; margin-bottom: 0.25rem; }
.activity-item small { color: #94a3b8; font-size: 0.75rem; }`,
  "script.js": `document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.querySelector('[data-theme-toggle]');
  themeBtn?.addEventListener('click', () => {
    const current = document.body.dataset.theme;
    document.body.dataset.theme = current === 'dark' ? 'light' : 'dark';
    themeBtn.textContent = current === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

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

  const canvas = document.getElementById('chart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const data = [65, 59, 80, 81, 76, 85, 90];
    const max = Math.max(...data);
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const barWidth = (width - padding * 2) / data.length;
    ctx.clearRect(0, 0, width, height);
    data.forEach((value, i) => {
      const barHeight = (value / max) * (height - padding * 2);
      const x = padding + i * barWidth;
      const y = height - padding - barHeight;
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

function loadGeminiApiKey() {
  try {
    const stored = window.localStorage?.getItem(GEMINI_API_KEY_STORAGE_KEY);
    return typeof stored === "string" ? stored : "";
  } catch (error) {
    console.warn("Konnte Gemini-API-Schlüssel nicht laden:", error);
    return "";
  }
}

function saveGeminiApiKey(value) {
  try {
    if (value) {
      window.localStorage?.setItem(GEMINI_API_KEY_STORAGE_KEY, value);
    } else {
      window.localStorage?.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Konnte Gemini-API-Schlüssel nicht speichern:", error);
  }
}

function clearGeminiApiKey() {
  saveGeminiApiKey("");
}

function hasGeminiApiKey() {
  return Boolean(loadGeminiApiKey());
}

function loadGeminiModel() {
  try {
    return window.localStorage?.getItem(GEMINI_MODEL_STORAGE_KEY) || "";
  } catch (error) {
    console.warn("Konnte Gemini-Modell nicht laden:", error);
    return "";
  }
}

function saveGeminiModel(model) {
  try {
    if (model) {
      window.localStorage?.setItem(GEMINI_MODEL_STORAGE_KEY, model);
    } else {
      window.localStorage?.removeItem(GEMINI_MODEL_STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Konnte Gemini-Modell nicht speichern:", error);
  }
}

function getSelectedGeminiModel() {
  return loadGeminiModel() || GEMINI_DEFAULT_MODELS[0]?.name || "";
}

async function fetchGeminiModels(apiKey) {
  const url = `${GEMINI_MODELS_ENDPOINT}?pageSize=50&key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const message =
      errorPayload?.error?.message || `Gemini Models API antwortete mit Status ${response.status}`;
    throw new Error(message);
  }
  const payload = await response.json();
  const models = Array.isArray(payload.models) ? payload.models : [];
  return models
    .map((model) => {
      const name = model?.name || "";
      const display = model?.displayName || name.split("/").pop() || name;
      return { name, display };
    })
    .filter((model) => model.name && model.display)
    .sort((a, b) => a.display.localeCompare(b.display));
}

function getActiveChatProvider() {
  return CHAT_PROVIDER_GEMINI;
}

function updateGeminiStatusMessage() {
  if (!geminiKeyStatus) {
    return;
  }
  const hasKey = hasGeminiApiKey();
  geminiKeyStatus.textContent = hasKey
    ? "Gemini ist verbunden. Der Schlüssel wird lokal im Browser gespeichert."
    : "Kein Schlüssel hinterlegt.";
  geminiKeyStatus.dataset.state = hasKey ? "connected" : "empty";
}

function updateGeminiTestStatus(message, state = "idle") {
  if (!geminiTestStatus) {
    return;
  }
  geminiTestStatus.textContent = message;
  geminiTestStatus.dataset.state = state;
}

function populateGeminiModelSelect(models = cachedGeminiModels, preferredModel = loadGeminiModel()) {
  if (!geminiModelSelect) {
    return;
  }
  const available = models?.length ? models : GEMINI_DEFAULT_MODELS;
  cachedGeminiModels = available;
  const currentValue = preferredModel || loadGeminiModel();

  geminiModelSelect.innerHTML = `<option value="">Modell auswählen …</option>`;
  available.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.name;
    option.textContent = model.display || model.name;
    geminiModelSelect.appendChild(option);
  });

  if (currentValue) {
    const option = Array.from(geminiModelSelect.options).find((opt) => opt.value === currentValue);
    if (option) {
      geminiModelSelect.value = currentValue;
    } else {
      geminiModelSelect.value = "";
    }
  } else {
    geminiModelSelect.value = "";
  }
}

function appendChatMessage(role, content, state = "complete") {
  const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const message = {
    id,
    role,
    content,
    state,
  };
  chatMessagesState.push(message);
  renderChatMessages();
  updateChatActionStates();
  return message;
}

function updateChatMessage(id, updates = {}) {
  const message = chatMessagesState.find((entry) => entry.id === id);
  if (!message) {
    return;
  }
  Object.assign(message, updates);
  renderChatMessages();
  updateChatActionStates();
}

function resetChatConversation() {
  chatMessagesState = [];
  appendChatMessage("system", getChatIntroText());
  lastUserPrompt = "";
  updateChatActionStates();
}

function refreshChatIntroMessage() {
  const intro = chatMessagesState.find((entry) => entry.role === "system");
  if (intro) {
    intro.content = getChatIntroText();
    renderChatMessages();
  }
}

function setChatBusy(busy) {
  chatIsBusy = Boolean(busy);
  if (chatInputForm) {
    chatInputForm.classList.toggle("is-busy", chatIsBusy);
  }
  if (chatActionButtons?.length) {
    updateChatActionStates();
  }
  updateChatAvailability();
}

function updateChatAvailability() {
  const hasKey = hasGeminiApiKey();
  const text = (chatTextarea?.value || "").trim();
  if (chatTextarea) {
    chatTextarea.disabled = chatIsBusy || !hasKey;
    chatTextarea.placeholder = hasKey
      ? "Beschreibe dein Anliegen oder bitte um einen Code-Vorschlag …"
      : "Hinterlege zuerst deinen Gemini API-Schlüssel in den Einstellungen …";
  }
  if (chatSendButton) {
    chatSendButton.disabled = chatIsBusy || !hasKey || !text;
  }
  if (chatInputForm) {
    chatInputForm.classList.toggle("is-disabled", !hasKey);
    chatInputForm.setAttribute("aria-disabled", String(!hasKey));
  }
  updateChatActionStates();
  refreshChatIntroMessage();
}

function updateChatActionStates() {
  if (!chatActionButtons?.length) {
    return;
  }
  const hasKey = hasGeminiApiKey();
  const hasHistory = chatMessagesState.some((msg) => msg.role === "user" || msg.role === "assistant");
  chatActionButtons.forEach((button) => {
    const action = button.dataset.chatAction;
    if (action === "stop") {
      button.disabled = !chatIsBusy;
    } else if (action === "regenerate") {
      button.disabled = chatIsBusy || !hasKey || !lastUserPrompt || !hasHistory;
    } else if (action === "clear") {
      button.disabled = chatIsBusy || !hasHistory;
    } else {
      button.disabled = true;
    }
  });
}

function getConversationContents() {
  return chatMessagesState
    .filter((msg) => {
      if (msg.role === "user") {
        return true;
      }
      if (msg.role === "assistant") {
        return msg.state === "complete";
      }
      return false;
    })
    .map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));
}

function getConsoleHistorySummary(limit = 12) {
  if (!consoleHistory.length) {
    return "Keine aktuellen Konsolenausgaben.";
  }
  const recent = consoleHistory.slice(-limit);
  return recent
    .map((entry) => `[${entry.level}] ${entry.lines.join("\n")}`)
    .join("\n\n");
}

function stopChatRequest() {
  if (chatAbortController) {
    chatAbortController.abort();
  }
}

function clearChatConversation() {
  if (chatIsBusy) {
    return;
  }
  resetChatConversation();
  if (chatTextarea) {
    chatTextarea.value = "";
  }
  updateChatAvailability();
  showToast("Chat-Verlauf geleert");
  setStatus("Chat-Verlauf zurückgesetzt", "info");
}

const GEMINI_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "createFile",
        description: "Erstellt eine neue Datei im Projekt. Nutze dies wenn der Benutzer eine neue Datei erstellen möchte.",
        parameters: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "Name der zu erstellenden Datei (z.B. 'utils.js', 'style.css', 'index.html')"
            },
            content: {
              type: "string",
              description: "Vollständiger Inhalt der neuen Datei"
            }
          },
          required: ["filename", "content"]
        }
      },
      {
        name: "updateFile",
        description: "Aktualisiert den kompletten Inhalt einer bestehenden Datei. Nutze dies wenn der Benutzer eine Datei ändern oder erweitern möchte.",
        parameters: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "Name der zu aktualisierenden Datei"
            },
            content: {
              type: "string",
              description: "Neuer vollständiger Inhalt der Datei (nicht nur Änderungen, sondern die komplette Datei)"
            }
          },
          required: ["filename", "content"]
        }
      },
      {
        name: "deleteFile",
        description: "Löscht eine Datei aus dem Projekt. Nutze dies nur wenn der Benutzer explizit eine Datei löschen möchte.",
        parameters: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "Name der zu löschenden Datei"
            }
          },
          required: ["filename"]
        }
      }
    ]
  }
];


function handleToolCreateFile(filename, content) {
  if (projectFiles[filename]) {
    return { success: false, message: `Datei "${filename}" existiert bereits` };
  }
  projectFiles[filename] = content;
  activeFile = filename;
  saveProjectFiles();
  saveActiveFileName(activeFile);
  renderFileList();
  syncEditorWithActiveFile({ focus: true });
  if (isHTMLFile(filename)) {
    currentPreviewFile = filename;
    updatePreview({ resetLogs: true, silent: true });
  } else {
    schedulePreviewUpdate();
  }
  return { success: true, message: `Datei "${filename}" wurde erstellt` };
}

function handleToolUpdateFile(filename, content) {
  if (!projectFiles[filename]) {
    const result = handleToolCreateFile(filename, content);
    if (result.success) {
      result.message = `Datei "${filename}" wurde neu angelegt (fehlte zuvor).`;
    }
    return result;
  }
  projectFiles[filename] = content;
  saveProjectFiles();
  if (activeFile === filename) {
    syncEditorWithActiveFile({ focus: false });
  }
  if (isHTMLFile(filename) && currentPreviewFile === filename) {
    updatePreview({ resetLogs: false, silent: true });
  } else {
    schedulePreviewUpdate();
  }
  return { success: true, message: `Datei "${filename}" wurde aktualisiert` };
}

function handleToolDeleteFile(filename) {
  if (!projectFiles[filename]) {
    return { success: false, message: `Datei "${filename}" nicht gefunden` };
  }
  const fileCount = Object.keys(projectFiles).length;
  if (fileCount <= 1) {
    return { success: false, message: "Die letzte Datei kann nicht gelöscht werden" };
  }
  delete projectFiles[filename];
  fileHandles.delete(filename);

  if (activeFile === filename) {
    const remainingFiles = Object.keys(projectFiles);
    activeFile = remainingFiles[0] || null;
    syncEditorWithActiveFile({ focus: true });
  }

  if (currentPreviewFile === filename) {
    currentPreviewFile = determinePreviewFileForProject(projectFiles, activeFile);
  }

  saveProjectFiles();
  saveActiveFileName(activeFile);
  renderFileList();

  if (activeFile && isHTMLFile(activeFile)) {
    updatePreview({ resetLogs: true, silent: true });
  } else {
    schedulePreviewUpdate();
  }

  return { success: true, message: `Datei "${filename}" wurde gelöscht` };
}

async function executeToolCall(toolCall) {
  const name = toolCall.name;
  const args = toolCall.args;

  try {
    switch (name) {
      case 'createFile':
        return handleToolCreateFile(args.filename, args.content);
      case 'updateFile':
        return handleToolUpdateFile(args.filename, args.content);
      case 'deleteFile':
        return handleToolDeleteFile(args.filename);
      default:
        return { success: false, message: `Unbekanntes Tool: ${name}` };
    }
  } catch (error) {
    return { success: false, message: `Fehler bei Tool-Ausführung: ${error.message}` };
  }
}

async function sendChatPrompt(prompt, { reuseLastUser = false } = {}) {
  if (!hasGeminiApiKey()) {
    showToast("Bitte lege einen Gemini-API-Schlüssel in den Einstellungen an.");
    setStatus("Gemini-Schlüssel fehlt", "warning");
    updateChatAvailability();
    return;
  }

  if (chatIsBusy) {
    return;
  }

  lastUserPrompt = prompt;

  if (!reuseLastUser) {
    appendChatMessage("user", prompt);
  }

  const contents = getConversationContents();
  const trimmedContents = contents.slice(-10);

  setChatBusy(true);

  const pendingMessage = appendChatMessage(
    "assistant",
    "Gemini formuliert eine Antwort …",
    "pending"
  );

  const apiKey = loadGeminiApiKey();
  const model = getSelectedGeminiModel();
  const modelPath = model.startsWith("models/") ? model : `models/${model}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const hasFiles = Object.keys(projectFiles || {}).length > 0;

  const fileContext = hasFiles
    ? Object.entries(projectFiles)
        .map(([name, content]) => {
          const preview = content.length > 500 ? content.slice(0, 500) + '...' : content;
          return `Datei: ${name}\n\`\`\`\n${preview}\n\`\`\``;
        })
        .join('\n\n')
    : "Noch keine Dateien vorhanden. Lege bei Bedarf eine 'index.html' plus optional 'styles.css' und 'script.js' an.";
  const consoleContext = getConsoleHistorySummary(12);

  const systemInstruction = [
    "Du bist ein hilfreicher Code-Assistent, der Änderungen direkt im Projekt vornimmt.",
    "Nutze die bereitgestellten Tools 'createFile', 'updateFile' und 'deleteFile' konsequent, um Dateien anzulegen oder zu ändern. Es sind mehrere Tool-Aufrufe pro Antwort erlaubt.",
    "Wenn der Nutzer nur ein Ziel oder eine Idee nennt, entscheide selbst welche Dateien nötig sind (z.B. 'index.html', 'styles.css', 'script.js') und lege sie an bzw. aktualisiere sie mit vollständigem Inhalt.",
    "Lege fehlende HTML-Dateien an und verbinde sie mit CSS/JS; passe bestehende Dateien an, wenn das besser passt.",
    "Fasse dich in deiner Antwort kurz (1-2 Sätze) und erwähne, welche Dateien geändert oder erstellt wurden.",
    "Projektübersicht:",
    fileContext,
    "Neueste Konsolenausgaben aus der Vorschau:",
    consoleContext,
    `Aktive Datei: ${activeFile || "Keine"}`,
  ].join("\n\n");

  const baseBody = {
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    tools: GEMINI_TOOLS,
    generationConfig: {
      temperature: 0.35,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    toolConfig: {
      functionCallingConfig: {
        mode: "AUTO",
      },
    },
  };

  chatAbortController = new AbortController();

  try {
    let conversation = [...trimmedContents];
    let finalText = "";
    let safetyCounter = 0;
    let toolExecutionCount = 0;
    const MAX_TOOL_ROUNDS = 6;

    async function callGemini(contentsPayload) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...baseBody,
          contents: contentsPayload,
        }),
        signal: chatAbortController.signal,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = payload?.error?.message || `Gemini API Fehler (${response.status})`;
        throw new Error(message);
      }

      const candidate = payload?.candidates?.[0];
      const parts = candidate?.content?.parts || candidate?.parts || [];
      return parts;
    }

    while (safetyCounter < MAX_TOOL_ROUNDS && !finalText) {
      const parts = await callGemini(conversation);
      const functionCalls = parts.filter((part) => part.functionCall);
      const textParts = parts
        .map((part) => part?.text)
        .filter(Boolean)
        .join("\n")
        .trim();

      if (!functionCalls.length) {
        // Wenn keine Tools genutzt werden, fordere erneut explizit zur Tool-Nutzung auf.
        if (safetyCounter < MAX_TOOL_ROUNDS - 1) {
          conversation = [
            ...conversation,
            ...(textParts
              ? [
                  {
                    role: "model",
                    parts: [{ text: textParts }],
                  },
                ]
              : []),
            {
              role: "user",
              parts: [
                {
                  text:
                    "Nutze zwingend die vorhandenen Tools createFile/updateFile/deleteFile, um die gewünschten Änderungen vorzunehmen. Kein reiner Text, bitte rufe die Funktionen mit den Dateiinhalten auf.",
                },
              ],
            },
          ];
          safetyCounter += 1;
          continue;
        }

        finalText = textParts || "Keine Tool-Ausführung erhalten.";
        break;
      }

      const toolResults = [];
      for (const part of functionCalls) {
        const toolCall = {
          name: part.functionCall.name,
          args: part.functionCall.args || {},
        };
        const result = await executeToolCall(toolCall);
        if (result?.success) {
          toolExecutionCount += 1;
        }
        toolResults.push({
          name: toolCall.name,
          args: toolCall.args,
          result: result,
        });
        const toolMessage = `🔧 Tool: ${toolCall.name}(${JSON.stringify(toolCall.args).slice(0, 100)}...)\n${result.success ? "✅" : "❌"} ${result.message}`;
        appendChatMessage("system", toolMessage);
      }

      conversation = [
        ...conversation,
        {
          role: "model",
          parts: functionCalls.map((fc) => ({ functionCall: fc.functionCall })),
        },
        {
          role: "function",
          parts: toolResults.map((tr) => ({
            functionResponse: {
              name: tr.name,
              response: tr.result,
            },
          })),
        },
      ];

      if (textParts) {
        conversation.push({
          role: "model",
          parts: [{ text: textParts }],
        });
      }

      safetyCounter += 1;
    }

    if (!finalText) {
      finalText = "Keine finale Antwort nach mehreren Werkzeug-Schritten.";
    }

    updateChatMessage(pendingMessage.id, {
      content: finalText,
      state: "complete",
    });
    const statusType = toolExecutionCount > 0 ? "success" : "warning";
    setStatus(toolExecutionCount > 0 ? "Gemini-Antwort erhalten" : "Keine Tool-Ausführung erkannt", statusType);
    showToast(toolExecutionCount > 0 ? "Gemini-Antwort bereit" : "Gemini antwortete ohne Änderungen");
  } catch (error) {
    if (error.name === "AbortError") {
      updateChatMessage(pendingMessage.id, {
        content: "Anfrage abgebrochen.",
        state: "error",
      });
      showToast("Gemini-Anfrage abgebrochen");
      setStatus("Gemini-Anfrage abgebrochen", "info");
    } else {
      console.error("Gemini-Anfrage fehlgeschlagen:", error);
      updateChatMessage(pendingMessage.id, {
        content: `Fehler: ${error.message}`,
        state: "error",
      });
      showToast("Gemini konnte keine Antwort liefern");
      setStatus("Gemini-Fehler", "error");
    }
  } finally {
    chatAbortController = null;
    setChatBusy(false);
    updateChatAvailability();
    if (chatTextarea && !chatTextarea.disabled) {
      chatTextarea.focus();
    }
  }
}

function regenerateLastResponse() {
  if (chatIsBusy) {
    return;
  }
  if (!hasGeminiApiKey()) {
    showToast("Bitte lege einen Gemini-API-Schlüssel in den Einstellungen an.");
    setStatus("Gemini-Schlüssel fehlt", "warning");
    return;
  }
  if (!lastUserPrompt) {
    showToast("Keine letzte Anfrage zum Neu-Generieren gefunden.");
    return;
  }

  const lastAssistantIndex = (() => {
    for (let i = chatMessagesState.length - 1; i >= 0; i -= 1) {
      if (chatMessagesState[i].role === "assistant") {
        return i;
      }
    }
    return -1;
  })();

  if (lastAssistantIndex !== -1) {
    chatMessagesState.splice(lastAssistantIndex, 1);
  }
  renderChatMessages();
  updateChatActionStates();
  sendChatPrompt(lastUserPrompt, { reuseLastUser: true });
}

function initializeChatInterface() {
  if (!chatMessagesContainer || !chatInputForm || !chatTextarea || !chatSendButton) {
    return;
  }

  resetChatConversation();

  chatInputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatIsBusy) {
      return;
    }
    const prompt = (chatTextarea.value || "").trim();
    if (!prompt) {
      updateChatAvailability();
      return;
    }
    chatTextarea.value = "";
    updateChatAvailability();
    sendChatPrompt(prompt);
  });

  chatTextarea.addEventListener("input", () => {
    updateChatAvailability();
  });

  chatTextarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const text = (chatTextarea.value || "").trim();
      const canSend = !chatIsBusy && hasGeminiApiKey() && Boolean(text);
      if (canSend) {
        event.preventDefault();
        if (typeof chatInputForm.requestSubmit === "function") {
          chatInputForm.requestSubmit();
        } else {
          chatInputForm.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
      }
    }
  });

  updateChatAvailability();
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

function initializeSettingsModal() {
  if (!openSettingsButton || !settingsModal) {
    return;
  }

  const dialog = settingsModal.querySelector(".settings-modal__dialog");
  if (!dialog) {
    return;
  }

  const closeControls = settingsModal.querySelectorAll("[data-close-settings]");
  const overlay = settingsModal.querySelector(".settings-modal__overlay");
  const tabButtons = settingsModal.querySelectorAll("[data-settings-tab]");
  const panels = settingsModal.querySelectorAll("[data-settings-panel]");
  let focusableElements = [];
  let previouslyFocusedElement = null;

  const selectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function trapFocus(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab" || !focusableElements.length) {
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !focusableElements.includes(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function activateTab(target) {
    if (!target) {
      return;
    }

    tabButtons.forEach((button) => {
      const isActive = button.dataset.settingsTab === target;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const matches = panel.dataset.settingsPanel === target;
      panel.classList.toggle("is-active", matches);
      panel.toggleAttribute("hidden", !matches);
    });
  }

  function openModal() {
    if (settingsModal.classList.contains("is-open")) {
      return;
    }
    previouslyFocusedElement = document.activeElement;
    updateGeminiStatusMessage();
    populateGeminiModelSelect(cachedGeminiModels, loadGeminiModel());
    settingsModal.classList.add("is-open");
    settingsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    focusableElements = Array.from(dialog.querySelectorAll(selectors)).filter(
      (element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden")
    );
    (focusableElements[0] || dialog).focus();
    document.addEventListener("keydown", trapFocus);
    showToast("Einstellungen geöffnet");
  }

  function closeModal() {
    settingsModal.classList.remove("is-open");
    settingsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", trapFocus);
    focusableElements = [];
    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function") {
      previouslyFocusedElement.focus();
    } else if (openSettingsButton) {
      openSettingsButton.focus();
    }
  }

  openSettingsButton.addEventListener("click", openModal);
  closeControls.forEach((control) => {
    control.addEventListener("click", closeModal);
  });

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.settingsTab;
      activateTab(target);
    });
  });

  if (tabButtons.length) {
    const active = Array.from(tabButtons).find((button) => button.classList.contains("is-active"));
    activateTab(active?.dataset.settingsTab || tabButtons[0].dataset.settingsTab);
  }

}

function initializeGeminiSettings() {
  updateGeminiStatusMessage();
  if (!geminiSettingsForm || !geminiKeyInput) {
    return;
  }

  let revealKey = false;
  populateGeminiModelSelect(cachedGeminiModels, loadGeminiModel());
  updateGeminiTestStatus("Keine Verbindung getestet.", "idle");
  updateChatAvailability();

  function setVisibilityState(visible) {
    revealKey = Boolean(visible);
    geminiKeyInput.type = revealKey ? "text" : "password";
    if (geminiToggleButton) {
      geminiToggleButton.textContent = revealKey ? "Verbergen" : "Anzeigen";
      geminiToggleButton.setAttribute(
        "aria-label",
        revealKey ? "API-Schlüssel verbergen" : "API-Schlüssel anzeigen"
      );
    }
  }

  geminiSettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = (geminiKeyInput.value || "").trim();
    if (!value) {
      setStatus("Bitte den Gemini-Schlüssel eingeben", "warning");
      showToast("API-Schlüssel fehlt");
      geminiKeyInput.focus();
      return;
    }

    saveGeminiApiKey(value);
    geminiSettingsForm.reset();
    setVisibilityState(false);
    updateGeminiStatusMessage();
    populateGeminiModelSelect(cachedGeminiModels, loadGeminiModel());
    setStatus("Gemini verbunden", "success");
    showToast("Gemini API-Schlüssel gespeichert");
    updateChatAvailability();
  });

  geminiToggleButton?.addEventListener("click", () => {
    setVisibilityState(!revealKey);
    if (revealKey) {
      geminiKeyInput.focus();
    }
  });

  geminiClearButton?.addEventListener("click", () => {
    if (!hasGeminiApiKey()) {
      showToast("Es ist kein Schlüssel hinterlegt");
      return;
    }
    clearGeminiApiKey();
    geminiSettingsForm.reset();
    setVisibilityState(false);
    updateGeminiStatusMessage();
    populateGeminiModelSelect(cachedGeminiModels, "");
    setStatus("Gemini getrennt", "info");
    showToast("Gemini API-Schlüssel gelöscht");
    updateGeminiTestStatus("Keine Verbindung getestet.", "idle");
    updateChatAvailability();
  });

  geminiTestButton?.addEventListener("click", async () => {
    const inlineKey = (geminiKeyInput?.value || "").trim();
    const storedKey = loadGeminiApiKey();
    const apiKey = inlineKey || storedKey;
    if (!apiKey) {
      updateGeminiTestStatus("Bitte zuerst einen Gemini-Schlüssel speichern oder eingeben.", "error");
      showToast("Gemini-Schlüssel erforderlich");
      setStatus("Gemini-Schlüssel fehlt", "warning");
      geminiKeyInput?.focus();
      return;
    }

    if (geminiTestButton) {
      geminiTestButton.disabled = true;
    }
    updateGeminiTestStatus("Verbindung wird getestet …", "loading");

    try {
      const models = await fetchGeminiModels(apiKey);
      cachedGeminiModels = models.length ? models : GEMINI_DEFAULT_MODELS;
      populateGeminiModelSelect(cachedGeminiModels, loadGeminiModel());
      updateGeminiTestStatus(`Verbindung erfolgreich. ${cachedGeminiModels.length} Modelle gefunden.`, "success");
      setStatus("Gemini-Verbindung OK", "success");
      showToast("Gemini-Verbindung erfolgreich getestet");
      updateChatAvailability();
      if (!storedKey && inlineKey) {
        showToast("Speichere den Schlüssel, um ihn dauerhaft zu nutzen.");
      }
    } catch (error) {
      console.warn("Gemini Verbindung fehlgeschlagen:", error);
      updateGeminiTestStatus(`Fehler: ${error.message}`, "error");
      setStatus("Gemini-Verbindung fehlgeschlagen", "error");
      showToast("Gemini-Verbindung fehlgeschlagen");
    } finally {
      if (geminiTestButton) {
        geminiTestButton.disabled = false;
      }
    }
  });

  geminiModelSelect?.addEventListener("change", () => {
    const value = geminiModelSelect.value;
    saveGeminiModel(value);
    if (value) {
      showToast(`Gemini-Modell gesetzt: ${value}`);
      setStatus("Gemini-Modell gespeichert", "success");
    } else {
      showToast("Gemini-Modell zurückgesetzt");
      setStatus("Gemini-Modell zurückgesetzt", "info");
    }
    updateChatAvailability();
  });

  geminiResetModelsButton?.addEventListener("click", () => {
    saveGeminiModel("");
    populateGeminiModelSelect(cachedGeminiModels, "");
    showToast("Gemini-Modellauswahl zurückgesetzt");
    setStatus("Gemini-Modell zurückgesetzt", "info");
  });
}

function initializeChatActions() {
  if (!chatActionButtons?.length) {
    return;
  }

  chatActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.chatAction;
      if (action === "stop") {
        stopChatRequest();
        return;
      }
      if (action === "regenerate") {
        regenerateLastResponse();
        return;
      }
      if (action === "clear") {
        clearChatConversation();
        return;
      }
    });
  });

  updateChatActionStates();
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
const openSettingsButton = document.getElementById("open-settings-button");
const settingsModal = document.getElementById("settings-modal");
const geminiSettingsForm = document.getElementById("gemini-settings-form");
const geminiKeyInput = document.getElementById("gemini-api-key-input");
const geminiKeyStatus = document.getElementById("gemini-key-status");
const geminiToggleButton = document.querySelector('[data-gemini-action="toggle"]');
const geminiClearButton = document.querySelector('[data-gemini-action="clear"]');
const geminiTestButton = document.querySelector('[data-gemini-action="test"]');
const geminiResetModelsButton = document.querySelector('[data-gemini-action="reset-models"]');
const geminiTestStatus = document.getElementById("gemini-test-status");
const geminiModelSelect = document.getElementById("gemini-model-select");
const chatMessagesContainer = document.querySelector(".chat-messages");
const chatInputForm = document.getElementById("chat-form");
const chatTextarea = document.getElementById("chat-input-textarea");
const chatSendButton = document.querySelector('[data-chat-send]');
const chatActionButtons = document.querySelectorAll('.chat-action-button');

const renameFileButton = document.getElementById("rename-file-button");
const startScreenEl = document.getElementById("start-screen");
const startResumeButton = document.getElementById("start-resume-button");
const startExampleButton = document.getElementById("start-example-button");
const startBlankButton = document.getElementById("start-blank-button");
const startFolderButton = document.getElementById("start-folder-button");
const startMetaFolder = document.getElementById("start-meta-folder");

let toastTimeout;
let chatMessagesState = [];
let chatIsBusy = false;
let chatAbortController = null;
let lastUserPrompt = "";
let nextChatMessageId = 1;
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
let consoleHistory = [];

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
const CONSOLE_HISTORY_LIMIT = 120;

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

function handleDeleteFile() {
  if (!activeFile) {
    showToast("Keine Datei ausgewählt");
    return;
  }

  const fileCount = Object.keys(projectFiles).length;
  if (fileCount <= 1) {
    showToast("Die letzte Datei kann nicht gelöscht werden");
    setStatus("Mindestens eine Datei muss im Projekt bleiben", "warning");
    return;
  }

  const confirmed = window.confirm(`Datei "${activeFile}" wirklich löschen?\n\nDieser Vorgang kann nicht rückgängig gemacht werden.`);
  if (!confirmed) {
    return;
  }

  const deletedFile = activeFile;
  delete projectFiles[deletedFile];
  fileHandles.delete(deletedFile);

  const remainingFiles = Object.keys(projectFiles);
  activeFile = remainingFiles[0] || null;

  if (currentPreviewFile === deletedFile) {
    currentPreviewFile = determinePreviewFileForProject(projectFiles, activeFile);
  }

  saveProjectFiles();
  saveActiveFileName(activeFile);
  renderFileList();
  syncEditorWithActiveFile({ focus: true });

  if (activeFile && isHTMLFile(activeFile)) {
    updatePreview({ resetLogs: true, silent: true });
  } else if (activeFile) {
    schedulePreviewUpdate();
  } else {
    resetConsole();
    if (previewFrame) {
      previewFrame.srcdoc = "";
    }
  }

  setStatus(`Datei gelöscht: ${deletedFile}`, "success");
  showToast("Datei gelöscht");
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
  consoleHistory = [];
  if (consoleLogEl) {
    consoleLogEl.textContent = "";
    consoleLogEl.scrollTop = 0;
  }
}

function formatConsoleLines(level, message, details) {
  const icon = {
    log: "➜",
    info: "ℹ️",
    warn: "⚠️",
    error: "⛔",
    debug: "🐞",
    trace: "🧵",
    table: "📊",
  }[level] || "➜";

  const lines = [];
  const primary =
    typeof message === "string" && message.length
      ? message
      : Array.isArray(details?.args)
        ? details.args.join(" ")
        : "";

  lines.push(primary ? `${icon} ${primary}` : icon);

  if (details?.stack && typeof details.stack === "string") {
    lines.push(details.stack);
  }

  if (details?.table) {
    const table = details.table;
    if (Array.isArray(table.headers) && Array.isArray(table.rows)) {
      const widths = table.headers.map((header, index) => {
        const headerWidth = String(header ?? "").length;
        const rowWidth = Math.max(
          0,
          ...table.rows.map((row) => String(row[index] ?? "").length)
        );
        return Math.max(headerWidth, rowWidth);
      });

      const divider =
        "+" +
        widths
          .map((width) => `${"-".repeat(width + 2)}`)
          .join("+") +
        "+";
      const headerLine =
        "|" +
        table.headers
          .map((header, index) => {
            const value = String(header ?? "");
            return ` ${value.padEnd(widths[index])} `;
          })
          .join("|") +
        "|";
      const rowLines = table.rows.map((row) =>
        "|" +
        table.headers
          .map((_, index) => {
            const value = String(row[index] ?? "");
            return ` ${value.padEnd(widths[index])} `;
          })
          .join("|") +
        "|"
      );

      lines.push(divider, headerLine, divider, ...rowLines, divider);
      if (table.truncated && typeof table.total === "number") {
        const remaining = table.total - table.rows.length;
        if (remaining > 0) {
          lines.push(`… ${remaining} weitere Zeile${remaining === 1 ? "" : "n"} ausgeblendet`);
        }
      }
    }
  }

  return lines;
}

function appendConsoleMessage(level, message, details = {}) {
  const lines = formatConsoleLines(level, message, details);
  consoleHistory.push({ level, lines, timestamp: Date.now() });
  if (consoleHistory.length > CONSOLE_HISTORY_LIMIT) {
    consoleHistory = consoleHistory.slice(-CONSOLE_HISTORY_LIMIT);
  }

  if (consoleLogEl) {
    consoleLogEl.textContent += `${lines.join("\n")}\n`;
    consoleLogEl.scrollTop = consoleLogEl.scrollHeight;
  }
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
    const MAX_TABLE_ROWS = 30;

    const formatValue = (value) => {
      if (typeof value === "string") {
        return value;
      }
      if (value instanceof Error) {
        return value.stack || value.message || value.name;
      }
      if (typeof value === "object" && value !== null) {
        try {
          return JSON.stringify(value, null, 2);
        } catch (error) {
          if (typeof value.toString === "function") {
            return value.toString();
          }
          return Object.prototype.toString.call(value);
        }
      }
      return String(value);
    };

    const buildTable = (input, columns) => {
      if (!input || typeof input !== "object") {
        return null;
      }

      const entries = Array.isArray(input)
        ? input.map((item, index) => [index, item])
        : Object.entries(input);

      if (!entries.length) {
        return { headers: ["(index)"], rows: [], truncated: false, total: 0 };
      }

      const limit = Math.min(entries.length, MAX_TABLE_ROWS);
      const headersSet = new Set(["(index)"]);
      const rows = [];

      for (let i = 0; i < limit; i += 1) {
        const [key, value] = entries[i];
        const row = { "(index)": key };
        if (value && typeof value === "object") {
          const props = Array.isArray(columns) && columns.length
            ? columns
            : Object.keys(value);
          props.forEach((prop) => {
            headersSet.add(prop);
            row[prop] = formatValue(value[prop]);
          });
        } else {
          headersSet.add("value");
          row.value = formatValue(value);
        }
        rows.push(row);
      }

      const headers = Array.from(headersSet);
      const normalizedRows = rows.map((row) =>
        headers.map((header) => (row[header] === undefined ? "" : row[header]))
      );

      return {
        headers,
        rows: normalizedRows,
        truncated: entries.length > limit,
        total: entries.length,
      };
    };

    const post = (payload) =>
      window.parent.postMessage(
        Object.assign({ source: "webeditor-preview" }, payload),
        "*"
      );

    const sendEntry = (level, message, extras) => {
      post(
        Object.assign(
          { type: "console", level, message },
          extras || {}
        )
      );
    };

    ["log", "info", "warn", "error", "debug"].forEach((level) => {
      const original = console[level];
      console[level] = function () {
        const args = Array.prototype.slice.call(arguments);
        const formattedArgs = args.map(formatValue);
        const message = formattedArgs.join(" ");
        sendEntry(level, message, { args: formattedArgs });
        if (original) {
          return original.apply(console, args);
        }
        return undefined;
      };
    });

    const originalTrace = console.trace;
    console.trace = function () {
      const args = Array.prototype.slice.call(arguments);
      const formattedArgs = args.map(formatValue);
      const message = formattedArgs.length ? formattedArgs.join(" ") : "Trace";
      const stack = new Error().stack || "";
      sendEntry("trace", message, { args: formattedArgs, stack });
      if (originalTrace) {
        return originalTrace.apply(console, args);
      }
      return undefined;
    };

    const originalTable = console.table;
    console.table = function () {
      const args = Array.prototype.slice.call(arguments);
      const table = buildTable(args[0], args[1]);
      const formattedArgs = args.map(formatValue);
      const message = table ? "Table" : formattedArgs.join(" ");
      sendEntry("table", message, { args: formattedArgs, table });
      if (originalTable) {
        return originalTable.apply(console, args);
      }
      return undefined;
    };

    const originalClear = console.clear;
    console.clear = function () {
      post({ type: "console", action: "clear" });
      if (originalClear) {
        return originalClear.apply(console, arguments);
      }
      return undefined;
    };

    window.addEventListener("error", function (event) {
      const stack =
        event.error && event.error.stack
          ? event.error.stack
          : event.filename + ":" + event.lineno + ":" + event.colno;
      sendEntry(
        "error",
        event.message + " (" + event.filename + ":" + event.lineno + ")",
        { stack }
      );
    });

    window.addEventListener("unhandledrejection", function (event) {
      const reason = event.reason;
      const message = reason
        ? "Unhandled promise rejection: " + formatValue(reason)
        : "Unhandled promise rejection";
      const stack =
        reason && typeof reason === "object" && reason.stack
          ? reason.stack
          : "";
      sendEntry("error", message, { stack });
    });

    const normalizeNavigationTarget = (href) => {
      if (!href) {
        return "";
      }

      let target = href.trim();
      if (!target) {
        return "";
      }

      if (target.startsWith("http://") || target.startsWith("https://")) {
        const start = target.indexOf("//") + 2;
        const pathIndex = target.indexOf("/", start);
        target = pathIndex === -1 ? "" : target.slice(pathIndex);
      }

      while (target.startsWith("./")) {
        target = target.slice(2);
      }

      while (target.startsWith("../")) {
        target = target.slice(3);
      }

      while (target.startsWith("/")) {
        target = target.slice(1);
      }

      const queryIndex = target.indexOf("?");
      const hashIndex = target.indexOf("#");
      const cutIndex = [queryIndex, hashIndex]
        .filter((index) => index !== -1)
        .reduce((min, index) => (min === -1 || index < min ? index : min), -1);

      if (cutIndex !== -1) {
        target = target.slice(0, cutIndex);
      }

      return target;
    };

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
          const normalized = normalizeNavigationTarget(href);
          if (normalized) {
            post({ action: "navigate", file: normalized });
          }
        }
      },
      true
    );
  })();`;

  const consoleScriptTag = `<script>
${consoleBridgeSource}
</scr` + `ipt>`;

  const injectConsoleBridge = (html) => {
    const content = typeof html === "string" ? html : "";
    if (/<script\b[^>]*>/i.test(content)) {
      return content.replace(/<script\b[^>]*>/i, (match) => `${consoleScriptTag}
${match}`);
    }
    if (/<body([^>]*)>/i.test(content)) {
      return content.replace(/<body([^>]*)>/i, (match, attrs) => `<body${attrs}>${consoleScriptTag}`);
    }
    if (/<head([^>]*)>/i.test(content)) {
      return content.replace(/<head([^>]*)>/i, (match, attrs) => `<head${attrs}>${consoleScriptTag}`);
    }
    return `${consoleScriptTag}${content}`;
  };

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

    const placeholderDoc = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Live Vorschau</title>
    ${stylesMarkup}
    ${placeholderStyles}
  </head>
  <body>
    <main class="preview-placeholder">
      <h2>Keine HTML-Vorschau</h2>
      <p>${message}</p>
      <p>Füge eine <code>.html</code>-Datei hinzu oder wechsle zu einer vorhandenen Seite, um die Vorschau zu aktivieren.</p>
    </main>
    ${scriptsMarkup}
  </body>
</html>`;

    return injectConsoleBridge(placeholderDoc);
  }

  const baseHTMLSource = projectFiles[targetFile];
  const fallbackHTML = getDefaultContentForFile(targetFile) ?? "";
  const baseHTML = baseHTMLSource !== undefined ? baseHTMLSource : fallbackHTML;

  if (!/<body[\s>]/i.test(baseHTML)) {
    let docWithoutBody = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Live Vorschau</title>
    ${stylesMarkup}
  </head>
  <body>
    ${baseHTML}
    ${scriptsMarkup}
  </body>
</html>`;
    docWithoutBody = injectConsoleBridge(docWithoutBody);
    return docWithoutBody;
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

  output = injectConsoleBridge(output);

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

  if (
    data.action === "console-clear" ||
    data.action === "clear" ||
    (data.type === "console" && (data.action === "clear" || data.action === "console-clear"))
  ) {
    resetConsole();
    return;
  }

  if (data.type === "console") {
    appendConsoleMessage(data.level || "log", data.message ?? data.data ?? "", data);
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
const deleteFileButton = document.getElementById("delete-file-button");
deleteFileButton?.addEventListener("click", handleDeleteFile);
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
initializeSettingsModal();
initializeGeminiSettings();
initializeChatInterface();
initializeChatActions();
initializeLayoutToggles();

showStartScreen();

if (!projectInitializedFromStorage) {
  setStatus("Projekt auswählen", "info");
} else {
  setStatus("Gespeichertes Projekt verfügbar", "info");
}

function getChatIntroText() {
  return "Verbinde Google Gemini in den Einstellungen, um hier Fragen zu deinem Projekt zu stellen und Code-Vorschläge zu erhalten.";
}

function renderChatMessages() {
  if (!chatMessagesContainer) {
    return;
  }
  chatMessagesContainer.innerHTML = "";
  chatMessagesState.forEach((msg) => {
    const div = document.createElement("div");
    div.className = `chat-message chat-message--${msg.role}`;
    if (msg.state === "pending") {
      div.classList.add("chat-message--pending");
    }
    if (msg.state === "error") {
      div.classList.add("chat-message--error");
    }

    const titleSpan = document.createElement("span");
    titleSpan.className = "chat-message__title";

    let icon = "";
    let label = "";

    switch (msg.role) {
      case "user":
        icon = "👤";
        label = "Du";
        break;
      case "assistant":
      case "model":
        icon = "✨";
        label = "Gemini";
        break;
      case "system":
        icon = "⚙️";
        label = "Hinweis";
        break;
      default:
        icon = "💬";
        label = "Nachricht";
    }

    titleSpan.textContent = `${icon} ${label}`;
    div.appendChild(titleSpan);

    const contentP = document.createElement("p");
    contentP.textContent = msg.content;
    div.appendChild(contentP);

    chatMessagesContainer.appendChild(div);
  });

  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}
