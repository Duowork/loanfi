import React from 'react';
import { Btn, Badge, Field, Card, Icon, ShapeRings, Logo } from '../components/primitives.jsx';

// Onboarding — multi-step KYC + BVN with validation. Self-contained interactive screen.

const useOnboarding = () => {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    fullName: "Adaeze Okoro",
    email: "adaeze.okoro@unilag.edu.ng",
    phone: "0803 412 7754",
    bvn: "",
    dob: "2003-04-12",
    school: "University of Lagos",
    matric: "190401024",
    consent: false,
  });
  const [errors, setErrors] = React.useState({});
  const [bvnVerifying, setBvnVerifying] = React.useState(false);
  const [bvnVerified, setBvnVerified] = React.useState(false);

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!data.fullName.trim()) e.fullName = "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
      if (!/^[\d\s+]{10,}$/.test(data.phone)) e.phone = "Use a Nigerian mobile number";
    }
    if (s === 1) {
      if (!/^\d{11}$/.test(data.bvn)) e.bvn = "Your BVN is 11 digits";
      if (!bvnVerified) e.bvn = e.bvn || "Tap Verify to continue";
    }
    if (s === 2) {
      if (!data.school) e.school = "Pick your school";
      if (!data.matric.trim()) e.matric = "Required";
    }
    if (s === 3) {
      if (!data.consent) e.consent = "Please review and agree";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep(s => Math.min(s + 1, 4)); };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const verifyBvn = () => {
    if (!/^\d{11}$/.test(data.bvn)) {
      setErrors(e => ({ ...e, bvn: "Your BVN is 11 digits" }));
      return;
    }
    setBvnVerifying(true);
    setTimeout(() => { setBvnVerifying(false); setBvnVerified(true); setErrors({}); }, 1400);
  };

  return { step, setStep, data, setData, errors, next, back, bvnVerifying, bvnVerified, verifyBvn };
};

const StepDots = ({ step, total, labels }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {Array.from({ length: total }).map((_, i) => (
      <React.Fragment key={i}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, opacity: i > step ? .45 : 1,
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: 999,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: i < step ? "var(--green)" : i === step ? "var(--gold)" : "transparent",
            color: i < step ? "var(--cream)" : i === step ? "var(--green-3)" : "var(--ink-2)",
            border: i === step ? "0" : i > step ? "1px dashed var(--line-strong)" : "0",
            fontFamily: "var(--f-mono)", fontSize: 11,
          }}>
            {i < step ? <Icon name="check" size={12} stroke={2}/> : i + 1}
          </span>
          <span className="mono" style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-2)" }}>
            {labels[i]}
          </span>
        </div>
        {i < total - 1 && <div style={{ flex: "0 0 18px", height: 1, background: "var(--line-strong)" }}/>}
      </React.Fragment>
    ))}
  </div>
);

