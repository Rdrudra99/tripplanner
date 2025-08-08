import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  CalendarCheck, 
  Globe, 
  MapPin, 
  Plane, 
  Search, 
  Hotel, 
  Sparkles, 
  CreditCard, 
  Briefcase,
  Users
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Travel destination avatars
const GOA_AVATAR = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=200&auto=format&fit=crop'
const KERALA_AVATAR = 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=200&auto=format&fit=crop'
const ANDAMAN_AVATAR = 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=200&auto=format&fit=crop'
const PONDICHERRY_AVATAR = 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=200&auto=format&fit=crop'

export default function FeaturesSection() {
    return (
        <section>
            <div className="py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Plan with West Airlines</h2>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="col-span-full overflow-hidden pl-6 pt-6">
                            <Search className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">AI-Powered Trip Recommendations</h3>
                            <p className="text-muted-foreground mt-3 max-w-xl text-balance">
                                Our advanced AI analyzes your preferences to suggest personalized destinations, 
                                accommodations and activities that match your budget and travel style.
                            </p>
                            <div className="mask-b-from-95% -ml-2 -mt-2 mr-0.5 pl-2 pt-2">
                                <div className="bg-background rounded-tl-(--radius) ring-foreground/5 relative mx-auto mt-8 h-96 overflow-hidden border border-transparent shadow ring-1">
                                    <Image
                                        src="/features.png"
                                        alt="Trip planner interface showing destination search and recommendations"
                                        width="2880"
                                        height="1842"
                                        className="object-top-left h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="overflow-hidden p-6">
                            <Plane className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Exclusive Flight Deals</h3>
                            <p className="text-muted-foreground mt-3 text-balance">
                                Access special West Airlines rates and partner airline discounts not available on other booking platforms.
                            </p>

                            <FlightDealsIllustration />
                        </Card>

                        <Card className="group overflow-hidden px-6 pt-6">
                            <Hotel className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Premium Accommodations</h3>
                            <p className="text-muted-foreground mt-3 text-balance">
                                Choose from a curated selection of hotels, resorts and vacation rentals with special West Airlines member rates.
                            </p>

                            <HotelReviewIllustration />
                        </Card>
                        
                        <Card className="group overflow-hidden px-6 pt-6">
                            <Briefcase className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Complete Itineraries</h3>
                            <p className="text-muted-foreground mt-3 text-balance">
                                Get comprehensive travel plans with activities, local attractions, and dining recommendations for your trip.
                            </p>

                            <div className="mask-b-from-50 -mx-2 -mt-2 px-2 pt-2">
                                <ItineraryIllustration />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

const FlightDealsIllustration = () => {
    return (
        <Card
            aria-hidden
            className="mt-9 aspect-video p-4">
            <div className="mb-0.5 text-sm font-semibold">Goa Beach Getaway</div>
            <div className="mb-4 flex gap-2 text-sm">
                <span className="text-muted-foreground">Sep 1 - Sep 7, 2025</span>
            </div>
            <div className="mb-2 flex -space-x-1.5">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-medium">-15% OFF</div>
                    <div className="text-sm font-medium">₹8,000 <span className="text-muted-foreground line-through">₹9,400</span></div>
                </div>
            </div>
            <div className="text-muted-foreground text-sm font-medium flex items-center gap-1">
                <Plane className="size-3.5" /> West Airlines Direct Flight
            </div>
        </Card>
    )
}

const HotelReviewIllustration = () => {
    return (
        <div
            aria-hidden
            className="relative mt-6">
            <Card className="aspect-video w-4/5 translate-y-4 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-3">
                <div className="mb-3 flex items-center gap-2">
                    <div className="bg-background size-6 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                        <img
                            className="aspect-square rounded-full object-cover"
                            src={KERALA_AVATAR}
                            alt="Silent Waves Resort, Kerala"
                            height="60"
                            width="60"
                        />
                    </div>
                    <span className="text-muted-foreground text-sm font-medium">Silent Waves Resort</span>

                    <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                    </div>
                </div>

                <div className="ml-8 space-y-2">
                    <div className="bg-foreground/10 h-2 rounded-full"></div>
                    <div className="bg-foreground/10 h-2 w-3/5 rounded-full"></div>
                    <div className="bg-foreground/10 h-2 w-1/2 rounded-full"></div>
                </div>

                <div className="ml-8 mt-3 text-sm text-green-600 flex items-center gap-1">
                    <Users className="size-3.5" /> 
                    <span>2 Adults • Ocean View Room</span>
                </div>
            </Card>
            <Card className="aspect-3/5 absolute -top-4 right-0 flex w-2/5 translate-y-4 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-3">
                <div className="m-auto flex flex-col items-center">
                    <CreditCard className="text-primary size-5 mb-1" />
                    <span className="text-xs font-bold">₹1,800</span>
                    <span className="text-[10px] text-muted-foreground">per night</span>
                </div>
            </Card>
        </div>
    )
}

const ItineraryIllustration = () => {
    return (
        <Card
            aria-hidden
            className="mt-6 aspect-video translate-y-4 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0">
            <div className="w-fit">
                <Sparkles className="size-3.5 fill-blue-300 stroke-blue-300" />
                <p className="mt-2 line-clamp-2 text-sm">Suggested Activities for Andaman Islands</p>
            </div>
            <div className="bg-foreground/5 -mx-3 -mb-3 mt-3 space-y-3 rounded-lg p-3">
                <div className="text-muted-foreground text-sm flex items-center gap-1">
                    <Briefcase className="size-3.5" /> Activities
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <div>Diving Excursion</div>
                        <div>₹1,000/person</div>
                    </div>
                    <div className="flex justify-between">
                        <div>Beachside Dinner</div>
                        <div>₹800/person</div>
                    </div>
                    <div className="flex justify-between">
                        <div>Island Hopping Tour</div>
                        <div>₹1,200/person</div>
                    </div>
                </div>

                <Link href="/trip-planner">
                    <Button
                        size="sm"
                        className="w-full mt-2">
                        Plan My Trip
                    </Button>
                </Link>
            </div>
        </Card>
    )
}