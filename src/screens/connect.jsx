import React from 'react';
import { Btn, Badge, Progress, Card, Icon } from '../components/primitives.jsx';

// Connect data sources — bank/telco/school. Live progress states.

const SourceCard = ({ source, onConnect }) => {
  const STATES = {
    idle:       { tone: "green", label: "Connect", action: true },
    connecting: { tone: "info",  label: "Connecting…" },
    fetching:   { tone: "info",  label: "Pulling 6 months of data…" },
    connected:  { tone: "success", label: "Connected" },
    failed:     { tone: "danger",  label: "Couldn't connect", action: true, retry: true },
  };
  const state = STATES[source.status];

  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        {/* Color flag */}
        <div style={{
          width: 6, background: source.status === "connected" ? "var(--success)" :
                                source.status === "failed" ? "var(--danger)" :
                                source.status === "idle" ? "var(--cream-3)" : "var(--gold)"
        }}/>
        <div style={{ padding: "18px 20px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: source.bg || "var(--cream-2)",
                color: source.fg || "var(--green)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 500,
                border: "1px solid var(--line)",
              }}>
                {source.initials}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{source.name}</div>
                  {source.required && <Badge tone="gold" dot={false}>Required</Badge>}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{source.desc}</div>
              </div>
            </div>
            <div>
              {source.status === "connected" ? (
                <Badge tone="success">Connected</Badge>
              ) : state.action ? (
                <Btn kind={state.retry ? "ghost" : "primary"} size="sm" icon={state.retry ? "refresh" : null} onClick={() => onConnect(source.id)}>
                  {state.retry ? "Retry" : state.label}
                </Btn>
              ) : (
                <Badge tone={state.tone}>{state.label}</Badge>
              )}
            </div>
          </div>

          {(source.status === "connecting" || source.status === "fetching") && (
            <div style={{ marginTop: 14 }}>
              <Progress value={source.status === "connecting" ? 35 : 78} gold/>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6, letterSpacing: ".04em" }}>
                {source.status === "connecting"
                  ? "AUTHENTICATING · MONO API · NDIC-BACKED"
                  : "PULLING 184 / 236 TRANSACTIONS · ENCRYPTED IN TRANSIT"}
              </div>
            </div>
          )}

          {source.status === "connected" && source.summary && (
            <div style={{
              display: "flex", gap: 22, marginTop: 14, paddingTop: 14,
              borderTop: "1px dashed var(--line)"
            }}>
              {source.summary.map((s) => (
                <div key={s.label}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em", textTransform: "uppercase" }}>{s.label}</div>
                  <div className="num" style={{ fontSize: 14, color: "var(--ink)", marginTop: 2 }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {source.status === "failed" && (
            <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 8, background: "var(--danger-bg)", color: "#7B2218", fontSize: 12.5 }}>
              <Icon name="warn" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }}/>
              We couldn't reach GTBank. They're sometimes slow on weekends — try again, or pick a different bank.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const ConnectSources = ({ initialState = "mid" }) => {
  // initialState seeds different connection states
  const seed = {
    empty: { mono: "idle", nelfund: "idle", mtn: "idle", crc: "idle" },
    mid:   { mono: "connected", nelfund: "fetching", mtn: "idle", crc: "idle" },
    full:  { mono: "connected", nelfund: "connected", mtn: "connected", crc: "connected" },
  }[initialState] || {};

  const [sources, setSources] = React.useState([
    { id: "mono", name: "Bank account", desc: "Connect any Nigerian bank via Mono. Read-only.",
      initials: "₦", required: true, bg: "var(--green)", fg: "var(--gold)",
      status: seed.mono || "idle",
      summary: [
        { label: "BANK", value: "GTBank · ****4421" },
        { label: "AVG INFLOW", value: "₦182,400 / mo" },
        { label: "STATEMENTS", value: "6 months" },
      ] },
    { id: "nelfund", name: "School (JAMB + UNILAG portal)", desc: "Verifies enrollment for NELFUND eligibility.",
      initials: "U", required: true, bg: "#F4DEB0", fg: "#6E4A12",
      status: seed.nelfund || "idle",
      summary: [
        { label: "STATUS", value: "Active · 200 Level" },
        { label: "MATRIC", value: "190401024" },
        { label: "PROGRAMME", value: "B.Sc Computer Science" },
      ] },
    { id: "mtn", name: "Mobile money & airtime", desc: "MTN MoMo or Airtel Money — improves your alt-credit score.",
      initials: "M", bg: "#FFEACC", fg: "#7B4A0A",
      status: seed.mtn || "idle",
      summary: [
        { label: "PROVIDER", value: "MTN MoMo" },
        { label: "ACTIVE", value: "3y 4m" },
        { label: "AVG TOPUP", value: "₦4,200 / mo" },
      ] },
    { id: "crc", name: "Credit bureau (CRC + FirstCentral)", desc: "Pulls your existing credit history from licensed bureaus.",
      initials: "C", bg: "var(--cream-2)", fg: "var(--green)",
      status: seed.crc || "idle",
      summary: [
        { label: "BUREAU SCORE", value: "682 / 850" },
        { label: "ACCOUNTS", value: "2 active" },
        { label: "DEFAULTS", value: "0" },
      ] },
  ]);

  const connect = (id) => {
    setSources(s => s.map(x => x.id === id ? { ...x, status: "connecting" } : x));
    setTimeout(() => setSources(s => s.map(x => x.id === id ? { ...x, status: "fetching" } : x)), 900);
    setTimeout(() => {
      const willFail = id === "mtn" && Math.random() < 0.15; // tiny chance, mostly success
      setSources(s => s.map(x => x.id === id ? { ...x, status: willFail ? "failed" : "connected" } : x));
    }, 2400);
  };

  const connectedCount = sources.filter(s => s.status === "connected").length;
  const totalCount = sources.length;

  return (
    <div className="lf-root" style={{ width: "100%", height: "100%", overflow: "auto", background: "var(--cream)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <Badge tone="green" dot={false}>Step 2 of 3 · Build your profile</Badge>
            <h1 className="display" style={{ fontSize: 44, color: "var(--green)", marginTop: 14 }}>
              Connect what you have. <em style={{ color: "var(--gold)", fontStyle: "italic" }}>We'll do the rest.</em>
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 14, marginTop: 8, maxWidth: 560 }}>
              The more we know, the better the offers. Each source is read-only and can be revoked anytime from Settings.
            </p>
          </div>
        </div>

        <Card style={{ padding: 18, marginBottom: 22, display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{connectedCount} of {totalCount} connected</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                {Math.round((connectedCount / totalCount) * 100)}% PROFILE STRENGTH
              </span>
            </div>
            <Progress value={(connectedCount / totalCount) * 100} gold/>
          </div>
          <Btn kind="gold" size="sm" iconRight="arrow-right" disabled={connectedCount < 2} to="/dashboard/mid">
            Continue
          </Btn>
        </Card>

        <div style={{ display: "grid", gap: 12 }}>
          {sources.map(s => <SourceCard key={s.id} source={s} onConnect={connect}/>)}
        </div>

        <div style={{ marginTop: 28, padding: 18, border: "1px dashed var(--line-strong)", borderRadius: 12, display: "flex", gap: 14, alignItems: "center", background: "rgba(15,61,46,.03)" }}>
          <Icon name="lock" size={20} style={{ color: "var(--green)" }}/>
          <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
            <strong style={{ color: "var(--ink)" }}>Why is this safe?</strong> Loanfi never sees your bank password. Connections use OAuth via NIBSS-licensed providers, and we encrypt every fetched document at rest with per-user keys.
          </div>
        </div>
      </div>
    </div>
  );
};


export { ConnectSources };
export default ConnectSources;
