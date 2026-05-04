import React from 'react';

// Loanfi shared primitives — icons, geometric placeholders, small UI atoms.

// ─────── Icons (line, 1.5px, current color) ───────
const Icon = ({ name, size = 18, stroke = 1.5, style }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round", style
  };
  switch (name) {
    case "arrow-right": return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-left":  return <svg {...props}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case "check":       return <svg {...props}><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>;
    case "check-circle":return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>;
    case "x":           return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "lock":        return <svg {...props}><rect x="4.5" y="11" width="15" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case "shield":      return <svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>;
    case "user":        return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>;
    case "bank":        return <svg {...props}><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/></svg>;
    case "phone":       return <svg {...props}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>;
    case "school":      return <svg {...props}><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4"/></svg>;
    case "card":        return <svg {...props}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>;
    case "wallet":      return <svg {...props}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 13.5h2"/><path d="M3 9c0-2 1-3 3-3h11"/></svg>;
    case "doc":         return <svg {...props}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9 12h7M9 15h7M9 18h4"/></svg>;
    case "graph":       return <svg {...props}><path d="M4 18l4-5 4 3 6-8"/><path d="M4 4v16h16"/></svg>;
    case "bell":        return <svg {...props}><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5L6 16z"/><path d="M10.5 21a1.5 1.5 0 0 0 3 0"/></svg>;
    case "settings":    return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 12a7.4 7.4 0 0 0-.1-1.3l2-1.5-2-3.4-2.4.8a7.5 7.5 0 0 0-2.2-1.3L14.4 3h-4l-.3 2.3a7.5 7.5 0 0 0-2.2 1.3l-2.4-.8-2 3.4 2 1.5a7.4 7.4 0 0 0 0 2.6l-2 1.5 2 3.4 2.4-.8a7.5 7.5 0 0 0 2.2 1.3l.3 2.3h4l.3-2.3a7.5 7.5 0 0 0 2.2-1.3l2.4.8 2-3.4-2-1.5c.1-.4.1-.8.1-1.3z"/></svg>;
    case "logout":      return <svg {...props}><path d="M10 4H5v16h5"/><path d="M16 8l4 4-4 4"/><path d="M20 12H9"/></svg>;
    case "spark":       return <svg {...props}><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z"/></svg>;
    case "calendar":    return <svg {...props}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>;
    case "naira":       return <svg {...props}><path d="M7 5v14M17 5v14M5 9h14M5 14h14M7 5l10 14"/></svg>;
    case "info":        return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8.5v.01"/></svg>;
    case "warn":        return <svg {...props}><path d="M12 4l9 16H3z"/><path d="M12 11v4M12 18v.01"/></svg>;
    case "plus":        return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "search":      return <svg {...props}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>;
    case "menu":        return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "chevron-down":return <svg {...props}><path d="M6 9l6 6 6-6"/></svg>;
    case "chevron-right":return <svg {...props}><path d="M9 6l6 6-6 6"/></svg>;
    case "refresh":     return <svg {...props}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/></svg>;
    case "play":        return <svg {...props}><path d="M7 4l13 8-13 8z"/></svg>;
    case "download":    return <svg {...props}><path d="M12 4v12M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>;
    case "home":        return <svg {...props}><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/></svg>;
    case "loans":       return <svg {...props}><path d="M4 7h16v10H4z"/><circle cx="12" cy="12" r="2.5"/><path d="M8 12h.01M16 12h.01"/></svg>;
    case "compass":     return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>;
    case "verified":    return <svg {...props}><path d="M12 3l2.4 1.6L17 4l1 2.7 2.5 1.4-.6 2.9 1 2.7-2 2-.4 2.8-2.7.7L13 21l-2-1.6L8.4 20l-1-2.7L4.9 16l.6-2.9-1-2.7 2-2L7 5.6 9.7 5z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "sparkle":     return <svg {...props}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>;
    default: return null;
  }
};

// ─────── Geometric placeholders (no figurative SVG) ───────
const ShapeArch = ({ tone = "green", w = 80, h = 80, style }) => {
  const fill = tone === "gold" ? "var(--gold)" : tone === "cream" ? "var(--cream-2)" : "var(--green)";
  return (
    <svg width={w} height={h} viewBox="0 0 80 80" style={style}>
      <path d={`M0 ${h} V40 a40 40 0 0 1 80 0 V80 Z`} fill={fill}/>
    </svg>
  );
};

const ShapeRings = ({ size = 120, tone = "green", style }) => {
  const stroke = tone === "gold" ? "rgba(212,162,76,.55)" : "rgba(15,61,46,.32)";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={style}>
      {[20, 36, 52].map((r, i) => (
        <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={stroke} strokeWidth="1"/>
      ))}
      <circle cx="60" cy="60" r="4" fill={tone === "gold" ? "var(--gold)" : "var(--green)"}/>
    </svg>
  );
};

