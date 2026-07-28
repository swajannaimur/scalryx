# Scalryx Affiliate Business Health Platform Design

## Goal

Rebuild Scalryx as a trust-focused SaaS affiliate discovery platform for CEOs,
business founders, startup leaders, agency owners, and senior operators. The
landing page provides immediate value through a private, browser-only business
health assessment, then connects visitors to relevant educational content,
software recommendations, videos, curated deals, and a newsletter.

The new direction replaces the previous pricing-led SaaS stack audit landing
page. Login, paid plans, unsupported customer statistics, and the old product
dashboard/report showcase are removed.

## Audience and Positioning

Primary audiences:

- Ecommerce founders and operators.
- Creative, marketing, development, and consulting agency leaders.
- SaaS founders and recurring-revenue business leaders.
- Local and professional service-business owners.

Scalryx should feel practical, independent, transparent, and executive-ready.
Copy uses professional English for a global audience while avoiding inflated
claims, fake urgency, or invented customer proof.

Primary promise:

> Understand the health of your business, identify the areas holding back
> growth, and discover practical tools to improve them.

## Page Structure

### 1. Announcement Bar

- Copy: `Join us today!`
- Button: `Join now`
- The button opens the shared newsletter modal.

### 2. Header

- Scalryx logo.
- Navigation: `Home`, `Assessment`, `Who We Help`, `Resources`, `Deals`,
  `About`.
- Light/dark theme toggle.
- No login or account action.
- Mobile navigation uses the same destinations and preserves the newsletter
  entry point through the announcement bar.

### 3. Hero and Assessment

The hero uses two columns on large screens and stacks on smaller screens.

Left-side copy:

- Eyebrow: `Business clarity, without the guesswork`
- Heading: `Find the weak points slowing down your business.`
- Body: `Take a private, five-minute health assessment built for your business
  model. Get a clear score, practical next steps, and tools worth considering.`
- Trust points:
  - `Private by default`
  - `No account required`
  - `Actionable results`

The right side contains the full interactive assessment. It is the primary
tool, not a decorative mockup.

### 4. Who We Help

Section heading: `Built for the people responsible for growth.`

Four audience cards:

- `Ecommerce Leaders` — Improve margins, conversion, retention, inventory, and
  operational efficiency.
- `Agency Owners` — Strengthen recurring revenue, delivery capacity, pipeline,
  client retention, and cash flow.
- `SaaS Founders` — Understand growth quality, churn, activation, unit
  economics, runway, and revenue retention.
- `Service Business Owners` — Improve lead conversion, capacity, collections,
  repeat business, reputation, and owner independence.

### 5. Trust and Methodology

Section heading: `A useful score starts with an honest method.`

Trust pillars:

- `Private assessment` — Answers remain in the current browser session and are
  never transmitted or permanently stored.
- `Business-model specific` — Each business type has its own questions and
  recommendation mapping.
- `Practical scoring` — Results are based on operating signals rather than
  vague AI claims.

Trustpilot area:

- Display an integration-ready placeholder labeled `Trustpilot reviews coming
  here`.
- Do not fabricate ratings, review counts, names, or testimonials.
- Keep the Trustpilot profile URL in replaceable content data so the user can
  add it later.

### 6. Featured Recommendations and Articles

Section heading: `Practical guidance for smarter decisions.`

Initial replaceable article cards:

1. `The founder’s guide to reading business health signals`
2. `How to choose software without adding operational clutter`
3. `Five numbers every growing business should review monthly`

Each card includes a category, short summary, reading time, and placeholder
article link.

### 7. Recommended Videos

Section heading: `Watch and apply.`

Three replaceable video cards:

1. `How to diagnose a business before trying to scale it`
2. `Understanding margins, cash flow, and growth quality`
3. `Building systems that reduce founder dependency`

Each card uses a visible video thumbnail treatment, duration label, summary,
and replaceable YouTube URL. Do not claim Scalryx created or endorses a
specific external video until a real URL is supplied.

### 8. Curated SaaS Deals

Section heading: `Tools and deals worth reviewing.`

Seed four replaceable deal cards, one per business type. Each card contains:

- Vendor or category name.
- Short outcome-focused description.
- Audience label.
- Deal/offer placeholder.
- Normal external vendor link.

No fake savings amount or unavailable discount is shown.

