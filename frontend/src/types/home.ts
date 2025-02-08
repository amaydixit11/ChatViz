export interface FeatureProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

export interface StepCardProps {
    step: string;
    title: string;
    description: string;
}

export interface TestimonialProps {
    text: string;
    author: string;
    role: string;
}

export interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    recommended?: boolean;
}

export interface Step extends StepCardProps {}
export interface Testimonial extends TestimonialProps {}
export interface PricingTier extends PricingCardProps {}