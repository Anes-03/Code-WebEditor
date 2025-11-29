# Code WebEditor

Browserbasierter Code-Editor mit Live-Vorschau, Dateiverwaltung und optionalem KI-Chat (Google Gemini).

Der Editor laeuft komplett im Browser, laedt oder speichert lokale Dateien, aktualisiert die Vorschau automatisch und kann per Gemini-Chat Code fuer dich schreiben oder anpassen.

Er ist gedacht fuer schnelle HTML/CSS/JS-Prototypen ohne lokale IDE oder Build-Setup: Datei(en) importieren, Code anpassen, Vorschau beobachten, fertig. Das macht ihn praktisch fuer Workshops, Demos, Unterricht oder kurze Spikes, bei denen du keinen Dev-Server oder Node-Stack starten willst.

Ein Start-Screen fuehrt dich wahlweise in ein Beispiel-Layout (mehrere Seiten mit Navigation, Theme-Toggle und Interaktionen) oder in ein leeres Projekt. Das Projekt bleibt im Local Storage erhalten, laesst sich aber auch per File System Access API direkt vom Geraet laden und speichern. Console-Logs und Fehler der Vorschau landen in einem eigenen Panel, damit du Feedback ohne DevTools bekommst.

Der eingebaute Gemini-Chat kann Dateien anlegen, ersetzen oder loeschen, sobald du einen API-Key hinterlegt hast. Du bekommst damit einen KI-Co-Piloten, der das aktuelle Projekt kennt, Tool-Aufrufe ausfuehrt und dir kurze Antworten liefert, waehrend du weiter im Editor arbeitest.

## Highlights
- Live Preview: Autoupdate nach jeder Aenderung oder manuell per `Code ausfuehren`.
- Editor: Syntax-Highlighting (HTML/CSS/JS), Formatieren-Button, Konsole fuer Logs und Fehler.
- Dateien: Erstellen, umbenennen, loeschen, resetten; Projekte bleiben im Local Storage erhalten; Start-Screen mit leerem oder Beispiel-Projekt.
- Import/Export: Einzelne Dateien oder ganze Ordner via File System Access API (Chromium/localhost/https). Speichere geoeffnete Dateien zurueck auf das Geraet.
- KI-Assistent: Chat auf Basis von Google Gemini, der Dateien im Projekt per Tools anlegt oder aendert. Schnellaktionen (Stop/Neu generieren/Verlauf loeschen), Modellwahl, API-Key bleibt lokal.
- Layout: Panels (Dateien, Editor, Vorschau, Konsole, Chat) ein- und ausblendbar.

## Schnellstart
1. Repo clonen oder herunterladen.
2. `index.html` in einem modernen Chromium-Browser oeffnen. Fuer Ordner-Import und Speicherdialoge am besten ueber `http://localhost` oder HTTPS laufen lassen, z. B.:
   ```sh
   python -m http.server 8000
   # oder
   npx serve
   ```
3. Im Start-Screen ein Beispielprojekt, ein leeres Projekt oder einen lokalen Ordner waehlen. Bereits gespeicherte Projekte lassen sich fortsetzen.
4. Dateien links auswaehlen, im Editor anpassen und die Vorschau beobachten. Bei Bedarf `Code ausfuehren` klicken; die Autopreview laeuft sonst automatisch.
5. Fehler und Logs erscheinen in der Konsole unter der Vorschau.

## KI einrichten (Google Gemini)
- API-Key in der [Google AI Studio Console](https://makersuite.google.com/app/apikey) erzeugen.
- Einstellungen > Assistenten oeffnen, Key eintragen und speichern. Der Key wird nur lokal im Browser-Storage gehalten.
- Verbindung testen und optional ein Modell auswaehlen.
- Im Chat (rechtes Panel) Prompts formulieren; der Assistent kann Dateien anlegen, anpassen oder loeschen. Aktionen wie Stop/Neu generieren stehen unter dem Eingabefeld bereit.

## Arbeiten mit lokalen Dateien
- `Ordner importieren` liest ein ganzes Projekt (Chromium + File System Access API + Secure Context erforderlich).
- `Lokale Datei oeffnen` laedt einzelne Dateien; `Datei speichern` schreibt sie zurueck.
- Fallback: Der Editor speichert alle Dateien automatisch in `localStorage`, sodass du spaeter fortsetzen kannst.

## Technologien
- HTML, CSS, JavaScript
- [Ace Editor](https://ace.c9.io/) fuer Syntax-Highlighting
- [JS Beautify](https://beautifier.io/) fuer Formatieren
