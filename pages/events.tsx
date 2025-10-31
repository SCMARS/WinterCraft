import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getEvents } from '../lib/supabase';
import { Event } from '../lib/supabase';

interface EventsPageProps {
  events: Event[];
}

export default function Events({ events }: EventsPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4 text-center"
        style={{
          backgroundImage: "url('/gallery/hero-2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-midnight bg-opacity-70"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-aurora-gradient opacity-20 animate-shimmer"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-snow-white mb-4">
            Winter <span className="text-ice-blue">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-frost-blue mb-8">
            Participate in our magical winter activities and earn exclusive rewards!
          </p>
        </div>
      </section>

      {/* Events List Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
            <p className="text-lg text-frost-blue max-w-3xl mx-auto">
              Join these exciting events to earn Candy Coins, which can be exchanged for exclusive in-game items and perks!
            </p>
          </div>
          
          {/* Events Grid */}
          <div className="space-y-12">
            {events.map((event) => (
              <div key={event.id} className="frost-card overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src={event.image_url}
                      alt={event.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* Event Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <h3 className="text-2xl font-playfair font-bold text-snow-white">
                        {event.name}
                      </h3>
                      <span className="mt-2 md:mt-0 px-4 py-1 bg-ice-blue text-midnight rounded-full text-sm font-bold">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    
                    <p className="text-frost-blue mb-6">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Rules */}
                      <div>
                        <h4 className="text-lg font-playfair font-semibold text-ice-blue mb-3">
                          Rules
                        </h4>
                        <ul className="list-disc list-inside text-frost-blue space-y-1">
                          {event.rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Rewards */}
                      <div>
                        <h4 className="text-lg font-playfair font-semibold text-ice-blue mb-3">
                          Rewards
                        </h4>
                        <div className="text-frost-blue">
                          {event.rewards}
                        </div>
                      </div>
                    </div>
                    
                    {/* Join Button */}
                    <div className="mt-6">
                      <a
                        href="https://discord.gg/wintercraft"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="winter-button"
                      >
                        Join Event
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Participate Section */}
      <section className="winter-section bg-midnight bg-opacity-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              How to Participate
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="frost-card text-center">
              <div className="w-16 h-16 bg-ice-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-midnight">1</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                Join the Server
              </h3>
              <p className="text-frost-blue mb-4">
                Connect to play.wintercraft.net and create your character.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="frost-card text-center">
              <div className="w-16 h-16 bg-ice-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-midnight">2</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                Register for Events
              </h3>
              <p className="text-frost-blue mb-4">
                Join our Discord server and register for the events you want to participate in.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="frost-card text-center">
              <div className="w-16 h-16 bg-ice-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-midnight">3</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                Have Fun & Win Prizes
              </h3>
              <p className="text-frost-blue mb-4">
                Participate in the events, earn Candy Coins, and redeem them for exclusive rewards!
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://discord.gg/wintercraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="christmas-button"
            >
              Join Our Discord
            </a>
          </div>
        </div>
      </section>

      {/* Candy Coins Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/gallery/hero-1.png"
                alt="Candy Coins"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
                Candy Coins
              </h2>
              <div className="w-24 h-1 bg-ice-blue mb-6"></div>
              <p className="text-lg text-frost-blue mb-6">
                Candy Coins are the special currency of WinterCraft 2025. Earn them by participating in events, completing quests, and helping other players.
              </p>
              <p className="text-lg text-frost-blue mb-6">
                Use your Candy Coins to purchase exclusive winter-themed items, cosmetics, and special perks that are only available during the event.
              </p>
              <p className="text-lg text-frost-blue mb-6">
                The more you participate, the more Candy Coins you'll earn. Top earners will be featured on our leaderboard and receive special recognition!
              </p>
              <div className="mt-8">
                <Link href="/stats" className="winter-button">
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch events from Supabase
  const events = await getEvents();
  
  // If no events are found, provide some default events
  const defaultEvents: Event[] = [
    {
      id: '1',
      name: 'Gift Hunt',
      description: 'Explore Frostvale City to find hidden gifts. Each gift contains Candy Coins and special items. The more gifts you find, the more rewards you earn!',
      rewards: '50-200 Candy Coins per gift, Exclusive Winter Cosmetics, Special Titles',
      date: '2025-12-15T18:00:00',
      image_url: '/gallery/gallery-2.png',
      rules: [
        'Gifts are hidden throughout the city',
        'Each player can find up to 20 gifts per day',
        'Trading gifts is not allowed',
        'Use the /gifts command to see how many you\'ve found'
      ]
    },
    {
      id: '2',
      name: 'Ice Race',
      description: 'Race against other players on our treacherous ice track. Navigate through obstacles, avoid traps, and be the first to reach the finish line!',
      rewards: '1st Place: 500 Candy Coins, 2nd Place: 300 Candy Coins, 3rd Place: 150 Candy Coins, Participation: 50 Candy Coins',
      date: '2025-12-20T20:00:00',
      image_url: '/gallery/hero-4.png',
      rules: [
        'Races start every hour on the hour',
        'No flying or teleporting allowed',
        'Special items can be used during the race',
        'Top 3 players receive bonus rewards'
      ]
    },
    {
      id: '3',
      name: 'Build Contest',
      description: 'Show off your building skills in our winter-themed building competition. Create the most beautiful or creative winter build to win amazing prizes!',
      rewards: '1st Place: 1000 Candy Coins + Special Role, 2nd Place: 750 Candy Coins, 3rd Place: 500 Candy Coins, All participants receive a Builder\'s Trophy',
      date: '2025-12-25T15:00:00',
      image_url: '/gallery/hero-2.png',
      rules: [
        'Theme: Winter Wonderland',
        'Build size limit: 50x50 blocks',
        'No inappropriate content',
        'Judging based on creativity, detail, and theme adherence'
      ]
    },
    {
      id: '4',
      name: 'PvP Arena',
      description: 'Battle other players in our special winter arena. Use your combat skills and strategy to defeat your opponents and climb the ranks!',
      rewards: 'Winner: 800 Candy Coins + Champion Title, Top 5: 400 Candy Coins, Top 10: 200 Candy Coins',
      date: '2025-12-28T19:00:00',
      image_url: '/gallery/gallery-1.png',
      rules: [
        'Standard PvP rules apply',
        'Special winter weapons available',
        'Tournament style elimination',
        'Register 30 minutes before start time'
      ]
    }
  ];
  
  return {
    props: {
      events: events.length > 0 ? events : defaultEvents,
    },
    // Revalidate every day
    revalidate: 86400,
  };
};
