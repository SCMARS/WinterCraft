import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getTeamMembers } from '../lib/supabase';
import { TeamMember } from '../lib/supabase';

interface TeamPageProps {
  teamMembers: TeamMember[];
}

export default function Team({ teamMembers }: TeamPageProps) {
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
            Meet Our <span className="text-ice-blue">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-frost-blue mb-8">
            The dedicated people behind WinterCraft 2025
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Our Team
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
            <p className="text-lg text-frost-blue max-w-3xl mx-auto">
              Meet the talented individuals who work tirelessly to create the magical WinterCraft experience.
            </p>
          </div>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="frost-card overflow-hidden">
                <div className="relative h-64 mb-4">
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-snow-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-ice-blue font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-frost-blue mb-6">
                    {member.description}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    {member.social_links.discord && (
                      <a
                        href={member.social_links.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-frost-blue hover:text-ice-blue transition-colors"
                        aria-label={`${member.name}'s Discord`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                      </a>
                    )}
                    {member.social_links.twitter && (
                      <a
                        href={member.social_links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-frost-blue hover:text-ice-blue transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {member.social_links.github && (
                      <a
                        href={member.social_links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-frost-blue hover:text-ice-blue transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {member.social_links.instagram && (
                      <a
                        href={member.social_links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-frost-blue hover:text-ice-blue transition-colors"
                        aria-label={`${member.name}'s Instagram`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="winter-section bg-midnight bg-opacity-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
            Join Our Team
          </h2>
          <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
          <p className="text-lg text-frost-blue mb-8">
            Are you passionate about Minecraft and want to help create magical winter experiences? We're always looking for talented builders, developers, event managers, and community moderators to join our team!
          </p>
          <a
            href="https://discord.gg/wintercraft"
            target="_blank"
            rel="noopener noreferrer"
            className="winter-button text-lg"
          >
            Apply on Discord
          </a>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/gallery/hero-2.png"
                alt="Our Mission"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-ice-blue mb-6"></div>
              <p className="text-lg text-frost-blue mb-6">
                At WinterCraft, our mission is to create the most magical and immersive winter experience in Minecraft. We believe in building a welcoming community where players can celebrate the winter season together.
              </p>
              <p className="text-lg text-frost-blue mb-6">
                We're dedicated to crafting unique events, beautiful builds, and memorable experiences that bring joy to players from around the world. Our team works tirelessly to ensure that every aspect of WinterCraft is polished and engaging.
              </p>
              <p className="text-lg text-frost-blue">
                Thank you for being part of our winter wonderland. We couldn't do this without our amazing community!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch team members from Supabase
  const teamMembers = await getTeamMembers();
  
  // If no team members are found, provide some default team members
  const defaultTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Gleb Uhovskij',
      role: 'Founder & Tech Lead',
      description: 'Gleb is the visionary behind WinterCraft. With over 8 years of experience in Minecraft server development, he leads the technical aspects of the project and ensures everything runs smoothly.',
      image_url: '/gallery/hero-1.png',
      social_links: {
        discord: 'https://discord.gg/wintercraft',
        twitter: 'https://twitter.com/glebuhovskij',
        github: 'https://github.com/glebuhovskij',
      },
    },
    {
      id: '2',
      name: 'Frosty Builder',
      role: 'Lead Builder',
      description: 'Frosty is our talented lead builder who designed the stunning Frostvale City. His attention to detail and creative vision bring the winter wonderland to life.',
      image_url: '/gallery/hero-2.png',
      social_links: {
        discord: 'https://discord.gg/wintercraft',
        instagram: 'https://instagram.com/frostybuilder',
      },
    },
    {
      id: '3',
      name: 'Winter Wizard',
      role: 'Event Manager',
      description: 'Winter is responsible for planning and coordinating all the exciting events at WinterCraft. His creativity ensures there\'s always something fun happening on the server.',
      image_url: '/gallery/hero-3.png',
      social_links: {
        discord: 'https://discord.gg/wintercraft',
        twitter: 'https://twitter.com/winterwizard',
      },
    },
    {
      id: '4',
      name: 'Snow Queen',
      role: 'Community Manager',
      description: 'Snow Queen manages our community and ensures everyone feels welcome. She moderates the Discord server and helps new players get started on their winter adventure.',
      image_url: '/gallery/hero-4.png',
      social_links: {
        discord: 'https://discord.gg/wintercraft',
        twitter: 'https://twitter.com/snowqueen',
        instagram: 'https://instagram.com/snowqueen',
      },
    },
    {
      id: '5',
      name: 'Ice Developer',
      role: 'Plugin Developer',
      description: 'Ice is our plugin wizard who creates custom gameplay features for WinterCraft. His technical expertise brings unique mechanics to the server that you won\'t find anywhere else.',
      image_url: '/gallery/gallery-1.png',
      social_links: {
        discord: 'https://discord.gg/wintercraft',
        github: 'https://github.com/icedeveloper',
      },
    },
    {
      id: '6',
      name: 'Polar Marketer',
      role: 'Marketing Specialist',
      description: 'Polar handles all our marketing efforts and social media presence. Thanks to her work, more players discover and join the magical world of WinterCraft every day.',
      image_url: '/gallery/gallery-2.png',
      social_links: {
        discord: 'https://discord.gg/wintercraft',
        twitter: 'https://twitter.com/polarmarketer',
        instagram: 'https://instagram.com/polarmarketer',
      },
    },
  ];
  
  return {
    props: {
      teamMembers: teamMembers.length > 0 ? teamMembers : defaultTeamMembers,
    },
    // Revalidate every day
    revalidate: 86400,
  };
};
