import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await axios.get('http://localhost:5000/api/campaigns');
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold">{campaign.title}</h2>
            <p className="mt-2 text-gray-700">{campaign.description}</p>
            <p className="mt-2 font-bold">Goal: ${campaign.goal}</p>
            <p className="mt-2">Raised: ${campaign.amountRaised}</p>
            <Link to={`/donate/${campaign._id}`} className="block mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg text-center">
              Donate
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
