import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const OrganizationSchema = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'West Airlines',
    url: 'https://westairtrip.vercel.app',
    logo: 'https://westairtrip.vercel.app/logo.png',
    sameAs: [
      'https://twitter.com/westairlines',
      'https://www.facebook.com/westairlines',
      'https://www.instagram.com/westairlines',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-WEST-AIR',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  };

  return <JsonLd data={data} />;
};

export const WebsiteSchema = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'West Airlines Trip Planner',
    url: 'https://westairtrip.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://westairtrip.vercel.app/trip-planner?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
};

export const TripPlannerSchema = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'West Airlines Trip Planner',
    url: 'https://westairtrip.vercel.app',
    description: 'Plan your perfect getaway with West Airlines\' smart travel planning portal.',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Flight Booking',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Hotel Reservations',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Trip Planning',
        },
      ],
    },
  };

  return <JsonLd data={data} />;
};
