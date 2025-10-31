import type { NextApiRequest, NextApiResponse } from 'next';
import { setPlayerRank } from '../../lib/rcon';
import { getPlayerByUsername, getDonationPackages } from '../../lib/supabase';

type DonationResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DonationResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { username, packageId } = req.body;

    // Validate inputs
    if (!username || !packageId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and package ID are required' 
      });
    }

    // Check if player exists
    const player = await getPlayerByUsername(username);
    if (!player) {
      return res.status(404).json({ 
        success: false, 
        message: 'Player not found. Make sure you have joined the server at least once.' 
      });
    }

    // Get donation package details
    const packages = await getDonationPackages();
    const donationPackage = packages.find(pkg => pkg.id === packageId);
    
    if (!donationPackage) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donation package not found' 
      });
    }

    // Set player rank using RCON
    await setPlayerRank(username, donationPackage.rank);

    // Record the donation in Supabase (this would be implemented in a real system)
    // await recordDonation(username, donationPackage.id, donationPackage.price);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: `Successfully upgraded ${username} to ${donationPackage.name} rank!` 
    });
  } catch (error) {
    console.error('Donation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your donation. Please try again or contact support.' 
    });
  }
}