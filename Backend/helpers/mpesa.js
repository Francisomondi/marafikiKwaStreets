const axios = require('axios');

const MPESA_BASE_URL = 'https://sandbox.safaricom.co.ke'; // Use production URL in live environment
const CONSUMER_KEY = 'your_consumer_key';
const CONSUMER_SECRET = 'your_consumer_secret';

const getAccessToken = async () => {
    try {
        const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
        const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching MPESA access token:', error.message);
        throw new Error('Failed to fetch MPESA access token');
    }
};

module.exports = { getAccessToken, MPESA_BASE_URL };
