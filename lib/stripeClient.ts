import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = async () => {
  if (!stripePromise) {
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    
    if (!stripeKey) {
      console.error("Stripe public key not found in environment variables");
      return null;
    }
    
    stripePromise = loadStripe(stripeKey);
  }
  
  return stripePromise;
};
