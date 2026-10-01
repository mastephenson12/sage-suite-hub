# Unified adventure journey: first release

The homepage submits a native GET form to `/plan` with `results=1`, origin, group, length, interest, priority, season and drive. The planner validates these values, displays up to three matches immediately, and keeps editing in the same view. One scoring collection supports all origins; an unknown non-Phoenix drive is excluded rather than borrowing a Phoenix estimate.

Choosing a match opens `/trip-builder?source=unified-adventure&...`. This route renders the focused day plan with the selected destination, reviewed facts where available, a flexible first-day outline, packing checklist and save/share/download/print controls. Existing trip-builder URLs retain the previous builder. Saved plans use the existing `sage.saved-trips.v1` storage and My Trips pages. No account or new external service is required.

Drive limits are conservative product defaults (60 minutes for a half day, 120 for a day trip and 240 for a weekend), further reduced by an explicit user limit. They are not live navigation. Matching can return fewer than three places. Exposed high-heat-risk summer hikes are excluded from hiking matches. Facility scores remain internal; reviewed factual descriptions take precedence over qualitative fallback text. Missing reviewed detail is explicitly identified.

## Review and rollout

1. Review the companion `healthandtravels-home` branch named `redesign/unified-adventure-journey`.
2. Verify both previews together before production release. Publish Sage first, then the homepage, so the new form has a compatible receiver.
3. Check desktop/mobile layout, keyboard flow, edit/back navigation, empty results, save/reopen, blocked storage, share cancellation and print. Browser interaction/visual QA has not been performed in this change.
4. Confirm production analytics configuration. The local build does not have `VITE_GOOGLE_ANALYTICS_ID` configured.

Validation: `npm run build` and `node scripts/test-adventure-journey.mjs`. To check the cross-site form contract too, pass the path to the companion `index.html` as the script's first argument. The checks cover 10,800 matching scenarios, handoff, input validation, empty results, origin-specific estimates and saved-plan persistence.

This is the primary-journey release. Legacy matcher entry pages, editorial layouts, destination-fact expansion, a consolidated saved-places system and a full weekend itinerary remain later work. Existing article URLs, memberships and newsletter services are preserved.
