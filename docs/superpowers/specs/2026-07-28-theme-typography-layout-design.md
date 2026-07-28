# Theme, Typography, and Layout Design

## Goal

Add a polished light and dark appearance to the Scalryx landing page, keep all
text and visual content readable in both themes, standardize undersized
typography, and expand the site content boundary to a maximum width of 1440px.

## Theme Behavior

- On a visitor's first visit, the page follows the operating system's
  `prefers-color-scheme` setting.
- A visible header control switches directly between light and dark mode.
- A manual choice is stored in `localStorage` and takes precedence over later
  system preference changes.
- The saved or system theme is applied before the page paints to avoid a flash
  of the wrong appearance.
- The root `html` element exposes the active theme through a `data-theme`
  attribute and declares the corresponding `color-scheme`.
- The toggle has an explicit accessible label that describes the mode it will
  activate, a visible focus state, and a touch target of at least 44px.

## Styling Architecture

`app/globals.css` remains the global theme entry point. It defines semantic
custom properties for:

- Page background and decorative background effects.
- Primary, secondary, and subtle text.
- Panels, elevated panels, inputs, and hover surfaces.
- Default and strong borders.
- Brand accents, focus rings, and theme-appropriate shadows.

Tailwind CSS 4 theme aliases map utility names to these semantic properties.
Components use the semantic utilities instead of hard-coded dark-only colors.
Accent colors that already work in both themes may remain, but their
surrounding surface and text contrast must use theme tokens.

A focused client component under `app/components/theme/` owns the interactive
toggle and persisted preference. The root layout remains a Server Component
and includes only the small pre-paint initialization script required to select
the correct initial theme. The remaining landing-page sections stay
server-rendered.

## Layout Width

- The shared `.site-shell` content container has a hard maximum width of
  `90rem` (1440px).
- Responsive horizontal gutters remain inside that boundary: 16px on small
  screens and 32px from the tablet breakpoint upward.
- Decorative body backgrounds may fill the viewport, but all header, main
  section, and footer content stays within the 1440px content boundary.
- No component may cause horizontal overflow at mobile, tablet, desktop, or
  wide-desktop sizes.

## Typography

The landing page uses the existing system-font stack without introducing a
network font dependency.

- Default body copy and important explanatory text use 16px with comfortable
  line height.
- Navigation, buttons, form controls, card descriptions, captions, pricing
  features, footer links, and secondary interface labels use at least 14px.
- Dense product-preview labels may use 12px, but never smaller.
- Card titles use at least 16px; major product and section titles use at least
  28px where layout permits.
- The hero heading uses a responsive range from 40px on small screens to 64px
  on wide screens, with line height that prevents clipping.
- Section headings use a responsive 28–40px scale.
- Text containers and mockup layouts expand or reflow where necessary so larger
  text does not overlap, truncate essential content, or escape its panel.

## Component Changes

- `ThemeToggle` provides the theme control and applies or persists manual
  selections.
- `Header` places the toggle next to the desktop actions and beside the mobile
  menu control without reducing either touch target.
- `MobileMenu`, `Footer`, buttons, inputs, cards, pricing panels, and shared
  surfaces adopt semantic theme tokens.
- The dashboard, audit form, and report previews receive theme-aware surfaces,
  borders, foreground colors, chart centers, and shadows.
- Avatar images keep their original artwork but use theme-aware rings so their
  edges remain distinct on both page backgrounds.
- The logo and Lucide icons use semantic foreground or accent colors so they
  remain visible in both themes.

## Accessibility and Contrast

- Normal text and interactive control labels target at least WCAG AA contrast
  in both themes.
- Muted text remains clearly legible rather than functioning as decoration.
- Inputs provide readable values and placeholders in each mode.
- All keyboard-accessible controls keep visible focus indicators.
- The theme switch exposes its current action through accessible naming.
- Existing reduced-motion behavior remains intact.

## Testing and Verification

Automated tests verify:

- The root layout includes the pre-paint theme initializer and hydration-safe
  root setup.
- The theme toggle is available from the header and implements saved preference
  behavior.
- The shared content maximum is exactly `90rem`.
- Production component source no longer contains font sizes below 12px.
- Existing landing-page structure and content remain present.

Final verification includes:

- Unit/structure tests.
- ESLint.
- A production build.
- Rendered inspection at mobile, tablet, desktop, and wide-desktop widths.
- Both light and dark modes at representative viewport sizes.
- Checks for horizontal overflow, clipped or overlapping text, invisible
  imagery, unreadable controls, and theme flashes.

## Out of Scope

- A three-state light/dark/system selector.
- Account-level or server-side theme storage.
- New marketing sections, copy changes, backend behavior, authentication, form
  submission, or checkout behavior.
- Replacement of the existing avatar artwork or product-preview content.
