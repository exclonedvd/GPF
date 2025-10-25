# GPF Training Hub – Difesa Terrestre / Combat Readiness / Ws3

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



