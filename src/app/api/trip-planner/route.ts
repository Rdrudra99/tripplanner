import { NextResponse } from "next/server";
import { TripFormData } from "@/lib/groq-api";
import { Groq } from "groq-sdk";

export async function POST(request: Request) {
  try {
    // Get the trip form data from the request body
    const formData: TripFormData = await request.json();

    // Initialize the Groq client with the API key
    const groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    });

    // Create the system prompt with instructions for the AI
    const systemPrompt = `You are an API that simulates a Smart Travel Planning Portal for West Airlines.
You will receive JSON input with the following fields:
- startDate: string (YYYY-MM-DD)
- endDate: string (YYYY-MM-DD)
- budget: number (total trip budget in INR)
- vacationType: string (e.g., Beach, Hiking, Family Fun, Food, Culture)
- numberOfPeople: number

Your task:
1. Generate 3–5 mock travel destinations that West Airlines serves.
2. For each destination, include:
   - name (string)
   - flight (airline, departure ISO datetime, arrival ISO datetime, pricePerPerson)
   - hotel (name, checkIn, checkOut, pricePerNight)
   - activities (array of { name, pricePerPerson })
   - totalCost (sum of flights + hotels + activities for all travelers)
   - perPersonCost (totalCost / numberOfPeople)
   - image (string URL to a relevant image of the destination - use only freely usable Unsplash images with URLs like https://images.unsplash.com/...)
   - description (a brief 1-2 sentence description of the destination)
3. Ensure that the total cost does not exceed the given budget, unless unavoidable.
4. Keep dates consistent with the startDate and endDate from input.
5. Return the result as valid JSON:
{
  "destinations": [
    {
      "name": "...",
      "flight": { ... },
      "hotel": { ... },
      "activities": [ ... ],
      "totalCost": ...,
      "perPersonCost": ...,
      "image": "https://images.unsplash.com/...",
      "description": "..."
    }
  ]
}`;

    // Send the request to the Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: JSON.stringify(formData, null, 2)
        }
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
      response_format: {
        type: "json_object"
      }
    });

    // Parse the response
    const responseContent = chatCompletion.choices[0].message.content;
    const parsedResponse = responseContent ? JSON.parse(responseContent) : { destinations: [] };

    // Return the parsed response
    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error processing trip planning request:", error);
    return NextResponse.json(
      { error: "Failed to process trip planning request" },
      { status: 500 }
    );
  }
}
