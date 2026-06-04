/* components.jsx — hooks + icon set (exported to window) */

// ---------- hooks ----------
function useLocalStorage(key, initial) {
  const [v, setV] = React.useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s != null ? JSON.parse(s) : initial;
    } catch { return initial; }
  });
  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV];
}

function useNow() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// ---------- UI icons (currentColor) ----------
const IcGear = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IcArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IcChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chev" style={{ width: 13, height: 13 }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IcPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const IcEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);
const IcCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ---------- engine icons ----------
const EngGoogle = () => (
  <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.05H12v3.9h5.9a5.05 5.05 0 0 1-2.18 3.3v2.74h3.53c2.07-1.9 3.25-4.7 3.25-7.89z"/><path fill="#34A853" d="M12 23c2.94 0 5.4-.97 7.2-2.64l-3.52-2.73c-.98.66-2.23 1.05-3.68 1.05-2.83 0-5.23-1.91-6.08-4.48H2.28v2.82A10.86 10.86 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.92 14.2a6.5 6.5 0 0 1 0-4.16V7.22H2.28a10.86 10.86 0 0 0 0 9.8l3.64-2.82z"/><path fill="#EA4335" d="M12 5.36c1.6 0 3.03.55 4.16 1.62l3.12-3.12A10.45 10.45 0 0 0 12 1 10.86 10.86 0 0 0 2.28 7.22l3.64 2.82C6.77 7.47 9.17 5.36 12 5.36z"/></svg>
);
const EngGemini = () => (
  <svg viewBox="0 0 24 24"><defs><linearGradient id="gem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4f8cff"/><stop offset="0.5" stopColor="#9b6bff"/><stop offset="1" stopColor="#ff6ba6"/></linearGradient></defs><path fill="url(#gem)" d="M12 2c.4 4.9 4.1 8.6 9 9-4.9.4-8.6 4.1-9 9-.4-4.9-4.1-8.6-9-9 4.9-.4 8.6-4.1 9-9z"/></svg>
);
const EngPerplexity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#20b8c4" strokeWidth="1.6"><path d="M12 4v16" stroke="#20b8c4"/><path d="M12 7 6 4v7l6 3 6-3V4l-6 3z" fill="rgba(32,184,196,0.16)"/><path d="M6 11v6l6-3M18 11v6l-6-3"/></svg>
);
const EngYouTube = () => (
  <svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-.9C16.9 2.7 12 2.7 12 2.7s-4.9 0-8.6.3c-.4 0-1.3 0-2.1.9-.6.7-.8 2.3-.8 2.3S0 8.1 0 10v4c0 1.9.5 3.8.5 3.8s.2 1.6.8 2.3c.8.9 1.8.9 2.3 1 1.7.1 7.4.3 8.4.3s8.6 0 8.6-.3c.4 0 1.3 0 2.1-.9.6-.7.8-2.3.8-2.3s.5-1.9.5-3.8v-4c0-1.9-.5-3.8-.5-3.8zM9.6 14.8V9.2l5.9 2.8-5.9 2.8z"/></svg>
);
const EngGitHub = () => (
  <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

// ---------- shortcut brand icons ----------
const BrYouTube = EngYouTube;
const BrGitHub = () => (
  <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const BrGmail = () => (
  <svg viewBox="0 0 24 24"><path fill="#EA4335" d="M12 13.5 1.5 6.75v10.5c0 .825.675 1.5 1.5 1.5h18c.825 0 1.5-.675 1.5-1.5V6.75L12 13.5z"/><path fill="#FBBC04" d="M12 13.5 1.5 6.75 12 12l10.5-5.25L12 13.5z"/><path fill="#34A853" d="M22.5 6.75V6c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5v.75L12 12l10.5-5.25z"/><path fill="#4285F4" d="M1.5 6.75V18c0 .825.675 1.5 1.5 1.5h18c.825 0 1.5-.675 1.5-1.5V6.75L12 12 1.5 6.75z"/></svg>
);
const BrWhatsApp = () => (
  <svg viewBox="0 0 24 24"><path fill="#25D366" d="M12.04 0A11.93 11.93 0 0 0 .11 12.13c0 2.12.55 4.19 1.61 6.01L0 24l6.11-1.61a12.07 12.07 0 0 0 5.93 1.54h.01A11.93 11.93 0 0 0 12.04 0zm5.57 17.16c-.23.65-1.33 1.26-1.82 1.33-.47.07-1.07.1-1.73-.11-.4-.12-.91-.29-1.57-.57-2.76-1.2-4.56-3.96-4.7-4.15-.14-.19-1.12-1.49-1.12-2.85 0-1.36.71-2.03.96-2.3.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.58.78 2 .85 2.15.07.15.12.33.02.52-.1.19-.15.31-.29.47-.14.16-.3.35-.43.47-.14.12-.29.26-.12.51.17.26.76 1.25 1.64 2.03 1.13 1.02 2.08 1.34 2.37 1.49.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.14.27.1 1.72.81 2.01.96.29.15.48.22.55.34.07.12.07.71-.16 1.36z"/></svg>
);
const BrInstagram = () => (
  <svg viewBox="0 0 24 24"><defs><radialGradient id="ig" cx="0.3" cy="1" r="1.1"><stop offset="0" stopColor="#FFD776"/><stop offset="0.35" stopColor="#F3736B"/><stop offset="0.7" stopColor="#E1306C"/><stop offset="1" stopColor="#A537B6"/></radialGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)"/><circle cx="12" cy="12" r="4.4" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="17.2" cy="6.8" r="1.4" fill="#fff"/></svg>
);
const BrSpotify = () => (
  <svg viewBox="0 0 24 24"><path fill="#1DB954" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.299a.749.749 0 0 1-1.032.25c-2.829-1.735-6.39-2.128-10.594-1.16a.75.75 0 0 1-.34-1.462c4.572-1.065 8.56-.618 11.648 1.254.356.219.47.684.318 1.118zm1.469-3.262a.938.938 0 0 1-1.29.313c-3.245-1.993-8.18-2.57-11.983-1.4a.939.939 0 1 1-.54-1.799c4.338-1.302 9.807-.658 13.57 1.676.446.274.59.86.243 1.21zm.13-3.455c-3.705-2.198-9.84-2.395-13.39-1.304a1.125 1.125 0 0 1-.662-2.148c4.093-1.263 11.005-1.017 15.297 1.542a1.125 1.125 0 0 1-1.145 1.91z"/></svg>
);
const BrLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

// ---------- more UI icons ----------
const IcUpload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>
  </svg>
);
const IcTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
  </svg>
);
const IcStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01z"/></svg>
);
const IcLayout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/>
  </svg>
);
const IcSliders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>
  </svg>
);

