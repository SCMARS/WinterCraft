import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from '../components/CountdownTimer';
import { getServerStats } from '../lib/supabase';
import { GetStaticProps } from 'next';

interface HomeProps {
  serverStats: {
    online_players: number;
    total_players: number;
    total_donations: number;
    active_events: number;
  };
}

export default function Home({ serverStats }: HomeProps) {
  // Target date for the event (December 31, 2025)
  const eventDate = new Date('2025-12-31T00:00:00');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-[90vh] py-20 md:py-32 px-4 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/hero-1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-dark via-midnight bg-opacity-70"></div>

        {/* Animated aurora effect */}
        <div className="absolute top-0 left-0 w-full h-20 bg-aurora-gradient opacity-20 animate-shimmer"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-slide-in-up">
            <h1 className="text-5xl md:text-7xl font-playfair font-extrabold text-snow-white mb-6 tracking-tight">
              Welcome to <span className="text-ice-blue drop-shadow-md">WinterCraft</span> <span className="text-aurora-purple">2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-frost-blue mb-10 max-w-3xl mx-auto">
              Join us for the most magical Minecraft winter event of the year!
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CountdownTimer targetDate={eventDate} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a 
              href="minecraft://connect/play.wintercraft.net" 
              className="winter-button text-lg group"
            >
              <span className="inline-flex items-center">
                Play Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
            <Link href="/store" className="christmas-button text-lg group">
              <span className="inline-flex items-center">
                Donate
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </Link>
            <a 
              href="https://discord.gg/wintercraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gold-button text-lg group"
            >
              <span className="inline-flex items-center">
                Join Discord
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-frost-blue opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Server Stats Section */}
      <section className="py-16 bg-gradient-to-b from-midnight-dark to-midnight">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="aurora-card transform hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center justify-center h-full py-6">
                <div className="text-3xl md:text-4xl font-playfair font-bold text-ice-blue mb-2 animate-pulse-slow">
                  {serverStats.online_players}
                </div>
                <div className="flex items-center text-frost-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-aurora-green" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>Players Online</span>
                </div>
              </div>
            </div>

            <div className="aurora-card transform hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center justify-center h-full py-6">
                <div className="text-3xl md:text-4xl font-playfair font-bold text-ice-blue mb-2">
                  {serverStats.total_players}
                </div>
                <div className="flex items-center text-frost-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-aurora-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span>Total Players</span>
                </div>
              </div>
            </div>

            <div className="aurora-card transform hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center justify-center h-full py-6">
                <div className="text-3xl md:text-4xl font-playfair font-bold text-ice-blue mb-2">
                  ${serverStats.total_donations}
                </div>
                <div className="flex items-center text-frost-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <span>Donations</span>
                </div>
              </div>
            </div>

            <div className="aurora-card transform hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center justify-center h-full py-6">
                <div className="text-3xl md:text-4xl font-playfair font-bold text-ice-blue mb-2">
                  {serverStats.active_events}
                </div>
                <div className="flex items-center text-frost-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-aurora-pink" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Active Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Event Section */}
      <section className="winter-section relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-ice-blue opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-aurora-purple opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-heading">About the Event</h2>
            <div className="aurora-divider"></div>
            <p className="section-subheading">
              Experience the magic of winter in Minecraft like never before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-lg text-frost-blue mb-6 leading-relaxed">
                WinterCraft 2025 is a magical winter-themed Minecraft event that brings together players from around the world to celebrate the holiday season in a beautifully crafted winter wonderland.
              </p>
              <p className="text-lg text-frost-blue mb-6 leading-relaxed">
                Explore the stunning Frostvale City, participate in exciting winter-themed events, collect special Candy Coins, and win exclusive prizes that you can't get anywhere else!
              </p>
              <p className="text-lg text-frost-blue mb-8 leading-relaxed">
                From thrilling ice races to creative build contests, there's something for everyone at WinterCraft 2025. Join us and become part of our growing winter community!
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/events" className="winter-button group">
                  <span className="inline-flex items-center">
                    View Events
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link href="/team" className="frost-link inline-flex items-center text-lg">
                  <span>Meet Our Team</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 frost-image shadow-frost-lg animate-float">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/gallery/gallery-1.png"
                  alt="Frostvale City"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-40"></div>
                <div className="absolute bottom-4 left-4 bg-midnight bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-ice-blue font-medium">Frostvale City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="winter-section bg-gradient-to-b from-midnight to-midnight-light relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-aurora-gradient"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-ice-blue opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-heading">Featured Events</h2>
            <div className="frost-divider"></div>
            <p className="section-subheading">
              Join these exciting activities and earn exclusive rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Gift Hunt */}
            <div className="group">
              <div className="frost-card h-full transform transition-all duration-500 group-hover:translate-y-[-10px] group-hover:shadow-frost-lg">
                <div className="relative h-52 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/gallery/gallery-2.png"
                    alt="Gift Hunt"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60"></div>
                  <div className="absolute top-3 right-3 bg-aurora-pink text-midnight text-xs font-bold px-3 py-1 rounded-full">
                    Dec 15
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="bg-aurora-green p-2 rounded-lg mr-4 text-midnight">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-snow-white">
                    Gift Hunt
                  </h3>
                </div>
                <p className="text-frost-blue mb-6">
                  Find hidden gifts throughout Frostvale City and earn Candy Coins for each discovery!
                </p>
                <div className="mt-auto">
                  <Link href="/events" className="frost-link inline-flex items-center group">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Ice Race */}
            <div className="group">
              <div className="frost-card h-full transform transition-all duration-500 group-hover:translate-y-[-10px] group-hover:shadow-frost-lg">
                <div className="relative h-52 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/gallery/hero-4.png"
                    alt="Ice Race"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60"></div>
                  <div className="absolute top-3 right-3 bg-aurora-purple text-midnight text-xs font-bold px-3 py-1 rounded-full">
                    Dec 20
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="bg-ice-blue p-2 rounded-lg mr-4 text-midnight">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-snow-white">
                    Ice Race
                  </h3>
                </div>
                <p className="text-frost-blue mb-6">
                  Race against other players on our treacherous ice track. Do you have what it takes?
                </p>
                <div className="mt-auto">
                  <Link href="/events" className="frost-link inline-flex items-center group">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Build Contest */}
            <div className="group">
              <div className="frost-card h-full transform transition-all duration-500 group-hover:translate-y-[-10px] group-hover:shadow-frost-lg">
                <div className="relative h-52 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/gallery/hero-2.png"
                    alt="Build Contest"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60"></div>
                  <div className="absolute top-3 right-3 bg-gold text-midnight text-xs font-bold px-3 py-1 rounded-full">
                    Dec 25
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="bg-christmas-red p-2 rounded-lg mr-4 text-snow-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-snow-white">
                    Build Contest
                  </h3>
                </div>
                <p className="text-frost-blue mb-6">
                  Show off your building skills in our winter-themed building competition!
                </p>
                <div className="mt-auto">
                  <Link href="/events" className="frost-link inline-flex items-center group">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/events" className="winter-button text-lg group">
              <span className="inline-flex items-center">
                View All Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="winter-section bg-midnight-light bg-opacity-40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-heading">Event Gallery</h2>
            <div className="aurora-divider"></div>
            <p className="section-subheading">
              A glimpse into the magic. Screenshots and moments from WinterCraft.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["/gallery/hero-1.png","/gallery/hero-2.png","/gallery/hero-3.png","/gallery/hero-4.png","/gallery/gallery-1.png","/gallery/gallery-2.png"].map((src, idx) => (
              <div key={src} className="group frost-image relative h-56 md:h-60 overflow-hidden">
                <Image src={src} alt={`WinterCraft gallery ${idx+1}`} fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-40"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="https://discord.gg/wintercraft" target="_blank" rel="noopener noreferrer" className="frost-link inline-flex items-center text-lg">
              <span>Share your screenshots on Discord</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Join Now CTA Section */}
      <section className="winter-section bg-gradient-radial from-midnight-light via-midnight to-midnight-dark text-center relative overflow-hidden">
        {/* Decorative snowflakes */}
        <div className="absolute top-10 left-10 text-frost-blue opacity-20 text-6xl">❄</div>
        <div className="absolute bottom-10 right-10 text-frost-blue opacity-20 text-7xl">❅</div>
        <div className="absolute top-1/4 right-1/4 text-frost-blue opacity-10 text-5xl">❆</div>
        <div className="absolute bottom-1/4 left-1/4 text-frost-blue opacity-10 text-8xl">❄</div>

        {/* Glass card */}
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="glass-effect p-10 md:p-16 rounded-3xl shadow-frost-lg">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-snow-white mb-6 leading-tight">
              Ready to Join the <span className="text-aurora-purple">Winter Magic</span>?
            </h2>
            <p className="text-xl text-frost-blue mb-10 max-w-2xl mx-auto">
              Connect to our server today and be part of the most magical Minecraft winter event of 2025!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="minecraft://connect/play.wintercraft.net" 
                className="winter-button text-lg group"
              >
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play Now
                </span>
              </a>
              <Link href="/store" className="christmas-button text-lg group">
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Support Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch server stats from Supabase
  const serverStats = await getServerStats();

  return {
    props: {
      serverStats: serverStats || {
        online_players: 0,
        total_players: 0,
        total_donations: 0,
        active_events: 0,
      },
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};
