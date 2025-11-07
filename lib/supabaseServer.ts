import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isServiceConfigured = Boolean(
  supabaseUrl &&
  serviceRoleKey &&
  /^https?:\/\//.test(supabaseUrl)
);

let serverClient: SupabaseClient | null = null;
if (isServiceConfigured) {
  serverClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export async function recordDonationServer(entry: {
  username: string;
  package_id: string;
  price: number;
}) {
  if (!serverClient) {
    console.warn('[Supabase] Service key not configured. Skipping secure donation record.');
    return null;
  }
  try {
    const { data, error } = await serverClient
      .from('donations')
      .insert([entry])
      .select();
    if (error) {
      console.warn('[Supabase] recordDonationServer failed:', error);
      return null;
    }
    return data?.[0] || null;
  } catch (e) {
    console.warn('[Supabase] recordDonationServer error:', e);
    return null;
  }
}

export async function submitFeedbackServer(entry: {
  name: string;
  email: string;
  message: string;
}) {
  if (!serverClient) {
    console.warn('[Supabase] Service key not configured. Cannot persist feedback.');
    return null;
  }
  try {
    const { data, error } = await serverClient
      .from('feedback')
      .insert([entry])
      .select()
      .single();
    if (error) {
      console.warn('[Supabase] submitFeedbackServer failed:', error);
      return null;
    }
    return data;
  } catch (e) {
    console.warn('[Supabase] submitFeedbackServer error:', e);
    return null;
  }
}
