# Scalryx Brighter Sapphire Visual Identity

## Objective

Revise the current white editorial Scalryx interface so it feels more energetic, dimensional, and distinctly branded without losing its calm, human-designed character. Use the favicon and logo as inspiration for a layered blue identity instead of routing every branded element through one dark navy value.

The update is a presentation-layer revision. Existing content, assessment questions, scoring, reducer behavior, newsletter state, navigation, modal focus behavior, external destinations, component exports, and page composition remain unchanged.

## Approved Direction

Use a gradient-free layered blue hierarchy. Each supplied blue has a specific job:

- Deep Sapphire `#123B82`: brand anchor, logo, major emphasis, strong headings, and high-authority labels.
- Royal Blue `#1E56A0`: primary CTA buttons and strong interactive controls.
- Bright Azure `#2F75C7`: active states, links, progress, icons, directional cues, and important metrics.
- Text `#0B1628`: primary reading color.
- Background `#FFFFFF`: primary page and card surface.
- Soft background `#F5F8FC`: alternating sections and quiet supporting panels.

Supporting values may be introduced only for functional UI hierarchy:

- Primary hover: a slightly darker Royal Blue.
- Sapphire soft: a very pale Sapphire tint for branded callouts.
- Azure soft: a very pale Azure tint for icons and selected states.
- Blue-gray borders: neutral enough for long sessions but visibly stronger than the current borders.
- Muted and subtle text colors: cool slate values with accessible contrast.

Do not use gradients, glow effects, glassmorphism, neon, colorful card fills, decorative grid overlays, or continuous animation.

## Visual System

### Foundations

Update `app/globals.css` so the supplied colors are first-class named tokens rather than aliases for one navy:

- `--brand-primary: #123B82`
- `--brand-secondary: #1E56A0`
- `--brand-accent: #2F75C7`
- `--ink: #0B1628`
- `--canvas: #FFFFFF`
- `--canvas-soft: #F5F8FC`

Retain white cards and light page surfaces. Use the new palette to create hierarchy through borders, solid fills, text, icons, and small structural details.

### Depth and separation

- Editorial panels gain clearer blue-gray borders and a restrained blue-tinted shadow.
- Cards keep white surfaces but use stronger separation from the page.
- Interactive cards gain an Azure border, slightly richer shadow, and a two-pixel lift on hover or focus-within.
- Large product surfaces may use a thin Sapphire top border to establish hierarchy.
- Soft sections use exactly `#F5F8FC`.
- Shadows remain subtle and diffuse; they must not resemble glow effects.

### Typography and emphasis

- Primary text uses `#0B1628` for stronger contrast.
- Hero and section headings retain the current Manrope hierarchy.
- The hero may place one short phrase in Deep Sapphire using solid text color.
- Section labels use Deep Sapphire, while their line detail uses Bright Azure.
- Links, arrows, metadata highlights, and important numbers use Bright Azure.
- Paragraph text remains cool slate for comfortable long-session reading.

### Buttons and controls

- Primary CTA fill: Royal Blue `#1E56A0`.
- Primary CTA border: Royal Blue.
- Primary CTA hover: slightly darker Royal Blue, with a controlled shadow and one-pixel lift.
- Secondary controls remain white but gain Sapphire text and border emphasis on hover.
- Visible focus rings use a translucent Bright Azure derived from `#2F75C7`.
- Disabled states preserve contrast and do not rely on color alone.

### Icons and indicators

- Icon tiles use Bright Azure icons on an Azure-soft background.
- Large or authoritative icons may use Deep Sapphire.
- Active dots, arrows, progress, check indicators, and numeric metrics use Bright Azure.
- Decorative icons remain `aria-hidden` where surrounding text supplies the meaning.

## Component Application

### Logo, announcement, and navigation

- Update the CSS-rendered logo mark to use the layered brand blues rather than one navy.
- Keep the announcement bar light, using a Sapphire-soft surface with Royal/Azure text emphasis.
- Header navigation remains open and minimal. Hover and current emphasis use Azure-soft surfaces and Bright Azure text.
- Header newsletter CTA uses the Royal Blue primary-button treatment.

### Hero

- Increase headline contrast through `#0B1628` and use Deep Sapphire for one short phrase.
- Keep the current approved copy and two-column composition.
- Make the Royal Blue CTA more visually prominent through solid color, refined shadow, and stronger sizing.
- Trust indicators use Azure icon treatments and controlled pale-blue backgrounds.
- The live assessment label uses Deep Sapphire and a small Azure status detail.

