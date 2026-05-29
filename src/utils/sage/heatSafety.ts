export type HeatSafetyLevel = "good" | "caution" | "warning" | "danger";

export type HeatSafetyInput = {
  destinationName?: string;
  projectedTempF: number;
  elevationFt?: number;
  startTimeHour?: number;
};

export type HeatSafetyResult = {
  level: HeatSafetyLevel;
  badge: string;
  message: string;
  suggestion: string;
};

export function getHeatSafety(input: HeatSafetyInput): HeatSafetyResult {
  const {
    projectedTempF,
    elevationFt = 0,
    startTimeHour = 10,
  } = input;

  if (projectedTempF >= 105 && elevationFt < 4500) {
    return {
      level: "danger",
      badge: "Dangerous Heat",
      message:
        "This is not a smart family hiking choice during peak heat.",
      suggestion:
        "Choose a higher-elevation destination, a water-based activity, an indoor stop, or go very early in the morning.",
    };
  }

  if (projectedTempF >= 100 && elevationFt < 4500) {
    return {
      level: "warning",
      badge: "Extreme Heat Warning",
      message:
        "This trip needs serious caution, especially with kids.",
      suggestion:
        "Start before sunrise, shorten the route, bring extra water, and have a backup plan.",
    };
  }

  if (projectedTempF >= 90 && startTimeHour >= 9 && elevationFt < 4500) {
    return {
      level: "caution",
      badge: "Start Early",
      message:
        "This can work, but it is better earlier in the day.",
      suggestion:
        "Plan for shade, water, snacks, sunscreen, and a shorter adventure.",
    };
  }

  return {
    level: "good",
    badge: "Good Family Conditions",
    message:
      "This looks like a reasonable outdoor option for most families.",
    suggestion:
      "Still bring water, sun protection, and a flexible plan because Arizona likes to humble people.",
  };
}
