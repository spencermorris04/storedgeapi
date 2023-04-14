import { NextApiRequest, NextApiResponse } from 'next';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { facilityId } = req.query;

  if (!facilityId) {
    res.status(400).json({ message: 'Facility ID is required.' });
    return;
  }

  const apiKey = '3aGJEUjyr8kxEkQS8FGDlvogbDQwCkthQeRLZ4u7';
  const apiSecret = 'e7EjTtVF94OT4qh4A1uWgXJq67NcTsbogR7dFjgY';

  const oauth = new OAuth({
    consumer: {
      key: apiKey,
      secret: apiSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
  });

  const request_data = {
    url: `https://api.storedgefms.com/v1/${facilityId}/units`,
    method: 'GET',
  };

  const authHeader = oauth.toHeader(oauth.authorize(request_data));

  try {
    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...authHeader,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ message: 'Error fetching units.' });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching units.' });
  }
}
