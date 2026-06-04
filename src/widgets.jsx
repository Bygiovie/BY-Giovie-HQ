/* widgets.jsx — ClockGreeting + Weather (exported to window) */

const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function greetingFor(h) {
  if (h >= 5 && h < 12) return { txt: "Buenos días", ic: "☀️" };
  if (h >= 12 && h < 20) return { txt: "Buenas tardes", ic: "🌤️" };
  return { txt: "Buenas noches", ic: "🌙" };
}

function Greeting({ name }) {
  const now = window.useNow();
  const g = greetingFor(now.getHours());
  return (
    <div className="greeting solo">
      <span className="wave">{g.ic}</span> {g.txt}
      {name ? <>, <b>{name}</b></> : null}
    </div>
  );
}

function ClockTime() {
  const now = window.useNow();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return (
    <div className="clock" aria-label={`${hh}:${mm}`}>
      <span>{hh}</span>
      <span className="colon">:</span>
      <span>{mm}</span>
      <span className="sec">{ss}</span>
    </div>
  );
}

function DateBar() {
  const now = window.useNow();
  const dateStr = `${DIAS[now.getDay()]} · ${now.getDate()} ${MESES[now.getMonth()]}`;
  return (
    <div className="datebar solo">
      <span className="tick" />
      {dateStr}
    </div>
  );
}

// ---- weather (WMO code → emoji + es label) ----
function wxInfo(code, isDay) {
  const sun = isDay ? "☀️" : "🌙";
  const table = {
    0: [sun, "Despejado"],
    1: [isDay ? "🌤️" : "🌙", "Mayormente despejado"],
    2: ["⛅", "Parcialmente nublado"],
    3: ["☁️", "Nublado"],
    45: ["🌫️", "Niebla"], 48: ["🌫️", "Niebla helada"],
    51: ["🌦️", "Llovizna ligera"], 53: ["🌦️", "Llovizna"], 55: ["🌧️", "Llovizna densa"],
    56: ["🌧️", "Llovizna helada"], 57: ["🌧️", "Llovizna helada"],
    61: ["🌦️", "Lluvia ligera"], 63: ["🌧️", "Lluvia"], 65: ["🌧️", "Lluvia fuerte"],
    66: ["🌧️", "Lluvia helada"], 67: ["🌧️", "Lluvia helada"],
    71: ["🌨️", "Nieve ligera"], 73: ["🌨️", "Nieve"], 75: ["❄️", "Nieve fuerte"],
    77: ["🌨️", "Granos de nieve"],
    80: ["🌦️", "Chubascos"], 81: ["🌧️", "Chubascos"], 82: ["⛈️", "Chubascos fuertes"],
    85: ["🌨️", "Chubascos de nieve"], 86: ["🌨️", "Chubascos de nieve"],
    95: ["⛈️", "Tormenta"], 96: ["⛈️", "Tormenta con granizo"], 99: ["⛈️", "Tormenta con granizo"],
  };
  return table[code] || [sun, "—"];
}

function WeatherWidget({ city, onClick }) {
  const [state, setState] = React.useState({ status: "loading" });

  React.useEffect(() => {
    let alive = true;
    setState({ status: "loading" });
    (async () => {
      try {
        const geo = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`
        ).then((r) => r.json());
        const loc = geo && geo.results && geo.results[0];
        if (!loc) throw new Error("ciudad");
        const fc = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,weather_code,is_day`
        ).then((r) => r.json());
        const cur = fc && fc.current;
        if (!cur) throw new Error("forecast");
        const [emoji, label] = wxInfo(cur.weather_code, cur.is_day);
        if (alive) setState({
          status: "ok",
          temp: Math.round(cur.temperature_2m),
          emoji, label,
          city: loc.name,
        });
      } catch (e) {
        if (alive) setState({ status: "error" });
      }
    })();
    return () => { alive = false; };
  }, [city]);

  if (state.status === "loading") {
    return (
      <div className="weather panel loading" onClick={onClick} title="Ajustar ubicación">
        <span className="wx-ic">🛰️</span>
        <div className="wx-meta">
          <div className="wx-temp">--°</div>
          <div className="wx-desc">cargando…</div>
        </div>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className="weather panel" onClick={onClick} title="Ajustar ubicación">
        <span className="wx-ic">📍</span>
        <div className="wx-meta">
          <div className="wx-city">{city}</div>
          <div className="wx-desc">sin señal</div>
        </div>
      </div>
    );
  }
  return (
    <div className="weather panel" onClick={onClick} title="Ajustar ubicación">
      <span className="wx-ic">{state.emoji}</span>
      <div className="wx-temp">{state.temp}°</div>
      <div className="wx-meta">
        <div className="wx-city">{state.city}</div>
        <div className="wx-desc">{state.label}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Greeting, ClockTime, DateBar, WeatherWidget });
