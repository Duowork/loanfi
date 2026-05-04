import React from 'react';
import { Btn, Badge, Field, Card } from '../components/primitives.jsx';
import { NavRail, TopBar } from './dashboard.jsx';

// Settings / profile screen.

const Settings = () => {
  const [tab, setTab] = React.useState("profile");
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "data", label: "Data & permissions" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="lf-root" style={{ width: "100%", height: "100%", display: "flex", background: "var(--cream)" }}>
      <NavRail active="settings"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar/>
        <div style={{ flex: 1, overflow: "auto", padding: "32px 36px" }}>
          <div style={{ maxWidth: 880 }}>
            <h1 className="display" style={{ fontSize: 36, color: "var(--green)" }}>Settings</h1>
            <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 6 }}>
              Manage your profile, data permissions, and how Loanfi reaches you.
            </p>

            <div style={{ display: "flex", gap: 4, marginTop: 24, borderBottom: "1px solid var(--line)" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "10px 14px", border: 0, background: "transparent",
                  fontFamily: "var(--f-ui)", fontSize: 13, fontWeight: tab === t.id ? 500 : 400,
                  color: tab === t.id ? "var(--green)" : "var(--ink-2)",
                  borderBottom: tab === t.id ? "2px solid var(--gold)" : "2px solid transparent",
                  marginBottom: -1, cursor: "pointer",
                }}>{t.label}</button>
              ))}
            </div>

            {tab === "profile" && (
              <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
                <Card style={{ padding: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: 999,
                      background: "var(--gold)", color: "var(--green-3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--f-display)", fontSize: 32,
                    }}>A</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 500 }}>Adaeze C. Okoro</div>
                      <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
                        UNILAG · 200L · CSC · MATRIC 190401024
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <Badge tone="success">BVN verified</Badge>
                        <Badge tone="green" dot={false}>Tier B+</Badge>
                      </div>
                    </div>
                    <Btn kind="ghost" size="sm" onClick={() => alert("Photo upload (demo)")}>Edit photo</Btn>
                  </div>
                </Card>

                <Card style={{ padding: 22 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Contact</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
                    <Field label="Email"><input className="lf-input" defaultValue="adaeze.okoro@unilag.edu.ng"/></Field>
                    <Field label="Phone"><input className="lf-input lf-mono" defaultValue="+234 803 412 7754"/></Field>
                    <Field label="Address"><input className="lf-input" defaultValue="14 Akoka Road, Yaba"/></Field>
                    <Field label="State"><select className="lf-input"><option>Lagos</option><option>Abuja</option><option>Rivers</option></select></Field>
                  </div>
                </Card>
              </div>
            )}

            {tab === "data" && (
              <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
                <Card style={{ padding: 22 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Connected sources</div>
                  <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                    {[
                      ["GTBank · ****4421", "Bank · last sync 2 hrs ago", "success"],
                      ["UNILAG portal", "School · last sync 5 days ago", "success"],
                      ["MTN MoMo", "Mobile · not connected", "idle"],
                    ].map(([t, s, st]) => (
                      <div key={t} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 10,
                      }}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: st === "success" ? "var(--success)" : "var(--cream-3)" }}/>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div>
                          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{s}</div>
                        </div>
                        <Btn kind="text" size="sm" style={{ marginLeft: "auto" }} to="/connect">{st === "success" ? "Revoke" : "Connect"}</Btn>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card style={{ padding: 22 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Lender access</div>
                  <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>Lenders that have queried your profile.</p>
                  <div style={{ display: "grid", gap: 6, marginTop: 14 }}>
                    {[
                      ["Renmoney", "12 May 2026 · approved ₦500K", "success"],
                      ["NELFUND", "10 Apr 2026 · disbursed ₦350K", "success"],
                      ["FairMoney", "02 Apr 2026 · profile checked", "info"],
                    ].map(([n, d, t]) => (
                      <div key={n} style={{ display: "flex", padding: "10px 0", borderTop: "1px solid var(--line)", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 500, width: 140 }}>{n}</span>
                        <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", flex: 1 }}>{d}</span>
                        <Btn kind="text" size="sm" onClick={() => alert(`${n}\n${d}`)}>Details</Btn>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {tab === "security" && (
              <Card style={{ padding: 22, marginTop: 22 }}>
                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    ["Two-factor authentication", "SMS to +234 803····7754", "On"],
                    ["Login alerts", "Email + push", "On"],
                    ["Biometric on mobile", "Face ID", "On"],
                    ["Active sessions", "2 devices · last from Lagos, NG", "Manage"],
                  ].map(([t, s, a]) => (
                    <div key={t} style={{ display: "flex", padding: "12px 0", borderTop: "1px solid var(--line)", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div>
                        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{s}</div>
                      </div>
                      <Btn kind="ghost" size="sm" onClick={() => alert(`${t}: ${a === "Manage" ? "opening device list…" : "toggled"}`)}>{a}</Btn>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {tab === "notifications" && (
              <Card style={{ padding: 22, marginTop: 22 }}>
                {[
                  ["New offer matches", "Email + push"],
                  ["Payment reminders", "SMS · 3 days, 1 day, day-of"],
                  ["Score changes ±10 pts", "Push only"],
                  ["Marketing", "Off"],
                ].map(([t, s]) => (
                  <div key={t} style={{ display: "flex", padding: "12px 0", borderTop: "1px solid var(--line)", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{s}</div>
                    </div>
                    <Btn kind="ghost" size="sm" onClick={() => alert(`Edit notification: ${t}`)}>Edit</Btn>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export { Settings };
export default Settings;
