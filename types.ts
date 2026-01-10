
export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  status: 'replied' | 'pending';
  reply?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
}

export type AdventureCategory = 'Family Trip' | 'Solo Quest' | 'Group Expedition' | 'Luxury Stay' | 'General Inquiry';

export type ExplorerVibe = 'Excited' | 'Relaxed' | 'Active' | 'Uncertain';

// Added LeadCategory to fix import error in geminiService.ts
export type LeadCategory = 'Hot Lead' | 'Inquiry' | 'Support' | 'Spam' | 'Unclassified';

export interface ExplorerWish {
  id: string;
  name: string;
  source: 'Group Message' | 'Direct Call' | 'Booking Request';
  status: 'Dreaming' | 'Mapping' | 'Ready';
  date: string;
  dream: string;
  category?: AdventureCategory;
  vibe?: string[];
}

export interface Stats {
  totalReviews: number;
  avgRating: number;
  activePlanners: number;
  conciergeTasks: number;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  REVIEWS = 'STORIES',
  EXPLORERS = 'EXPLORERS',
  SETTINGS = 'SETTINGS'
}

export type ReplyTone = 'Professional' | 'Friendly' | 'Witty';

export type BrandId = 'campsage' | 'travelsage' | 'flightsage';

export interface BrandProfile {
  id: BrandId;
  name: string;
  tagline: string;
  plan: string;
  color: string;
  initials: string;
  heroImage: string;
}
