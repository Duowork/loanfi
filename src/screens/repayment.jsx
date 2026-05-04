import React from 'react';
import { Btn, Badge, Progress, Card, Naira, Icon, Sparkline } from '../components/primitives.jsx';
import { NavRail, TopBar } from './dashboard.jsx';

// Repayment / loan tracking — with simulated payment.

const Repayment = () => {
  const [paying, setPaying] = React.useState(false);
  const [paid, setPaid] = React.useState(false);
  const [paidCount, setPaidCount] = React.useState(7);
  const total = 12;

  const simulatePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); setPaidCount(c => c + 1); }, 1600);
    setTimeout(() => setPaid(false), 4500);
  };

  const principal = 500000;
  const monthly = 47800;
  const remaining = principal - (paidCount * 41200);

  const schedule = Array.from({ length: total }).map((_, i) => ({
    n: i + 1,
    date: new Date(2025, 9 + i, 12).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" }),
    amount: monthly,
    status: i < paidCount ? "paid" : i === paidCount ? "due" : "scheduled",
  }));

  return (
    <div className="lf-root" style={{ width: "100%", height: "100%", display: "flex", background: "var(--cream)" }}>
      <NavRail active="loans"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar/>
        <div style={{ flex: 1, overflow: "auto", padding: "32px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, fontSize: 12, color: "var(--ink-3)" }}>
            <span>My loans</span>
            <Icon name="chevron-right" size={12}/>
            <span style={{ color: "var(--ink)" }}>Renmoney · Working capital</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
            {/* Left: pay card + schedule */}
            <div style={{ display: "grid", gap: 18 }}>
              <Card style={{ padding: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <Badge tone={paid ? "success" : "gold"}>{paid ? "Just paid" : "Next payment due"}</Badge>
                    <div className="display" style={{ fontSize: 36, color: "var(--green)", marginTop: 12 }}>
                      <Naira amount={monthly} size={48} weight={400}/>
                    </div>
                    <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
                      DUE 12 MAY 2026 · 13 DAYS · GTBANK ····4421
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>PROGRESS</div>
                    <div className="num" style={{ fontSize: 24, color: "var(--green)", marginTop: 4 }}>
                      {paidCount}<span style={{ color: "var(--ink-3)", fontSize: 14 }}> / {total}</span>
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 4 }}>PAYMENTS MADE</div>
                  </div>
                </div>
                <div style={{ marginTop: 18 }}>
                  <Progress value={(paidCount / total) * 100} gold/>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <Btn kind="primary" iconRight={paid ? "check" : "arrow-right"} onClick={simulatePay} disabled={paying || paid}>
                    {paying ? "Processing…" : paid ? "Payment confirmed" : "Pay ₦47,800 now"}
                  </Btn>
                  <Btn kind="ghost" onClick={() => { const v = prompt("Enter amount to pay (₦)", "47800"); if (v) alert(`₦${parseInt(v,10).toLocaleString()} payment scheduled.`); }}>Pay a different amount</Btn>
                  <Btn kind="text" style={{ marginLeft: "auto" }} onClick={() => alert("Reschedule: pick a new auto-debit date in Settings → Payments.")}>Reschedule</Btn>
                </div>

                {paying && (
                  <div style={{
                    marginTop: 18, padding: "12px 14px", background: "var(--cream-2)",
                    borderRadius: 10, display: "flex", alignItems: "center", gap: 12, fontSize: 13
                  }}>
                    <span style={{ width: 14, height: 14, borderRadius: 999, border: "2px solid var(--gold)", borderTopColor: "transparent", animation: "lf-spin 0.8s linear infinite" }}/>
                    <span>Initiating debit from GTBank…</span>
                    <span className="mono" style={{ marginLeft: "auto", color: "var(--ink-3)", fontSize: 11 }}>
                      Powered by Paystack · NIBSS
                    </span>
                  </div>
                )}
                {paid && (
                  <div style={{
                    marginTop: 18, padding: "12px 14px", background: "var(--success-bg)",
                    borderRadius: 10, display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "var(--success)"
                  }}>
                    <Icon name="check-circle" size={16}/>
                    <span>Paid · ₦47,800 · Score updated +3 pts</span>
                    <span className="mono" style={{ marginLeft: "auto", fontSize: 11 }}>RECEIPT · RM·08·041826</span>
                  </div>
                )}
                <style>{`@keyframes lf-spin { to { transform: rotate(360deg); } }`}</style>
              </Card>

              <Card style={{ padding: 0 }}>
                <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>Repayment schedule</div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Auto-debit from GTBank ····4421</div>
                  </div>
                  <Btn kind="text" icon="download" size="sm" onClick={() => alert("schedule.csv downloaded")}>Export</Btn>
                </div>
                <div style={{ maxHeight: 360, overflow: "auto" }}>
                  {schedule.map((s, i) => (
                    <div key={s.n} style={{
                      display: "grid", gridTemplateColumns: "40px 90px 1fr 100px 110px",
                      alignItems: "center", gap: 14,
                      padding: "13px 22px",
                      borderTop: i === 0 ? 0 : "1px solid var(--line)",
                      background: s.status === "due" ? "rgba(212,162,76,.08)" : "transparent",
                    }}>
                      <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{String(s.n).padStart(2, "0")}</span>
                      <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-2)" }}>{s.date}</span>
                      <span style={{ fontSize: 13 }}>
                        {s.status === "paid" ? "Paid · auto-debit" :
                         s.status === "due"  ? "Due · auto-debit" :
                         "Scheduled"}
                      </span>
                      <span className="num" style={{ fontSize: 13, color: s.status === "paid" ? "var(--ink-3)" : "var(--ink)" }}>
                        ₦{s.amount.toLocaleString()}
                      </span>
                      <span>
                        {s.status === "paid" && <Badge tone="success" dot={false}>Paid</Badge>}
                        {s.status === "due"  && <Badge tone="gold" dot={false}>Due</Badge>}
                        {s.status === "scheduled" && <Badge tone="green" dot={false}>Scheduled</Badge>}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right column */}
            <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <Card style={{ padding: 22 }}>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>OUTSTANDING</div>
                <Naira amount={remaining} size={32} style={{ display: "block", color: "var(--green)", marginTop: 10 }}/>
                <div style={{ display: "flex", gap: 18, marginTop: 18, paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>PRINCIPAL</div>
                    <div className="num" style={{ fontSize: 13, marginTop: 4 }}>₦500,000</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>INTEREST</div>
                    <div className="num" style={{ fontSize: 13, marginTop: 4 }}>₦73,600</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>PAID TO DATE</div>
                    <div className="num" style={{ fontSize: 13, marginTop: 4 }}>₦{(paidCount * 41200).toLocaleString()}</div>
                  </div>
                </div>
              </Card>

              <Card style={{ padding: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Pay early, save ₦14,200</div>
                <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 6, lineHeight: 1.5 }}>
                  Settle your remaining ₦{remaining.toLocaleString()} now and skip the next 5 interest charges.
                </p>
                <Btn kind="gold" size="sm" style={{ marginTop: 12 }} onClick={() => { if (confirm(`Settle ₦${remaining.toLocaleString()} now and save ₦14,200?`)) alert("Early settlement initiated."); }}>Settle early</Btn>
              </Card>

              <Card style={{ padding: 22 }}>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em" }}>PAYMENT HISTORY</div>
                <div style={{ marginTop: 12 }}>
                  <Sparkline points={[1,1,1,1,1,1,1].map((v, i) => i)} w={240} h={36} stroke="var(--success)" fill="rgba(47,125,79,.12)"/>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>OCT</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>APR</span>
                </div>
                <div style={{ marginTop: 12, padding: "8px 10px", background: "var(--success-bg)", color: "var(--success)", borderRadius: 6, fontSize: 12 }}>
                  100% on time. You're a low-risk borrower.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export { Repayment };
export default Repayment;