### Assessment selector

- Give the assessment panel a thin Sapphire top accent and clearer separation from the page.
- Default model cards remain white.
- Hovered cards use an Azure border and slightly stronger shadow.
- Selected model cards use an Azure border, Azure-soft fill, visible selected indicator, and Sapphire title.
- Card arrows and icons use Bright Azure.
- Preserve radio semantics, labels, focus rings, touch targets, and selection behavior.

### Assessment questions

- Assessment title uses Deep Sapphire.
- Category badge uses an Azure-soft surface and Bright Azure text.
- Progress track remains subtle; fill uses Bright Azure.
- Selected answers use an Azure border, Azure-soft fill, Sapphire text emphasis, and visible radio state.
- Primary navigation uses Royal Blue; secondary navigation uses the white/Sapphire treatment.
- Error treatment remains semantic red and accessible.

### Results

- Score uses Deep Sapphire for the number and Bright Azure for ring or metric emphasis.
- Recommendation arrows and interactive states use Bright Azure.
- Newsletter callout uses a Sapphire-soft or Azure-soft background with a Royal Blue CTA.
- Preserve the existing simplified result content and disclaimers.

### Audience and methodology

- Audience cards gain distinct Azure icon tiles, stronger borders, and Sapphire operational labels.
- Methodology cards use small Azure metrics or accent rules so the section feels more authoritative.
- Do not add fabricated reviews, ratings, logos, or proof.

### Articles and videos

- Article metadata and links use Bright Azure.
- The featured article gains stronger hierarchy through border, typography, or a Sapphire structural accent, not a colored card fill.
- Video thumbnail frames use pale blue structure with Sapphire and Azure elements rather than one muted surface.
- Cards without destinations remain non-interactive articles and must not imply playback.

### SaaS recommendations

- Lettermark icons use Azure-soft surfaces and Bright Azure marks.
- Audience chips use Sapphire-soft backgrounds with Sapphire text.
- CTA rows use Bright Azure and gain clearer hover emphasis.
- Preserve secure vendor destinations and avoid invented discounts.

### Newsletter and footer

- Newsletter remains primarily white but gains a richer blue-accented supporting panel, Royal Blue CTA, Azure icon treatment, and stronger section separation.
- Footer remains light. Links use Bright Azure on hover and headings use Deep Sapphire.
- Legal, contact, affiliate, and newsletter behavior remains unchanged.

## Responsive and Accessibility Requirements

- Preserve the current responsive breakpoints and stacking behavior.
- No horizontal scrolling at mobile widths.
- Buttons remain full-width where the current mobile design requires it.
- Maintain minimum 44px touch targets.
- Brand colors must meet WCAG-readable contrast for their actual text and background pairings.
- Selected controls must communicate state through border, fill, and native radio state, not color alone.
- Focus remains visible on every keyboard-interactive control.
- Preserve `prefers-reduced-motion` behavior.

## Technical Boundaries

- Keep the existing Next.js App Router structure and Tailwind CSS 4 setup.
- Make no changes to assessment data, scoring, reducer logic, newsletter state, or submission behavior.
- Prefer token and shared-class changes for consistent styling, with targeted component edits only where separate color roles or hierarchy are required.
- Do not add dependencies or image assets.
- Continue using the existing CSS-rendered Scalryx logo and Lucide icons.

## Testing and Verification

Update the visual contract test first so it fails against the current monochrome token system. The test must require:

- Exact supplied primary, secondary, accent, text, canvas, and soft-canvas values.
- Separate primary CTA and Bright Azure active/progress roles.
- Layered logo colors.
- Hero Sapphire emphasis and Royal Blue CTA usage.
- Azure selector, answer, progress, link, icon, and metric treatments.
- Stronger card and panel separation.
- Continued absence of gradients, neon, glow, glass, and fake proof.

Run the full Node test suite, ESLint, and the production Next.js build. Verify the application source contains all exact palette values and no forbidden decorative primitives. Attempt browser-based desktop and mobile inspection when the environment permits it.

## Success Criteria

The interface remains spacious, readable, and human-designed, but no longer feels flat or monochrome. Deep Sapphire establishes trust, Royal Blue makes actions obvious, and Bright Azure guides attention through active states and product feedback. Cards remain predominantly white, long-session readability remains strong, and every existing workflow behaves exactly as before.
