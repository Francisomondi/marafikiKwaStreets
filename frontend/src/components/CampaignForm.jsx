import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
 const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { data } = await axios.post(
        'http://localhost:5000/api/campaigns',
        { title, description, goal, user: user._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage('Campaign created successfully!');
    } catch (error) {
      setMessage('Failed to create campaign');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Create Campaign</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Goal</label>
          <input
            type="number"
            className="w-full border rounded-lg px-4 py-2"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create</button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default CampaignForm;
