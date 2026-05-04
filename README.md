# Loanfi — React app

One-click credit and loan portal for Nigeria. The financial infrastructure layer that
bridges fragmented data and financial access.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Routes

- `/` — Dashboard (mid state, NELFUND pre-approved hero)
- `/onboarding` — Multi-step KYC + BVN onboarding
- `/connect` — Connect bank, school, telco, bureau
- `/dashboard/:state` — `empty` / `mid` / `power` lifecycle states
- `/nelfund` — One-click NELFUND approval (hero moment)
- `/apply` — Loan application flow (pick lender → terms → review → submitted)
- `/repayment` — Loan tracking with simulated payment
- `/settings` — Profile, data, security, notifications

## Design system

- **Colors** (60/30/10): Cream `#FAF6EC` · Deep Green `#0F3D2E` · Gold `#D4A24C`
- **Type**: Instrument Serif (display) · Geist (UI) · JetBrains Mono (data)
- See `src/styles/tokens.css` for full token reference.

## Structure

```
src/
  components/        Shared primitives (Btn, Card, Naira, Icon, …)
  screens/           One file per top-level screen
  styles/tokens.css  Design tokens
  App.jsx            Router
  main.jsx           Entry
```

## Notes

- All amounts in ₦. Sample user: Adaeze C. Okoro (UNILAG, 200L).
- Sources, lenders and bureaus referenced are real Nigerian institutions
  (NELFUND, NIBSS, GTBank, Renmoney, FairMoney, Carbon, Sterling, CRC, FirstCentral).
  Data is mock for demo purposes.
