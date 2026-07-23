import { Router } from 'express';
import Team from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const items = await Team.find()
      .populate('members', 'name email fitnessLevel')
      .sort({ totalPoints: -1, name: 1 })
      .lean();

    res.status(200).json({
      resource: 'teams',
      message: 'Teams retrieved successfully',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'teams',
      message: 'Failed to fetch teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default teamsRouter;