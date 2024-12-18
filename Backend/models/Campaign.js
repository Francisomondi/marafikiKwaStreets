const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goal: { type: Number, required: true },
    amountRaised: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Campaign', CampaignSchema);
