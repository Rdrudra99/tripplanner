import { Metadata } from 'next';
import { TripPlannerSchema } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Plan Your Trip',
  description: 'Use our smart trip planner to find your next dream destination with West Airlines. Customize your search by dates, budget, and preferences.',
  openGraph: {
    title: 'Plan Your Trip | West Airlines Trip Planner',
    description: 'Use our smart trip planner to find your next dream destination with West Airlines.',
    url: 'https://westairtrip.vercel.app/trip-planner',
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "West Airlines Trip Planner Form"
      }
    ]
  }
};

export default function TripPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TripPlannerSchema />
      {children}
    </>
  );
}
