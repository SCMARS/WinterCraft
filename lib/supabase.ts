import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that the URL is a valid HTTP or HTTPS URL
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.error('Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.');
  console.error('Please set the NEXT_PUBLIC_SUPABASE_URL environment variable to a valid URL.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Player-related functions
export async function getPlayers() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('coins', { ascending: false });

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return data as Player[];
}

export async function getPlayerByUsername(username: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
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
  const { data, error } = await supabase
    .from('donation_packages')
    .select('*')
    .order('price', { ascending: true });

  if (error) {
    console.error('Error fetching donation packages:', error);
    return [];
  }

  return data as DonationPackage[];
}

// Event functions
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data as Event[];
}

// Team member functions
export async function getTeamMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*');

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data as TeamMember[];
}

// Feedback functions
export async function submitFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('feedback')
    .insert([feedback]);

  if (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }

  return data;
}

// Server stats functions
export async function getServerStats() {
  const { data, error } = await supabase
    .from('server_stats')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching server stats:', error);
    return {
      online_players: 0,
      total_players: 0,
      total_donations: 0,
      active_events: 0
    };
  }

  return data;
}
