export type ArizonaRegion =
  | 'Arizona'
  | 'Valley of the Sun'
  | 'Sedona / Verde Valley'
  | 'Flagstaff / High Country'
  | 'Mogollon Rim'
  | 'White Mountains'
  | 'Southern Arizona'
  | 'Western / Northern Arizona';

export function getArizonaRegion(location: string): ArizonaRegion {
  const name = location.trim().toLowerCase();

  if (
    name.includes('sedona') ||
    name.includes('cottonwood') ||
    name.includes('jerome') ||
    name.includes('camp verde') ||
    name.includes('verde')
  ) {
    return 'Sedona / Verde Valley';
  }

  if (
    name.includes('flagstaff') ||
    name.includes('williams') ||
    name.includes('grand canyon') ||
    name.includes('humphreys')
  ) {
    return 'Flagstaff / High Country';
  }

  if (
    name.includes('payson') ||
    name.includes('pine') ||
    name.includes('strawberry') ||
    name.includes('mogollon') ||
    name.includes('rim')
  ) {
    return 'Mogollon Rim';
  }

  if (
    name.includes('pinetop') ||
    name.includes('show low') ||
    name.includes('greer') ||
    name.includes('white mountains')
  ) {
    return 'White Mountains';
  }

  if (
    name.includes('tucson') ||
    name.includes('bisbee') ||
    name.includes('sonoita') ||
    name.includes('sierra vista') ||
    name.includes('patagonia')
  ) {
    return 'Southern Arizona';
  }

  if (
    name.includes('yuma') ||
    name.includes('lake havasu') ||
    name.includes('parker') ||
    name.includes('page') ||
    name.includes('colorado river')
  ) {
    return 'Western / Northern Arizona';
  }

  if (
    name.includes('phoenix') ||
    name.includes('scottsdale') ||
    name.includes('mesa') ||
    name.includes('tempe') ||
    name.includes('chandler') ||
    name.includes('glendale') ||
    name.includes('avondale') ||
    name.includes('surprise') ||
    name.includes('camelback') ||
    name.includes('superstition')
  ) {
    return 'Valley of the Sun';
  }

  return 'Arizona';
}
