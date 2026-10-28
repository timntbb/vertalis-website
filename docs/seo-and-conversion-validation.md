# SEO and conversion validation

Run `npm run build`, `npm run check:seo`, and `npm run test:analytics` before deployment. The SEO check inspects production build output for every sitemap URL, including preview images, canonical URLs, headings, article/glossary breadcrumbs, consistent business entities and intentional indexing exclusions. Preview Vercel builds deliberately inherit `noindex, nofollow` from the root metadata.

## Analytics events

| Event | Trigger | Meaning |
| --- | --- | --- |
| `consultation_click` | Internal consultation link or direct-booking button | Intent only; never count this as a completed lead |
| `generate_lead` | Successful contact API response in either inquiry form | Successful inquiry; failed responses and honeypot entries do not count |
| `booking_confirmed` | Cal `bookingSuccessfulV2` with `ACCEPTED` status | Confirmed embedded booking |
| `booking_requested` | Cal `bookingSuccessfulV2` with `PENDING` status | Booking awaiting acceptance; separate from confirmation |

Only fixed `source` and `method` labels are sent. Names, email addresses, matter text, company details and booking identifiers are not analytics parameters. Booking callback identifiers remain in memory only for deduplication. The direct external Cal fallback is available if embedding fails; booking completion on that external page requires Cal-side tracking or a server integration and is not measured by this page's callback.

In GA4, verify the events in DebugView/Realtime and mark `generate_lead` and `booking_confirmed` as key events if they are not already configured. Keep inquiry totals and booking totals separate: the same visitor may do both. Avoid rules that count generic form interaction or consultation clicks as successful leads.

## Live checks after deployment

- Confirm the homepage, one article, one glossary term and all five service pages have the expected metadata in the served HTML.
- Confirm `/about-test` returns 404 and `/connect` remains `noindex` and outside the sitemap/public navigation.
- Test Google Rich Results on representative breadcrumb and article pages. The firm has no verified public postal address in source; this change does not invent one or claim LocalBusiness rich-result eligibility.
- In Search Console, inspect representative URLs, check the Google-selected canonical and sitemap processing, then request indexing only where needed. A sitemap is not proof of indexing.
- On desktop and mobile, choose the schedule option without filling in the message form. Confirm the calendar and external fallback are available.
- In a staging environment with a stubbed contact API, verify that failed inquiry submissions send no `generate_lead` event and that successful submissions send one. Do not submit real test inquiries or create bookings without authorization.

The repository has pre-existing lint errors in article content, navigation and the terms-page game. Compare against the unchanged base before treating whole-repository lint output as a regression. New analytics and breadcrumb modules must lint cleanly; production TypeScript and build checks must pass.
