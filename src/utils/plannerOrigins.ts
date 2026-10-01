import type { SageDestination } from './sage/familyAdventureScoring';
type Origin = 'phoenix' | 'tucson' | 'flagstaff' | 'sedona' | 'prescott';
const origins: Array<{ value: Origin; label: string }> = [
  { value: 'phoenix', label: 'Phoenix metro' },
  { value: 'tucson', label: 'Tucson' },
  { value: 'flagstaff', label: 'Flagstaff / Northern Arizona' },
  { value: 'sedona', label: 'Sedona / Verde Valley' },
  { value: 'prescott', label: 'Prescott' },
];

const originDriveMinutes: Record<Origin, Partial<Record<string, number>>> = {
  phoenix: {},
  tucson: {
    'red-rock-state-park': 230,
    'bell-rock-pathway': 220,
    'crescent-moon-picnic-site': 235,
    'papago-park': 115,
    'victory-steps-verrado': 150,
    'white-tank-mountain-regional-park': 150,
    'estrella-mountain-regional-park': 125,
    'lake-pleasant-regional-park': 150,
    'boyce-thompson-arboretum': 85,
    'tonto-natural-bridge-state-park': 200,
    'kartchner-caverns-state-park': 55,
    'watson-lake-park': 225,
    'buffalo-park-flagstaff': 260,
    'cave-creek-regional-park': 145,
    'pinetop-lakeside': 260,
  },
  flagstaff: {
    'red-rock-state-park': 55,
    'bell-rock-pathway': 50,
    'crescent-moon-picnic-site': 55,
    'papago-park': 145,
    'victory-steps-verrado': 170,
    'white-tank-mountain-regional-park': 165,
    'estrella-mountain-regional-park': 170,
    'lake-pleasant-regional-park': 145,
    'boyce-thompson-arboretum': 180,
    'tonto-natural-bridge-state-park': 110,
    'kartchner-caverns-state-park': 240,
    'watson-lake-park': 100,
    'buffalo-park-flagstaff': 10,
    'cave-creek-regional-park': 130,
    'pinetop-lakeside': 130,
  },
  sedona: {
    'red-rock-state-park': 15,
    'bell-rock-pathway': 15,
    'crescent-moon-picnic-site': 15,
    'papago-park': 120,
    'victory-steps-verrado': 145,
    'white-tank-mountain-regional-park': 140,
    'estrella-mountain-regional-park': 145,
    'lake-pleasant-regional-park': 115,
    'boyce-thompson-arboretum': 155,
    'tonto-natural-bridge-state-park': 90,
    'kartchner-caverns-state-park': 220,
    'watson-lake-park': 70,
    'buffalo-park-flagstaff': 50,
    'cave-creek-regional-park': 110,
    'pinetop-lakeside': 165,
  },
  prescott: {
    'red-rock-state-park': 70,
    'bell-rock-pathway': 80,
    'crescent-moon-picnic-site': 70,
    'papago-park': 105,
    'victory-steps-verrado': 105,
    'white-tank-mountain-regional-park': 95,
    'estrella-mountain-regional-park': 110,
    'lake-pleasant-regional-park': 75,
    'boyce-thompson-arboretum': 145,
    'tonto-natural-bridge-state-park': 90,
    'kartchner-caverns-state-park': 220,
    'watson-lake-park': 10,
    'buffalo-park-flagstaff': 100,
    'cave-creek-regional-park': 85,
    'pinetop-lakeside': 180,
  },
};

function estimatedDrive(origin: Origin, destination: SageDestination): number {
  return originDriveMinutes[origin][destination.slug] ?? (origin === 'phoenix' ? destination.driveMinutesFromPhoenix : Number.POSITIVE_INFINITY);
}


export { origins, estimatedDrive };
export type { Origin };
