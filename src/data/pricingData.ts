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
    id: "basic-monthly",
    name: "Student",
    description: "Perfect for individual learners",
    price: 9.99,
    currency: "USD",
    billingPeriod: "month",
    features: [
      { title: "Personal AI tutor", included: true },
      { title: "1 learning path at a time", included: true },
      { title: "5 hours of tutoring per month", included: true },
      { title: "Email support", included: true },
      { title: "Progress tracking", included: true },
      { title: "Advanced practice exercises", included: false },
      { title: "Personalized study plan", included: false },
      { title: "Learning resources library", included: false }
    ],
    ctaText: "Start learning"
  },
  {
    id: "premium-monthly",
    name: "Scholar",
    description: "For dedicated students and professionals",
    price: 24.99,
    currency: "USD",
    billingPeriod: "month",
    highlighted: true,
    badge: "Most Popular",
    features: [
      { title: "Personal AI tutor", included: true },
      { title: "3 learning paths at a time", included: true },
      { title: "20 hours of tutoring per month", included: true },
      { title: "Priority email support", included: true },
      { title: "Progress tracking", included: true },
      { title: "Advanced practice exercises", included: true },
      { title: "Personalized study plan", included: true },
      { title: "Learning resources library", included: false }
    ],
    ctaText: "Boost your learning"
  },
  {
    id: "ultimate-monthly",
    name: "Master",
    description: "For serious learners and professionals",
    price: 49.99,
    currency: "USD",
    billingPeriod: "month",
    features: [
      { title: "Personal AI tutor", included: true },
      { title: "Unlimited learning paths", included: true },
      { title: "Unlimited tutoring hours", included: true },
      { title: "24/7 priority support", included: true },
      { title: "Progress tracking", included: true },
      { title: "Advanced practice exercises", included: true },
      { title: "Personalized study plan", included: true },
      { title: "Learning resources library", included: true }
    ],
    ctaText: "Master any subject"
  }
];

export const yearlyPlans: PricingPlan[] = [
  {
    id: "basic-yearly",
    name: "Student",
    description: "Perfect for individual learners",
    price: 99.99,
    currency: "USD",
    billingPeriod: "year",
    badge: "Save 17%",
    features: [
      { title: "Personal AI tutor", included: true },
      { title: "1 learning path at a time", included: true },
      { title: "5 hours of tutoring per month", included: true },
      { title: "Email support", included: true },
      { title: "Progress tracking", included: true },
      { title: "Advanced practice exercises", included: false },
      { title: "Personalized study plan", included: false },
      { title: "Learning resources library", included: false }
    ],
    ctaText: "Start learning"
  },
  {
    id: "premium-yearly",
    name: "Scholar",
    description: "For dedicated students and professionals",
    price: 249.99,
    currency: "USD",
    billingPeriod: "year",
    highlighted: true,
    badge: "Save 17%",
    features: [
      { title: "Personal AI tutor", included: true },
      { title: "3 learning paths at a time", included: true },
      { title: "20 hours of tutoring per month", included: true },
      { title: "Priority email support", included: true },
      { title: "Progress tracking", included: true },
      { title: "Advanced practice exercises", included: true },
      { title: "Personalized study plan", included: true },
      { title: "Learning resources library", included: false }
    ],
    ctaText: "Boost your learning"
  },
  {
    id: "ultimate-yearly",
    name: "Master",
    description: "For serious learners and professionals",
    price: 499.99,
    currency: "USD",
    billingPeriod: "year",
    badge: "Save 17%",
    features: [
      { title: "Personal AI tutor", included: true },
      { title: "Unlimited learning paths", included: true },
      { title: "Unlimited tutoring hours", included: true },
      { title: "24/7 priority support", included: true },
      { title: "Progress tracking", included: true },
      { title: "Advanced practice exercises", included: true },
      { title: "Personalized study plan", included: true },
      { title: "Learning resources library", included: true }
    ],
    ctaText: "Master any subject"
  }
];