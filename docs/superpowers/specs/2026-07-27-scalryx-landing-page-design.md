# Scalryx Landing Page Design

## Goal

Recreate the supplied Scalryx SaaS landing-page reference as a pixel-close,
responsive Next.js 16 and TypeScript page. The first version is static but
includes polished visual animation and is organized so interactive product
behavior can be added later without rebuilding the layout.

## Visual Direction

- Use a near-black navy canvas with subtle grid/noise texture, cool gray text,
  electric blue accents, and restrained violet/green/orange secondary accents.
- Match the reference's compact SaaS composition: narrow navigation, two-column
  hero, dense dashboard mockups, thin borders, moderate corner radii, and
  consistent vertical rhythm.
- Keep the product name, section messaging, metrics, pricing, and interface copy
  in English as shown in the reference.
- Build all product previews with semantic HTML and Tailwind CSS instead of using
  the reference screenshot as a background.
- Use small decorative bitmap assets only where they improve authenticity, such
  as customer avatars. Product interface content remains editable HTML.

## Page Structure

1. Sticky translucent header with the Scalryx mark, desktop navigation, login,
   primary CTA, and a compact mobile menu.
2. Hero section with the primary headline, supporting copy, two CTAs, social
   proof, and a large audit-dashboard preview.
3. Four-column metrics strip.
4. Problem statement followed by three software-problem cards.
5. Insight feature band containing four capability cards.
6. "How It Works" steps paired with a static audit-question preview.
7. Product showcase with a dashboard panel and sample report panel.
8. Three-tier pricing area paired with a newsletter signup panel.
9. Multi-column footer with product, resources, company, legal, and social links.

## Architecture

`app/page.tsx` remains a Server Component and composes section components. Page
content is stored in typed arrays under `app/data/landing.ts` so repeated cards,
steps, pricing tiers, and footer links stay consistent and are ready for later
CMS or API replacement.

Reusable components live under:

- `app/components/brand/` for the logo lockup.
- `app/components/layout/` for the header, section shell, and footer.
- `app/components/landing/` for page sections.
- `app/components/mockups/` for the dashboard, audit form, and report previews.
- `app/components/ui/` for shared buttons, icons, cards, and badges.

Client-side JavaScript is limited to a small mobile-navigation component and an
animation observer when CSS-only viewport animation is insufficient. Static
content and mockups stay server-rendered.

## Styling

Tailwind CSS 4 utilities handle layout, spacing, typography, borders, colors,
and responsive states. `app/globals.css` defines global design tokens, reusable
background effects, scrollbar behavior, keyframes, and reduced-motion rules.
Custom CSS is used only for effects that are awkward or excessively repetitive
as inline utilities.

The page uses stable responsive constraints for interface mockups, cards,
charts, progress bars, and button sizes. Desktop layouts collapse to one or two
columns on smaller screens without clipping, horizontal overflow, or overlapping
text.

## Animation

- Hero text and dashboard enter with short staggered fade-and-rise motion.
- Dashboard glow and key panels use slow, low-amplitude floating or pulse motion.
- Progress rings, score bars, and process nodes animate once into their final
  visual state.
- Cards receive restrained border, glow, and translate feedback on hover.
- Buttons use short color, shadow, and transform transitions.
- All nonessential movement is disabled under `prefers-reduced-motion`.

Animations must not cause layout shifts or delay access to content.

## Static Behavior

Navigation and CTA links scroll to relevant sections. Buttons, pricing actions,
the audit choices, email field, and mobile navigation are presentational in this
version; they do not submit data, authenticate users, or call APIs.

## Accessibility

- Use semantic landmarks and heading order.
- Provide visible keyboard focus styles and adequate text contrast.
- Give decorative elements empty or hidden labels and label meaningful controls.
- Keep touch targets comfortably sized on mobile.
- Preserve usability with motion disabled.

## Verification

- Run ESLint and a production build.
- Render and inspect the page at desktop, tablet, and mobile viewport widths.
- Confirm there is no horizontal overflow, clipped text, blank mockup content,
  or incoherent overlap.
- Check reduced-motion behavior and basic keyboard navigation.
- Compare the final desktop composition to the supplied reference for spacing,
  hierarchy, color balance, and section order.

## Out of Scope

Authentication, backend APIs, real audit logic, form submission, pricing
checkout, CMS integration, and analytics are deferred to a later dynamic phase.