### 9. Final Newsletter CTA

- Heading: `Get practical growth guidance in your inbox.`
- Body: `A concise newsletter covering business health, useful software,
  operating benchmarks, and curated opportunities.`
- Button: `Join the newsletter`
- Opens the shared newsletter modal.

### 10. Footer

Footer contains:

- Scalryx logo and short positioning statement.
- Social-profile placeholders.
- Navigation groups for Resources, Company, and Legal.
- `Privacy Policy`, `Terms and Conditions`, `Refund Policy`, and `Affiliate
  Disclosure`.
- Contact placeholder.
- Newsletter link that opens the modal.

The affiliate disclosure appears in the footer/legal navigation rather than
inside every recommendation card.

## Newsletter Modal

The announcement bar and final CTA open the same modal.

Modal content:

- Heading: `Join the Scalryx newsletter`
- Body: `Get practical business insights, useful software recommendations, and
  curated opportunities—without the noise.`
- Email field.
- Primary action: `Subscribe`
- Supporting copy: `No spam. Unsubscribe whenever you want.`

Behavior:

- Modal traps keyboard focus while open.
- `Escape`, the close button, and background dismissal close it.
- The field is required and validated as an email address.
- Invalid input produces a clear inline message.
- A valid submission produces a success state without transmitting or storing
  the address.
- The success state explains that live delivery will begin after the
  newsletter provider is connected.
- The architecture leaves a focused submission adapter that can later connect
  Mailchimp, ConvertKit, Beehiiv, or another provider without redesigning the
  modal.

## Assessment Flow

### Entry State

Progress: `Step 1 of 2`

Heading: `What type of business do you run?`

Supporting copy: `Your questions will adapt to your business model.`

Choices:

- `EC — Ecommerce`
- `AG — Agency`
- `SA — SaaS`
- `SB — Service Business`

Each option includes the approved business-model description and an arrow.

### Question State

The interface shows:

- Business-specific assessment name.
- `Question N of 10`.
- Question category.
- Question title and short guidance.
- Five single-select answer options.
- `Previous` and `Next question` controls.
- A progress indicator.

Users cannot continue without selecting an answer. Returning to a previous
question preserves the answer. Changing the business type resets incompatible
answers after confirmation.

### Result State

The completed result contains:

- Overall score out of 100.
- Health label and concise explanation.
- Category breakdown.
- Two strongest areas.
- Three priority risks.
- Three practical next steps.
- Two or three context-relevant SaaS recommendations.
- Newsletter subscription action.
- `Restart assessment` control.

Answers and results remain in client memory only. Refreshing or closing the
page clears them.

## Assessment Question Banks

Every business type receives ten questions. The first revenue question
provides context but does not reward a business merely for being larger. The
remaining nine questions each score from 0 to 4 and are normalized to 100.

### Ecommerce

1. Finance — `What was your total revenue last month?`
   - Less than $5,000
   - $5,000–$20,000
   - $20,000–$50,000
   - $50,000–$100,000
   - $100,000+
2. Profitability — `What is your average gross margin?`
   - Under 15%
   - 15–30%
   - 31–45%
   - 46–60%
   - Above 60%
3. Profitability — `What was your net profit margin last month?`
   - Operating at a loss
   - Under 5%
   - 5–10%
   - 11–20%
   - Above 20%
4. Growth — `How is revenue trending compared with the previous three months?`
   - Down more than 20%
   - Down up to 20%
   - Mostly flat
   - Up 1–15%
   - Up more than 15%
5. Retention — `What percentage of orders come from returning customers?`
   - Under 10%
   - 10–20%
   - 21–30%
   - 31–40%
   - Above 40%
6. Conversion — `What is your online-store conversion rate?`
   - Under 1%
   - 1–2%
   - 2.1–3%
   - 3.1–5%
   - Above 5%
7. Inventory — `How often do stock issues cause lost sales or excess inventory?`
   - Constantly
   - Frequently
   - Sometimes
   - Rarely
   - Inventory is forecast and controlled
8. Acquisition — `How quickly do you recover customer acquisition cost?`
   - We do not know
   - More than 12 months
   - 6–12 months
   - 2–5 months
   - Within one month
9. Operations — `How automated are order, support, and reporting workflows?`
   - Almost entirely manual
   - Mostly manual
   - Mixed manual and automated
   - Mostly automated
   - Automated with clear monitoring
