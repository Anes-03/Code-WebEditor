import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.8.0";

const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>KI HTML Playground</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 0 1rem;
        background: radial-gradient(circle at top, #1d4ed8 0%, #020617 65%);
        color: #f8fafc;
      }

      main {
        text-align: center;
        max-width: 460px;
        display: grid;
        gap: 1.2rem;
        background: rgba(2, 6, 23, 0.6);
        border-radius: 18px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        padding: 2.2rem 2rem;
        box-shadow: 0 25px 50px rgba(15, 23, 42, 0.4);
      }

      button {
        background: linear-gradient(135deg, #38bdf8, #3b82f6);
        border: none;
        color: #0f172a;
        font-weight: 700;
        padding: 0.85rem 1.75rem;
        border-radius: 999px;
        cursor: pointer;
        transition: transform 0.18s ease;
      }

      button:hover {
        transform: translateY(-2px);
      }

      code {
        background: rgba(15, 23, 42, 0.65);
        padding: 0.2rem 0.45rem;
        border-radius: 6px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Willkommen im WebEditor 🚀</h1>
      <p>
        Dieser Playground läuft komplett clientseitig. Bearbeite den Code und
        klicke oben im Editor auf <code>Code ausführen</code>, um das Ergebnis
        live zu sehen.
      </p>
      <button onclick="sayHello()">Sag Hallo</button>
    </main>
    <script>
      function sayHello() {
        console.log("Hallo von der Vorschau!");
        alert("Viel Spaß mit deinem KI-unterstützten Editor 🎉");
      }
    </scr` + `ipt>
  </body>
</html>`;

const statusPill = document.getElementById("status-pill");
const toastEl = document.getElementById("toast");
const aiOutputEl = document.getElementById("ai-output");
const consoleLogEl = document.getElementById("console-log");

let toastTimeout;
let textGenerationPipelinePromise = null;
let isModelLoading = false;
let isAIActionRunning = false;

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

function initializeEditor() {
  if (!window.ace) {
    throw new Error("Ace Editor konnte nicht geladen werden.");
  }

  const editor = window.ace.edit("editor");
  editor.setTheme("ace/theme/one_dark");
  editor.session.setMode("ace/mode/html");
  editor.session.setUseSoftTabs(true);
  editor.session.setTabSize(2);
  editor.setOption("fontSize", "15px");
  editor.setOption("showPrintMargin", false);
  editor.setOption("wrap", true);
  editor.renderer.setScrollMargin(16, 16);
  editor.session.setValue(DEFAULT_CODE.trim(), -1);

  return editor;
}

const editorInstance = initializeEditor();
const runButton = document.getElementById("run-button");
const resetButton = document.getElementById("reset-button");
const formatButton = document.getElementById("format-button");
const aiCompleteButton = document.getElementById("ai-complete-button");
const aiExplainButton = document.getElementById("ai-explain-button");
const previewFrame = document.getElementById("preview-frame");

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

function buildPreviewDocument(userCode) {
  const consoleScript = `
    <script>
      (function() {
        const send = (level, data) => window.parent.postMessage(
          { source: "webeditor-preview", level, data },
          "*"
        );

        ["log", "info", "warn", "error"].forEach(level => {
          const original = console[level];
          console[level] = function(...args) {
            const formatted = args.map((item) => {
              if (typeof item === "object") {
                try {
                  return JSON.stringify(item, null, 2);
                } catch (error) {
                  return String(item);
                }
              }
              return String(item);
            }).join(" ");
            send(level, formatted);
            if (original) {
              original.apply(console, args);
            }
          };
        });

        window.addEventListener("error", (event) => {
          send("error", event.message + " (" + event.filename + ":" + event.lineno + ")");
        });
      })();
    </scr` + `ipt>
  `;

  if (/<body[\s>]/i.test(userCode)) {
    return userCode.replace(/<body([^>]*)>/i, (match, attrs) => {
      return `<body${attrs}>${consoleScript}`;
    });
  }

  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Live Vorschau</title>
  </head>
  <body>
    ${consoleScript}
    ${userCode}
  </body>
</html>`;
}

function runCode() {
  const code = editorInstance.getValue();
  resetConsole();

  const compiled = buildPreviewDocument(code);
  previewFrame.srcdoc = compiled;

  setStatus("Vorschau aktualisiert", "success");
  showToast("Code ausgeführt");
}

async function formatCode() {
  if (!window.html_beautify) {
    setStatus("Formatter nicht verfügbar", "warning");
    showToast("Formatter konnte nicht geladen werden.");
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
  editorInstance.setValue(DEFAULT_CODE.trim(), -1);
  setStatus("Editor zurückgesetzt", "info");
  showToast("Vorlage wiederhergestellt");
  runCode();
}

async function getTextGenerationPipeline() {
  if (textGenerationPipelinePromise) {
    return textGenerationPipelinePromise;
  }
  if (isModelLoading) {
    setAIOutput(
      "Lade das KI-Modell... das passiert nur beim ersten Aufruf.",
      "info"
    );
    return textGenerationPipelinePromise;
  }

  isModelLoading = true;
  setStatus("Lade KI-Modell ...", "info");
  setAIOutput("KI-Modell wird geladen. Dies kann einige Sekunden dauern.", "info");
  showToast("KI-Modell wird geladen …");

  textGenerationPipelinePromise = pipeline(
    "text2text-generation",
    "Xenova/LaMini-Flan-T5-77M"
  )
    .then((result) => {
      setStatus("KI bereit", "success");
      showToast("KI-Modell erfolgreich geladen");
      return result;
    })
    .catch((error) => {
      setStatus("KI Fehler", "error");
      setAIOutput(
        "Das KI-Modell konnte nicht geladen werden. Prüfe die Konsole für Details.",
        "error"
      );
      console.error("Fehler beim Laden des KI-Modells:", error);
      throw error;
    })
    .finally(() => {
      isModelLoading = false;
    });

  return textGenerationPipelinePromise;
}

function setAIOutput(message, state = "info") {
  if (!aiOutputEl) return;
  aiOutputEl.classList.remove("error", "info", "success", "warning");
  aiOutputEl.classList.add(state);
  aiOutputEl.innerHTML = `<p>${message}</p>`;
}

function setAIHTML(html, state = "info") {
  if (!aiOutputEl) return;
  aiOutputEl.classList.remove("error", "info", "success", "warning");
  aiOutputEl.classList.add(state);
  aiOutputEl.innerHTML = html;
}

async function handleAIAutocomplete() {
  if (isAIActionRunning) return;
  isAIActionRunning = true;
  aiCompleteButton.disabled = true;
  aiExplainButton.disabled = true;

  try {
    const code = editorInstance.getValue();
    if (!code.trim()) {
      setStatus("Kein Code zum Vervollständigen", "warning");
      setAIOutput(
        "Bitte gib etwas Code ein, bevor du eine KI-Vervollständigung anforderst.",
        "warning"
      );
      return;
    }

    setStatus("KI generiert Vorschlag …", "info");
    setAIOutput("KI erstellt einen Vorschlag …", "info");

    const generator = await getTextGenerationPipeline();
    const cursorPosition = editorInstance.getCursorPosition();

    const prompt = `Du bist eine hilfreiche KI, die Code vervollständigt.
    Nutze einen modernen, klaren Stil und antworte ausschließlich mit dem fehlenden Code.
    Fortzuführender Code:

${code}

    Vervollständigung:`;

    const [{ generated_text }] = await generator(prompt, {
      max_new_tokens: 160,
      temperature: 0.6,
      top_p: 0.95,
      repetition_penalty: 1.05,
    });

    const completion = (generated_text || "")
      .replace(prompt, "")
      .replace(/^Vervollständigung:\s*/i, "")
      .trim();

    if (!completion) {
      setAIOutput("Die KI konnte keine sinnvolle Ergänzung finden.", "warning");
      setStatus("Keine Ergänzung gefunden", "warning");
      return;
    }

    editorInstance.session.insert(cursorPosition, `\n${completion}\n`);
    setStatus("KI-Vorschlag eingefügt", "success");
    setAIHTML(
      `<strong>KI-Vorschlag eingefügt.</strong><br /><pre>${escapeHTML(
        completion
      )}</pre>`,
      "success"
    );
    showToast("KI-Vorschlag eingefügt");
  } catch (error) {
    console.error("Fehler bei der KI-Vervollständigung:", error);
    setStatus("KI Fehler", "error");
    setAIOutput(
      "Beim Generieren des Vorschlags ist ein Fehler aufgetreten. Details findest du in der Konsole.",
      "error"
    );
  } finally {
    isAIActionRunning = false;
    aiCompleteButton.disabled = false;
    aiExplainButton.disabled = false;
  }
}

async function handleAIExplain() {
  if (isAIActionRunning) return;
  isAIActionRunning = true;
  aiCompleteButton.disabled = true;
  aiExplainButton.disabled = true;

  try {
    const selected = editorInstance.getSelectedText() || editorInstance.getValue();
    if (!selected.trim()) {
      setStatus("Kein Code ausgewählt", "warning");
      setAIOutput(
        "Markiere einen Codeabschnitt oder gib Code ein, damit die KI ihn erklären kann.",
        "warning"
      );
      return;
    }

    setStatus("KI analysiert Code …", "info");
    setAIOutput("Die KI erstellt gerade eine Erklärung …", "info");

    const generator = await getTextGenerationPipeline();
    const prompt = `Erkläre den folgenden Code Schritt für Schritt in deutscher Sprache.
    Gehe besonders auf wichtige Funktionen, DOM-Operationen und mögliche Verbesserungen ein.

${selected}

    Erklärung:`;

    const [{ generated_text }] = await generator(prompt, {
      max_new_tokens: 220,
      temperature: 0.5,
      top_p: 0.9,
    });

    const explanation = (generated_text || "")
      .replace(prompt, "")
      .replace(/^Erklärung:\s*/i, "")
      .trim();

    if (!explanation) {
      setAIOutput(
        "Die KI konnte keine Erklärung generieren. Versuche es mit einem kürzeren Ausschnitt.",
        "warning"
      );
      setStatus("Keine Erklärung erhalten", "warning");
      return;
    }

    setAIHTML(
      `<strong>Erklärung:</strong><br />${formatParagraphs(explanation)}`,
      "success"
    );
    setStatus("KI-Erklärung erstellt", "success");
    showToast("KI-Erklärung verfügbar");
  } catch (error) {
    console.error("Fehler bei der KI-Erklärung:", error);
    setStatus("KI Fehler", "error");
    setAIOutput(
      "Beim Erstellen der Erklärung gab es ein Problem. Schau in die Konsole für Details.",
      "error"
    );
  } finally {
    isAIActionRunning = false;
    aiCompleteButton.disabled = false;
    aiExplainButton.disabled = false;
  }
}

function escapeHTML(source) {
  return source
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map((chunk) => `<p>${chunk.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

window.addEventListener("message", (event) => {
  if (!event.data || event.data.source !== "webeditor-preview") {
    return;
  }
  appendConsoleMessage(event.data.level, event.data.data);
});

runButton?.addEventListener("click", runCode);
resetButton?.addEventListener("click", resetEditor);
formatButton?.addEventListener("click", formatCode);
aiCompleteButton?.addEventListener("click", handleAIAutocomplete);
aiExplainButton?.addEventListener("click", handleAIExplain);

// Führe initialen Preview-Run aus.
runCode();
