export type Destination = string | null;

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Audience {
  title: string;
  description: string;
  icon: "store" | "briefcase" | "chart" | "wrench";
}

export interface TrustPillar {
  title: string;
  description: string;
  icon: "lock" | "sliders" | "compass";
}

export interface ResourceCard {
  title: string;
  summary: string;
  meta: string;
  category: string;
  href: Destination;
}

export interface DealCard {
  title: string;
  description: string;
  audience: string;
  offer: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: NavigationItem[];
}

export const navItems: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "Assessment", href: "#assessment" },
  { label: "Who We Help", href: "#who-we-help" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

export const audiences: Audience[] = [
  {
    title: "Ecommerce Leaders",
    description:
      "Improve margins, conversion, retention, inventory, and operational efficiency.",
    icon: "store",
  },
  {
    title: "Agency Owners",
    description:
      "Strengthen recurring revenue, delivery capacity, pipeline, client retention, and cash flow.",
    icon: "briefcase",
  },
  {
    title: "SaaS Founders",
    description:
      "Understand growth quality, churn, activation, unit economics, runway, and revenue retention.",
    icon: "chart",
  },
  {
    title: "Service Business Owners",
    description:
      "Improve lead conversion, capacity, collections, repeat business, reputation, and owner independence.",
    icon: "wrench",
  },
];

export const trustPillars: TrustPillar[] = [
  {
    title: "Private assessment",
    description:
      "Answers remain in the current browser session and are never transmitted or permanently stored.",
    icon: "lock",
  },
  {
    title: "Business-model specific",
    description:
      "Each business type has its own questions and recommendation mapping.",
    icon: "sliders",
  },
  {
    title: "Practical scoring",
    description:
      "Results are based on operating signals rather than vague AI claims.",
    icon: "compass",
  },
];

export const trustProfileUrl: Destination = null;

export const articles: ResourceCard[] = [
  {
    title: "The founder’s guide to reading business health signals",
    summary:
      "A practical way to turn operating data into a focused monthly leadership conversation.",
    meta: "6 min read",
    category: "Business health",
    href: null,
  },
  {
    title: "How to choose software without adding operational clutter",
    summary:
      "Questions to ask before a new tool becomes another disconnected workflow.",
    meta: "5 min read",
    category: "Operations",
    href: null,
  },
  {
    title: "Five numbers every growing business should review monthly",
    summary:
      "A concise scorecard for reviewing growth quality, resilience, and execution.",
    meta: "4 min read",
    category: "Leadership",
    href: null,
  },
];

export const videos: ResourceCard[] = [
  {
    title: "How to diagnose a business before trying to scale it",
    summary:
      "A clear framework for identifying the constraint that deserves attention first.",
    meta: "12 min video",
    category: "Business diagnosis",
    href: null,
  },
  {
    title: "Understanding margins, cash flow, and growth quality",
    summary:
      "See how three essential operating signals work together in a growing company.",
    meta: "9 min video",
    category: "Finance",
    href: null,
  },
  {
    title: "Building systems that reduce founder dependency",
    summary:
      "Learn where repeatable processes can give leaders more space to lead.",
    meta: "11 min video",
    category: "Systems",
    href: null,
  },
];

export const deals: DealCard[] = [
  {
    title: "Shopify",
    description: "Build and manage an ecommerce storefront with a central commerce platform.",
    audience: "Ecommerce",
    offer: "Explore current plans",
    href: "https://www.shopify.com/",
  },
  {
    title: "ClickUp",
    description: "Bring project delivery, documentation, and team planning into one workspace.",
    audience: "Agency",
    offer: "Explore current plans",
    href: "https://clickup.com/",
  },
  {
    title: "Stripe",
    description: "Manage subscription billing and payments with flexible financial infrastructure.",
    audience: "SaaS",
    offer: "Explore current plans",
    href: "https://stripe.com/",
  },
  {
    title: "Jobber",
    description: "Coordinate field service work, customer communication, and invoicing in one place.",
    audience: "Service business",
    offer: "Explore current plans",
    href: "https://getjobber.com/",
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Resources",
    links: [
      { label: "Business health guide", href: "#resources" },
      { label: "Recommended videos", href: "#videos" },
      { label: "Tools and deals", href: "#deals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Scalryx", href: "#about" },
      { label: "Contact us", href: "#contact" },
      { label: "Newsletter", href: "#newsletter" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#footer" },
      { label: "Terms and Conditions", href: "#footer" },
      { label: "Refund Policy", href: "#footer" },
      { label: "Affiliate Disclosure", href: "#affiliate-disclosure" },
    ],
  },
];
