import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;
            if (typeof email !== 'string') {
                throw new Error('Invalid email');
            }
            const response = await axios.post(process.env.EMAIL_CODE_API_URL!, { email });
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error sending email code:', error);
            res.status(500).json({ error: 'Failed to send email code' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
