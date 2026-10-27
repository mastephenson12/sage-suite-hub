# Exact itinerary sharing

## Behavior

Trip Builder and saved My Trips now offer “Share this exact plan.” The sender reviews the full trip text before explicitly creating a link. The link contains a versioned, compressed snapshot of the itinerary, full trip text, group/season/length preferences and packing list. It excludes the delivery email field, device identifiers, timestamps and packing progress. Free-text fields can still contain personal information, so the review explains what becomes accessible.

Anyone with the complete link can read and forward the copy. There is no expiration or revocation feature. Later sender edits create a different snapshot; they do not update existing links. No email, SMS or external message is sent by creating or copying a link.

The recipient opens a separate, account-free page, can print/save a PDF using the browser, or save the copy in local My Trips. Recipient packing progress starts fresh and can be checked before saving. Changing or clearing browser storage still affects local saved copies.

Legacy text sharing remains explicitly labeled as text sharing. The text's old “live plan” link is now described as a fresh plan with the same preferences, avoiding a promise to recover a generated itinerary from parameters.

## Architecture and boundaries

- Snapshot payload is in the URL fragment, which is not part of the HTTP request. No itinerary persistence service or new provider is introduced.
- `/shared-trip` rewrites to a dedicated Vite HTML entry. It does not load the main application, GA, advertising, Stay22 or external fonts. It has noindex and no-referrer directives in HTML and route headers and is absent from the sitemap.
- The dedicated receiver renders trip content as React text, never HTML. It does not regenerate plans, fetch provider data or follow supplied URLs automatically.
- Input fields are allowlisted and bounded; compressed link data is capped at 24,000 characters and decoded data at 96,000 bytes. Decompression is read with a running size limit. Invalid, unsupported and truncated links fail visibly.
- Browser CompressionStream/DecompressionStream support is required. Unsupported browsers and oversized plans get text-backup guidance. Some messaging clients may truncate long links; a text copy remains an alternative.
- Links are readable bearer copies, not encrypted, authenticated or signed. Receivers should not treat sender-supplied content as verified current conditions.
- Only link-created and link-copied events are added on the sender side. Those events override page location/search to omit query preferences and never include the link, snapshot, email or itinerary text. The dedicated recipient page intentionally has no analytics; no recipient-open conversion is claimed.
- The offline service-worker fallback for the shared route never substitutes the tracking-enabled main app shell. A cached shared page may open; otherwise the user gets a reconnect/text-copy message.

API reference checked: [CompressionStream](https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream), [DecompressionStream](https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream).

## Verification

- 34 automated tests pass, including snapshot round trips, sender-edit independence, private-field stripping, packing reset, damaged/unsupported/oversized links, bounded decompression and offline route isolation.
- Production build passes with both HTML entries; existing missing-local-analytics-ID and large-main-bundle warnings remain.
- Browser generated a Papago Park share link in Chrome's Health & Travels profile and opened it in the separate Person 1 profile without relying on sender local storage.
- Recipient displayed the same itinerary and conditions notes, checked one packing item, saved the copy and reopened My Trips with that item still checked.
- Browser verified a malformed link's visible error and the dedicated page's noindex meta and only local entry script.
- Print button and print stylesheet are implemented; no PDF was exported during this test.

No production merge/deployment or customer messaging is part of this implementation batch. Vercel preview routing must be checked before publication because local Vite preview does not apply Vercel rewrites.
