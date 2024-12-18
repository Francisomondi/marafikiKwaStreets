import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DonationForm = () => {
  const { campaignId } = useParams();
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/payments/stkpush', { phone, amount });
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to initiate payment.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Donate</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full border rounded-lg px-4 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Donate</button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default DonationForm;
