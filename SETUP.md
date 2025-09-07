# ECOZY Setup Instructions

## 🚀 Getting Started

### 1. Environment Setup

1. Copy `.env.local` and update with your Supabase credentials:
   \`\`\`bash
   cp .env.local .env.local.example
   \`\`\`

2. Create a new Supabase project at https://supabase.com
3. Get your project URL and anon key from Settings > API
4. Update `.env.local` with your credentials

### 2. Database Setup

1. Navigate to SQL Editor in your Supabase dashboard
2. Run the migration files in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_storage_setup.sql`

3. Create storage buckets in Storage section:
   - `task-images` (public)
   - `profile-avatars` (public)
   - `school-logos` (public)

### 3. Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🗃️ Database Schema

### Core Tables:
- **schools**: School information and eco-points
- **teachers**: Teacher profiles and roles
- **students**: Student profiles, points, and streaks
- **badges**: Achievement system
- **daily_tasks**: Available eco-tasks
- **submissions**: Task submissions and verification
- **quizzes**: Educational quizzes

### Features:
- ✅ Row Level Security (RLS)
- ✅ Real-time subscriptions
- ✅ File storage for images
- ✅ Automatic timestamps
- ✅ Performance indexes

## 🔧 Configuration

### Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (server-side only)

### Security:
- Authentication via Supabase Auth
- Row-level security policies
- File upload restrictions
- Input validation with Zod

## 📱 Features

### For Students:
- Complete daily eco-tasks
- Upload photo evidence
- Earn points and badges
- Track streaks
- Compare with classmates

### For Teachers:
- Create custom tasks
- Verify submissions
- Monitor school progress
- Manage students
- View analytics

### Gamification:
- Point system
- Badge achievements
- Leaderboards
- Streak tracking
- Power-ups

## 🚨 Security Notes

1. **Never commit** `.env.local` to version control
2. **Always validate** user inputs
3. **Use RLS policies** for data access
4. **Sanitize file uploads**
5. **Monitor API usage**

## 📝 Todo

- [ ] Email notifications
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] Social sharing features
- [ ] Offline mode support