10. Cash — `How much operating runway does the business have?`
    - Under one month
    - 1–2 months
    - 3–5 months
    - 6–11 months
    - 12+ months

### Agency

1. Finance — `What was your total revenue last month?`
   - Less than $10,000
   - $10,000–$30,000
   - $30,000–$75,000
   - $75,000–$150,000
   - $150,000+
2. Profitability — `What is your current net profit margin?`
   - Operating at a loss
   - Under 5%
   - 5–10%
   - 11–20%
   - Above 20%
3. Risk — `How much of revenue comes from your largest client?`
   - More than 60%
   - 41–60%
   - 26–40%
   - 15–25%
   - Under 15%
4. Revenue Quality — `How much revenue is recurring or under retainer?`
   - Under 10%
   - 10–25%
   - 26–50%
   - 51–75%
   - Above 75%
5. Sales — `How many months of qualified pipeline do you currently have?`
   - Less than one month
   - 1 month
   - 2–3 months
   - 4–5 months
   - 6+ months
6. Capacity — `How healthy is team utilization?`
   - Unknown or constantly overloaded
   - Under 45% billable
   - 45–60% billable
   - 61–80% billable
   - 61–80% with capacity forecasting
7. Delivery — `How consistently are projects delivered on time and on budget?`
   - Rarely
   - Less than half
   - About two thirds
   - Most projects
   - Nearly every project
8. Retention — `What percentage of clients stay or buy again after one year?`
   - Under 20%
   - 20–40%
   - 41–60%
   - 61–80%
   - Above 80%
9. Cash — `How much operating runway does the agency have?`
   - Under one month
   - 1–2 months
   - 3–5 months
   - 6–11 months
   - 12+ months
10. Operations — `How documented and repeatable are sales and delivery
    processes?`
    - Entirely dependent on individuals
    - Mostly undocumented
    - Partially documented
    - Documented and usually followed
    - Measured, documented, and continuously improved

### SaaS

1. Finance — `What is your current monthly recurring revenue?`
   - Pre-revenue or under $1,000
   - $1,000–$10,000
   - $10,000–$50,000
   - $50,000–$200,000
   - $200,000+
2. Growth — `What is your average monthly recurring-revenue growth?`
   - Negative
   - 0–2%
   - 2.1–5%
   - 5.1–10%
   - Above 10%
3. Profitability — `What is your gross margin?`
   - Under 40%
   - 40–55%
   - 56–70%
   - 71–80%
   - Above 80%
4. Retention — `What is your monthly customer churn rate?`
   - Above 10%
   - 7–10%
   - 4–6.9%
   - 2–3.9%
   - Under 2%
5. Acquisition — `How long is your customer-acquisition payback period?`
   - Unknown or above 24 months
   - 18–24 months
   - 12–17 months
   - 6–11 months
   - Under 6 months
6. Unit Economics — `What is your lifetime-value to acquisition-cost ratio?`
   - Unknown or below 1:1
   - 1–2:1
   - 2.1–3:1
   - 3.1–5:1
   - Above 5:1
7. Cash — `How much operating runway does the company have?`
   - Under 3 months
   - 3–5 months
   - 6–11 months
   - 12–17 months
   - 18+ months
8. Product — `What percentage of new users reach the key activation event?`
   - Under 20%
   - 20–35%
   - 36–50%
   - 51–70%
   - Above 70%
9. Revenue Quality — `What is your net revenue retention?`
   - Under 80%
   - 80–90%
   - 91–100%
   - 101–115%
   - Above 115%
10. Operations — `How consistently do teams use shared metrics and documented
    processes?`
    - Decisions are mostly reactive
    - Metrics are inconsistent
    - Core metrics exist
    - Metrics guide regular operating reviews
    - Metrics, ownership, and processes are mature

### Service Business

1. Finance — `What was your total revenue last month?`
   - Less than $5,000
   - $5,000–$20,000
   - $20,000–$50,000
   - $50,000–$100,000
   - $100,000+
2. Profitability — `What is your current net profit margin?`
   - Operating at a loss
   - Under 5%
   - 5–10%
   - 11–20%
   - Above 20%
3. Capacity — `How much of next month’s available capacity is already booked?`
   - Under 20%
   - 20–40%
   - 41–60%
   - 61–80%
   - Above 80% with capacity control