// Logo — bracket "L" + dot in gold, on whatever background
const Logo = ({ size = 22, color = "var(--green)", accent = "var(--gold)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Loanfi">
    <path d="M5 4v16h14" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="8" r="2.4" fill={accent}/>
  </svg>
);

const Wordmark = ({ size = 18 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    <Logo size={size + 4}/>
    <span style={{
      fontFamily: "var(--f-display)", fontSize: size + 6,
      letterSpacing: "-0.02em", color: "var(--green)", lineHeight: 1
    }}>Loanfi</span>
  </span>
);

// ─────── Atoms ───────
import { useNavigate } from 'react-router-dom';

const Btn = ({ kind = "primary", size, icon, iconRight, children, onClick, disabled, style, type = "button", href, to }) => {
  const navigate = useNavigate();
  const cls = [
    "lf-btn",
    kind === "primary" ? "lf-btn-primary" : "",
    kind === "gold"    ? "lf-btn-gold"    : "",
    kind === "ghost"   ? "lf-btn-ghost"   : "",
    kind === "text"    ? "lf-btn-text"    : "",
    size === "sm" ? "lf-btn-sm" : size === "lg" ? "lf-btn-lg" : "",
    "lf-focus"
  ].filter(Boolean).join(" ");
  const handleClick = (e) => {
    if (onClick) onClick(e);
    const target = to || href;
    if (target && !e.defaultPrevented) navigate(target);
  };
  return (
    <button type={type} className={cls} onClick={handleClick} disabled={disabled} style={style}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16}/>}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : 16}/>}
    </button>
  );
};

const Badge = ({ tone = "green", children, dot = true, style }) => (
  <span className={`lf-badge lf-badge-${tone}`} style={style}>
    {dot && <span className="dot"/>}
    {children}
  </span>
);

const Field = ({ label, hint, error, children, right }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label className="lf-label">{label}</label>
        {right}
      </div>
    )}
    {children}
    {hint && !error && <div className="lf-help">{hint}</div>}
    {error && <div className="lf-err">{error}</div>}
  </div>
);

const Progress = ({ value = 0, gold = false, height = 6 }) => (
  <div className={`lf-progress ${gold ? "lf-progress-gold" : ""}`} style={{ height }}>
    <i style={{ width: `${Math.max(0, Math.min(100, value))}%` }}/>
  </div>
);

const Card = ({ green = false, children, style, padding = 20, onClick }) => (
  <div
    className={green ? "lf-card-green" : "lf-card"}
    style={{ padding, ...style, cursor: onClick ? "pointer" : "default" }}
    onClick={onClick}
  >
    {children}
  </div>
);

// Naira amount — mono, with optional small unit
const Naira = ({ amount, size = 22, weight = 400, faded, style }) => {
  const fmt = new Intl.NumberFormat("en-NG").format(Math.round(amount));
  return (
    <span className="num" style={{ fontSize: size, fontWeight: weight, letterSpacing: "-0.01em", color: faded ? "var(--ink-3)" : "inherit", ...style }}>
      <span style={{ marginRight: 2, opacity: .8 }}>₦</span>{fmt}
    </span>
  );
};

// Phone-shaped frame for mobile-style screens within an artboard
const PhoneFrame = ({ children, w = 300, h = 600, style }) => (
  <div style={{
    width: w, height: h,
    background: "#0A2A20",
    borderRadius: 38,
    padding: 8,
    boxShadow: "0 30px 60px rgba(15,61,46,.18), inset 0 0 0 1px rgba(255,255,255,.06)",
    ...style
  }}>
    <div style={{
      width: "100%", height: "100%",
      background: "var(--cream)",
      borderRadius: 30, overflow: "hidden",
      position: "relative",
    }}>
      {children}
    </div>
  </div>
);

// Top-bar dots for desktop-style screens
const WindowChrome = ({ title }) => (
  <div style={{
    height: 40, padding: "0 14px",
    display: "flex", alignItems: "center", gap: 14,
    borderBottom: "1px solid var(--line)",
    background: "rgba(15,61,46,.03)"
  }}>
    <div style={{ display: "flex", gap: 6 }}>
      {["#E26B5C","#E5B143","#7BB66A"].map(c => (
        <span key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c, opacity: .85 }}/>
      ))}
    </div>
    <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.02em" }}>{title}</span>
  </div>
);

// Sparkline — simple SVG chart from points
const Sparkline = ({ points, w = 220, h = 56, stroke = "var(--green)", fill = "rgba(15,61,46,.10)" }) => {
  if (!points?.length) return null;
  const min = Math.min(...points), max = Math.max(...points);
  const span = max - min || 1;
  const stepX = w / (points.length - 1);
  const path = points.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / span) * (h - 6) - 3;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={area} fill={fill}/>
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// Donut score gauge
const ScoreGauge = ({ value = 720, max = 850, size = 180, tone = "green" }) => {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const dash = c * pct;
  const stroke = tone === "gold" ? "var(--gold)" : "var(--green)";
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(15,61,46,.10)" strokeWidth="10"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={stroke} strokeWidth="10"
                strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round"
                style={{ transition: "stroke-dasharray .8s cubic-bezier(.2,.7,.3,1)" }}/>
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <div className="display" style={{ fontSize: size * 0.32, color: "var(--green)" }}>{value}</div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--ink-3)", textTransform: "uppercase" }}>
          of {max}
        </div>
      </div>
    </div>
  );
};



export {
  Icon, ShapeArch, ShapeRings, Logo, Wordmark,
  Btn, Badge, Field, Progress, Card, Naira,
  PhoneFrame, WindowChrome, Sparkline, ScoreGauge
};
