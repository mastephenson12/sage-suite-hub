export type SageAiTripPlan = {
  title: string;
  summary: string;
  outdoorAnchor: {
    name: string;
    description: string;
    coordinates: { latitude: number; longitude: number } | null;
  };
  driveFromPhoenix: string;
  foodStop: { name: string; description: string };
  facilities: { restrooms: string; shade: string };
  backupPlan: string;
  cautions: string[];
  verificationNote: string;
};

export type SageTripPlanRequest = {
  destination: string;
  group: string;
  activity: string;
  length: string;
  season: string;
  kidAgeGroup: string;
  wantsShade: boolean;
  needsBathrooms: boolean;
  needsStrollerAccess: boolean;
  maxDriveMinutes: number;
};

export async function generateSageTripPlan(
  request: SageTripPlanRequest,
  signal?: AbortSignal
): Promise<SageAiTripPlan> {
  const response = await fetch('/api/trip-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  });

  const data = (await response.json()) as {
    plan?: SageAiTripPlan;
    error?: string;
  };

  if (!response.ok || !data.plan) {
    throw new Error(data.error || 'Sage could not personalize this plan right now.');
  }

  return data.plan;
}

