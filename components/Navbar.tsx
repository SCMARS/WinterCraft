import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Store', path: '/store' },
    { name: 'Stats', path: '/stats' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-midnight/60 backdrop-blur-sm border-b border-frost-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="h-10 w-10 rounded-xl bg-aurora-gradient p-[2px]">
                <div className="h-full w-full rounded-[10px] bg-midnight flex items-center justify-center">
                  <span className="text-ice-blue text-lg">❄</span>
                </div>
              </div>
              <span className="ml-3 text-xl font-playfair font-bold text-snow-white group-hover:text-ice-blue transition-colors">
                WinterCraft <span className="text-ice-blue">2025</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  router.pathname === link.path
                    ? 'text-ice-blue bg-midnight-light'
                    : 'text-frost-blue hover:text-ice-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://discord.gg/wintercraft"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 christmas-button"
            >
              Join Discord
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-frost-blue hover:text-ice-blue focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-frost-blue">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === link.path
                  ? 'text-ice-blue bg-midnight-light'
                  : 'text-frost-blue hover:text-ice-blue'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://discord.gg/wintercraft"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 mt-4 text-center christmas-button"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Discord
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
