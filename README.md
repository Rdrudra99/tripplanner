# West Airlines Trip Planner

AI-powered travel planning application that helps users discover and plan their perfect vacation based on preferences, budget, and interests.

## Features

- AI-powered destination recommendations
- User authentication via Clerk
- Interactive form with date validation
- Responsive design and modern UI
- SEO optimized with metadata and structured data

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **Authentication**: Clerk for user management
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Shadcn/UI component library
- **AI Integration**: Groq for intelligent trip recommendations
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date manipulation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rdrudra99/tripplanner.git
cd tripplanner
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GROQ_API_KEY=your_groq_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
tripplanner/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # UI components
│   └── lib/              # Utilities
```

## Key Components

- **Trip Planner Form**: Travel dates, destination, travelers, budget, and preferences
- **Trip Results Page**: AI-generated recommendations with destination details
- **AI Integration**: Groq API for personalized travel suggestions

## SEO & Technical Features

- SEO optimization with metadata and structured data
- Responsive design for all devices
- Secure authentication with Clerk
- Input validation with Zod

## License & Credits

- MIT License
- Developed as an assessment for West Airlines
- Built with Next.js, Tailwind CSS, Clerk, Shadcn/UI, and Groq

---

Visit the live demo at: [https://westairtrip.vercel.app/](https://westairtrip.vercel.app/)
