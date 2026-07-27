export type Accent = "blue" | "violet" | "orange" | "green";

export type FeatureIcon =
  | "blocks"
  | "bolt"
  | "growth"
  | "audit"
  | "target"
  | "shield"
  | "route";

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: FeatureIcon;
  accent: Accent;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StepItem {
  number: number;
  label: string;
}

export interface PricingTier {
  name: string;
  price: string;
  suffix?: string;
  features: string[];
  featured: boolean;
}

export interface FooterGroup {
  title: string;
  links: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#resources" },
  { label: "About", href: "#about" },
];

export const stats: StatItem[] = [
  { value: "100+", label: "Audits Completed" },
  { value: "40+", label: "Software Analyzed" },
  { value: "15+", label: "Categories Covered" },
  { value: "$2M+", label: "Potential Savings" },
];

export const problemCards: FeatureItem[] = [
  {
    title: "Duplicate Software",
    description: "You're paying for overlapping tools.",
    icon: "blocks",
    accent: "violet",
  },
  {
    title: "Manual Work",
    description: "Disconnected workflows slow your team down.",
    icon: "bolt",
    accent: "orange",
  },
  {
    title: "Scaling Problems",
    description: "Wrong tools limit your growth potential.",
    icon: "growth",
    accent: "green",
  },
];

export const insightCards: FeatureItem[] = [
  {
    title: "AI SaaS Stack Audit",
    description: "Analyze your entire software stack in minutes.",
    icon: "audit",
    accent: "blue",
  },
  {
    title: "Personalized Recommendations",
    description: "No generic advice. Built for your business.",
    icon: "target",
    accent: "blue",
  },
  {
    title: "Cost Optimization",
    description: "Identify wasted spend and save hundreds every month.",
    icon: "shield",
    accent: "blue",
  },
  {
    title: "Growth Roadmap",
    description: "Know what tools to use next to scale smarter.",
    icon: "route",
    accent: "blue",
  },
];

export const steps: StepItem[] = [
  { number: 1, label: "Answer Questions" },
  { number: 2, label: "AI Analysis" },
  { number: 3, label: "Receive Report" },
  { number: 4, label: "Upgrade" },
  { number: 5, label: "Get Better Results" },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "Free",
    features: ["Basic Audit", "Partial Report"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    suffix: "/month",
    features: ["Full Audit", "AI Report", "Recommendations", "Priority Support"],
    featured: true,
  },
  {
    name: "Business",
    price: "$79",
    suffix: "/month",
    features: [
      "Unlimited Audits",
      "Team Members",
      "History & Reports",
      "Monthly Insights",
    ],
    featured: false,
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Solutions", href: "#solutions" },
      { label: "Dashboard", href: "#solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#resources" },
      { label: "Guides", href: "#resources" },
      { label: "Case Studies", href: "#resources" },
      { label: "SaaS Tools", href: "#resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Affiliate Program", href: "#about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#footer" },
      { label: "Terms of Service", href: "#footer" },
      { label: "Cookie Policy", href: "#footer" },
    ],
  },
];
