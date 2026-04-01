export type AffiliateSet = {
  tours: string;
  stays?: string;
  gear?: string;
  label?: string;
};

export const ARIZONA_DESTINATIONS: Record<string, AffiliateSet> = {
  sedona: {
    tours:
      'https://www.viator.com/Sedona/d750-ttd?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=arizona-adventure',
    label: 'Best Sedona Tours',
  },

  // future expansion
  // 'grand-canyon': { tours: 'LINK', label: 'Grand Canyon Tours' },
  // 'williams': { tours: 'LINK', label: 'Williams Experiences' },
};
