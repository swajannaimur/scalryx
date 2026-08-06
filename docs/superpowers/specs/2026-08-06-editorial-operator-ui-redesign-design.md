# Scalryx Editorial Operator UI Redesign

## Objective

Redesign the existing Scalryx website as a clean, modern, human-designed business diagnostic experience. Preserve the existing single-page structure, assessment logic, scoring, newsletter flow, content, accessibility behavior, and outbound destinations. Replace the current dark neon presentation with a white-first editorial interface that feels trustworthy enough for a founder to complete a five-minute assessment.

## Approved Direction

Use an editorial operator-first visual language. The interface should resemble a carefully art-directed business publication joined to a practical diagnostic product, not a generic AI-generated SaaS landing page.

The design must use:

- White as the primary canvas, with warm off-white only where section separation is useful.
- The navy from the Scalryx logo as the sole brand accent for actions, links, icons, scores, progress, and selected states.
- Neutral ink, slate, and border colors for hierarchy.
- Solid fills only. Do not use gradients, neon, glow effects, glassmorphism, decorative grid overlays, or colorful card systems.
- Generous whitespace, confident typography, short paragraphs, restrained shadows, and fine borders.
- Subtle interaction through small elevation, border, color, and arrow-position changes.
- No animation that competes with reading or assessment completion.

## Architecture

Keep the existing Next.js App Router architecture and reuse the current page and component boundaries:

- `app/page.tsx` remains the page composition root.
- Existing layout components continue to own the announcement, header, footer, and shared section width.
- Existing landing components continue to own the hero, audiences, methodology, resources, videos, deals, and newsletter sections.
- `BusinessAssessment` continues to own the reducer, business-model selection, modal lifecycle, focus restoration, question progression, scoring, and restart behavior.
- Assessment domain files remain unchanged unless a visual requirement exposes a genuine presentation need.
- Newsletter state, provider, trigger, modal focus behavior, and submission controller remain intact.

The redesign is primarily a presentation-layer change. It may improve component markup or extract small reusable presentation units when that makes the edited files clearer, but it must not introduce unrelated refactors.

## Design System

### Color

Define a compact token system in `app/globals.css`:

- Primary canvas: white.
- Alternate canvas: warm off-white.
- Primary ink: near-black navy.
- Brand navy: sampled visually from the existing Scalryx logo and used consistently.
- Muted copy: neutral slate with sufficient contrast.
- Borders: cool light gray.
- Raised surfaces: white.
- Selected/soft accent surfaces: very pale navy tint.
- Success, warning, and danger colors appear only when assessment semantics require them; they are not general decorative accents.

Remove outgoing dark-theme and electric visual tokens when no longer needed. The root uses a light color scheme.

### Typography

Load a modern professional variable font through `next/font` in the root layout so it is self-hosted and layout-stable. Use one sans-serif family throughout, relying on weight, size, tracking, measure, and spacing for hierarchy.

- Hero headline: large, confident, compact tracking, balanced line breaks.
- Section headings: strong but quieter than the hero.
- Body copy: comfortable line height and controlled measure.
- Eyebrows: small sentence-case or restrained uppercase labels without decorative pills unless the content is genuinely a status.
- Numbers and assessment scores: tabular or visually stable figures where supported.

### Surfaces and spacing

- Shared page shell remains responsive and gains a controlled editorial maximum width.
- Cards use 16–24px corner radii depending on scale.
- Shadows are shallow and reserved for interactive or raised surfaces.
- Section spacing is generous on desktop and compressed proportionally on mobile.
- Layouts vary intentionally by content type; avoid repeating the same three-card template for every section.
- Interactive controls preserve a minimum 44px touch target.

### Motion

- Hover: up to 2px lift, modest border-color change, and small arrow translation.
- Buttons: short background and transform transitions.
- Entrance motion: optional gentle opacity/vertical transition only.
- Respect `prefers-reduced-motion` and remove continuous decorative animation.

## Page Composition

### Announcement and header

Use a slim, quiet announcement bar with direct newsletter copy. The header is white, sticky, and separated by a fine border. The logo, navigation, newsletter action, and mobile menu remain. Navigation should feel open rather than enclosed in a decorative capsule.

### Hero and live assessment

Use a spacious two-column composition.

The left side contains:

- Eyebrow: “Business health assessment”.
- Headline: “Business clarity, without the guesswork”.
- Concise explanation of the private five-minute diagnostic and its actionable outcome.
- Primary CTA: “Check your business health”.
- Four quiet trust indicators: five minutes, no account required, private assessment, and actionable results.

The right side contains the real interactive assessment, not a static mockup. The first screen presents Ecommerce, Agency, SaaS, and Service Business as four selectable cards with simple navy line icons, clear descriptions, subtle hover states, and directional arrows. Selecting a card preserves the current accessible modal assessment flow.

