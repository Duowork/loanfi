import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Onboarding from './screens/onboarding.jsx';
import ConnectSources from './screens/connect.jsx';
import Dashboard from './screens/dashboard.jsx';
import NelfundApproval from './screens/nelfund.jsx';
import ApplyFlow from './screens/apply.jsx';
import Repayment from './screens/repayment.jsx';
import Settings from './screens/settings.jsx';

function DashboardWithState() {
  const { state = 'mid' } = useParams();
  return <Dashboard state={state} copyTone="friendly" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Navigate to="/dashboard/mid" replace />} />
        <Route path="/onboarding"  element={<Onboarding initialStep={0} copyTone="friendly" />} />
        <Route path="/connect"     element={<ConnectSources initialState="mid" />} />
        <Route path="/dashboard"   element={<Navigate to="/dashboard/mid" replace />} />
        <Route path="/dashboard/:state" element={<DashboardWithState />} />
        <Route path="/nelfund"     element={<NelfundApproval copyTone="friendly" />} />
        <Route path="/apply"       element={<ApplyFlow />} />
        <Route path="/repayment"   element={<Repayment />} />
        <Route path="/settings"    element={<Settings />} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
