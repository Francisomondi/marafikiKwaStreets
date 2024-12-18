import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import DonationForm from './components/CampaignForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<CampaignList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/create-campaign" element={<CampaignForm />} />
          <Route path="/donate/:campaignId" element={<DonationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