Remove the outgoing capability strip, ambient orbs, glowing labels, console chrome, and decorative scan effects. The assessment itself supplies the product proof.

### Assessment modal and states

The modal should feel like a calm diagnostic workspace:

- Clear model label and “Question X of 10”.
- Thin navy progress indicator.
- Large readable question and concise supporting context.
- Full-width answer cards with quiet default, hover, focus, and selected states.
- Easy-to-reach navigation on mobile.
- Results emphasize the business health score, health label, recommendations, newsletter action, and restart control without altering current output rules.
- Preserve focus trapping, Escape behavior, focus restoration, keyboard selection, state transitions, and scoring.

### Who we help

Use four elegant business-model cards. Each card contains a line icon, business type, the main operating challenge, and what the assessment improves. The section should mix an editorial introduction with a balanced card grid and subtle numbering or labels, using borders instead of colored backgrounds.

### Trust and methodology

Use an authoritative three-column presentation for private assessment, model-specific questions, and practical scoring. Add restrained proof-like details such as a browser-only answer note, a model/question count, or a compact score scale. Do not fabricate reviews, ratings, customer logos, or methodology claims. Remove the visible “proof placeholder” treatment.

### Featured articles

Present articles as editorial content cards rather than a blog roll. Each item includes category, title, reading time, and description. Vary the leading card’s proportion on larger screens to create deliberate hierarchy while preserving the existing data and absent-link behavior.

### Recommended videos

Use thumbnail-style cards created from solid neutral/navy surfaces and typographic framing; no gradients or fake imagery. Include category, title, duration, and description. Clearly avoid implying playback when a destination is absent.

### Curated SaaS tools

Use recommendation cards with a restrained lettermark placeholder, business category, tool name, explanation, and direct CTA. Preserve secure vendor URLs and existing disclosure behavior. Do not invent discounts.

### Newsletter

Create a conversion-focused founder newsletter block with the headline “Stay ahead. Stay decisive.” The section uses a strong but calm bordered composition and invokes the existing newsletter modal through its CTA. It must include concise value copy and the existing no-spam/no-account/unsubscribe reassurance.

### Footer

Use a minimal white or warm off-white SaaS footer with logo, short company description, essential navigation, legal links, newsletter action, company/contact placeholder copy, copyright, and affiliate disclosure. Retain existing destinations and avoid decorative social actions that lead nowhere.

## Responsive Behavior

### Desktop

- Spacious two-column hero.
- Assessment selector remains fully usable inside the right column.
- Editorially varied content grids with clear hierarchy.
- Generous section rhythm and controlled line lengths.

### Tablet

- Hero may stack before the assessment becomes cramped.
- Two-column card layouts where comfortable.
- Preserve whitespace and heading hierarchy.

### Mobile

- Single-column flow with no horizontal scrolling.
- Rounded assessment and content cards with comfortable spacing.
- Buttons become full-width when that improves reach and clarity.
- Business-model and answer options remain easy to tap.
- Modal uses the available viewport safely and keeps navigation reachable.
- Header menu and newsletter dialog remain keyboard and touch accessible.

## Content and Data Rules

- Preserve the four approved business models and all assessment questions and answers.
- Preserve current article, video, tool, navigation, footer, and newsletter content unless copy is changed explicitly in this specification.
- Do not create fake links for content without destinations.
- Do not invent customer proof, ratings, savings, or media assets.
- Fix visible character-encoding artifacts when encountered without changing intended meaning.

## Error Handling and Accessibility

- Existing reducer constraints and incomplete-answer errors remain unchanged.
- Newsletter validation and submission state remain unchanged.
- Interactive elements must have visible focus states and meaningful accessible names.
- Non-interactive cards must not present misleading button or link affordances.
- Icons are decorative unless they communicate information unavailable in text.
- Contrast must remain readable across text, borders, focus rings, and selected states.
- Reduced-motion users receive an essentially static interface.

## Testing and Verification

Update presentation tests test-first so they describe the new light editorial system instead of the outgoing dark electric theme. Add or revise assertions for:

- Light root color scheme and absence of gradient/glow design tokens.
- Hero headline and live assessment composition.
- Four model selector cards and descriptions.
- White-first reusable surfaces, navy actions, focus treatment, responsive shell, and reduced-motion support.
- All landing sections using the new editorial design language.
- Removal of visible placeholder proof and dead social controls.
- Preservation of navigation anchors, content counts, secure vendor URLs, touch targets, modal semantics, assessment progression, scoring, and newsletter behavior.

Run the full unit suite, ESLint, and a production Next.js build. Visually verify desktop and mobile layouts in a browser when available.

## Success Criteria

The finished site reads immediately as a trustworthy business diagnostic platform. It is white-first, calm, modern, responsive, and distinctly human-designed. The assessment remains the conversion focus and works exactly as before. The interface contains no gratuitous gradients, AI-style glow, fake proof, excessive motion, or repeated-template monotony.
