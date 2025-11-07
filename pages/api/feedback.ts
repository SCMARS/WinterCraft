import type { NextApiRequest, NextApiResponse } from 'next';
import { submitFeedbackServer, isServiceConfigured } from '../../lib/supabaseServer';
import { submitFeedback, isSupabaseConfigured } from '../../lib/supabase';

type FeedbackPayload = {
  name: string;
  email: string;
  message: string;
};

function validatePayload(body: Partial<FeedbackPayload>) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const name = body.name?.trim() || '';
  const email = body.email?.trim() || '';
  const message = body.message?.trim() || '';

  if (!name || !email || !message) {
    return { ok: false, error: 'All fields are required.' };
  }

  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Please provide a valid email.' };
  }

  return { ok: true, data: { name, email, message } };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const validation = validatePayload(req.body || {});
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const payload = validation.data as FeedbackPayload;

  try {
    let result = null;

    if (isServiceConfigured) {
      result = await submitFeedbackServer(payload);
    } else if (isSupabaseConfigured) {
      result = await submitFeedback(payload);
    }

    if (!result) {
      return res.status(500).json({ error: 'Unable to save feedback at this time.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[API] Feedback submission failed', error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
