import React, { useState } from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getDonationPackages } from '../lib/supabase';
import { DonationPackage } from '../lib/supabase';

interface StorePageProps {
  packages: DonationPackage[];
}

export default function Store({ packages }: StorePageProps) {
  const [username, setUsername] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<DonationPackage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationResult, setDonationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleDonate = async () => {
    if (!username || !selectedPackage) {
      setDonationResult({
        success: false,
        message: 'Please enter your username and select a package',
      });
      return;
    }

    setIsProcessing(true);
    setDonationResult(null);

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          packageId: selectedPackage.id,
        }),
      });

      const result = await response.json();
      setDonationResult(result);
    } catch (error) {
      setDonationResult({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4 text-center"
        style={{
          backgroundImage: "url('/gallery/hero-3.png')",
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
            Support <span className="text-ice-blue">WinterCraft</span>
          </h1>
          <p className="text-xl md:text-2xl text-frost-blue mb-8">
            Get exclusive perks and help us create the best winter experience!
          </p>
        </div>
      </section>

      {/* Store Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Donation Packages
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
            <p className="text-lg text-frost-blue max-w-3xl mx-auto">
              Support our server and get exclusive perks with these special winter packages!
            </p>
          </div>
          
          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`frost-card transition-all duration-300 ${
                  selectedPackage?.id === pkg.id 
                    ? 'border-gold border-4' 
                    : 'hover:border-ice-blue hover:scale-105'
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image
                    src={pkg.image_url}
                    alt={pkg.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-playfair font-bold text-snow-white">
                      {pkg.name}
                    </h3>
                    <span className="px-4 py-1 bg-gold text-midnight rounded-full text-sm font-bold">
                      ${pkg.price}
                    </span>
                  </div>
                  
                  <p className="text-frost-blue mb-4">
                    {pkg.description}
                  </p>
                  
                  <h4 className="text-lg font-playfair font-semibold text-ice-blue mb-2">
                    Benefits
                  </h4>
                  <ul className="list-disc list-inside text-frost-blue space-y-1 mb-4">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full christmas-button ${
                      selectedPackage?.id === pkg.id ? 'animate-glow' : ''
                    }`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {selectedPackage?.id === pkg.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Donation Form */}
          <div className="mt-16 max-w-2xl mx-auto frost-card">
            <h3 className="text-2xl font-playfair font-bold text-snow-white mb-6 text-center">
              Complete Your Donation
            </h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-frost-blue mb-2">
                  Minecraft Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-midnight border border-frost-blue text-snow-white focus:border-ice-blue focus:outline-none"
                  placeholder="Enter your Minecraft username"
                />
                <p className="text-sm text-frost-blue mt-1">
                  Make sure you've joined the server at least once before donating.
                </p>
              </div>
              
              <div>
                <label className="block text-frost-blue mb-2">
                  Selected Package
                </label>
                <div className="px-4 py-3 rounded-lg bg-midnight border border-frost-blue text-snow-white">
                  {selectedPackage ? (
                    <div className="flex justify-between items-center">
                      <span>{selectedPackage.name}</span>
                      <span className="font-bold">${selectedPackage.price}</span>
                    </div>
                  ) : (
                    <span className="text-frost-blue">Please select a package above</span>
                  )}
                </div>
              </div>
              
              {donationResult && (
                <div className={`p-4 rounded-lg ${
                  donationResult.success 
                    ? 'bg-green-900 bg-opacity-20 border border-green-500' 
                    : 'bg-red-900 bg-opacity-20 border border-red-500'
                }`}>
                  <p className={`${
                    donationResult.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {donationResult.message}
                  </p>
                </div>
              )}
              
              <button
                onClick={handleDonate}
                disabled={isProcessing || !username || !selectedPackage}
                className={`w-full gold-button py-3 ${
                  (isProcessing || !username || !selectedPackage) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Complete Donation'}
              </button>
              
              <p className="text-sm text-frost-blue text-center">
                By donating, you agree to our terms of service. Ranks are applied instantly via our automated system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="winter-section bg-midnight bg-opacity-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                How do donations work?
              </h3>
              <p className="text-frost-blue">
                After completing your donation, our system automatically applies your rank to your Minecraft account. You'll receive your perks instantly!
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                Do ranks expire?
              </h3>
              <p className="text-frost-blue">
                No, all ranks are permanent and will remain active throughout the entire WinterCraft 2025 event.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                Can I upgrade my rank later?
              </h3>
              <p className="text-frost-blue">
                Yes! If you decide to upgrade to a higher rank later, you can do so by paying the difference between your current rank and the new one. Contact our support team for assistance.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                What if I have issues with my donation?
              </h3>
              <p className="text-frost-blue">
                If you encounter any issues with your donation or rank application, please contact our support team on Discord. We're here to help!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch donation packages from Supabase
  const packages = await getDonationPackages();
  
  // If no packages are found, provide some default packages
  const defaultPackages: DonationPackage[] = [
    {
      id: '1',
      name: 'Snow VIP',
      description: 'The perfect starter package for those who want to support the server and get some cool perks.',
      price: 3,
      rank: 'snow_vip',
      benefits: [
        'Exclusive [Snow] tag in chat',
        'Access to VIP-only areas',
        'Daily gift (50 Candy Coins)',
        '2x voting rewards'
      ],
      image_url: '/gallery/hero-1.png'
    },
    {
      id: '2',
      name: 'Reindeer Rank',
      description: 'A mid-tier package with great perks for active players who want to enhance their winter experience.',
      price: 7,
      rank: 'reindeer',
      benefits: [
        'Exclusive [Reindeer] tag in chat',
        'All Snow VIP perks',
        'Daily gift (100 Candy Coins)',
        'Access to special winter cosmetics',
        'Reindeer pet that follows you'
      ],
      image_url: '/gallery/hero-2.png'
    },
    {
      id: '3',
      name: 'Santa+',
      description: 'Our premium package with the best perks for dedicated players who want the ultimate winter experience.',
      price: 15,
      rank: 'santa_plus',
      benefits: [
        'Exclusive [Santa+] tag in chat',
        'All Reindeer Rank perks',
        'Daily gift (200 Candy Coins)',
        'Exclusive Santa sleigh mount',
        'Ability to create custom particle effects',
        'Priority server access',
        'Special thanks on our website'
      ],
      image_url: '/gallery/hero-3.png'
    }
  ];
  
  return {
    props: {
      packages: packages.length > 0 ? packages : defaultPackages,
    },
    // Revalidate every day
    revalidate: 86400,
  };
};
