"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"
import { addDays, format } from "date-fns"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Plane, MapPin, CreditCard, Users, Sparkles, Search, Menu, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link"

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  startDate: z.date({
    message: "Please select a departure date.",
  }),
  endDate: z.date({
    message: "Please select a return date.",
  }),
  numberOfPeople: z.string().min(1, {
    message: "Please select number of travelers.",
  }),
  vacationType: z.string().min(1, {
    message: "Please select a vacation type.",
  }),
  budget: z.string().min(1, {
    message: "Budget is required.",
  }),
}).refine(data => {
  // Ensure end date is after start date
  return data.endDate > data.startDate
}, {
  message: "Return date must be after departure date",
  path: ["endDate"]
});

export default function TripPlannerPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      numberOfPeople: "2",
      vacationType: "Beach",
      budget: "50000",
    },
  });
  
  // Watch the departure date to auto-adjust return date if needed
  const startDate = useWatch({
    control: form.control,
    name: "startDate",
  });
  
  // Automatically update return date if departure date changes
  useEffect(() => {
    if (startDate) {
      const endDate = form.getValues("endDate");
      
      // If return date is not set or is same/before departure date, set it to departure date + 1
      if (!endDate || endDate <= startDate) {
        form.setValue("endDate", addDays(startDate, 6), { // Default to a 7-day trip
          shouldValidate: true,
        });
      }
    }
  }, [startDate, form]);

  const router = useRouter();
    
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Format the dates to YYYY-MM-DD string format
      const formattedData = {
        startDate: format(values.startDate, "yyyy-MM-dd"),
        endDate: format(values.endDate, "yyyy-MM-dd"),
        budget: parseInt(values.budget),
        vacationType: values.vacationType,
        numberOfPeople: parseInt(values.numberOfPeople),
        destination: values.destination
      };
      
      // Store the form data in localStorage to access it on the results page
      localStorage.setItem('tripFormData', JSON.stringify(formattedData));
      
      // Redirect to the results page
      router.push('/trip-results');
    } catch (error) {
      console.error("Error processing form submission:", error);
    }
  }

  const { user, isLoaded } = useUser();
  
  return (
    <>
      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <WestAirlinesLogo />
            <span className="text-lg font-medium tracking-tight">West Airlines</span>
          </Link>
        
          
          <div className="flex items-center gap-4">
            {isLoaded ? (
              <div className="flex items-center gap-2 rounded-full pl-2 pr-1 py-1 hover:bg-gray-50 transition-colors">
                <div className="hidden md:flex flex-col items-end mr-1">
                  <span className="text-sm font-medium leading-tight">{user?.firstName || 'Guest'}</span>
                  <span className="text-xs text-gray-500 leading-tight truncate max-w-[120px]">
                    {user?.primaryEmailAddress?.emailAddress || ''}
                  </span>
                </div>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8 border-2 border-blue-100",
                      userButtonTrigger: "focus:shadow-none focus:outline-none"
                    }
                  }} 
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 md:mb-16">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 mb-3">
                <Plane className="mr-1 h-3 w-3" />
                West Airlines Exclusive
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Find your perfect getaway</h1>
              <p className="text-gray-500 mt-3">Tell us your travel preferences and our AI will curate the ideal destinations for you</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-blue-600" />
                          Destination
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Enter city or country (optional)" 
                              {...field}
                              className="bg-gray-50 border-0 pl-9 h-10 rounded-md focus-visible:ring-1 focus-visible:ring-blue-500"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Leave blank for AI-powered recommendations
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <CalendarIcon className="h-3.5 w-3.5 text-blue-600" />
                            Departure
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "bg-gray-50 border-0 h-10 rounded-md w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "MMM d, yyyy")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                                className="rounded-md border-0 shadow"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <CalendarIcon className="h-3.5 w-3.5 text-blue-600" />
                            Return
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "bg-gray-50 border-0 h-10 rounded-md w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "MMM d, yyyy")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  if (startDate && date && date.getTime() === startDate.getTime()) {
                                    field.onChange(addDays(date, 1));
                                  } else {
                                    field.onChange(date);
                                  }
                                }}
                                disabled={(date) =>
                                  date < (form.getValues("startDate") || new Date(new Date().setHours(0, 0, 0, 0)))
                                }
                                initialFocus
                                className="rounded-md border-0 shadow"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FormField
                      control={form.control}
                      name="numberOfPeople"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-3.5 w-3.5 text-blue-600" />
                            Travelers
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 border-0 h-10 rounded-md">
                                <SelectValue placeholder="Select travelers" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? "Person" : "People"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vacationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                            Experience
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 border-0 h-10 rounded-md">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Beach">Beach</SelectItem>
                              <SelectItem value="City">City</SelectItem>
                              <SelectItem value="Mountain">Mountain</SelectItem>
                              <SelectItem value="Cultural">Cultural</SelectItem>
                              <SelectItem value="Adventure">Adventure</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                            Budget (₹)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                              <Input 
                                type="number" 
                                placeholder="50000" 
                                className="bg-gray-50 border-0 pl-7 h-10 rounded-md focus-visible:ring-1 focus-visible:ring-blue-500"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            Total budget for all travelers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  <Plane className="mr-2 h-4 w-4" /> Find My Perfect Trip
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
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