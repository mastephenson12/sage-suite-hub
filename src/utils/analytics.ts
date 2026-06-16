export type AnalyticsEventName =
  | 'homepage_plan_trip_click'
  | 'homepage_quick_plan_submit'
  | 'trip_builder_submit'
  | 'sage_ai_refine_click'
  | 'health_travels_ideas_click'
  | 'plan_another_trip_click'
  | 'arizona_guides_click'
  | 'share_plan_panel_copy'
  | 'popular_trip_card_click'
  | 'unknown_tracked_click';

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {}
): void {
  const eventPayload = {
    event_category: 'sage_user_flow',
    page_path: window.location.pathname,
    page_search: window.location.search,
    ...payload,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventPayload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }

  if (import.meta.env.DEV) {
    console.info('[Sage analytics]', eventName, eventPayload);
  }
}
