import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, username, code, message } = req.body;
            if (!email || !username || !code || !message) {
                return res.status(400).json({ success: false, error: 'All fields are required' });
            }

            if (!process.env.CHAT_POST_API_URL) {
                throw new Error('CHAT_API_URL is not defined');
            }
            
            const response = await axios.post(process.env.CHAT_POST_API_URL, { email, username, code, message });
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ success: false, error: 'Failed to send message' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}