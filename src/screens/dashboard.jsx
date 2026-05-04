import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Btn, Badge, Progress, Card, Naira, Icon, ShapeRings, Wordmark, Sparkline, ScoreGauge } from '../components/primitives.jsx';

// Dashboard — three states (empty, mid, power user). Sidebar nav included.

const NAV_ITEMS = [
  { id: "home", label: "Overview", icon: "home", path: "/dashboard/mid" },
  { id: "explore", label: "Explore offers", icon: "compass", path: "/apply" },
  { id: "loans", label: "My loans", icon: "loans", path: "/repayment" },
  { id: "data", label: "Data sources", icon: "wallet", path: "/connect" },
  { id: "docs", label: "Documents", icon: "doc", path: "/settings" },
  { id: "settings", label: "Settings", icon: "settings", path: "/settings" },
];

const NavRail = ({ active }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // auto-detect active from path
  const detected = (() => {
    const p = location.pathname;
    if (p.startsWith("/dashboard")) return "home";
    if (p.startsWith("/apply")) return "explore";
    if (p.startsWith("/repayment")) return "loans";
    if (p.startsWith("/connect")) return "data";
    if (p.startsWith("/settings")) return "settings";
    if (p.startsWith("/onboarding")) return "home";
    if (p.startsWith("/nelfund")) return "home";
    return "home";
  })();
  const cur = active || detected;
  return (
    <aside style={{
      width: 232, padding: "24px 14px", borderRight: "1px solid var(--line)",
      background: "rgba(244,239,224,.45)",
      display: "flex", flexDirection: "column", gap: 18, height: "100%"
    }}>
      <button
        onClick={() => navigate("/dashboard/mid")}
        style={{ padding: "0 6px 6px", background: "transparent", border: 0, cursor: "pointer", textAlign: "left" }}
      >
        <Wordmark size={16}/>
      </button>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(i => {
          const on = i.id === cur;
          return (
            <button
              key={i.id}
              className="lf-focus"
              onClick={() => navigate(i.path)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 10px", border: 0, borderRadius: 8,
                background: on ? "rgba(15,61,46,.08)" : "transparent",
                color: on ? "var(--green)" : "var(--ink-2)",
                fontFamily: "var(--f-ui)", fontSize: 13, fontWeight: on ? 500 : 400,
                cursor: "pointer", textAlign: "left",
              }}
            >
              <Icon name={i.icon} size={16}/>
              <span>{i.label}</span>
              {i.id === "loans" && (
                <span style={{ marginLeft: "auto", fontSize: 10, padding: "1px 6px", borderRadius: 999, background: "var(--gold)", color: "var(--green-3)", fontWeight: 600 }}>2</span>
              )}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto", padding: 14, background: "var(--green)", color: "#F2EAD3", borderRadius: 12, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -30, bottom: -30, opacity: .35 }}>
          <ShapeRings size={140} tone="gold"/>
        </div>
        <div className="display" style={{ fontSize: 18, color: "#F2EAD3", lineHeight: 1.1 }}>Refer a friend, earn ₦2,500</div>
        <Btn kind="gold" size="sm" style={{ marginTop: 12 }} onClick={() => alert("Referral link copied: loanfi.ng/r/adaeze")}>Get my link</Btn>
      </div>
    </aside>
  );
};

const NOTIFICATIONS = [
  { id: 1, title: "NELFUND offer ready", body: "₦350,000 pre-approved · expires in 6 days", time: "2h ago", unread: true, path: "/nelfund" },
  { id: 2, title: "Renmoney payment due", body: "₦42,000 due 12 May", time: "1d ago", unread: true, path: "/repayment" },
  { id: 3, title: "Score updated", body: "+8 pts from FirstCentral re-pull", time: "3d ago", unread: false, path: "/dashboard/mid" },
  { id: 4, title: "BVN re-verified", body: "Quarterly NIBSS check passed", time: "1w ago", unread: false, path: "/settings" },
];

const Popover = ({ open, onClose, children, anchorRight = 0, width = 320 }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div ref={ref} style={{
      position: "absolute", top: "calc(100% + 8px)", right: anchorRight, width,
      background: "var(--cream)", border: "1px solid var(--line)",
      borderRadius: 12, boxShadow: "0 20px 50px rgba(15,61,46,.18)",
      zIndex: 50, overflow: "hidden",
    }}>
      {children}
    </div>
  );
};

const TopBar = ({ user = "Adaeze" }) => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unreadCount = notifs.filter(n => n.unread).length;

  const handleSearchKey = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate("/apply");
    }
  };

  const goNotif = (n) => {
    setNotifs(notifs.map(x => x.id === n.id ? { ...x, unread: false } : x));
    setNotifOpen(false);
    navigate(n.path);
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 28px", borderBottom: "1px solid var(--line)", background: "var(--cream)",
      position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, maxWidth: 380 }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8,
          height: 36, padding: "0 12px",
          background: "rgba(15,61,46,.05)",
          border: `1px solid ${searchFocus ? "var(--green)" : "var(--line)"}`,
          borderRadius: 999, color: "var(--ink-3)", fontSize: 13,
          transition: "border-color .15s",
        }}>
          <Icon name="search" size={14}/>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            onKeyDown={handleSearchKey}
            placeholder="Search lenders, programs, terms…"
            style={{
              flex: 1, border: 0, outline: 0, background: "transparent",
              fontFamily: "var(--f-ui)", fontSize: 13, color: "var(--ink)",
            }}
          />
          <span className="lf-kbd">⌘ K</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="lf-focus"
            style={{ background: "transparent", border: 0, color: "var(--ink-2)", cursor: "pointer", position: "relative", padding: 8, borderRadius: 8 }}
          >
            <Icon name="bell" size={18}/>
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: 999, background: "var(--gold)" }}/>
            )}
          </button>
          <Popover open={notifOpen} onClose={() => setNotifOpen(false)} anchorRight={0} width={340}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Notifications</div>
              <button
                onClick={() => setNotifs(notifs.map(n => ({ ...n, unread: false })))}
                style={{ background: "transparent", border: 0, color: "var(--green)", fontSize: 12, cursor: "pointer", fontFamily: "var(--f-ui)" }}
              >Mark all read</button>
            </div>
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              {notifs.map(n => (
                <button
                  key={n.id}
                  onClick={() => goNotif(n)}
                  style={{
                    width: "100%", textAlign: "left", padding: "12px 16px",
                    background: n.unread ? "rgba(212,162,76,.08)" : "transparent",
                    border: 0, borderBottom: "1px solid var(--line)", cursor: "pointer",
                    fontFamily: "var(--f-ui)",
                    display: "flex", flexDirection: "column", gap: 2,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: n.unread ? 500 : 400, color: "var(--ink)" }}>{n.title}</span>
                    {n.unread && <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }}/>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{n.body}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{n.time}</div>
                </button>
              ))}
            </div>
          </Popover>
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="lf-focus"
            style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", border: 0, cursor: "pointer", padding: 4, borderRadius: 8 }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 999,
              background: "var(--gold)", color: "var(--green-3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--f-display)", fontSize: 16,
            }}>A</div>
            <div style={{ lineHeight: 1.15, textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{user} Okoro</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>UNILAG · 200L</div>
            </div>
            <Icon name="chevron-down" size={14} style={{ color: "var(--ink-3)" }}/>
          </button>
          <Popover open={profileOpen} onClose={() => setProfileOpen(false)} anchorRight={0} width={220}>
            {[
              { label: "View profile", icon: "user", path: "/settings" },
              { label: "Settings", icon: "settings", path: "/settings" },
              { label: "Documents", icon: "doc", path: "/settings" },
              { label: "Connected sources", icon: "wallet", path: "/connect" },
            ].map(o => (
              <button
                key={o.label}
                onClick={() => { setProfileOpen(false); navigate(o.path); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", background: "transparent", border: 0,
                  borderBottom: "1px solid var(--line)", cursor: "pointer",
                  fontFamily: "var(--f-ui)", fontSize: 13, color: "var(--ink)", textAlign: "left",
                }}
              >
                <Icon name={o.icon} size={14} style={{ color: "var(--ink-3)" }}/>
                <span>{o.label}</span>
              </button>
            ))}
            <button
              onClick={() => { setProfileOpen(false); navigate("/onboarding"); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", background: "transparent", border: 0,
                cursor: "pointer", fontFamily: "var(--f-ui)", fontSize: 13,
                color: "var(--danger, #B0413E)", textAlign: "left",
              }}
            >
              <Icon name="logout" size={14}/>
              <span>Sign out</span>
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

// ── Empty state ───────────────────────────────────────────
const DashboardEmpty = ({ copyTone = "friendly" }) => {
  const friendly = copyTone === "friendly";
  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 38, color: "var(--green)" }}>
          {friendly ? "Welcome to Loanfi, Adaeze." : "Welcome, Ms. Okoro."}
        </div>
        <p style={{ color: "var(--ink-2)", fontSize: 14, marginTop: 6 }}>
          {friendly
            ? "Let's build your profile — usually takes ~3 minutes. Then we'll match you with offers."
            : "Complete your profile to see offers from licensed Nigerian lenders."}
        </p>
      </div>

      <Card style={{ padding: 28, marginBottom: 18, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -40, opacity: .4 }}>
          <ShapeRings size={220} tone="gold"/>
        </div>
        <Badge tone="gold">Get started</Badge>
        <div className="display" style={{ fontSize: 32, color: "var(--green)", marginTop: 12, maxWidth: 420 }}>
          You're 3 steps away from your first <em style={{ fontStyle: "italic", color: "var(--gold)" }}>NELFUND</em> offer.
        </div>
        <div style={{ display: "grid", gap: 10, marginTop: 22, maxWidth: 480 }}>
          {[
            ["Verify your identity (BVN)", true, "1 min"],
            ["Connect your school portal", false, "30 sec"],
            ["Connect a bank account", false, "1 min"],
          ].map(([t, done, time], i) => (
            <div key={t} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 10,
              background: done ? "rgba(47,125,79,.06)" : "#FFFCF3",
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 999,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: done ? "var(--success)" : "transparent",
                border: done ? "0" : "1px dashed var(--line-strong)",
                color: done ? "var(--cream)" : "var(--ink-3)",
                fontFamily: "var(--f-mono)", fontSize: 11,
              }}>
                {done ? <Icon name="check" size={12} stroke={2}/> : i + 1}
              </span>
              <span style={{ fontSize: 13, fontWeight: done ? 400 : 500, color: done ? "var(--ink-3)" : "var(--ink)", textDecoration: done ? "line-through" : "none" }}>{t}</span>
              <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-3)" }}>{time}</span>
            </div>
          ))}
        </div>
        <Btn kind="primary" size="lg" iconRight="arrow-right" style={{ marginTop: 20 }} to="/onboarding">Continue setup</Btn>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {[
          { t: "NELFUND", s: "Tuition + upkeep", v: "₦500K limit" },
          { t: "FairMoney", s: "Working capital", v: "₦2M limit" },
          { t: "Carbon", s: "Quick top-ups", v: "₦1M limit" },
        ].map(p => (
          <Card key={p.t} style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".06em", color: "var(--ink-3)" }}>SAMPLE OFFER</div>
            <div style={{ fontWeight: 500, fontSize: 15, marginTop: 8 }}>{p.t}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{p.s}</div>
            <div className="num" style={{ fontSize: 18, color: "var(--green)", marginTop: 14 }}>{p.v}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── Mid state ─────────────────────────────────────────────
const DashboardMid = ({ copyTone = "friendly", onApprove }) => {
  const friendly = copyTone === "friendly";
  return (
    <div style={{ padding: "32px 36px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18 }}>
      {/* HERO column */}
      <div style={{ display: "grid", gap: 18 }}>
        <Card green style={{ padding: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -50, top: -50, opacity: .3 }}>
            <ShapeRings size={260} tone="gold"/>
          </div>
          <Badge tone="gold" style={{ background: "var(--gold)" }}>Pre-approved · expires in 6 days</Badge>
          <div className="display" style={{ fontSize: 36, color: "#F4EBCF", marginTop: 12, lineHeight: 1.05 }}>
            One click to your <em style={{ fontStyle: "italic", color: "var(--gold-2)" }}>NELFUND</em><br/>
            tuition loan.
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 22 }}>
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "rgba(242,234,211,.55)", letterSpacing: ".08em" }}>AMOUNT</div>
              <Naira amount={350000} size={28} style={{ color: "#F4EBCF", display: "block", marginTop: 4 }}/>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "rgba(242,234,211,.55)", letterSpacing: ".08em" }}>RATE</div>
              <div className="num" style={{ fontSize: 24, color: "#F4EBCF", marginTop: 4 }}>0% <span style={{ fontSize: 12, color: "rgba(242,234,211,.55)" }}>p.a.</span></div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "rgba(242,234,211,.55)", letterSpacing: ".08em" }}>REPAY AFTER</div>
              <div className="num" style={{ fontSize: 24, color: "#F4EBCF", marginTop: 4 }}>2 yrs<span style={{ fontSize: 12, color: "rgba(242,234,211,.55)" }}> grace</span></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <Btn kind="gold" size="lg" iconRight="check" onClick={onApprove} to={onApprove ? undefined : "/nelfund"}>Approve in one click</Btn>
            <Btn kind="ghost" size="lg" style={{ borderColor: "rgba(242,234,211,.25)", color: "#F4EBCF" }} to="/nelfund">Review terms</Btn>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>OTHER MATCHED OFFERS</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>3 lenders match your profile</div>
            </div>
            <Btn kind="text" iconRight="arrow-right" to="/apply">See all</Btn>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { name: "FairMoney", amount: "₦200,000", rate: "5.8%/mo", term: "6 mo", tag: "Quick disbursal" },
              { name: "Renmoney", amount: "₦500,000", rate: "4.2%/mo", term: "12 mo", tag: "Lowest rate" },
              { name: "Carbon", amount: "₦150,000", rate: "6.1%/mo", term: "3 mo", tag: "No collateral" },
            ].map(o => (
              <div key={o.name} style={{
                display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr 0.8fr auto",
                alignItems: "center", gap: 14,
                padding: "12px 14px", borderRadius: 10,
                border: "1px solid var(--line)", background: "#FFFCF3",
              }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{o.name}</div>
                  <Badge tone="green" dot={false} style={{ marginTop: 4, fontSize: 10 }}>{o.tag}</Badge>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em" }}>UP TO</div>
                  <div className="num" style={{ fontSize: 14, color: "var(--green)" }}>{o.amount}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em" }}>RATE</div>
                  <div className="num" style={{ fontSize: 13 }}>{o.rate}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em" }}>TERM</div>
                  <div className="num" style={{ fontSize: 13 }}>{o.term}</div>
                </div>
                <Btn kind="ghost" size="sm" iconRight="arrow-right" to="/apply">Apply</Btn>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* SIDE column */}
      <div style={{ display: "grid", gap: 18 }}>
        <Card style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>LOANFI SCORE</div>
              <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>{friendly ? "Looking great" : "Tier B+"}</div>
            </div>
            <Badge tone="success">+12 this week</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
            <ScoreGauge value={682} max={850}/>
          </div>
          <Sparkline points={[610, 615, 620, 625, 640, 645, 660, 668, 678, 682]} w={240} h={48}/>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>JAN</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>APR</span>
          </div>
        </Card>

        <Card style={{ padding: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Boost your score</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>Quick wins, in order of impact.</p>
          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            {[
              { t: "Connect MTN MoMo", v: "+20 pts", icon: "phone" },
              { t: "Verify with FirstCentral", v: "+12 pts", icon: "shield" },
              { t: "Add a guarantor", v: "+8 pts", icon: "user" },
            ].map(x => (
              <div key={x.t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8 }}>
                <Icon name={x.icon} size={16} style={{ color: "var(--green)" }}/>
                <span style={{ fontSize: 13 }}>{x.t}</span>
                <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>{x.v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 22 }}>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>CONNECTED SOURCES</div>
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {[
              ["GTBank · ****4421", "Bank · 6 mo data", "success"],
              ["UNILAG portal", "School · enrolled", "success"],
              ["MTN MoMo", "Not connected", "idle"],
            ].map(([t, s, st]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: st === "success" ? "var(--success)" : "var(--cream-3)" }}/>
                <div style={{ fontSize: 12.5 }}>{t}</div>
                <span className="mono" style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--ink-3)" }}>{s}</span>
              </div>
            ))}
          </div>
          <Btn kind="text" icon="plus" style={{ marginTop: 10, marginLeft: -8 }} to="/connect">Add another source</Btn>
        </Card>
      </div>
    </div>
  );
};

