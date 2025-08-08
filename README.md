# West Airlines Trip Planner

A modern, AI-powered travel planning application that helps users discover and plan their perfect vacation based on their preferences, budget, and interests.

## 🌟 Features

- **AI-Powered Trip Recommendations**: Get personalized destination suggestions based on your preferences
- **Smart Destination Search**: Find ideal vacation spots matching your criteria
- **User Authentication**: Secure login and personalized experience via Clerk
- **Interactive UI**: Clean, responsive interface with modern design elements
- **Travel Details**: Comprehensive information about destinations including flights, accommodations, and activities
- **Budget-Friendly Options**: Find trips that match your specified budget
- **SEO Optimized**: Built with best practices for search engine visibility

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
git clone https://github.com/yourusername/westairlines-trip-planner.git
cd westairlines-trip-planner
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

## 📁 Project Structure

```
westairlines-trip-planner/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── trip-planner/ # Trip planner form page
│   │   ├── trip-results/ # Trip results page
│   │   └── layout.tsx    # Root layout with metadata
│   ├── components/       # Reusable components
│   │   ├── ui/           # UI components from shadcn
│   │   └── ...           # Custom components
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## 🔍 Key Components

### Trip Planner Form
The core of the application where users input their travel preferences:
- Destination (optional)
- Travel dates
- Number of travelers
- Vacation type/experience
- Budget

### Trip Results Page
Displays AI-generated travel recommendations based on user input:
- Destination cards with images and details
- Flight information
- Hotel recommendations
- Activities and points of interest
- Budget breakdown

### AI Integration
Utilizes Groq's API to:
- Analyze user preferences
- Generate personalized destination recommendations
- Provide relevant travel information
- Suggest activities based on interests

## 🌐 SEO Optimization

The application includes:
- Comprehensive metadata for all pages
- Proper OpenGraph and Twitter card data
- Structured data (JSON-LD) for search engines
- Sitemap generation
- Robots.txt configuration
- Canonical URLs

## 🧪 Testing

Run the test suite with:
```bash
npm test
# or
yarn test
```

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Security Features

- Secure authentication via Clerk
- Input validation with Zod
- Environment variable protection
- API rate limiting

## 🛣️ Future Roadmap

- **Booking Integration**: Direct booking capabilities
- **User Profiles**: Save favorite destinations and past trips
- **Itinerary Builder**: Create detailed day-by-day travel plans
- **Social Sharing**: Share trip plans with friends and family
- **Weather Integration**: Show weather forecasts for destinations
- **Local Transportation**: Add local transport options
- **Multi-City Trips**: Support for multi-destination journeys

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

This project was developed as part of an assessment for West Airlines.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Clerk](https://clerk.dev/) for authentication
- [Shadcn/UI](https://ui.shadcn.com/) for UI components
- [Groq](https://groq.com/) for AI capabilities
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for hosting

---

Visit the live demo at: [https://westairtrip.vercel.app/](https://westairtrip.vercel.app/)
