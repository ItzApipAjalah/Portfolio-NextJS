import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const apiUrl = process.env.PORTFOLIO_API_URL;
      if (!apiUrl) {
        return res.status(500).json({ error: 'API URL is not defined' });
      }

      const response = await axios.get(apiUrl);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else if (req.method === 'POST') {
    try {
      const apiUrl = process.env.PORTFOLIO_API_URL;
      if (!apiUrl) {
        return res.status(500).json({ error: 'API URL is not defined' });
      }

      const { ip_address } = req.body;
      if (!ip_address) {
        return res.status(400).json({ error: 'ip_address is required' });
      }

      const response = await axios.post(apiUrl, { ip_address });
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
      res.status(500).json({ error: 'Failed to post data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
