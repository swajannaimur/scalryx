# Premium Electric-Blue UI Redesign

## Goal

Transform the existing Scalryx affiliate business-health landing page from a
conventional SaaS layout into a premium operating-console experience inspired
by the supplied reference image, without changing the product model,
assessment logic, navigation, newsletter behavior, or legal positioning.

## Approved Direction

The selected direction is a dark-first, deep-navy interface with cool
electric-blue highlights. It should feel precise, trustworthy, and useful to
CEOs, founders, and agency leaders—not like a gaming interface or a literal
copy of the reference.

The redesign uses:

- a near-black navy page canvas with localized blue radial glows;
- translucent layered panels with thin luminous borders;
- bright blue-to-cyan gradients for primary actions and numeric highlights;
- compact dashboard-like cards and stronger information density;
- bolder editorial headings with tighter tracking;
- restrained motion: staged entrances, gentle floating/glow effects, animated
  score/progress fills, card lift, and border bloom;
- a fully designed cool-white light mode using the same semantic tokens;
- reduced-motion fallbacks for every nonessential animation.

## Page Composition

The existing content order remains:

1. announcement bar;
2. primary navigation;
3. assessment-first hero;
4. audience/value cards;
5. honest Trustpilot placeholder;
6. featured resources;
7. recommended videos;
8. current deals;
9. newsletter call to action;
10. footer and affiliate disclosure.

No login, pricing, or Deals navigation item will be introduced.

## Hero and Assessment

The hero becomes a full-bleed visual stage within the 1440px shell. The left
column uses a high-impact multi-line heading, blue gradient emphasis, concise
supporting copy, and compact trust signals. The right column presents the real
business-health assessment as a luminous interactive console—not a decorative
mockup.

Assessment business cards, answer options, progress, navigation, confirmation
dialog, score ring, category bars, risks, actions, and recommendations all use
the same console surface language. Existing accessibility and reducer/scoring
behavior remain authoritative.

## Section System

Every major section receives an eyebrow, headline, supporting copy, and a
distinct but related panel composition. Repeated cards vary their geometry and
accent color slightly while using the same tokens. Trust metrics are honest
product/process facts only; no fabricated customer counts, ratings, savings,
or testimonials will be added.

Resource and deal destinations remain unchanged. Empty media destinations
remain visibly unavailable rather than becoming fake links.

## Theme and Accessibility

- Whole-site maximum width remains exactly `90rem` / `1440px`.
- Body text remains at least 16px.
- Controls and secondary labels remain at least 14px.
- Compact metadata remains at least 12px.
- Interactive targets remain at least 44×44px.
- Text contrast targets WCAG AA in both themes.
- Keyboard focus remains highly visible.
- Dialog focus management and state behavior remain unchanged.
- Content and controls must not depend on glow, transparency, or animation to
  remain visible.

## Motion

Motion is CSS-first and progressive:

- hero copy and console enter with staggered fade/translate;
- ambient glow layers drift slowly;
- console highlights use a subtle scan sheen;
- cards lift by a few pixels with border/glow changes on hover/focus;
- progress, score, and category fills animate from their prior visual state;
- supporting sections reveal using view timelines when supported;
- `prefers-reduced-motion: reduce` removes all nonessential movement.

## Scope Boundaries

This redesign changes presentation and composition only. It does not change:

- the four assessment types or forty questions;
- scoring, result, or recommendation algorithms;
- newsletter transport behavior;
- navigation destinations;
- affiliate/legal copy;
- browser-memory-only assessment storage.

## Verification

Required checks:

- existing automated tests;
- ESLint;
- Next.js production build;
- `git diff --check`;
- static inspection for 1440px containment, font/target floors, both-theme
  tokens, overflow risks, semantic content, and reduced motion;
- rendered viewport/theme testing if a Browser backend becomes available.

