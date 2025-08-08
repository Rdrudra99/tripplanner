"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { TripFormData, TripPlannerResponse, Destination } from '@/lib/groq-api'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, Plane, Hotel, MapPin, Briefcase, Users, Wallet } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

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

  const formatDateTime = (dateTime: string) => {
    try {
      return format(parseISO(dateTime), 'MMM d, yyyy h:mm a')
    } catch (e) {
      return dateTime
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-xl">Finding the perfect destinations for you...</p>
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
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Your Trip Recommendations</h1>
      {formData && (
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-full">
            <CalendarIcon className="h-4 w-4" />
            <span>{formData.startDate} to {formData.endDate}</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-full">
            <Users className="h-4 w-4" />
            <span>{formData.numberOfPeople} Travelers</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-full">
            <MapPin className="h-4 w-4" />
            <span>{formData.vacationType}</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-full">
            <Wallet className="h-4 w-4" />
            <span>₹{formData.budget.toLocaleString()}</span>
          </div>
        </div>
      )}

      {results?.destinations && results.destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.destinations.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
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
  )
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle>{destination.name}</CardTitle>
        <CardDescription className="text-white/80">
          ₹{destination.perPersonCost.toLocaleString()} per person
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
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
      <CardFooter className="bg-slate-50 flex justify-between">
        <div>
          <p className="text-sm font-medium">Total Cost</p>
          <p className="text-lg font-bold">₹{destination.totalCost.toLocaleString()}</p>
        </div>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  )
}

// Helper function to format date/time
function formatDateTime(dateTime: string) {
  try {
    return format(parseISO(dateTime), 'MMM d, yyyy h:mm a')
  } catch (e) {
    return dateTime
  }
}
