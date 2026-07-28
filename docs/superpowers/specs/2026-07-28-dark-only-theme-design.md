# Dark-Only Theme

## Goal

Temporarily ship Scalryx with the premium dark theme only and remove every
user-facing and runtime path that can activate light mode.

## Changes

- Make the existing dark palette the `:root` palette.
- Remove the `[data-theme="dark"]` override because no alternate theme exists.
- Remove the header theme-toggle control.
- Remove saved theme preference and system color-scheme synchronization.
- Remove the pre-paint theme initializer from the root layout.
- Delete the unused theme state, toggle component, and theme-specific tests.

## Retained Behavior

Assessment, scoring, newsletter, navigation, responsive layout, motion, legal
copy, and the 1440px maximum width remain unchanged.

## Accessibility

The permanent dark palette must keep the existing high-contrast foreground,
muted, subtle, accent, error, and control colors. Removing the toggle must not
reduce the remaining header controls below 44×44px.

## Verification

Tests must prove that no theme toggle, theme state import, preference script,
`data-theme` selector, or light-mode label remains. The full suite, lint,
production build, and diff check must pass.

