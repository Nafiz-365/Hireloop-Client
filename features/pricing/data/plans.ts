import type { PricingPlan } from "../types"

export const plans: PricingPlan[] = [
  {
    icon: "/icons/price-icon-1.svg",
    name: "Starter",
    price: "$0",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1‑click apply, unlimited",
    ],
    featured: false,
  },
  {
    icon: "/icons/price-icon-2.svg",
    name: "Growth",
    price: "$17",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1‑click apply, unlimited",
    ],
    featured: true,
  },
  {
    icon: "/icons/price-icon-3.svg",
    name: "Premium",
    price: "$99",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    featured: false,
  },
]
