# NaniKasu

NaniKasu aims to transform Inventory management from a 'troublesome task' into a 'smart, on-site experience'!

## Features

- 🔐 **OAuth Authentication** - Sign in with Google or GitHub
- 🚀 **Next.js 15** - Modern React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first responsive design
- 🔒 **Supabase Integration** - Authentication and database

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cyokozai/NaniKasu.git
cd NaniKasu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Supabase project (see [Supabase Setup](#supabase-setup))

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to **Settings > API** in your project dashboard
3. Copy your project URL and anon key

### 2. Configure Environment Variables

Update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Enable OAuth Providers

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret
6. In your Supabase dashboard, go to **Authentication > Providers**
7. Enable Google and add your Client ID and Client Secret

#### GitHub OAuth Setup

1. Go to GitHub **Settings > Developer settings > OAuth Apps**
2. Create a new OAuth App:
   - Application name: NaniKasu
   - Homepage URL: `http://localhost:3000` (for development)
   - Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
3. Copy the Client ID and generate a Client Secret
4. In your Supabase dashboard, go to **Authentication > Providers**
5. Enable GitHub and add your Client ID and Client Secret

### 4. Configure Site URL

In your Supabase dashboard:
1. Go to **Authentication > URL Configuration**
2. Add your site URL:
   - Development: `http://localhost:3000`
   - Production: Your deployed domain

## Authentication Flow

1. User clicks "Sign in with Google" or "Sign in with GitHub"
2. User is redirected to the OAuth provider
3. After successful authentication, user is redirected back to `/auth/callback`
4. The callback handler exchanges the code for a session
5. User is redirected to the home page, now authenticated

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── callback/      # OAuth callback handler
│   │   └── auth-code-error/ # Error page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── oauth-buttons.tsx  # OAuth login buttons
│   └── user-profile.tsx   # User profile display
├── contexts/              # React contexts
│   └── auth-context.tsx   # Authentication context
└── lib/                   # Utility functions
    ├── supabase-client.ts # Browser Supabase client
    └── supabase-server.ts # Server Supabase client
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
