import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { getPlayers, getServerStats } from '../lib/supabase';
import { Player } from '../lib/supabase';

interface StatsPageProps {
  players: Player[];
  serverStats: {
    online_players: number;
    total_players: number;
    total_donations: number;
    active_events: number;
  };
}

export default function Stats({ players: initialPlayers, serverStats }: StatsPageProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [filter, setFilter] = useState<'coins' | 'quests_completed'>('coins');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState(serverStats.online_players);
  
  // Simulate real-time updates for online players
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would be a fetch to an API endpoint
      // For demo purposes, we'll just randomly adjust the number slightly
      setOnlinePlayers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(0, prev + change);
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => 
      player.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b[filter] - a[filter]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4 text-center"
        style={{
          backgroundImage: "url('/gallery/hero-4.png')",
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
            Server <span className="text-ice-blue">Statistics</span>
          </h1>
          <p className="text-xl md:text-2xl text-frost-blue mb-8">
            Track player achievements and server activity
          </p>
        </div>
      </section>

      {/* Server Stats Section */}
      <section className="winter-section bg-midnight py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="frost-card">
              <h3 className="text-2xl font-playfair font-bold text-ice-blue">
                {onlinePlayers}
              </h3>
              <p className="text-frost-blue">Players Online</p>
            </div>
            <div className="frost-card">
              <h3 className="text-2xl font-playfair font-bold text-ice-blue">
                {serverStats.total_players}
              </h3>
              <p className="text-frost-blue">Total Players</p>
            </div>
            <div className="frost-card">
              <h3 className="text-2xl font-playfair font-bold text-ice-blue">
                ${serverStats.total_donations}
              </h3>
              <p className="text-frost-blue">Total Donations</p>
            </div>
            <div className="frost-card">
              <h3 className="text-2xl font-playfair font-bold text-ice-blue">
                {serverStats.active_events}
              </h3>
              <p className="text-frost-blue">Active Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Player Leaderboard
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
            <p className="text-lg text-frost-blue max-w-3xl mx-auto">
              See who's leading the winter festivities! Players are ranked by Candy Coins earned and quests completed.
            </p>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('coins')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'coins'
                    ? 'bg-ice-blue text-midnight font-bold'
                    : 'bg-midnight text-frost-blue hover:bg-midnight-light'
                }`}
              >
                Candy Coins
              </button>
              <button
                onClick={() => setFilter('quests_completed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'quests_completed'
                    ? 'bg-ice-blue text-midnight font-bold'
                    : 'bg-midnight text-frost-blue hover:bg-midnight-light'
                }`}
              >
                Quests Completed
              </button>
            </div>
            
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-lg bg-midnight border border-frost-blue text-snow-white focus:border-ice-blue focus:outline-none"
              />
            </div>
          </div>
          
          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-midnight">
                  <th className="px-4 py-3 text-left text-frost-blue font-semibold">Rank</th>
                  <th className="px-4 py-3 text-left text-frost-blue font-semibold">Player</th>
                  <th className="px-4 py-3 text-left text-frost-blue font-semibold">Rank</th>
                  <th className="px-4 py-3 text-right text-frost-blue font-semibold">
                    {filter === 'coins' ? 'Candy Coins' : 'Quests Completed'}
                  </th>
                  <th className="px-4 py-3 text-right text-frost-blue font-semibold">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, index) => (
                  <tr 
                    key={player.id} 
                    className={`border-t border-frost-blue ${
                      index % 2 === 0 ? 'bg-midnight-light bg-opacity-30' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-snow-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-snow-white font-medium">
                      {player.username}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        player.rank === 'santa_plus' 
                          ? 'bg-gold text-midnight' 
                          : player.rank === 'reindeer'
                            ? 'bg-christmas-red text-snow-white'
                            : player.rank === 'snow_vip'
                              ? 'bg-ice-blue text-midnight'
                              : 'bg-frost-blue bg-opacity-30 text-frost-blue'
                      }`}>
                        {player.rank === 'santa_plus' 
                          ? 'Santa+' 
                          : player.rank === 'reindeer'
                            ? 'Reindeer'
                            : player.rank === 'snow_vip'
                              ? 'Snow VIP'
                              : 'Player'
                        }
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-ice-blue font-bold">
                      {filter === 'coins' 
                        ? `${player.coins} CC` 
                        : player.quests_completed
                      }
                    </td>
                    <td className="px-4 py-3 text-right text-frost-blue">
                      {new Date(player.last_login).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                
                {filteredPlayers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-frost-blue">
                      No players found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Event Progress Section */}
      <section className="winter-section bg-midnight bg-opacity-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Event Progress
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
            <p className="text-lg text-frost-blue max-w-3xl mx-auto">
              Track the progress of our community goals for WinterCraft 2025!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Candy Coins */}
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-4">
                Total Candy Coins Earned
              </h3>
              <div className="mb-2 flex justify-between">
                <span className="text-frost-blue">Progress</span>
                <span className="text-ice-blue font-bold">
                  {players.reduce((sum, player) => sum + player.coins, 0).toLocaleString()} / 1,000,000
                </span>
              </div>
              <div className="w-full bg-midnight rounded-full h-4 mb-4">
                <div 
                  className="bg-ice-blue h-4 rounded-full"
                  style={{ 
                    width: `${Math.min(100, (players.reduce((sum, player) => sum + player.coins, 0) / 1000000) * 100)}%` 
                  }}
                ></div>
              </div>
              <p className="text-frost-blue text-sm">
                When we reach 1,000,000 Candy Coins as a community, everyone will receive a special Winter Champion trophy!
              </p>
            </div>
            
            {/* Quests Completed */}
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-4">
                Total Quests Completed
              </h3>
              <div className="mb-2 flex justify-between">
                <span className="text-frost-blue">Progress</span>
                <span className="text-ice-blue font-bold">
                  {players.reduce((sum, player) => sum + player.quests_completed, 0).toLocaleString()} / 10,000
                </span>
              </div>
              <div className="w-full bg-midnight rounded-full h-4 mb-4">
                <div 
                  className="bg-christmas-red h-4 rounded-full"
                  style={{ 
                    width: `${Math.min(100, (players.reduce((sum, player) => sum + player.quests_completed, 0) / 10000) * 100)}%` 
                  }}
                ></div>
              </div>
              <p className="text-frost-blue text-sm">
                When we reach 10,000 completed quests as a community, a special event will be unlocked with exclusive rewards!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch players and server stats from Supabase
  const [players, serverStats] = await Promise.all([
    getPlayers(),
    getServerStats(),
  ]);
  
  // If no players are found, provide some default players
  const defaultPlayers: Player[] = [
    {
      id: '1',
      username: 'FrostyBuilder',
      coins: 3450,
      quests_completed: 28,
      last_login: new Date().toISOString(),
      rank: 'santa_plus',
    },
    {
      id: '2',
      username: 'IceQueen',
      coins: 2980,
      quests_completed: 32,
      last_login: new Date().toISOString(),
      rank: 'reindeer',
    },
    {
      id: '3',
      username: 'SnowWizard',
      coins: 2750,
      quests_completed: 25,
      last_login: new Date().toISOString(),
      rank: 'snow_vip',
    },
    {
      id: '4',
      username: 'WinterWarrior',
      coins: 2200,
      quests_completed: 20,
      last_login: new Date().toISOString(),
      rank: 'player',
    },
    {
      id: '5',
      username: 'FrostbiteFighter',
      coins: 1950,
      quests_completed: 18,
      last_login: new Date().toISOString(),
      rank: 'snow_vip',
    },
    {
      id: '6',
      username: 'GlacierGamer',
      coins: 1800,
      quests_completed: 15,
      last_login: new Date().toISOString(),
      rank: 'player',
    },
    {
      id: '7',
      username: 'PolarExplorer',
      coins: 1650,
      quests_completed: 14,
      last_login: new Date().toISOString(),
      rank: 'player',
    },
    {
      id: '8',
      username: 'BlizzardBrawler',
      coins: 1500,
      quests_completed: 12,
      last_login: new Date().toISOString(),
      rank: 'reindeer',
    },
    {
      id: '9',
      username: 'ArcticArcher',
      coins: 1350,
      quests_completed: 10,
      last_login: new Date().toISOString(),
      rank: 'player',
    },
    {
      id: '10',
      username: 'ColdCrafter',
      coins: 1200,
      quests_completed: 8,
      last_login: new Date().toISOString(),
      rank: 'snow_vip',
    },
  ];
  
  // Default server stats if none are found
  const defaultServerStats = {
    online_players: 42,
    total_players: 150,
    total_donations: 500,
    active_events: 3,
  };
  
  return {
    props: {
      players: players.length > 0 ? players : defaultPlayers,
      serverStats: serverStats || defaultServerStats,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};
