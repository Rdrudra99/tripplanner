import TripForm from '@/components/trip-form'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800">Trip Planner</h1>
          </div>
          <div className="flex items-center">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-9 w-9"
                }
              }} 
            />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <TripForm />
      </div>
    </>
  )
}

export default page