import { Metadata } from 'next';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Trip Results',
  description: 'Discover personalized travel recommendations based on your preferences. Find flights, hotels, and activities for your next adventure with West Airlines.',
  openGraph: {
    title: 'Trip Results | West Airlines Trip Planner',
    description: 'Discover personalized travel recommendations based on your preferences.',
    url: 'https://westairtrip.vercel.app/trip-results',
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "West Airlines Trip Results"
      }
    ]
  }
};

export default function TripResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tripResultsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Travel Recommendations',
    description: 'Personalized travel recommendations from West Airlines',
    url: 'https://westairtrip.vercel.app/trip-results',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'TouristAttraction',
          name: 'Recommended Destinations',
          description: 'Popular destinations recommended by West Airlines',
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={tripResultsSchema} />
      {children}
    </>
  );
}