// ---------- ColorPicker (presets + native + hex) ----------
function normHex(h) {
  if (!h) return null;
  h = h.trim();
  if (h[0] !== "#") h = "#" + h;
  if (/^#([0-9a-f]{3})$/i.test(h)) h = "#" + h.slice(1).replace(/./g, (c) => c + c);
  return /^#([0-9a-f]{6})$/i.test(h) ? h.toLowerCase() : null;
}

function ColorPicker({ value, onChange, presets = [], onReset }) {
  const [hex, setHex] = React.useState(value || "#ff5a2c");
  React.useEffect(() => setHex(value || "#ff5a2c"), [value]);
  const commit = (v) => { const n = normHex(v); if (n) onChange(n); };
  return (
    <div className="colorpick">
      {presets.length > 0 && (
        <div className="cp-swatches">
          {presets.map((c) => (
            <button key={c} className={"cp-sw" + ((value || "").toLowerCase() === c.toLowerCase() ? " on" : "")}
              style={{ background: c }} title={c} onClick={() => onChange(c)} />
          ))}
        </div>
      )}
      <div className="cp-input-row">
        <input type="color" className="cp-native" value={normHex(value) || "#ff5a2c"}
          onChange={(e) => onChange(e.target.value)} />
        <input className="cp-hex" value={hex} spellCheck="false"
          onChange={(e) => setHex(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(e.target.value); }} />
        {onReset && <button className="cp-reset" onClick={onReset}>Reset</button>}
      </div>
    </div>
  );
}

// ---------- read a file as data URL (sin recomprimir, preserva animación) ----------
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// ---------- resize uploaded image to a storable dataURL ----------
function resizeImageFile(file, maxDim = 1920, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const scale = Math.min(1, maxDim / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        try { resolve(canvas.toDataURL("image/jpeg", quality)); }
        catch (e) { reject(e); }
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------- IndexedDB KV (para datos grandes: fondos subidos) ----------
// localStorage tiene ~5MB de tope; las imágenes en base64 lo revientan y se
// pierden al recargar. IndexedDB aguanta cientos de MB.
const IDB_NAME = "bg_store", IDB_STORE = "kv";
function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(IDB_STORE)) req.result.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function idbGet(key) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readonly");
    const r = tx.objectStore(IDB_STORE).get(key);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
async function idbSet(key, val) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Igual que useLocalStorage pero persistiendo en IndexedDB (datos grandes).
// Migra automáticamente lo que hubiera en localStorage la primera vez.
function useIndexedState(key, initial) {
  const [v, setV] = React.useState(initial);
  const ready = React.useRef(false);
  React.useEffect(() => {
    let alive = true;
    idbGet(key).then((stored) => {
      if (!alive) return;
      if (stored !== undefined) {
        setV(stored);
      } else {
        try {
          const ls = localStorage.getItem(key);
          if (ls != null) { const parsed = JSON.parse(ls); setV(parsed); idbSet(key, parsed).catch(() => {}); }
        } catch {}
      }
      ready.current = true;
    }).catch(() => { ready.current = true; });
    return () => { alive = false; };
  }, [key]);
  React.useEffect(() => {
    if (ready.current) idbSet(key, v).catch(() => {});
  }, [key, v]);
  return [v, setV];
}

// registry for brand icons used by shortcuts
const BRAND_ICONS = {
  youtube: BrYouTube, github: BrGitHub, gmail: BrGmail,
  whatsapp: BrWhatsApp, instagram: BrInstagram, spotify: BrSpotify, link: BrLink,
};

Object.assign(window, {
  useLocalStorage, useIndexedState, idbGet, idbSet, useNow,
  IcGear, IcArrow, IcChevron, IcPlus, IcEdit, IcCheck,
  IcUpload, IcTrash, IcStar, IcLayout, IcSliders,
  EngGoogle, EngGemini, EngPerplexity, EngYouTube, EngGitHub,
  BRAND_ICONS, ColorPicker, resizeImageFile, fileToDataURL, normHex,
});
