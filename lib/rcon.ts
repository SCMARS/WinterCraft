import { Rcon } from 'rcon-client';

/**
 * Sends a command to the Minecraft server via RCON
 * @param cmd The command to send
 * @returns Promise that resolves when the command is sent
 */
export async function sendRconCommand(cmd: string): Promise<string> {
  try {
    const rcon = await Rcon.connect({
      host: process.env.RCON_HOST || 'localhost',
      port: parseInt(process.env.RCON_PORT || '25575'),
      password: process.env.RCON_PASSWORD || '',
    });
    
    const response = await rcon.send(cmd);
    await rcon.end();
    
    return response;
  } catch (error) {
    console.error('RCON Error:', error);
    throw new Error('Failed to connect to Minecraft server');
  }
}

/**
 * Sets a player's rank using LuckPerms
 * @param username The player's username
 * @param rank The rank to set
 * @returns Promise that resolves with the command response
 */
export async function setPlayerRank(username: string, rank: string): Promise<string> {
  // Sanitize inputs to prevent command injection
  const sanitizedUsername = username.replace(/[^\w\d_]/g, '');
  const sanitizedRank = rank.replace(/[^\w\d_]/g, '');
  
  if (sanitizedUsername !== username || sanitizedRank !== rank) {
    throw new Error('Invalid username or rank');
  }
  
  return sendRconCommand(`/lp user ${sanitizedUsername} parent set ${sanitizedRank}`);
}

/**
 * Gives an item to a player
 * @param username The player's username
 * @param item The item to give
 * @param amount The amount of the item
 * @returns Promise that resolves with the command response
 */
export async function givePlayerItem(username: string, item: string, amount: number = 1): Promise<string> {
  // Sanitize inputs to prevent command injection
  const sanitizedUsername = username.replace(/[^\w\d_]/g, '');
  const sanitizedItem = item.replace(/[^\w\d_:]/g, '');
  
  if (sanitizedUsername !== username || sanitizedItem !== item) {
    throw new Error('Invalid username or item');
  }
  
  return sendRconCommand(`/give ${sanitizedUsername} ${sanitizedItem} ${amount}`);
}

/**
 * Broadcasts a message to all players on the server
 * @param message The message to broadcast
 * @returns Promise that resolves with the command response
 */
export async function broadcastMessage(message: string): Promise<string> {
  // Basic sanitization
  const sanitizedMessage = message.replace(/[^\w\d\s_.,!?-]/g, '');
  
  return sendRconCommand(`/broadcast ${sanitizedMessage}`);
}
