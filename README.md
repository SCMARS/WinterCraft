# WinterCraft 2025 Website

A complete, responsive, and atmospheric website for the WinterCraft 2025 Minecraft event server.

![WinterCraft 2025](https://via.placeholder.com/1200x630?text=WinterCraft+2025)

## Overview

WinterCraft 2025 is a magical winter-themed Minecraft event that brings together players from around the world to celebrate the holiday season in a beautifully crafted winter wonderland. This repository contains the complete website for the event, built with Next.js, TypeScript, TailwindCSS, and Supabase.

## Features

- Responsive design that works on all devices
- Interactive snow animation
- Countdown timer to the event
- Player statistics and leaderboards
- Event information and schedule
- Donation system with RCON integration
- Team information
- Contact form
- FAQ section

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Next.js API routes, Supabase
- **Deployment**: Vercel
- **Minecraft Integration**: RCON API

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- A Supabase account (for database)
- A Minecraft server with RCON enabled (for donation system)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wintercraft-2025.git
   cd wintercraft-2025
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   RCON_HOST=your-minecraft-server-host
   RCON_PORT=25575
   RCON_PASSWORD=your-rcon-password
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Add the required images to the `public` directory (see `public/README.md` for details).

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Supabase Setup

1. Create a new Supabase project.
2. Create the following tables:
   - `players` - Player information and statistics
   - `donation_packages` - Donation package details
   - `events` - Event information
   - `team_members` - Team member profiles
   - `feedback` - Contact form submissions
   - `server_stats` - Server statistics

See the `lib/supabase.ts` file for the expected schema of each table.

## Deployment

The easiest way to deploy the website is using Vercel:

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Deploy!

## Project Structure

- `/pages` - Next.js pages
- `/components` - Reusable UI components
- `/lib` - Utility functions for RCON and Supabase
- `/public` - Static assets (images, favicon, etc.)
- `/styles` - Global styles

## Pages

- `/` - Home page with countdown timer and event information
- `/events` - Event schedule and details
- `/store` - Donation packages and payment system
- `/stats` - Player statistics and leaderboards
- `/team` - Team member profiles
- `/contact` - Contact form and FAQ

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built by Gleb Uhovskij and the RIT Team
- Powered by Frostvale Studios
- Special thanks to the WinterCraft community

---

Made with ❄️ for WinterCraft 2025# WinterCraft
