import type { BusinessType, QuestionCategory } from "./types";

export interface VendorRecommendation {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly href: string;
  readonly audience: BusinessType;
}

const vendorsById = {
  shopify: {
    id: "shopify",
    name: "Shopify",
    description: "Commerce operations for growing online stores.",
    href: "https://www.shopify.com/",
    audience: "ecommerce",
  },
  "quickbooks-ecommerce": {
    id: "quickbooks-ecommerce",
    name: "QuickBooks",
    description: "Financial visibility for ecommerce operators.",
    href: "https://quickbooks.intuit.com/",
    audience: "ecommerce",
  },
  klaviyo: {
    id: "klaviyo",
    name: "Klaviyo",
    description: "Retention and lifecycle marketing for ecommerce teams.",
    href: "https://www.klaviyo.com/",
    audience: "ecommerce",
  },
  gorgias: {
    id: "gorgias",
    name: "Gorgias",
    description: "Customer support operations for online stores.",
    href: "https://www.gorgias.com/",
    audience: "ecommerce",
  },
  harvest: {
    id: "harvest",
    name: "Harvest",
    description: "Utilization and project profitability for agencies.",
    href: "https://www.getharvest.com/",
    audience: "agency",
  },
  "hubspot-agency": {
    id: "hubspot-agency",
    name: "HubSpot",
    description: "Pipeline and client management for agency teams.",
    href: "https://www.hubspot.com/",
    audience: "agency",
  },
  clickup: {
    id: "clickup",
    name: "ClickUp",
    description: "Delivery and operations planning for agencies.",
    href: "https://clickup.com/",
    audience: "agency",
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    description: "Billing and revenue operations for SaaS companies.",
    href: "https://stripe.com/",
    audience: "saas",
  },
  "hubspot-saas": {
    id: "hubspot-saas",
    name: "HubSpot",
    description: "Customer acquisition and pipeline for SaaS teams.",
    href: "https://www.hubspot.com/",
    audience: "saas",
  },
  "customer-io": {
    id: "customer-io",
    name: "Customer.io",
    description: "Activation and retention messaging for SaaS products.",
    href: "https://customer.io/",
    audience: "saas",
  },
  "quickbooks-service": {
    id: "quickbooks-service",
    name: "QuickBooks",
    description: "Invoicing and financial visibility for service businesses.",
    href: "https://quickbooks.intuit.com/",
    audience: "service",
  },
  calendly: {
    id: "calendly",
    name: "Calendly",
    description: "Booking and lead conversion for service businesses.",
    href: "https://calendly.com/",
    audience: "service",
  },
  jobber: {
    id: "jobber",
    name: "Jobber",
    description: "Scheduling and service operations for local teams.",
    href: "https://getjobber.com/",
    audience: "service",
  },
} satisfies Record<string, VendorRecommendation>;

const businessCatalogs = {
  ecommerce: ["shopify", "quickbooks-ecommerce", "klaviyo", "gorgias"],
  agency: ["harvest", "hubspot-agency", "clickup"],
  saas: ["stripe", "hubspot-saas", "customer-io"],
  service: ["quickbooks-service", "calendly", "jobber"],
} as const satisfies Record<BusinessType, readonly (keyof typeof vendorsById)[]>;

const categoryVendorIds: Record<
  BusinessType,
  Partial<Record<QuestionCategory, readonly (keyof typeof vendorsById)[]>>
> = {
  ecommerce: {
    profitability: ["shopify", "quickbooks-ecommerce"],
    finance: ["shopify", "quickbooks-ecommerce"],
    cash: ["shopify", "quickbooks-ecommerce"],
    acquisition: ["klaviyo"],
    retention: ["klaviyo"],
    operations: ["shopify", "gorgias"],
    inventory: ["shopify", "gorgias"],
    conversion: ["shopify", "klaviyo"],
    growth: ["shopify", "klaviyo"],
  },
  agency: {
    profitability: ["harvest"],
    finance: ["harvest"],
    cash: ["harvest"],
    capacity: ["harvest"],
    sales: ["hubspot-agency"],
    "revenue-quality": ["hubspot-agency"],
    risk: ["hubspot-agency"],
    retention: ["hubspot-agency"],
    delivery: ["clickup"],
    operations: ["clickup"],
  },
  saas: {
    finance: ["stripe"],
    profitability: ["stripe"],
    cash: ["stripe"],
    "unit-economics": ["stripe"],
    growth: ["hubspot-saas"],
    acquisition: ["hubspot-saas"],
    product: ["customer-io"],
    retention: ["customer-io"],
    "revenue-quality": ["customer-io"],
    operations: ["customer-io"],
  },
  service: {
    finance: ["quickbooks-service"],
    profitability: ["quickbooks-service"],
    cash: ["quickbooks-service"],
    capacity: ["calendly", "jobber"],
    sales: ["calendly", "jobber"],
    retention: ["jobber"],
    resilience: ["jobber"],
    reputation: ["jobber"],
    operations: ["jobber"],
  },
};

export function getRecommendations(
  type: BusinessType,
  categories: readonly QuestionCategory[],
): readonly VendorRecommendation[] {
  const selected: (keyof typeof vendorsById)[] = [];

  for (const category of categories) {
    for (const vendorId of categoryVendorIds[type][category] ?? []) {
      if (!selected.includes(vendorId)) selected.push(vendorId);
      if (selected.length === 3) break;
    }
    if (selected.length === 3) break;
  }

  const desiredCount = selected.length >= 3 ? 3 : 2;
  for (const vendorId of businessCatalogs[type]) {
    if (!selected.includes(vendorId)) selected.push(vendorId);
    if (selected.length === desiredCount) break;
  }

  return selected
    .slice(0, desiredCount)
    .map((id) => Object.freeze({ ...vendorsById[id] }));
}
