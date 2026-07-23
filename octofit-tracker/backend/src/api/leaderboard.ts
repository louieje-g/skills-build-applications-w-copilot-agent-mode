import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .populate('user', 'name email')
      .populate('team', 'name city')
      .sort({ period: 1, rank: 1 })
      .lean();

    res.status(200).json({
      resource: 'leaderboard',
      message: 'Leaderboard retrieved successfully',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'leaderboard',
      message: 'Failed to fetch leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default leaderboardRouter;