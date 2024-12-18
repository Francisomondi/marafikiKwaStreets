const express = require('express');
const { getAccessToken, MPESA_BASE_URL } = require('../helpers/mpesa');
const axios = require('axios');

const router = express.Router();

router.post('/stkpush', async (req, res) => {
    const { phone, amount } = req.body;

    try {
        const accessToken = await getAccessToken();

        const response = await axios.post(
            `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: '174379',
                Password: Buffer.from(`174379${process.env.MPESA_PASSKEY}${Date.now()}`).toString('base64'),
                Timestamp: Date.now(),
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: '174379',
                PhoneNumber: phone,
                CallBackURL: 'https://your-domain.com/api/payments/callback',
                AccountReference: 'Crowdfunding',
                TransactionDesc: 'Donation',
            },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        res.status(200).json({ message: 'Payment initiated', data: response.data });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Payment initiation failed' });
    }
});

module.exports = router;
