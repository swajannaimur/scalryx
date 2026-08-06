# Scalryx Logo and Navbar Integration Design

**Date:** 2026-08-06
**Status:** Approved direction
**Scope:** Brand logo rendering, desktop header navigation, mobile header controls, and footer logo

## Goal

Make the user-supplied public/logo.png render correctly as the sole Scalryx logo and improve navbar alignment across desktop and mobile without changing the logo artwork.

## Asset Contract

- public/logo.png is the canonical logo asset.
- The file remains visually and digitally unchanged: no crop, recolor, recreation, compression rewrite, or alternate mobile icon.
- The current asset dimensions are 436 × 164 pixels with transparency.
- Header, mobile, and footer surfaces all use this same complete wordmark.
- The user-supplied app/favicon.ico change is preserved and remains outside this implementation unless a build error requires attention.

## Root Cause

The current Logo component passes a relative string source to Next Image without a controlled visual size. The prerendered markup therefore has no intrinsic width or height attributes and advertises a 100vw responsive image, allowing the 436 × 164 asset to render without a navbar-sized layout contract.

The replacement also leaves the former compact prop unused and retains the old implementation as commented code. The header itself uses a free-form justify-between row, so logo width, navigation centering, and actions are not represented as distinct layout columns.

## Chosen Approach

Use a static Next.js image import and explicit responsive width classes.

- Import public/logo.png into app/components/brand/logo.tsx so Next.js owns its intrinsic 436 × 164 dimensions.
- Render the imported asset with height auto and a caller-controlled width.
- Remove the unused compact prop and all commented legacy logo markup.
- Add an optional priority prop so the above-the-fold header logo loads eagerly while the footer logo remains lazy.
- Preserve a meaningful Scalryx alt label.

## Component Contract

Logo accepts:

- className?: string for responsive visual width
- priority?: boolean for the header loading strategy

Logo always renders the complete user-supplied image. It never conditionally swaps artwork.

Default sizing remains safe for any future call site, while current call sites provide explicit widths:

- Header: approximately 112px on small screens and 128px from the small breakpoint upward.
- Footer: approximately 140px.

The image uses width: auto through its intrinsic aspect ratio and never stretches or crops.

## Header and Navbar Layout

Keep the 72px sticky header and existing white/blue visual identity.

Inside the shared section shell:

- Use a three-column grid: auto-sized logo, flexible centered navigation, auto-sized actions.
- Keep the home link as a minimum 44px touch target.
- Center desktop navigation within the flexible middle column rather than between logo and actions.
- Keep current navigation copy and destinations unchanged.
- Keep the newsletter CTA on the right for small screens and above where it already fits.
- Keep the mobile menu trigger on the right below the desktop-navigation breakpoint.
- Prevent the logo and action group from shrinking.
- Preserve the existing sticky, border, background, blur, hover, focus, and accessibility behavior.

## Mobile Navigation

- Use the same complete logo at the smaller approved width.
- Preserve the existing menu button, accessible labels, expanded state, close behavior, and 44px touch target.
- Keep the dropdown aligned to the header edges and below the unchanged 72px header.
- No alternate icon-only logo is introduced.

## Footer

- Render the same logo asset at approximately 140px wide.
- Preserve the existing footer structure, links, newsletter CTA, legal copy, and spacing.
- The footer does not request priority loading.

## Accessibility

- The header anchor retains aria-label “Scalryx home”.
- The image uses alt text “Scalryx”.
- Intrinsic dimensions prevent layout shift.
- All header and menu controls retain at least 44px interactive height/width.
- Keyboard focus and mobile-menu semantics remain unchanged.

## Testing

Tests will be changed before production code and observed failing against the current uncontrolled integration.

Coverage must prove:

- Logo statically imports the exact public/logo.png asset.
- Logo passes the imported asset to Next Image.
- Logo exposes priority and className while removing compact.
- Logo contains no commented legacy mark.
- Header passes priority and the approved responsive logo widths.
- Footer passes its approved logo width without priority.
- Header uses a three-column grid with a centered navigation column and non-shrinking logo/actions.
- Existing navigation destinations, mobile-menu behavior, touch-target assertions, footer contract, complete test suite, lint, and production build remain green.

## Out of Scope

- Editing the logo artwork or favicon
- Creating an icon-only mark
- Changing navigation labels or destinations
- Redesigning the mobile menu panel
- Changing the 72px header height
- Altering unrelated landing-page sections
