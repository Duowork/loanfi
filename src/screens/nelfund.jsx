import React from 'react';
import { Btn, Badge, Card, Icon, ShapeRings } from '../components/primitives.jsx';
import { NavRail, TopBar } from './dashboard.jsx';

// NELFUND one-click approval — the hero moment. Animated approval sequence.

const NelfundApproval = ({ copyTone = "friendly" }) => {
  // States: idle → confirming → checking → approved
  const [state, setState] = React.useState("idle");
  const [checks, setChecks] = React.useState([
    { label: "BVN identity match · NIBSS", done: false, t: 600 },
    { label: "JAMB registration verified", done: false, t: 1100 },
    { label: "UNILAG enrollment active", done: false, t: 1500 },
    { label: "NELFUND eligibility confirmed", done: false, t: 1900 },
    { label: "Funds disbursed to UNILAG bursary", done: false, t: 2400 },
  ]);

  const trigger = () => {
    if (state !== "idle") return;
    setState("checking");
    checks.forEach((c, i) => {
      setTimeout(() => {
        setChecks(prev => prev.map((x, j) => j === i ? { ...x, done: true } : x));
        if (i === checks.length - 1) {
          setTimeout(() => setState("approved"), 400);
        }
      }, c.t);
    });
  };

  const reset = () => {
    setState("idle");
    setChecks(c => c.map(x => ({ ...x, done: false })));
  };

  return (
    <div className="lf-root" style={{ width: "100%", height: "100%", display: "flex", background: "var(--cream)" }}>
      <NavRail active="explore"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar/>
        <div style={{ flex: 1, overflow: "auto", padding: "32px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, fontSize: 12, color: "var(--ink-3)" }}>
            <span>Explore offers</span>
            <Icon name="chevron-right" size={12}/>
            <span>Education</span>
            <Icon name="chevron-right" size={12}/>
            <span style={{ color: "var(--ink)" }}>NELFUND</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 22 }}>
            {/* Main panel */}
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {/* Hero header in green */}
              <div style={{
                background: "var(--green)", color: "#F4EBCF",
                padding: "32px 32px 28px", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", right: -60, top: -60, opacity: .35 }}>
                  <ShapeRings size={260} tone="gold"/>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10,
                        background: "var(--gold)", color: "var(--green-3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 500,
                      }}>N</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>Nigeria Education Loan Fund</div>
                        <div className="mono" style={{ fontSize: 11, color: "rgba(242,234,211,.55)", letterSpacing: ".04em" }}>
                          FED. GOVT · NELF/2024/STU · INTEREST-FREE
                        </div>
                      </div>
                    </div>
                    <div className="display" style={{ fontSize: 44, marginTop: 22, color: "#F4EBCF", lineHeight: 1.02, maxWidth: 520 }}>
                      Tuition for 2025/26<br/>
                      <em style={{ fontStyle: "italic", color: "var(--gold-2)" }}>covered</em> in one click.
                    </div>
                  </div>
                  <Badge tone="gold" style={{ background: "var(--gold)" }}>Pre-approved</Badge>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 28 }}>
                  {[
                    ["AMOUNT", "₦350,000"],
                    ["INTEREST", "0% p.a."],
                    ["GRACE", "2 yrs"],
                    ["REPAYMENT", "10% of salary"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: ".08em", color: "rgba(242,234,211,.55)" }}>{l}</div>
                      <div className="num" style={{ fontSize: 22, color: "#F4EBCF", marginTop: 6, letterSpacing: "-0.01em" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval body */}
              <div style={{ padding: "28px 32px" }}>
                {state === "idle" && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                      <div>
                        <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>WHAT WE'LL DO</div>
                        <ul style={{ margin: "10px 0 0", padding: "0 0 0 18px", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7 }}>
                          <li>Submit your application to NELFUND</li>
                          <li>Verify your enrollment with UNILAG</li>
                          <li>Disburse funds <em>directly to your school bursary</em></li>
                        </ul>
                      </div>
                      <div>
                        <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>YOU OWE</div>
                        <ul style={{ margin: "10px 0 0", padding: "0 0 0 18px", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7 }}>
                          <li>Nothing during your studies</li>
                          <li>Repayment starts 2 years after NYSC</li>
                          <li>10% of monthly salary, until cleared</li>
                        </ul>
                      </div>
                    </div>

                    <div style={{
                      padding: 16, border: "1px dashed var(--line-strong)", borderRadius: 10,
                      background: "rgba(212,162,76,.08)", display: "flex", gap: 12, alignItems: "center",
                      marginBottom: 22
                    }}>
                      <Icon name="info" size={18} style={{ color: "var(--gold)" }}/>
                      <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                        Because you've already verified your BVN, JAMB and UNILAG portal, we can submit and confirm in a few seconds. <strong style={{ color: "var(--ink)" }}>No paperwork.</strong>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <Btn kind="gold" size="lg" icon="spark" onClick={trigger}>Approve & disburse</Btn>
                      <Btn kind="ghost" size="lg" onClick={() => alert("Full terms\n\n• Interest rate: 0% p.a.\n• Grace: 2 years post-NYSC\n• Repayment: 10% of monthly salary\n• Disbursed directly to UNILAG bursary\n• No collateral, no guarantor required")}>View full terms</Btn>
                    </div>
                  </>
                )}

                {state === "checking" && (
                  <>
                    <div className="display" style={{ fontSize: 24, color: "var(--green)" }}>
                      Confirming your eligibility…
                    </div>
                    <p style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>
                      Usually under 5 seconds. Don't refresh.
                    </p>
                    <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
                      {checks.map((c, i) => (
                        <div key={i} style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", borderRadius: 10,
                          border: "1px solid var(--line)",
                          background: c.done ? "rgba(47,125,79,.06)" : "#FFFCF3",
                          transition: "background .3s"
                        }}>
                          <span style={{
                            width: 20, height: 20, borderRadius: 999,
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            background: c.done ? "var(--success)" : "transparent",
                            border: c.done ? "0" : "2px solid var(--line-strong)",
                            color: "var(--cream)",
                            position: "relative",
                          }}>
                            {c.done ? (
                              <Icon name="check" size={12} stroke={2.5}/>
                            ) : (
                              <span style={{
                                width: 8, height: 8, borderRadius: 999, background: "var(--gold)",
                                animation: "lf-pulse 1s ease-in-out infinite",
                              }}/>
                            )}
                          </span>
                          <span style={{ fontSize: 13.5, color: c.done ? "var(--ink)" : "var(--ink-2)" }}>
                            {c.label}
                          </span>
                          {c.done && <Icon name="check-circle" size={14} style={{ marginLeft: "auto", color: "var(--success)" }}/>}
                        </div>
                      ))}
                    </div>
                    <style>{`@keyframes lf-pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.6);opacity:0} }`}</style>
                  </>
                )}

                {state === "approved" && (
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: 999,
                      background: "var(--success)", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "8px 0 18px",
                      boxShadow: "0 0 0 8px rgba(47,125,79,.12)",
                    }}>
                      <Icon name="check" size={32} stroke={2.5}/>
                    </div>
                    <div className="display" style={{ fontSize: 36, color: "var(--green)", lineHeight: 1.1 }}>
                      Approved. <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Funds are on their way.</em>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 6, maxWidth: 520 }}>
                      ₦350,000 has been queued for disbursement to UNILAG bursary on your behalf. We'll email a receipt and add this to your dashboard.
                    </p>

                    <div style={{
                      marginTop: 22, padding: 18, borderRadius: 12,
                      background: "var(--cream-2)", border: "1px solid var(--line)",
                      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18,
                    }}>
                      <div>
                        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>REFERENCE</div>
                        <div className="mono" style={{ fontSize: 13, marginTop: 4 }}>NELF·25·UL·001241</div>
                      </div>
                      <div>
                        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>DISBURSAL</div>
                        <div className="num" style={{ fontSize: 13, marginTop: 4 }}>2 — 3 business days</div>
                      </div>
                      <div>
                        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>FIRST PAYMENT</div>
                        <div className="num" style={{ fontSize: 13, marginTop: 4 }}>~ May 2027</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                      <Btn kind="primary" size="lg" iconRight="arrow-right" to="/dashboard/mid">View on dashboard</Btn>
                      <Btn kind="ghost" size="lg" icon="download" onClick={() => alert("Receipt downloaded: NELF-25-UL-001241.pdf")}>Download receipt</Btn>
                      <Btn kind="text" onClick={reset} style={{ marginLeft: "auto" }}>Replay demo</Btn>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Side rail */}
            <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <Card style={{ padding: 18 }}>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>YOUR ELIGIBILITY</div>
                <div style={{ marginTop: 12 }}>
                  {[
                    ["Nigerian citizen", true],
                    ["Enrolled in public university", true],
                    ["BVN matches application", true],
                    ["No active NELFUND loan", true],
                  ].map(([t, ok]) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 12.5 }}>
                      <Icon name="check-circle" size={14} style={{ color: "var(--success)" }}/>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card style={{ padding: 18 }}>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>QUESTIONS?</div>
                <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.55, color: "var(--ink-2)" }}>
                  Our student desk replies in under 4 minutes during exam season.
                </div>
                <Btn kind="ghost" size="sm" style={{ marginTop: 12 }} onClick={() => alert("Chat opening… (demo)")}>Chat with Loanfi</Btn>
              </Card>

              <div style={{ padding: 14, background: "rgba(15,61,46,.04)", borderRadius: 10, fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>
                <Icon name="lock" size={12} style={{ verticalAlign: "-2px", marginRight: 4 }}/>
                Loanfi is a NIBSS-licensed agent. NELFUND processes the loan; we handle paperwork.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export { NelfundApproval };
export default NelfundApproval;