const SchoolPicker = ({ value, onChange }) => {
  const options = [
    "University of Lagos", "University of Ibadan", "Obafemi Awolowo University",
    "Ahmadu Bello University", "Covenant University", "University of Nigeria, Nsukka",
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {options.map(o => (
        <button key={o} type="button" onClick={() => onChange(o)} className="lf-focus"
          style={{
            textAlign: "left", padding: "12px 14px",
            border: `1px solid ${value === o ? "var(--green)" : "var(--line)"}`,
            background: value === o ? "rgba(15,61,46,.05)" : "#FFFCF3",
            borderRadius: 10, cursor: "pointer",
            font: "13px var(--f-ui)", color: "var(--ink)",
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="school" size={16}/>
            <span>{o}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

const Onboarding = ({ initialStep = 0, copyTone = "friendly" }) => {
  const o = useOnboarding();
  React.useEffect(() => { o.setStep(initialStep); }, [initialStep]); // eslint-disable-line

  const friendly = copyTone === "friendly";

  const headlines = [
    friendly ? "Welcome — let's get you set up." : "Account information",
    friendly ? "One last thing — your BVN." : "Bank Verification Number",
    friendly ? "Tell us about school." : "Education details",
    friendly ? "A few permissions, then you're in." : "Consent & data sharing",
    friendly ? "You're all set, Adaeze." : "Setup complete",
  ];
  const subs = [
    friendly ? "We'll use this to find loans you actually qualify for." : "All fields required.",
    friendly ? "We use your BVN to confirm it's really you. We don't store account passwords." : "Required for Tier-2 KYC under CBN guidelines.",
    friendly ? "This unlocks NELFUND offers and other student-only programs." : "Verified against JAMB and your institution's records.",
    friendly ? "You stay in control — revoke any time from Settings." : "Review the data-sharing terms before continuing.",
    friendly ? "Your dashboard is ready. Let's find your first offer." : "Onboarding complete.",
  ];

  return (
    <div className="lf-root" style={{ width: "100%", height: "100%", display: "flex", background: "var(--cream)" }}>
      {/* Left rail */}
      <aside style={{
        width: 320, padding: "32px 28px", color: "#F2EAD3",
        background: "var(--green)",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "space-between"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={26} color="#F2EAD3" accent="var(--gold)"/>
            <span style={{ fontFamily: "var(--f-display)", fontSize: 26, color: "#F2EAD3", letterSpacing: "-0.02em" }}>Loanfi</span>
          </div>
          <div className="display" style={{ fontSize: 38, lineHeight: 1.05, marginTop: 32, color: "#F2EAD3" }}>
            One profile.<br/>
            <em style={{ color: "var(--gold-2)", fontStyle: "italic" }}>Every</em> lender in&nbsp;Nigeria.
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(242,234,211,.7)", marginTop: 16, maxWidth: 240 }}>
            We bridge fragmented financial data so you can see — and accept — the credit you actually qualify for. Start with NELFUND, expand to anything.
          </p>
        </div>

        {/* deco rings */}
        <div style={{ position: "absolute", right: -40, top: -40, opacity: .35 }}>
          <ShapeRings size={220} tone="gold"/>
        </div>

        <div style={{ display: "grid", gap: 10, fontSize: 12, color: "rgba(242,234,211,.78)" }}>
          {[
            ["shield", "Bank-grade security · NDPR compliant"],
            ["check-circle", "Used by 12,400+ Nigerian students"],
            ["lock", "Your data is yours — revoke anytime"],
          ].map(([n, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name={n} size={14}/>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Right pane */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        <div style={{ padding: "20px 36px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <StepDots step={o.step} total={4} labels={["Identity", "BVN", "School", "Consent"]}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
            STEP {String(Math.min(o.step + 1, 4)).padStart(2, "0")} / 04
          </span>
        </div>

        <div style={{ flex: 1, padding: "40px 56px", maxWidth: 720, width: "100%" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 className="display" style={{ fontSize: 40, color: "var(--green)" }}>{headlines[o.step]}</h1>
            <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8, maxWidth: 520 }}>{subs[o.step]}</p>
          </div>

          {o.step === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Full name" error={o.errors.fullName}>
                  <input className="lf-input" value={o.data.fullName} onChange={e => o.setData(d => ({ ...d, fullName: e.target.value }))}/>
                </Field>
              </div>
              <Field label="Email" error={o.errors.email}>
                <input className="lf-input" type="email" value={o.data.email} onChange={e => o.setData(d => ({ ...d, email: e.target.value }))}/>
              </Field>
              <Field label="Phone number" error={o.errors.phone} hint="We'll send a one-time code.">
                <input className="lf-input" value={o.data.phone} onChange={e => o.setData(d => ({ ...d, phone: e.target.value }))}/>
              </Field>
              <Field label="Date of birth">
                <input className="lf-input lf-mono" type="date" value={o.data.dob} onChange={e => o.setData(d => ({ ...d, dob: e.target.value }))}/>
              </Field>
              <div/>
            </div>
          )}

          {o.step === 1 && (
            <div>
              <Field label="BVN" error={o.errors.bvn}
                hint="Dial *565*0# from your registered number to retrieve your BVN."
                right={<a className="lf-help" style={{ color: "var(--green)", cursor: "pointer" }}>Why we need this</a>}>
                <div style={{ position: "relative" }}>
                  <input
                    className="lf-input lf-mono"
                    inputMode="numeric"
                    placeholder="22 _ _ _ _ _ _ _ _ _"
                    value={o.data.bvn}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 11);
                      o.setData(d => ({ ...d, bvn: v }));
                      if (o.bvnVerified) { /* allow re-verify */ }
                    }}
                    style={{ paddingRight: 130, letterSpacing: "0.18em", fontSize: 16 }}
                  />
                  <div style={{ position: "absolute", right: 6, top: 6 }}>
                    {o.bvnVerified ? (
                      <Badge tone="success">Verified</Badge>
                    ) : (
                      <Btn kind="gold" size="sm" onClick={o.verifyBvn} disabled={o.bvnVerifying}>
                        {o.bvnVerifying ? "Verifying…" : "Verify"}
                      </Btn>
                    )}
                  </div>
                </div>
              </Field>

              {o.bvnVerified && (
                <Card style={{ marginTop: 14, background: "var(--success-bg)", borderColor: "transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon name="verified" size={22} style={{ color: "var(--success)" }}/>
                    <div>
                      <div style={{ fontWeight: 500, color: "var(--success)" }}>Identity confirmed</div>
                      <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-2)", marginTop: 2 }}>
                        OKORO, ADAEZE C.  ·  DOB matches  ·  3 linked bank accounts
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {o.step === 2 && (
            <div>
              <Field label="Institution" error={o.errors.school}>
                <SchoolPicker value={o.data.school} onChange={(v) => o.setData(d => ({ ...d, school: v }))}/>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
                <Field label="Matriculation number" error={o.errors.matric}>
                  <input className="lf-input lf-mono" value={o.data.matric} onChange={e => o.setData(d => ({ ...d, matric: e.target.value }))}/>
                </Field>
                <Field label="Year of study">
                  <select className="lf-input">
                    <option>200 Level</option><option>100 Level</option><option>300 Level</option><option>400 Level</option>
                  </select>
                </Field>
              </div>
              <Card style={{ background: "var(--cream-2)", borderStyle: "dashed" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name="info" size={18} style={{ color: "var(--green)" }}/>
                  <div style={{ fontSize: 13, color: "var(--ink-2)" }}>
                    We'll cross-check this with JAMB and your school portal in the next step. No extra paperwork.
                  </div>
                </div>
              </Card>
            </div>
          )}

          {o.step === 3 && (
            <div>
              <Card style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <Icon name="shield" size={20} style={{ color: "var(--green)", marginTop: 2 }}/>
                  <div>
                    <div style={{ fontWeight: 500 }}>Data we'll share with lenders</div>
                    <ul style={{ margin: "8px 0 0", padding: "0 0 0 18px", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.7 }}>
                      <li>Your verified identity (BVN-linked name & DOB)</li>
                      <li>School enrollment status, only when you apply</li>
                      <li>Read-only bank statements from accounts you connect</li>
                    </ul>
                  </div>
                </div>
              </Card>
              <label style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 14, border: `1px solid ${o.errors.consent ? "var(--danger)" : "var(--line)"}`, borderRadius: 10, background: "#FFFCF3", cursor: "pointer" }}>
                <input
                  type="checkbox" checked={o.data.consent}
                  onChange={e => o.setData(d => ({ ...d, consent: e.target.checked }))}
                  style={{ marginTop: 2, accentColor: "var(--green)" }}
                />
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink)" }}>
                  I authorize Loanfi to share the data above with lenders I apply to, and to fetch my credit profile from CRC and FirstCentral. I've read the <a style={{ color: "var(--green)" }}>data-sharing policy</a>.
                </div>
              </label>
              {o.errors.consent && <div className="lf-err">{o.errors.consent}</div>}
            </div>
          )}

          {o.step === 4 && (
            <div style={{ position: "relative", padding: "20px 0" }}>
              <Card style={{ padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -30, top: -30, opacity: .35 }}>
                  <ShapeRings size={200} tone="gold"/>
                </div>
                <Badge tone="gold">Profile complete</Badge>
                <div className="display" style={{ fontSize: 38, color: "var(--green)", marginTop: 12 }}>
                  3 offers waiting for you.
                </div>
                <p style={{ color: "var(--ink-2)", marginTop: 6, fontSize: 14 }}>
                  Including a pre-approved <strong style={{ color: "var(--green)" }}>NELFUND</strong> tuition loan.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                  <Btn kind="gold" size="lg" iconRight="arrow-right" to="/dashboard/mid">See my offers</Btn>
                  <Btn kind="ghost" size="lg" to="/connect">Connect a bank first</Btn>
                </div>
              </Card>
            </div>
          )}

          {o.step < 4 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
              <Btn kind="text" icon="arrow-left" onClick={o.back} disabled={o.step === 0}>Back</Btn>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                  ⌘↵ to continue
                </span>
                <Btn kind="primary" iconRight="arrow-right" onClick={o.next}>
                  {o.step === 3 ? "Finish setup" : "Continue"}
                </Btn>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};


export { Onboarding };
export default Onboarding;