4. Sales — `What percentage of qualified enquiries become paying customers?`
   - Under 10%
   - 10–20%
   - 21–35%
   - 36–50%
   - Above 50%
5. Retention — `How much business comes from repeat customers or referrals?`
   - Under 10%
   - 10–25%
   - 26–50%
   - 51–75%
   - Above 75%
6. Cash — `How quickly are invoices and customer balances collected?`
   - Frequently overdue by 60+ days
   - Frequently overdue by 30–60 days
   - Usually within 30 days
   - Usually within 14 days
   - Mostly paid immediately or automatically
7. Resilience — `How dependent is delivery on the owner personally?`
   - The business stops without the owner
   - Most work requires the owner
   - The team handles routine delivery
   - The team handles most delivery
   - The business operates through clear roles and systems
8. Reputation — `How consistently do customers leave positive feedback?`
   - Feedback is unknown
   - Reviews are rare or inconsistent
   - Mostly positive
   - Consistently positive
   - Consistently positive with an active referral process
9. Cash — `How much operating runway does the business have?`
   - Under one month
   - 1–2 months
   - 3–5 months
   - 6–11 months
   - 12+ months
10. Operations — `How well do scheduling, customer records, billing, and
    follow-up work together?`
    - Mostly manual and disconnected
    - Several disconnected tools
    - A workable but inconsistent process
    - Mostly integrated and documented
    - Integrated, measured, and routinely improved

## Scoring Model

- Question 1 is context-only and is excluded from the health score.
- Questions 2–10 score from 0 to 4 in displayed order unless the question is
  reverse-framed; the stored answer options still carry explicit score values
  so display order never implicitly controls scoring.
- Raw maximum: 36 points.
- Overall score: `round(rawScore / 36 * 100)`.
- Category scores use only questions assigned to that category and normalize
  to 100.
- Strengths are the two highest category scores and are labeled as relative
  strengths when their absolute score is below 60.
- Priority risks are the three lowest-scoring individual health questions.
- Every scored question stores one concise risk explanation and one practical
  next step. The result uses the metadata from the three priority-risk
  questions, so every risk has a directly related action.
- Ties preserve stable question and category order so results remain
  deterministic.

Health labels:

- 0–39: `Critical`
- 40–59: `Needs attention`
- 60–79: `Healthy`
- 80–100: `Strong`

The result explicitly states that the assessment is directional business
guidance, not accounting, legal, investment, or tax advice.

## Recommendation Mapping

Recommendations are selected from the visitor’s business type and weakest
categories. Initial normal vendor links:

### Ecommerce

- Shopify — commerce operations — `https://www.shopify.com/`
- Klaviyo — retention and lifecycle marketing — `https://www.klaviyo.com/`
- Gorgias — customer support operations — `https://www.gorgias.com/`

### Agency

- HubSpot — pipeline and client management — `https://www.hubspot.com/`
- ClickUp — delivery and operations — `https://clickup.com/`
- Harvest — utilization and project profitability — `https://www.getharvest.com/`

### SaaS

- Stripe — billing and revenue operations — `https://stripe.com/`
- HubSpot — customer acquisition and pipeline — `https://www.hubspot.com/`
- Customer.io — activation and retention messaging —
  `https://customer.io/`

### Service Business

- Jobber — scheduling and service operations — `https://getjobber.com/`
- Calendly — booking and lead conversion — `https://calendly.com/`
- QuickBooks — invoicing and financial visibility —
  `https://quickbooks.intuit.com/`

Show two recommendations by default and a third when multiple low categories
need different tools. Selection uses this stable priority mapping:

- Ecommerce:
  - Profitability, Finance, or Cash → Shopify first, then QuickBooks.
  - Acquisition or Retention → Klaviyo.
  - Operations or Inventory → Shopify, then Gorgias.
  - Conversion or Growth → Shopify, then Klaviyo.
- Agency:
  - Profitability, Finance, Cash, or Capacity → Harvest.
  - Sales, Revenue Quality, Risk, or Retention → HubSpot.
  - Delivery or Operations → ClickUp.
- SaaS:
  - Finance, Profitability, Cash, or Unit Economics → Stripe.
  - Growth or Acquisition → HubSpot.
  - Product, Retention, Revenue Quality, or Operations → Customer.io.
