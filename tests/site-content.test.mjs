import assert from "node:assert/strict";
import test from "node:test";
import {
  articles,
  audiences,
  deals,
  navItems,
  trustProfileUrl,
  videos,
} from "../app/data/site-content.ts";

test("landing content has the approved audience and resource counts", () => {
  assert.equal(audiences.length, 4);
  assert.deepEqual(
    audiences.map((item) => item.title),
    ["Ecommerce Leaders", "Agency Owners", "SaaS Founders", "Service Business Owners"],
  );
  assert.equal(articles.length, 3);
  assert.equal(videos.length, 3);
  assert.equal(deals.length, 4);
});

test("unprovided proof and media destinations stay explicitly absent", () => {
  assert.equal(trustProfileUrl, null);
  assert.equal(articles.every((item) => item.href === null), true);
  assert.equal(videos.every((item) => item.href === null), true);
});

test("deal cards use normal secure vendor destinations without fake savings", () => {
  for (const deal of deals) {
    assert.match(deal.href, /^https:\/\//);
    assert.doesNotMatch(`${deal.title} ${deal.offer}`, /\$\d+|%\s*off/i);
  }
});

test("header navigation omits login, pricing, and deals navigation", () => {
  assert.deepEqual(
    navItems.map((item) => item.label),
    ["Home", "Assessment", "Who We Help", "Resources", "About"],
  );
});
