import { Groq } from 'groq-sdk';

// Define the type for the form data
export interface TripFormData {
  startDate: string;
  endDate: string;
  budget: number;
  vacationType: string;
  numberOfPeople: number;
  destination?: string;
}

// Define the types for the AI response
export interface DestinationActivity {
  name: string;
  pricePerPerson: number;
}

export interface Flight {
  airline: string;
  departure: string;
  arrival: string;
  pricePerPerson: number;
}

export interface Hotel {
  name: string;
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
}

export interface Destination {
  name: string;
  flight: Flight;
  hotel: Hotel;
  activities: DestinationActivity[];
  totalCost: number;
  perPersonCost: number;
  image?: string; // URL to a destination image
  description?: string; // Short description of the destination
}

export interface TripPlannerResponse {
  destinations: Destination[];
}

// This function is kept for API type references only
// Actual API calls should be made through the server-side API route
export async function getDestinationSuggestions(formData: TripFormData): Promise<TripPlannerResponse> {
  try {
    // Call the API route instead of directly using Groq in the browser
    const response = await fetch('/api/trip-planner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data as TripPlannerResponse;
  } catch (error) {
    console.error("Error calling Trip Planner API:", error);
    throw error;
  }
}