- Service Business:
  - Finance, Profitability, or Cash → QuickBooks.
  - Capacity or Sales → Calendly, then Jobber.
  - Retention, Resilience, Reputation, or Operations → Jobber.

QuickBooks is therefore also available to Ecommerce results using
`https://quickbooks.intuit.com/`. Duplicate vendors are removed while
preserving mapping order. If fewer than two unique mapped vendors remain, fill
from the business type’s catalog order. Recommendation content stays in typed
data so affiliate URLs can replace the normal links later.

## Visual Direction

- Preserve the supplied wireframe’s section order and assessment-first hero
  concept, not its rough styling.
- Use a polished blue-led visual system suitable for executive audiences.
- Retain complete light and dark themes with readable foregrounds, panels,
  borders, controls, icons, thumbnails, and focus states.
- Keep the shared content maximum at 1440px.
- Use responsive spacing and typography; primary body copy is 16px, controls
  and secondary labels are at least 14px, and compact metadata is at least
  12px.
- Avoid excessive gradients, novelty animation, or oversized empty sections.
- Use restrained transitions and preserve reduced-motion support.
- The assessment is visually dominant but must not crowd out the hero copy.

## Architecture

`app/page.tsx` remains a Server Component and composes server-rendered
marketing sections.

Client boundaries:

- `BusinessAssessment` owns business type, question index, answers, completion,
  and restart state.
- `NewsletterProvider` or an equivalent focused client boundary owns the
  newsletter modal so any server-rendered CTA can open it.
- Existing `ThemeToggle` remains a focused client component.

Pure modules:

- Question-bank data and types.
- Scoring, category ranking, risk/strength selection, and recommendation
  selection.
- Newsletter email validation.

Marketing content remains in typed replaceable data. Assessment answers never
enter `localStorage`, cookies, network requests, analytics, or server actions.

## Error Handling and Edge Cases

- No answer selected: disable or block Next and provide clear inline guidance.
- Previous from question 1 returns to business selection.
- Business-type change after answering: confirm reset before discarding
  incompatible answers.
- Missing answer at completion: return to the first missing question rather
  than calculate a partial score.
- Invalid email: keep the modal open, focus the field, and show a readable
  message.
- Newsletter success: do not imply the address was transmitted.
- External links open safely with appropriate `rel` attributes when using a
  new tab.
- Missing Trustpilot URL: show the approved placeholder rather than a broken
  embed.
- Missing article/video URL: render the card as non-clickable or use a clearly
  marked placeholder destination without inventing ownership.

## Accessibility

- Semantic landmarks and heading hierarchy.
- Visible keyboard focus throughout.
- Modal focus trap and focus restoration.
- Escape and close-button support.
- Form errors connected through accessible descriptions.
- Assessment progress announced accessibly without excessive live-region
  output.
- Answer options use real radio semantics.
- Result charts include equivalent text values.
- Touch targets are at least 44px.
- Contrast targets WCAG AA in light and dark themes.
- Motion remains usable under `prefers-reduced-motion`.

## Testing and Verification

Behavior-level automated tests cover:

- All four question banks contain exactly ten questions.
- Context-only revenue answers do not change health score.
- Scoring boundaries and normalization.
- Stable category tie handling.
- Strength and risk selection.
- Recommendation selection for every business type.
- Missing-answer prevention.
- Previous/next navigation and preserved answers.
- Restart behavior.
- Business-type reset confirmation.
- Email validation and newsletter success messaging.
- Modal close, Escape, focus trap, and focus restoration.

Final rendered verification covers:

- Light and dark modes.
- Mobile, tablet, 1440px desktop, and wide desktop.
- Maximum content width of 1440px.
- No horizontal overflow.
- Hero and assessment readability.
- All assessment states and one complete path for each business type.
- Newsletter modal at announcement and final CTA entry points.
- Trustpilot placeholder, article cards, video cards, deals, recommendations,
  and external links.
- Keyboard-only navigation and reduced-motion behavior.

## Out of Scope

- Newsletter-provider API integration.
- Database or server persistence.
- User accounts, login, saved reports, or dashboards.
- AI-generated scoring or recommendations.
- Real Trustpilot embedding before a profile URL is provided.
- Real affiliate tracking parameters before affiliate programs are supplied.
- CMS, analytics, checkout, payments, or paid subscriptions.
