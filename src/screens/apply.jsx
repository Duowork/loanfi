import React from 'react';
import { Btn, Badge, Field, Card, Naira, Icon, ShapeRings } from '../components/primitives.jsx';
import { NavRail, TopBar } from './dashboard.jsx';

// Generic loan application flow — pick lender → details → review → submitted

const LENDERS = [
  { id: "renmoney", name: "Renmoney", rate: "4.2%/mo", max: 500000, term: "12 mo", tag: "Lowest rate", fg: "var(--green)", bg: "var(--cream-2)", initial: "R" },
  { id: "fairmoney", name: "FairMoney", rate: "5.8%/mo", max: 200000, term: "6 mo",  tag: "Quick disbursal", fg: "#7B4A0A", bg: "#FFEACC", initial: "F" },
  { id: "carbon",    name: "Carbon",    rate: "6.1%/mo", max: 150000, term: "3 mo",  tag: "No collateral", fg: "var(--green-3)", bg: "var(--gold-soft)", initial: "C" },
  { id: "sterling",  name: "Sterling",  rate: "3.4%/mo", max: 1000000, term: "24 mo", tag: "Premium tier", fg: "#F4EBCF", bg: "var(--green)", initial: "S" },
];

const ApplyFlow = () => {
  const [step, setStep] = React.useState(0);
  const [lender, setLender] = React.useState("renmoney");
  const [amount, setAmount] = React.useState(250000);
  const [term, setTerm] = React.useState(6);
  const [purpose, setPurpose] = React.useState("Working capital for tailoring business");
  const [accepted, setAccepted] = React.useState(false);

  const L = LENDERS.find(x => x.id === lender);
  const monthly = Math.round((amount / term) * (1 + parseFloat(L.rate) / 100 * term / 6));
  const total = monthly * term;

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="lf-root" style={{ width: "100%", height: "100%", display: "flex", background: "var(--cream)" }}>
      <NavRail active="explore"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar/>
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <Badge tone="green" dot={false}>New application</Badge>
                <h1 className="display" style={{ fontSize: 36, color: "var(--green)", marginTop: 10 }}>
                  {step === 0 && <>Pick the offer that <em style={{ fontStyle: "italic", color: "var(--gold)" }}>fits you.</em></>}
                  {step === 1 && <>How much, for how long?</>}
                  {step === 2 && <>One last review.</>}
                  {step === 3 && <>You're in the queue.</>}
                </h1>
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em" }}>
                STEP {step + 1} / 4
              </div>
            </div>

            {/* Stepper bar */}
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 999,
                  background: i <= step ? "var(--gold)" : "var(--cream-3)",
                  transition: "background .3s"
                }}/>
              ))}
            </div>

            {step === 0 && (
              <div style={{ display: "grid", gap: 12 }}>
                {LENDERS.map(o => (
                  <Card key={o.id} onClick={() => setLender(o.id)} style={{
                    padding: 18, cursor: "pointer",
                    border: lender === o.id ? "2px solid var(--green)" : "1px solid var(--line)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: o.bg, color: o.fg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--f-display)", fontSize: 22,
                        border: "1px solid var(--line)",
                      }}>{o.initial}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <div style={{ fontWeight: 500, fontSize: 14 }}>{o.name}</div>
                          <Badge tone={o.tag === "Premium tier" ? "gold" : "green"} dot={false}>{o.tag}</Badge>
                        </div>
                        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4, letterSpacing: ".04em" }}>
                          UP TO ₦{(o.max).toLocaleString()} · {o.rate} · {o.term}
                        </div>
                      </div>
                      <div style={{
                        width: 22, height: 22, borderRadius: 999,
                        border: lender === o.id ? "0" : "1.5px solid var(--line-strong)",
                        background: lender === o.id ? "var(--green)" : "transparent",
                        color: "var(--cream)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        {lender === o.id && <Icon name="check" size={12} stroke={2.5}/>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {step === 1 && (
              <Card style={{ padding: 28 }}>
                <Field label="Amount you need">
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span className="display" style={{ fontSize: 56, color: "var(--green)" }}>₦</span>
                    <input
                      className="num"
                      value={amount.toLocaleString()}
                      onChange={e => {
                        const v = parseInt(e.target.value.replace(/[^\d]/g, "") || "0", 10);
                        setAmount(Math.min(v, L.max));
                      }}
                      style={{
                        flex: 1, fontSize: 56, fontFamily: "var(--f-mono)",
                        border: 0, background: "transparent", outline: "none",
                        color: "var(--green)", padding: 0,
                        letterSpacing: "-0.02em",
                      }}
                    />
                  </div>
                  <input
                    type="range" min={20000} max={L.max} step={5000} value={amount}
                    onChange={e => setAmount(parseInt(e.target.value, 10))}
                    style={{ width: "100%", accentColor: "var(--gold)", marginTop: 14 }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>₦20,000 min</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>₦{L.max.toLocaleString()} max</span>
                  </div>
                </Field>

                <Field label="Term">
                  <div style={{ display: "flex", gap: 8 }}>
                    {[3, 6, 12, 18, 24].map(t => (
                      <button key={t} onClick={() => setTerm(t)} style={{
                        flex: 1, height: 44, borderRadius: 10,
                        border: term === t ? "1px solid var(--green)" : "1px solid var(--line)",
                        background: term === t ? "rgba(15,61,46,.06)" : "#FFFCF3",
                        fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--ink)",
                        cursor: "pointer",
                      }}>{t} mo</button>
                    ))}
                  </div>
                </Field>

                <Field label="What's it for?">
                  <textarea
                    className="lf-input"
                    style={{ height: "auto", padding: "12px 14px", minHeight: 70, resize: "vertical", lineHeight: 1.5 }}
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                  />
                </Field>

                <div style={{
                  marginTop: 18, padding: 18, background: "var(--cream-2)", borderRadius: 12,
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, alignItems: "center"
                }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>MONTHLY</div>
                    <div className="num" style={{ fontSize: 22, color: "var(--green)", marginTop: 4 }}>₦{monthly.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>TOTAL REPAID</div>
                    <div className="num" style={{ fontSize: 22, color: "var(--ink)", marginTop: 4 }}>₦{total.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>TOTAL COST OF CREDIT</div>
                    <div className="num" style={{ fontSize: 22, color: "var(--gold)", marginTop: 4 }}>₦{(total - amount).toLocaleString()}</div>
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Card style={{ padding: 22 }}>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>LENDER</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: L.bg, color: L.fg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--f-display)", fontSize: 20,
                    }}>{L.initial}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{L.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{L.rate} · CBN-licensed</div>
                    </div>
                  </div>
                </Card>

                <Card style={{ padding: 22 }}>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>TERMS</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>AMOUNT</div><Naira amount={amount} size={16}/></div>
                    <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>TERM</div><div className="num" style={{ fontSize: 14 }}>{term} months</div></div>
                    <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>MONTHLY</div><Naira amount={monthly} size={14}/></div>
                    <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>FIRST DUE</div><div className="num" style={{ fontSize: 13 }}>30 May 2026</div></div>
                  </div>
                </Card>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Card style={{ padding: 22 }}>
                    <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                      <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} style={{ marginTop: 2, accentColor: "var(--green)" }}/>
                      <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
                        I authorize {L.name} to debit ₦{monthly.toLocaleString()} from my GTBank account on the 12th of each month, and I've read the <a style={{ color: "var(--green)" }}>loan agreement</a>.
                      </div>
                    </label>
                  </Card>
                </div>
              </div>
            )}

            {step === 3 && (
              <Card style={{ padding: 36, position: "relative", overflow: "hidden", textAlign: "center" }}>
                <div style={{ position: "absolute", right: -50, top: -50, opacity: .3 }}>
                  <ShapeRings size={240} tone="gold"/>
                </div>
                <div style={{
                  width: 64, height: 64, borderRadius: 999, margin: "0 auto",
                  background: "var(--success)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 8px rgba(47,125,79,.12)",
                }}>
                  <Icon name="check" size={28} stroke={2.5}/>
                </div>
                <div className="display" style={{ fontSize: 32, color: "var(--green)", marginTop: 18 }}>
                  Submitted to <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{L.name}</em>.
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 6 }}>
                  Decision usually arrives in 4–10 minutes. We'll text and email you.
                </p>
                <div className="mono" style={{ marginTop: 18, fontSize: 12, color: "var(--ink-3)" }}>
                  REF · LF·25·{L.id.toUpperCase().slice(0,3)}·004721
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 22 }}>
                  <Btn kind="primary" iconRight="arrow-right" to="/dashboard/mid">Back to dashboard</Btn>
                  <Btn kind="ghost" to="/repayment">Track decision</Btn>
                </div>
              </Card>
            )}

            {step < 3 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                <Btn kind="text" icon="arrow-left" onClick={back} disabled={step === 0}>Back</Btn>
                <Btn kind="primary" iconRight="arrow-right" onClick={next} disabled={step === 2 && !accepted}>
                  {step === 2 ? "Submit application" : "Continue"}
                </Btn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export { ApplyFlow };
export default ApplyFlow;
