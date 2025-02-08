import { MessageSquare, BarChart2, Clock, Users } from 'lucide-react';
import { Step, Testimonial, PricingTier } from '@/types/home';

export const features = [
  {
    icon: MessageSquare,
    title: "Message Analysis",
    description: "Deep dive into your conversation patterns and message frequency"
  },
  {
    icon: BarChart2,
    title: "Visual Statistics",
    description: "Beautiful charts and graphs to visualize your chat data"
  },
  {
    icon: Clock,
    title: "Time Insights",
    description: "Understand peak activity times and response patterns"
  },
  {
    icon: Users,
    title: "Participant Stats",
    description: "Get detailed insights about each participant's engagement"
  }
];

export const steps: Step[] = [
  {
    step: "1",
    title: "Export Chat",
    description: "Export your WhatsApp chat without media from the app"
  },
  {
    step: "2",
    title: "Upload File",
    description: "Upload the exported text file to our analyzer"
  },
  {
    step: "3",
    title: "Get Insights",
    description: "View detailed analytics and visualizations of your chat"
  }
];

export const testimonials: Testimonial[] = [
  {
    text: "ChatViz helped me understand my team's communication patterns and improve our workflow.",
    author: "Sarah Johnson",
    role: "Product Manager"
  },
  {
    text: "The insights provided are incredible. It's like seeing your conversations in a whole new light.",
    author: "Mike Chen",
    role: "Data Analyst"
  },
  {
    text: "Easy to use and provides valuable insights. Highly recommended!",
    author: "Lisa Park",
    role: "Marketing Director"
  }
];

export const pricingTiers: PricingTier[] = [
  {
    title: "Basic",
    price: "Free",
    features: [
      "Basic chat analysis",
      "Message frequency stats",
      "Export basic reports",
      "1 chat analysis per day"
    ]
  },
  {
    title: "Pro",
    price: "$9",
    recommended: true,
    features: [
      "Advanced analytics",
      "Sentiment analysis",
      "Custom reports",
      "Unlimited chat analysis",
      "Priority support"
    ]
  },
  {
    title: "Enterprise",
    price: "$29",
    features: [
      "All Pro features",
      "API access",
      "Custom integrations",
      "Dedicated support",
      "Team collaboration"
    ]
  }
];