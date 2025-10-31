import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types for our database tables
export interface Player {
  id: string;
  username: string;
  coins: number;
  quests_completed: number;
  last_login: string;
  rank: string;
}

export interface DonationPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  rank: string;
  benefits: string[];
  image_url: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  rewards: string;
  date: string;
  image_url: string;
  rules: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  social_links: { [key: string]: string };
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface DonationRecord {
  id?: string;
  username: string;
  package_id: string;
  price: number;
  created_at?: string;
}

// Initialize Supabase client (with safe guard)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  /^https?:\/\//.test(supabaseUrl) &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

let supabase: SupabaseClient | null = null;
if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('[Supabase] Not configured. Using local defaults.');
}

// Player-related functions
export async function getPlayers() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('players')
    .select('id,username,coins,quests_completed,last_login,rank')
    .order('coins', { ascending: false });

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return (data || []) as Player[];
}

export async function getPlayerByUsername(username: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('players')
    .select('id,username,coins,quests_completed,last_login,rank')
    .eq('username', username)
    .single();

  if (error) {
    console.error('Error fetching player:', error);
    return null;
  }

  return data as Player;
}

// Donation package functions
export async function getDonationPackages() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('donation_packages')
    .select('id,name,description,price,rank,benefits,image_url')
    .order('price', { ascending: true });

  if (error) {
    console.error('Error fetching donation packages:', error);
    return [];
  }

  return (data || []) as DonationPackage[];
}

// Event functions
export async function getEvents() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('events')
    .select('id,name,description,rewards,date,image_url,rules')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return (data || []) as Event[];
}

// Team member functions
export async function getTeamMembers() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('team_members')
    .select('id,name,role,description,image_url,social_links');

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return (data || []) as TeamMember[];
}

// Feedback functions
export async function submitFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
  if (!supabase) {
    console.warn('[Supabase] submitFeedback in mock mode. Message not persisted.');
    return [{ id: 'local', created_at: new Date().toISOString(), ...feedback }];
  }
  const { data, error } = await supabase
    .from('feedback')
    .insert([feedback])
    .select();

  if (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }

  return data;
}

// Server stats functions
export async function getServerStats() {
  if (!supabase) {
    return {
      online_players: 0,
      total_players: 0,
      total_donations: 0,
      active_events: 0,
    };
  }
  const { data, error } = await supabase
    .from('server_stats')
    .select('online_players,total_players,total_donations,active_events')
    .single();

  if (error) {
    console.error('Error fetching server stats:', error);
    return {
      online_players: 0,
      total_players: 0,
      total_donations: 0,
      active_events: 0,
    };
  }

  return data as any;
}

// Optional: record donation if a `donations` table exists
export async function recordDonation(entry: DonationRecord) {
  if (!supabase) {
    console.warn('[Supabase] recordDonation skipped (not configured).');
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('donations')
      .insert([entry])
      .select();
    if (error) {
      console.warn('[Supabase] recordDonation failed (table may not exist):', error);
      return null;
    }
    return data?.[0] || null;
  } catch (e) {
    console.warn('[Supabase] recordDonation error:', e);
    return null;
  }
}
