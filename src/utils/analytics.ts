export type AnalyticsEventName =
  | 'homepage_plan_trip_click'
  | 'homepage_quick_plan_submit'
  | 'trip_builder_submit'
  | 'sage_ai_refine_click'
  | 'health_travels_ideas_click'
  | 'cross_site_health_click'
  | 'cross_site_sage_click'
  | 'cross_site_newsletter_click'
  | 'sage_to_newsletter'
  | 'newsletter_to_sage'
  | 'health_article_to_sage'
  | 'plan_another_trip_click'
  | 'save_trip_plan_click'
  | 'packing_checklist_toggle'
  | 'arizona_guides_click'
  | 'share_plan_panel_copy'
  | 'popular_trip_card_click'
  | 'start_here_recommended_guide_click'
  | 'start_here_prefilled_trip_builder_click'
  | 'start_here_starter_plan_click'
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
    source_site: 'sage',
    page_hostname: window.location.hostname,
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
