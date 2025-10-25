# Simulatori Quiz – Difesa Terrestre / Combat Readiness / Ws3

SPA (Single Page Application) per allenarsi su tre banche dati distinte.  
Mobile-first, tema chiaro, **offline-ready (PWA)**, stampa in **PDF** con opzioni, immagini allegate alle domande.

---

## ✨ Funzionalità

- **3 simulatori** separati:
  - **Difesa Terrestre** → `data/difesa.json`
  - **Combat Readiness** → `data/combad.json`
  - **Ws3** → `data/ws3.json`
- **Modalità di allenamento**
  - *Misto casuale*
  - *Per materia*
  - Numero domande: **10 / 20 / 40 / Tutte**
  - Ordine risposte **sempre random**
  - Soluzione mostrata **subito dopo la risposta**
  - **Avanti / Indietro** durante il quiz
  - **Conferme** quando torni alla Home, ricarichi la pagina o termini prima del dovuto
  - **Ripeti solo gli errori** a fine sessione (scelta utente)
- **Esito & report**
  - Punteggio (es. `27/40`), **%**, tempo impiegato
  - Riepilogo errori (con evidenza della risposta corretta)
- **Stampa banca dati (PDF)**
  - Da **Home** o dalla **config** del simulatore → pagina `print.html`
  - Stampa **tutte le materie** o **una materia**
  - Opzione: **evidenziare** o **non evidenziare** la risposta corretta
  - Funziona anche **offline** (passaggio dati via `localStorage`)
- **PWA / Installa app**
  - Bottone **Installa app** in Home
  - **Android/Windows/Chrome/Edge**: prompt nativo quando disponibile; altrimenti si apre una **mini-guida**
  - **iOS (Safari)**: popup con **guida minimale** (Aggiungi alla Home)
  - Il tasto scompare se l’app è già installata
- **Compatibilità**
  - Mobile-first (smartphone e tablet), responsive
  - Funziona online; **offline** dopo la prima visita HTTPS (PWA cache)

---

## 📁 Struttura del progetto

```
.
├── index.html             # App principale (Home + Quiz + Install + Stampa)
├── print.html             # Pagina di stampa (PDF)
├── manifest.json          # PWA manifest
├── sw.js                  # Service Worker (cache offline)
├── logo.jpg               # Icona app (usata anche come favicon)
├── data/
│   ├── difesa.json
│   ├── combad.json
│   └── ws3.json
└── imags/
    └── ...                # Tutte le immagini usate dalle domande
```

---

## 🚀 Avvio

### Opzione A) GitHub Pages (**consigliato**, HTTPS + PWA)
1. Carica **tutti** i file in un repository.
2. Vai su **Settings → Pages → Build and deployment → Deploy from branch** (es. `main`, directory `/root`).
3. Attendi il deploy, poi visita l’URL GitHub Pages.
4. Alla **seconda visita** il Service Worker è attivo → l’app funziona anche **offline**.

**Installa app:**
- In Home trovi il bottone **Installa app**.  
  - Android/Windows/Chrome/Edge: se il prompt nativo è disponibile si apre; altrimenti viene mostrata una **mini‑guida**.  
  - iOS/Safari: appare una **guida** (Condividi → Aggiungi alla Home).

### Opzione B) Server locale
```bash
# Python 3
python -m http.server 8000
# poi visita: http://localhost:8000/
```

> In `file://` alcuni browser bloccano `fetch` dei `.json`. Usa un server o visita prima GitHub Pages per abilitare la cache PWA.

---

## 🖨️ Stampa in PDF

- Dalla **Home** o dalla **pagina di configurazione** del simulatore, clicca **“Stampa banca dati PDF / Visualizza banca dati”**.
- Scegli:
  - **Materia** (tutte / una specifica)
  - **Evidenzia risposte esatte** (on/off)
- Si apre `print.html`. Clicca **Stampa** → salva in PDF dal dialogo del browser.

> `print.html` carica i dati da **localStorage** quando arrivi dal bottone, quindi funziona anche **offline**.  
> In alternativa, `print.html?key=combad&materia=__ALL__&highlight=1` (richiede fetch attivo).

---

## 🧩 Formato dei JSON

Ogni file in `data/` segue questo schema:

```json
{
  "materie": [
    {
      "nome": "Nome materia",
      "domande": [
        {
          "id": "CODICE-001",
          "testo": "Testo della domanda",
          "risposte": ["A", "B", "C", "D"],
          "corretta": 1,
          "spiegazione": "Opzionale: spiegazione",
          "immagine": "imags/nomefile.jpg"
        }
      ]
    }
  ]
}
```

- `corretta` è l’indice **0–3** della risposta corretta.  
- `immagine` deve puntare a un file esistente in `imags/` (rispetta esattamente nome ed estensione).

---

## 🔧 Personalizzazione

### Nome app e icone
- `manifest.json` → `name`, `short_name`
- In `index.html` (consigliato per iOS):
  ```html
  <meta name="apple-mobile-web-app-title" content="Simulatori Quiz">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="apple-touch-icon" href="logo.jpg"> <!-- meglio PNG 180×180 -->
  ```

### Percorsi cartelle
- I dati sono letti da `data/` e le immagini da `imags/`.  
  Se cambi nomi/posizioni, aggiorna:
  - `DATA_FILES` in `index.html`
  - i riferimenti `immagine` dentro i JSON

---

## 🧯 Troubleshooting

**Il bottone “Installa app” non funziona**  
- Serve **HTTPS** (GitHub Pages) per il prompt nativo. In mancanza, appare una **mini‑guida** con i passaggi.  
- Se l’app è già in modalità standalone o segnata come installata, il bottone scompare.

**Immagini non visibili**  
- Controlla che i file siano in `imags/` con esatto **nome/estensione** come nel JSON (attenzione a `.jpg` vs `.jpeg` e maiuscole/minuscole).

**Aggiorno JSON/immagini ma vedo vecchie versioni**  
- Incrementa la versione del cache name in `sw.js` (es. `quizsim-v4`) e ricarica.  
- Esegui un **hard refresh** (Ctrl/Cmd+Shift+R).

**Apro in file:// e non carica i JSON**  
- Alcuni browser bloccano `fetch` di file locali → usa `python -m http.server` oppure pubblica su GitHub Pages.

---

## 🗺️ Roadmap (idee)
- Filtro stampa “solo domande con immagine”
- Numerazione visibile (es. `PAR-007`) in quiz e stampa
- Filtri avanzati per sotto-materie

---

## 📄 Licenza
Scegli e aggiungi un file `LICENSE` (es. **MIT**). Se non specifichi, il codice resta “tutti i diritti riservati”.
