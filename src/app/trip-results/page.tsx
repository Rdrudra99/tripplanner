"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { TripFormData, TripPlannerResponse, Destination } from '@/lib/groq-api'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, Plane, Hotel, MapPin, Briefcase, Users, Wallet } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

// DestinationCard component displays individual trip destination details
const DestinationCard = ({ 
  destination,
  formatDateTime
}: { 
  destination: Destination;
  formatDateTime: (dateTime: string) => string;
}) => {
  // Fallback image if none provided
  const defaultImage = "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={destination.image || defaultImage} 
          alt={`${destination.name} landscape`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">{destination.name}</h3>
            <p className="text-sm text-white/80">
              ₹{destination.perPersonCost.toLocaleString()} per person
            </p>
          </div>
        </div>
      </div>
      
      {destination.description && (
        <div className="px-4 py-3 bg-slate-50 border-b">
          <p className="text-sm text-gray-700 italic">{destination.description}</p>
        </div>
      )}
      
      <CardContent className="pt-6 space-y-4 flex-grow">
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Plane className="h-4 w-4" /> Flight Details
          </h3>
          <p className="text-sm text-gray-700">{destination.flight.airline}</p>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">Departure</p>
              <p>{formatDateTime(destination.flight.departure)}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Arrival</p>
              <p>{formatDateTime(destination.flight.arrival)}</p>
            </div>
          </div>
          <p className="text-sm text-right">₹{destination.flight.pricePerPerson.toLocaleString()} per person</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Hotel className="h-4 w-4" /> Accommodation
          </h3>
          <p className="text-sm text-gray-700">{destination.hotel.name}</p>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">Check-in</p>
              <p>{destination.hotel.checkIn}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Check-out</p>
              <p>{destination.hotel.checkOut}</p>
            </div>
          </div>
          <p className="text-sm text-right">₹{destination.hotel.pricePerNight.toLocaleString()} per night</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Activities
          </h3>
          {destination.activities.map((activity, i) => (
            <div key={i} className="flex justify-between text-sm">
              <p>{activity.name}</p>
              <p>₹{activity.pricePerPerson.toLocaleString()} per person</p>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-slate-50 flex justify-between mt-auto">
        <div>
          <p className="text-sm font-medium">Total Cost</p>
          <p className="text-lg font-bold">₹{destination.totalCost.toLocaleString()}</p>
        </div>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default function TripResultsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<TripFormData | null>(null)
  const [results, setResults] = useState<TripPlannerResponse | null>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Get the form data from localStorage
        const storedData = localStorage.getItem('tripFormData')
        if (!storedData) {
          setError('No trip data found. Please fill the form again.')
          setIsLoading(false)
          return
        }

        const data = JSON.parse(storedData) as TripFormData
        setFormData(data)

        // Call the API to get destination suggestions
        const response = await fetch('/api/trip-planner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        
        const suggestions = await response.json()
        
        // Validate and process the destinations to ensure they have all required fields
        if (suggestions.destinations) {
          suggestions.destinations = suggestions.destinations.map((dest: any) => ({
            ...dest,
            // Ensure image is valid or use a fallback
            image: dest.image || "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            // Ensure description exists
            description: dest.description || `Explore the beauty of ${dest.name} with our exclusive travel package.`
          }))
        }
        
        setResults(suggestions)
      } catch (error) {
        console.error('Error fetching destinations:', error)
        setError('Failed to fetch destination suggestions. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  // Helper function to format date/time
  const formatDateTime = (dateTime: string) => {
    try {
      return format(parseISO(dateTime), 'MMM d, yyyy h:mm a')
    } catch (e) {
      return dateTime
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Finding your perfect destinations
            </h2>
            <p className="text-gray-600">
              Our AI is analyzing travel options across hundreds of destinations to match your preferences
            </p>
          </div>

          <div className="w-full mt-4 space-y-3">
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Searching flights</span>
              <span>Checking hotels</span>
              <span>Finding activities</span>
            </div>
          </div>

          <div className="italic text-sm text-gray-500 mt-2">
            This usually takes about 15-20 seconds
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/trip-planner')}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Your Trip Recommendations</h1>
          {formData && (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <CalendarIcon className="h-4 w-4" />
                <span>{formData.startDate} to {formData.endDate}</span>
              </div>
              <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Users className="h-4 w-4" />
                <span>{formData.numberOfPeople} Travelers</span>
              </div>
              <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4" />
                <span>{formData.vacationType}</span>
              </div>
              <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Wallet className="h-4 w-4" />
                <span>₹{formData.budget.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-12">
        {results?.destinations && results.destinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.destinations.map((destination, index) => (
              <DestinationCard 
                key={index} 
                destination={destination}
                formatDateTime={formatDateTime}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center">No destinations found. Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 flex justify-center">
          <Button onClick={() => router.push('/trip-planner')}>Plan Another Trip</Button>
        </div>
      </div>
    </div>
  );
}