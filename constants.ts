import { Review, ExplorerWish, Stats, BrandProfile, BrandId } from './types';

export const BRANDS: BrandProfile[] = [
  { 
    id: 'campsage', 
    name: 'Campsage', 
    tagline: 'Crafting Wilderness Memories',
    plan: 'Premium', 
    color: 'from-emerald-500 to-green-600', 
    initials: 'CS',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'travelsage', 
    name: 'Travelsage', 
    tagline: 'Designing Global Escapes',
    plan: 'Pro', 
    color: 'from-blue-500 to-indigo-600', 
    initials: 'TS',
    heroImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'flightsage', 
    name: 'Flightsage', 
    tagline: 'The World, Delivered.',
    plan: 'Standard', 
    color: 'from-sky-400 to-blue-500', 
    initials: 'FS',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109c055?auto=format&fit=crop&q=80&w=1200'
  },
];

interface BrandData {
  reviews: Review[];
  explorers: ExplorerWish[];
  stats: Stats;
}

export const MOCK_DATA: Record<BrandId, BrandData> = {
  campsage: {
    stats: { totalReviews: 128, avgRating: 4.8, activePlanners: 42, conciergeTasks: 3 },
    reviews: [
      { id: '1', author: 'The Miller Family', rating: 5, content: 'Our kids first time camping! The RV spot was perfect and right by the creek.', date: '2023-10-25', status: 'replied', reply: 'We love being part of first memories! See you next season.', sentiment: 'Positive' },
      { id: '2', author: 'Mark & Sarah', rating: 4, content: 'Incredible hiking nearby, but we had some trouble finding the check-in booth.', date: '2023-10-24', status: 'pending', sentiment: 'Neutral' }
    ],
    explorers: [
      { id: '101', name: 'Alex Rivera', source: 'Group Message', status: 'Mapping', date: '2023-10-25', dream: 'Planning a surprise birthday trip for my dad who loves trout fishing.', category: 'Family Trip', vibe: ['Fishing', 'Rustic', 'Surprise'] },
      { id: '102', name: 'Group Scout', source: 'Booking Request', status: 'Dreaming', date: '2023-10-25', dream: 'Scout troop of 12 looking for primitive sites with access to a clean lake.', category: 'Group Expedition', vibe: ['Educational', 'Basic', 'Waterfront'] }
    ]
  },
  travelsage: {
    stats: { totalReviews: 856, avgRating: 4.6, activePlanners: 112, conciergeTasks: 12 },
    reviews: [
      { id: '1', author: 'Emily Parker', rating: 5, content: 'The hidden cafes in Rome you recommended were the highlight of our trip!', date: '2023-10-25', status: 'replied', reply: 'Grazie Emily! Those cafes are truly special.', sentiment: 'Positive' }
    ],
    explorers: [
      { id: '201', name: 'The Changs', source: 'Group Message', status: 'Ready', date: '2023-10-25', dream: 'Taking the grandparents to Japan for their 50th anniversary. Need ease of travel.', category: 'Luxury Stay', vibe: ['Comfort', 'History', 'Gourmet'] }
    ]
  },
  flightsage: {
    stats: { totalReviews: 2405, avgRating: 4.2, activePlanners: 340, conciergeTasks: 45 },
    reviews: [
      { id: '1', author: 'Robert Chen', rating: 5, content: 'Unbeatable pricing for a last minute reunion flight. Got to see my sister!', date: '2023-10-25', status: 'replied', reply: 'Family reunions are what we live for!', sentiment: 'Positive' }
    ],
    explorers: [
      { id: '301', name: 'Sarah Flight', source: 'Direct Call', status: 'Mapping', date: '2023-10-25', dream: 'Moving my whole family and two dogs to London. Help!', category: 'Group Expedition', vibe: ['Relocation', 'Pets', 'Stress-Free'] }
    ]
  }
};
