# BRUTAL App

A brutally honest, no-nonsense web application built with Next.js 14 and modern web technologies.

## Features

- **Brutalist Design**: Raw, bold, unfiltered UI/UX
- **Waitlist Management**: Email collection with database storage
- **Feedback System**: Multi-field feedback collection
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error boundaries
- **Database Integration**: Neon PostgreSQL with UUID support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Neon PostgreSQL
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready

## Getting Started

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env` file with your Neon database URL:
```env
POSTGRES_URL_NON_POOLING=your_neon_database_url_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Database Setup

The app automatically creates the required tables on first API call:

- `waitlist`: Stores email signups
- `feedback`: Stores user feedback with multiple fields

## Pages

### Main Flow
- `/` - Landing page with waitlist signup and navigation to all forms
- `/about` - About page explaining the brutal philosophy

### Form Pages
- `/feedback` - Problems, ideas, and wants collection
- `/reviews` - Glow-up concept review and opinion form
- `/contact` - General contact form

### Success Pages
- `/thanks` - Success page after waitlist signup
- `/already` - Page for existing waitlist members
- `/noted` - Success page after feedback or review submission

### Legacy Pages (maintained for compatibility)
- `/welcome` - Alternative success page
- `/already-joined` - Alternative existing member page
- `/feedback-received` - Alternative feedback success page

## API Routes

- `POST /api/waitlist` - Add email to waitlist
- `POST /api/feedback` - Submit feedback (problems, ideas, wants)
- `POST /api/reviews` - Submit reviews and glow-up opinions

## Database Tables

- `waitlist` - Email signups with optional names
- `feedback` - Problems, ideas, suggestions, and wants
- `reviews` - Glow-up concept reviews and opinions

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Recent Improvements

✅ Fixed all ESLint errors and warnings
✅ Resolved database schema consistency issues
✅ Added proper error handling and boundaries
✅ Improved form validation and UX
✅ Fixed hardcoded paths and asset references
✅ Added missing pages and proper routing
✅ Enhanced accessibility with ARIA labels
✅ Updated metadata and SEO optimization
✅ Consistent branding and messaging

## Environment Variables

Required environment variables:

- `POSTGRES_URL_NON_POOLING`: Your Neon database connection string

## License

© 2025 BRUTAL.RAW - All rights reserved.
