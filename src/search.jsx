/* search.jsx — search bar + multi-engine manager (exported to window) */

const DEFAULT_ENGINES = [
  { id: "google",     name: "Google",     url: "https://www.google.com/search?q=%s",            icon: "google",     on: true,  builtin: true },
  { id: "gemini",     name: "Gemini",     url: "https://gemini.google.com/app?q=%s",            icon: "gemini",     on: false, builtin: true },
  { id: "perplexity", name: "Perplexity", url: "https://www.perplexity.ai/search?q=%s",         icon: "perplexity", on: false, builtin: true },
  { id: "youtube",    name: "YouTube",    url: "https://www.youtube.com/results?search_query=%s", icon: "youtube",  on: true,  builtin: true },
  { id: "github",     name: "GitHub",     url: "https://github.com/search?q=%s",                icon: "github",     on: false, builtin: true },
];

function isUrl(s) {
  s = s.trim();
  if (/^https?:\/\//i.test(s)) return true;
  if (/\s/.test(s)) return false;
  return /^[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(s) && /\.[a-z]{2,}/i.test(s);
}

function buildUrl(eng, q) {
  const enc = encodeURIComponent(q);
  return eng.url.includes("%s") ? eng.url.replace(/%s/g, enc) : eng.url + enc;
}

function EngineIcon({ eng }) {
  const map = {
    google: window.EngGoogle, gemini: window.EngGemini, perplexity: window.EngPerplexity,
    youtube: window.EngYouTube, github: window.EngGitHub,
  };
  const C = map[eng.icon];
  if (C) return <C />;
  return <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--accent)" }}>
    {(eng.name || "?").charAt(0).toUpperCase()}
  </span>;
}

function SearchBar({ engines, setEngines, activeId, setActiveId, multi, setMulti, align = "left", setAlign }) {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [adding, setAdding] = React.useState({ name: "", url: "" });
  const [dropUp, setDropUp] = React.useState(false);
  const [dropMax, setDropMax] = React.useState(440);
  const wrapRef = React.useRef(null);
  const barRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const primary = engines.find((e) => e.id === activeId) || engines[0];
  const enabled = engines.filter((e) => e.on);

  React.useEffect(() => {
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 350);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    if (!open) return;
    // decide flip direction by available space around the bar
    const r = barRef.current && barRef.current.getBoundingClientRect();
    if (r) {
      const gap = 16;
      const below = window.innerHeight - r.bottom - gap;
      const above = r.top - gap;
      const want = Math.min(0.62 * window.innerHeight, 440);
      const up = below < want && above > below;
      setDropUp(up);
      setDropMax(Math.max(180, Math.min(want, up ? above : below)));
    }
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const go = () => {
    const v = q.trim();
    if (!v) return;
    // URL directa → misma pestaña
    if (isUrl(v)) {
      window.location.assign(/^https?:\/\//i.test(v) ? v : "https://" + v);
      return;
    }
    // motores a usar
    let list = multi ? enabled : [primary];
    if (!list.length) list = [primary];
    const prim = list.find((e) => e.id === activeId) || list[0];
    const rest = list.filter((e) => e !== prim);
    // los secundarios en pestañas nuevas, el principal en la misma (al final)
    rest.forEach((e) => window.open(buildUrl(e, v), "_blank", "noopener"));
    window.location.assign(buildUrl(prim, v));
  };

  const cycleEngine = (dir = 1) => {
    const i = engines.findIndex((e) => e.id === activeId);
    setActiveId(engines[(i + dir + engines.length) % engines.length].id);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); go(); }
    else if (e.key === "Tab") { e.preventDefault(); cycleEngine(e.shiftKey ? -1 : 1); }
    else if (e.key === "Escape") { setOpen(false); setQ(""); }
  };

  const toggleOn = (id) => setEngines((list) => list.map((e) => e.id === id ? { ...e, on: !e.on } : e));
  const delEngine = (id) => {
    setEngines((list) => {
      const next = list.filter((e) => e.id !== id);
      if (id === activeId && next[0]) setActiveId(next[0].id);
      return next.length ? next : list;
    });
  };
  const addEngine = () => {
    const name = adding.name.trim();
    let url = adding.url.trim();
    if (!name || !url) return;
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    const id = "e_" + Date.now().toString(36);
    setEngines((list) => [...list, { id, name, url, icon: "mono", on: true, builtin: false }]);
    setAdding({ name: "", url: "" });
  };

  const urlMode = isUrl(q);

  return (
    <div ref={wrapRef} className={"search" + (focus ? " focus" : "") + (align === "right" ? " align-right" : "")}>
      <div className="search-bar" ref={barRef}>
        <button className={"engine-btn" + (open ? " open" : "")} onClick={() => setOpen((o) => !o)} title="Motores (Tab cambia)">
          <span className="engine-ic"><EngineIcon eng={primary} /></span>
          <span>{primary.name}</span>
          <window.IcChevron />
        </button>
        <input
          ref={inputRef} type="text" value={q} spellCheck="false" autoComplete="off"
          placeholder={urlMode ? "Ir a este sitio…" : (multi && enabled.length > 1 ? `Buscar en ${enabled.length} motores…` : `Buscar en ${primary.name} o escribe una URL`)}
          onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        />
        <button className="go-btn" onClick={go} title={urlMode ? "Abrir sitio" : "Buscar"}><window.IcArrow /></button>
      </div>

      {open && (
        <div className={"engine-menu panel" + (dropUp ? " up" : "") + (align === "right" ? " right" : "")} style={{ minWidth: 280, maxHeight: dropMax }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px 8px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            <span>Motores</span>
            <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", textTransform: "none", letterSpacing: 0 }}>
              Multibúsqueda
              <button className={"sw" + (multi ? " on" : "")} style={{ width: 36, height: 20 }} onClick={(e) => { e.preventDefault(); setMulti(!multi); }}><i style={{ width: 15, height: 15 }} /></button>
            </label>
          </div>
          {setAlign && (
            <div className="eng-align">
              <span>Alinear</span>
              <div className="eng-align-seg">
                <button className={align !== "right" ? "on" : ""} onClick={() => setAlign("left")} title="A la izquierda">◧ Izq.</button>
                <button className={align === "right" ? "on" : ""} onClick={() => setAlign("right")} title="A la derecha">Der. ◨</button>
              </div>
            </div>
          )}
          {engines.map((e) => (
            <div key={e.id} className="eng-row">
              <button className={"echk" + (e.on ? " on" : "")} title={e.on ? "Activo" : "Inactivo"} onClick={() => toggleOn(e.id)}>
                {e.on && <window.IcCheck />}
              </button>
              <span className="engine-ic" style={{ width: 18 }}><EngineIcon eng={e} /></span>
              <span className={"ename" + (e.id === activeId ? " primary" : "")} onClick={() => setActiveId(e.id)}>{e.name}</span>
              <button className={"estar" + (e.id === activeId ? " on" : "")} title="Principal" onClick={() => setActiveId(e.id)}><window.IcStar /></button>
              <button className="edel" title="Quitar" onClick={() => delEngine(e.id)}><window.IcTrash /></button>
            </div>
          ))}
          <div className="eng-add">
            <input placeholder="Nombre" value={adding.name} onChange={(e) => setAdding((a) => ({ ...a, name: e.target.value }))} />
            <input placeholder="URL con %s" value={adding.url} onChange={(e) => setAdding((a) => ({ ...a, url: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") addEngine(); }} />
            <button className="go-btn" style={{ width: 34, height: 34, flexShrink: 0 }} onClick={addEngine} title="Añadir motor"><window.IcPlus /></button>
          </div>
        </div>
      )}

      {enabled.length > 0 && (
        <div className="eng-chips">
          {enabled.map((e) => (
            <button key={e.id} className={"eng-chip" + (e.id === activeId ? " primary" : "")}
              title={`Usar ${e.name} como motor`}
              onClick={() => { setActiveId(e.id); inputRef.current && inputRef.current.focus(); }}>
              <span className="eic"><EngineIcon eng={e} /></span>
              {e.name}
            </button>
          ))}
        </div>
      )}

      <div className="search-hint">
        <span><kbd>Tab</kbd> cambia motor</span>
        <span><kbd>Enter</kbd> {urlMode ? "abre el sitio" : (multi ? "busca en todos" : "busca")}</span>
      </div>
    </div>
  );
}

Object.assign(window, { SearchBar, DEFAULT_ENGINES });
