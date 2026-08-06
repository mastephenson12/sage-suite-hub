# Health & Travels brand ecosystem

Each property has one primary job:

- `www.healthandtravels.com`: firsthand stories, editorial trust, and search discovery.
- `sage.healthandtravels.com`: comparisons, family-fit decisions, and trip planning.
- `newsletter.healthandtravels.com`: subscription, retention, and weekly return visits.

## Shared navigation

Each property should expose the same three destinations in a small brand bar:

1. Read Health & Travels
2. Plan with Sage
3. Weekly Newsletter

The current property should be visually identified. Implementations can differ by platform, but labels, order, destinations, and tracking should remain consistent.

## Link contract

Every cross-property link uses:

- `utm_source`: `sage`, `healthandtravels`, or `newsletter`
- `utm_medium`: `navigation`, `cta`, `referral`, or `email`
- `utm_campaign`: the destination, article, or issue campaign
- `utm_content`: the specific button or placement

Health & Travels article example:

```text
https://sage.healthandtravels.com/chat?mode=arizona&prompt=Plan+a+Sedona+family+trip&utm_source=healthandtravels&utm_medium=cta&utm_campaign=sedona&utm_content=article_plan_button
```

Newsletter example:

```text
https://sage.healthandtravels.com/arizona/sedona?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_sedona&utm_content=build_this_trip
```

## Analytics contract

Use the same GA4 measurement ID and web stream across all three properties. Track:

- `health_article_to_sage`
- `sage_plan_started`
- `sage_plan_completed`
- `sage_to_newsletter`
- `newsletter_signup`
- `newsletter_to_sage`
- `newsletter_to_article`

Include `destination`, `article_slug`, `newsletter_issue`, `language`, `group_type`, `source_site`, and `cta_location` when available.

## Security boundary

Sage authentication remains host-only. Do not add a `Domain` attribute to `sage_session`, and do not expose it to the main site or newsletter provider. Ordinary navigation requires no CORS. If another property later needs to call a Sage API directly, allow only its exact origin and only the required methods; do not use wildcard credentialed CORS.

Newsletter provider API keys remain server-only. Embedded subscription forms should submit to a protected server-side endpoint with explicit consent, validation, rate limiting, and provider source tags.
