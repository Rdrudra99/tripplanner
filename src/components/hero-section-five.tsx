import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Plane, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SignUpButton } from '@clerk/nextjs'

export default function HeroSection() {
    return (
        <section className="py-20">
            <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
                <div className="relative text-center">
                    <WestAirlinesLogo className="mx-auto" />
                    <h1 className="mx-auto mt-16 max-w-xl text-balance text-5xl font-medium">West Airlines Trip Planner</h1>

                    <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl">Discover destinations, plan itineraries, and book your perfect getaway with our all-in-one travel planning tool.</p>

                    <div className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
                        <SignUpButton 
                            mode="modal"
                         >
                        <Button
                            asChild
                            variant="default" className='cursor-pointer'>
                                <span className="text-nowrap">Plan Your Trip</span>
                        </Button>
                        </SignUpButton>
                    </div>
                </div>

                <div className="relative mt-12 overflow-hidden rounded-3xl bg-black/10 md:mt-16">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Aerial view of airplane flying over beautiful coastline"
                        className="absolute inset-0 size-full object-cover"
                    />

                    <div className="bg-background rounded-(--radius) relative m-4 overflow-hidden border border-transparent shadow-xl shadow-black/15 ring-1 ring-black/10 sm:m-8 md:m-12">
                        <Image
                            src="/hero.png"
                            alt="Trip planner interface showing destination search and flight options"
                            width="2880"
                            height="1842"
                            className="object-top-left size-full object-cover"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <p className="text-muted-foreground text-center">Partnered with:</p>
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="flex">
                            <img
                                className="mx-auto h-4 w-fit"
                                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                alt="Hilton Hotels Logo"
                                height="20"
                                width="auto"
                            />
                        </div>

                        <div className="flex">
                            <img
                                className="mx-auto h-3 w-fit"
                                src="https://html.tailus.io/blocks/customers/column.svg"
                                alt="Hertz Car Rental Logo"
                                height="16"
                                width="auto"
                            />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-3 w-fit"
                                src="https://html.tailus.io/blocks/customers/github.svg"
                                alt="Expedia Logo"
                                height="16"
                                width="auto"
                            />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-4 w-fit"
                                src="https://html.tailus.io/blocks/customers/nike.svg"
                                alt="Booking.com Logo"
                                height="20"
                                width="auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const WestAirlinesLogo = ({ className }: { className?: string }) => (
    <div
        aria-hidden
        className={cn('border-background bg-linear-to-b rounded-(--radius) relative flex size-9 translate-y-0.5 items-center justify-center border from-blue-400 to-blue-600 shadow-lg shadow-black/20 ring-1 ring-black/10', className)}>
        <Plane className="mask-b-from-25% size-6 fill-white stroke-white drop-shadow-sm" />
        <MapPin className="absolute inset-0 m-auto size-5 fill-white stroke-white opacity-65 drop-shadow-sm" />
        <div className="z-1 h-4.5 absolute inset-2 m-auto w-px translate-y-px rounded-full bg-white/30"></div>
    </div>
)
