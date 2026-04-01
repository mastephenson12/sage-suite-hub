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

  // Add more Arizona destinations here later:
  // 'grand-canyon': {
  //   tours: 'YOUR_GRAND_CANYON_VIATOR_LINK',
  //   label: 'Grand Canyon Tours',
  // },
  // 'williams': {
  //   tours: 'YOUR_WILLIAMS_VIATOR_LINK',
  //   label: 'Williams Experiences',
  // },
  // 'tombstone': {
  //   tours: 'YOUR_TOMBSTONE_VIATOR_LINK',
  //   label: 'Tombstone Experiences',
  // },
};
