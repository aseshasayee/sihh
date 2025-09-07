# ECOZY - Gamify Your Green Impact

A Next.js application that gamifies environmental sustainability for students and teachers.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/seshasayees-projects/v0-ecozy-app-development)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/AbcC5gLV9MY)

## Features

- 🌱 **Eco-Point System**: Track environmental actions with points and badges
- 🏆 **Leaderboards**: Compete with classmates and schools
- 📚 **Teacher Dashboard**: Manage classrooms and create eco-challenges
- 🎯 **Daily Tasks**: Complete environmental challenges for points
- 🌍 **3D Earth Visualization**: Interactive 3D Earth with eco-elements
- 🔐 **Authentication**: Secure login with Supabase Auth
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/ecozy.git
   cd ecozy
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   
   Edit `.env.local` with your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Set up Supabase database**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to the SQL Editor in your Supabase dashboard
   - Run the migration file: `migrations/001_initial_schema.sql`

5. **Run the development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Authentication Flow

1. Users sign up as either students or teachers
2. Account creation stores user data in Supabase Auth
3. Additional profile data is stored in students/teachers tables
4. Dashboard access is protected and shows user-specific data

## Key Components

### Enhanced 3D Earth (`components/3d-earth.tsx`)
- Interactive 3D Earth with realistic textures
- Floating eco-elements (trees, water drops, etc.)
- Responsive design with WebGL optimization

### Authentication System
- **Auth Context** (`lib/auth-context.tsx`): Manages user state
- **Protected Dashboard**: Only accessible after login
- **User Profiles**: Student and teacher role support

### Database Integration
- **Supabase Client** (`lib/supabase.ts`): Database connection
- **API Functions** (`lib/api.ts`): CRUD operations
- **Migration Files** (`migrations/`): Database schema setup

## Recent Updates

### ✅ Completed
- Fixed npm dependency conflicts (React 18 compatibility)
- Integrated Supabase authentication and database
- Enhanced 3D Earth component with realistic textures
- Removed dashboard from public access
- Implemented protected authentication flow
- Created user registration and login systems
- Added environment variable configuration
- Set up database migration files

### 🎯 Current Status
- Authentication system fully integrated
- Dashboard protected behind login
- Real-time user state management
- Database schema prepared for deployment

## Live Demo

**[https://vercel.com/seshasayees-projects/v0-ecozy-app-development](https://vercel.com/seshasayees-projects/v0-ecozy-app-development)**

## Continue Development

**[https://v0.app/chat/projects/AbcC5gLV9MY](https://v0.app/chat/projects/AbcC5gLV9MY)**
