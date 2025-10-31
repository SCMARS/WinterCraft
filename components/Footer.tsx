import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight border-t border-frost-blue">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center group">
              <div className="h-10 w-10 rounded-xl bg-aurora-gradient p-[2px]">
                <div className="h-full w-full rounded-[10px] bg-midnight flex items-center justify-center">
                  <span className="text-ice-blue text-lg">❄</span>
                </div>
              </div>
              <span className="ml-3 text-xl font-playfair font-bold text-snow-white group-hover:text-ice-blue transition-colors">
                WinterCraft <span className="text-ice-blue">2025</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-frost-blue">
              The ultimate winter Minecraft event. Join us for a magical
              experience in the snow!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-playfair font-semibold text-snow-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/stats"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Stats
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="col-span-1">
            <h3 className="text-lg font-playfair font-semibold text-snow-white">
              Community
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://discord.gg/wintercraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/wintercraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/wintercraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/wintercraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-frost-blue hover:text-ice-blue transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Join the WinterSpirit */}
          <div className="col-span-1">
            <h3 className="text-lg font-playfair font-semibold text-snow-white">
              Join the WinterSpirit ❄️
            </h3>
            <p className="mt-4 text-sm text-frost-blue">
              Connect with us and be part of our winter wonderland community.
            </p>
            <div className="mt-4">
              <a
                href="https://discord.gg/wintercraft"
                target="_blank"
                rel="noopener noreferrer"
                className="winter-button inline-block"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-frost-blue flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-frost-blue">
            &copy; {currentYear} WinterCraft. All rights reserved.
          </p>
          <p className="text-sm text-frost-blue mt-4 md:mt-0">
            Powered by RIT Team — Frostvale Studios
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
