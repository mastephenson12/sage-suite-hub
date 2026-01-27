export type Brand = 'Flightsage' | 'Travelsage' | 'Campsage';
export type Role = 'user' | 'model' | 'assistant' | 'system';
export type MessageType = 'text' | 'lead-capture' | 'success';

export interface Source {
  uri: string;
  title: string;
}

export interface Message {
  id?: string;
  role: Role;
  content: string;
  timestamp: Date;
  type?: MessageType;
  sources?: Source[];
}

export interface GMBReview {
  id: string;
  brand: Brand;
  author: string;
  rating: number;
  text: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  suggestedReply?: string;
  status: 'pending' | 'replied';
}

export interface TravelLead {
  id: string;
  source: string;
  rawInput: string;
  score: number;
  dreamMap?: string;
  classification: 'Hot' | 'Inquiry' | 'Support';
  timestamp: Date;
}

export interface GeneratedAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
  prompt: string;
  timestamp: Date;
}

export enum ViewType {
  OVERVIEW = 'overview',
  REVIEWS = 'reviews',
  LEADS = 'leads',
  SEARCH = 'search',
  MEDIA = 'media',
  VOICE = 'voice',
  CHAT = 'chat'
}
