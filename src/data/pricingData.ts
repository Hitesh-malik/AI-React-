// src/data/pricingData.ts

export interface PricingFeature {
    title: string;
    included: boolean;
  }
  
  export interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    billingPeriod: 'month' | 'year';
    highlighted?: boolean;
    badge?: string;
    features: PricingFeature[];
    ctaText: string;
  }
  
  export const monthlyPlans: PricingPlan[] = [
    {
      id: "free-monthly",
      name: "Free",
      description: "Perfect for trying out our service",
      price: 0,
      currency: "USD",
      billingPeriod: "month",
      features: [
        { title: "Basic features", included: true },
        { title: "1 user", included: true },
        { title: "2GB storage", included: true },
        { title: "Email support", included: true },
        { title: "Advanced analytics", included: false },
        { title: "Priority support", included: false },
        { title: "Custom branding", included: false }
      ],
      ctaText: "Start for free"
    },
    {
      id: "pro-monthly",
      name: "Pro",
      description: "For professionals and growing teams",
      price: 29,
      currency: "USD",
      billingPeriod: "month",
      highlighted: true,
      badge: "Popular",
      features: [
        { title: "Basic features", included: true },
        { title: "Up to 10 users", included: true },
        { title: "50GB storage", included: true },
        { title: "Email support", included: true },
        { title: "Advanced analytics", included: true },
        { title: "Priority support", included: true },
        { title: "Custom branding", included: false }
      ],
      ctaText: "Get started"
    },
    {
      id: "business-monthly",
      name: "Business",
      description: "For large organizations and enterprises",
      price: 99,
      currency: "USD",
      billingPeriod: "month",
      features: [
        { title: "Basic features", included: true },
        { title: "Unlimited users", included: true },
        { title: "500GB storage", included: true },
        { title: "Email support", included: true },
        { title: "Advanced analytics", included: true },
        { title: "Priority support", included: true },
        { title: "Custom branding", included: true }
      ],
      ctaText: "Contact sales"
    }
  ];
  
  export const yearlyPlans: PricingPlan[] = [
    {
      id: "free-yearly",
      name: "Free",
      description: "Perfect for trying out our service",
      price: 0,
      currency: "USD",
      billingPeriod: "year",
      features: [
        { title: "Basic features", included: true },
        { title: "1 user", included: true },
        { title: "2GB storage", included: true },
        { title: "Email support", included: true },
        { title: "Advanced analytics", included: false },
        { title: "Priority support", included: false },
        { title: "Custom branding", included: false }
      ],
      ctaText: "Start for free"
    },
    {
      id: "pro-yearly",
      name: "Pro",
      description: "For professionals and growing teams",
      price: 290,
      currency: "USD",
      billingPeriod: "year",
      highlighted: true,
      badge: "Save 17%",
      features: [
        { title: "Basic features", included: true },
        { title: "Up to 10 users", included: true },
        { title: "50GB storage", included: true },
        { title: "Email support", included: true },
        { title: "Advanced analytics", included: true },
        { title: "Priority support", included: true },
        { title: "Custom branding", included: false }
      ],
      ctaText: "Get started"
    },
    {
      id: "business-yearly",
      name: "Business",
      description: "For large organizations and enterprises",
      price: 990,
      currency: "USD",
      billingPeriod: "year",
      badge: "Save 16%",
      features: [
        { title: "Basic features", included: true },
        { title: "Unlimited users", included: true },
        { title: "500GB storage", included: true },
        { title: "Email support", included: true },
        { title: "Advanced analytics", included: true },
        { title: "Priority support", included: true },
        { title: "Custom branding", included: true }
      ],
      ctaText: "Contact sales"
    }
  ];