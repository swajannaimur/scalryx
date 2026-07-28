import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { transformSync } from "next/dist/build/swc/index.js";
import {
  applyPersistedTheme,
  createThemeInitializerScript,
  getThemeToggleLabel,
  syncSystemTheme,
} from "../app/components/theme/theme-state.ts";
import * as themeState from "../app/components/theme/theme-state.ts";

const require = createRequire(import.meta.url);

async function renderThemeToggle() {
  const source = await readFile(
    new URL("../app/components/theme/theme-toggle.tsx", import.meta.url),
    "utf8",
  );
  const { code } = transformSync(source, {
    filename: "theme-toggle.tsx",
    jsc: {
      parser: { syntax: "typescript", tsx: true },
      transform: { react: { runtime: "automatic" } },
    },
    module: { type: "commonjs" },
  });
  const componentModule = { exports: {} };
  const componentRequire = (specifier) =>
    specifier === "./theme-state" ? themeState : require(specifier);

  new Function("exports", "module", "require", code)(
    componentModule.exports,
    componentModule,
    componentRequire,
  );

  return renderToStaticMarkup(
    createElement(componentModule.exports.ThemeToggle),
  );
}

function createRoot() {
  return {
    dataset: {},
    style: { colorScheme: "" },
  };
}

function createStorage(entries = {}) {
  const values = new Map(Object.entries(entries));

  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test("pre-paint initializer uses a saved light preference over a dark system preference", () => {
  const root = createRoot();
  const script = createThemeInitializerScript();

  vm.runInNewContext(script, {
    document: { documentElement: root },
    localStorage: createStorage({ "scalryx-theme": "light" }),
    matchMedia: () => ({ matches: true }),
  });

  assert.equal(root.dataset.theme, "light");
  assert.equal(root.style.colorScheme, "light");
});

test("pre-paint initializer falls back to the system preference when no theme is saved", () => {
  const root = createRoot();
  const script = createThemeInitializerScript();

  vm.runInNewContext(script, {
    document: { documentElement: root },
    localStorage: createStorage(),
    matchMedia: () => ({ matches: true }),
  });

  assert.equal(root.dataset.theme, "dark");
  assert.equal(root.style.colorScheme, "dark");
});

test("theme selection applies and persists the chosen theme", () => {
  const root = createRoot();
  const storage = createStorage();

  applyPersistedTheme("dark", storage, root);

  assert.equal(storage.getItem("scalryx-theme"), "dark");
  assert.equal(root.dataset.theme, "dark");
  assert.equal(root.style.colorScheme, "dark");
});

test("system changes update an unpersisted theme but preserve an explicit preference", () => {
  const unpersistedRoot = createRoot();
  const persistedRoot = createRoot();

  assert.equal(syncSystemTheme(true, createStorage(), unpersistedRoot), "dark");
  assert.equal(unpersistedRoot.dataset.theme, "dark");
  assert.equal(
    syncSystemTheme(false, createStorage({ "scalryx-theme": "dark" }), persistedRoot),
    null,
  );
  assert.equal(persistedRoot.dataset.theme, undefined);
});

test("theme control labels announce the available light and dark action", () => {
  assert.equal(getThemeToggleLabel("dark"), "Switch to light mode");
  assert.equal(getThemeToggleLabel("light"), "Switch to dark mode");
});

test("rendered theme control exposes an accessible 44px keyboard-focusable action", async () => {
  const control = await renderThemeToggle();

  assert.match(control, /<button[^>]*aria-label="Switch to light mode"/);
  assert.match(control, /class="[^"]*\bsize-11\b/);
  assert.match(control, /class="[^"]*\bfocus-visible:outline-2\b/);
  assert.match(control, /class="[^"]*\bfocus-visible:outline-offset-2\b/);
  assert.match(control, /class="[^"]*\bfocus-visible:outline-blue-500\b/);
});