// ── Power user state ──────────────────────────────────────
const DashboardPower = ({ copyTone = "friendly" }) => {
  return (
    <div style={{ padding: "32px 36px", display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { l: "TOTAL BORROWED", v: "₦1,420,000", sub: "across 4 loans", tone: "green" },
          { l: "OUTSTANDING", v: "₦486,000", sub: "next pmt 12 May", tone: "gold" },
          { l: "ON-TIME RATE", v: "100%", sub: "32 / 32 payments", tone: "success" },
          { l: "AVAILABLE CREDIT", v: "₦2.1M", sub: "across 6 lenders", tone: "info" },
        ].map(s => (
          <Card key={s.l} style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>{s.l}</div>
            <div className="num" style={{ fontSize: 24, marginTop: 8, color: "var(--green)", letterSpacing: "-0.01em" }}>{s.v}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <Card style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Active loans</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>2 active · 2 settled</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Badge tone="green" dot={false}>Active</Badge>
              <Badge tone="gold" dot={false}>Repaying</Badge>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {[
              { name: "NELFUND · Tuition 2025/26", amount: 350000, paid: 0, total: 350000, status: "grace", date: "Repays from May 2027" },
              { name: "Renmoney · Working capital", amount: 500000, paid: 364000, total: 500000, status: "active", date: "₦42,000 due 12 May" },
            ].map(l => {
              const pct = (l.paid / l.total) * 100;
              return (
                <div key={l.name} style={{
                  padding: 16, border: "1px solid var(--line)", borderRadius: 10, background: "#FFFCF3",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: l.status === "grace" ? "var(--gold-soft)" : "var(--cream-2)",
                        color: l.status === "grace" ? "#6E4A12" : "var(--green)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--f-display)", fontSize: 16,
                      }}>{l.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{l.name}</div>
                        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{l.date}</div>
                      </div>
                    </div>
                    <Naira amount={l.amount} size={16} style={{ fontWeight: 500 }}/>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                    <Progress value={pct} gold={l.status === "grace"}/>
                    <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>
                      {Math.round(pct)}% paid
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>LOANFI SCORE</div>
              <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>Tier A · Top 8%</div>
            </div>
            <Badge tone="success">+34 in 90 days</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
            <ScoreGauge value={782} max={850}/>
          </div>
          <Sparkline points={[702, 712, 720, 728, 736, 745, 758, 766, 774, 782]} w={240} h={48} stroke="var(--gold)" fill="rgba(212,162,76,.15)"/>
          <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--success-bg)", borderRadius: 8, fontSize: 12, color: "var(--success)" }}>
            <Icon name="sparkle" size={12} style={{ verticalAlign: "-2px", marginRight: 6 }}/>
            You qualify for premium rates from Renmoney and Sterling.
          </div>
        </Card>
      </div>

      <Card style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Recent activity</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Last 30 days</div>
          </div>
          <Btn kind="text" iconRight="arrow-right" to="/repayment">Statements</Btn>
        </div>
        <div style={{ display: "grid", gap: 4 }}>
          {[
            ["Apr 28", "Repayment · Renmoney", "₦42,000", "out", "On time"],
            ["Apr 21", "Score updated by FirstCentral", "+8 pts", "neutral", "Auto"],
            ["Apr 14", "NELFUND tuition disbursed to UNILAG", "₦350,000", "in", "1-click"],
            ["Apr 10", "BVN re-verified · NIBSS", "—", "neutral", "Quarterly"],
          ].map((r, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "70px 1fr 120px 100px",
              alignItems: "center", gap: 14,
              padding: "12px 6px",
              borderTop: i === 0 ? "0" : "1px solid var(--line)",
            }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{r[0]}</div>
              <div style={{ fontSize: 13 }}>{r[1]}</div>
              <div className="num" style={{ fontSize: 13, color: r[3] === "in" ? "var(--success)" : r[3] === "out" ? "var(--ink)" : "var(--ink-3)" }}>{r[2]}</div>
              <div><Badge tone={r[3] === "in" ? "success" : r[3] === "out" ? "green" : "info"} dot={false}>{r[4]}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const Dashboard = ({ state = "mid", copyTone = "friendly", onApprove }) => (
  <div className="lf-root" style={{ width: "100%", height: "100%", display: "flex", background: "var(--cream)" }}>
    <NavRail active="home"/>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar/>
      <div style={{ flex: 1, overflow: "auto" }}>
        {state === "empty" && <DashboardEmpty copyTone={copyTone}/>}
        {state === "mid" && <DashboardMid copyTone={copyTone} onApprove={onApprove}/>}
        {state === "power" && <DashboardPower copyTone={copyTone}/>}
      </div>
    </div>
  </div>
);




export { Dashboard, NavRail, TopBar };
export default Dashboard;
