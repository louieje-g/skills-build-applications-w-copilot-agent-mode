import { Router } from 'express';
import Activity from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .populate('user', 'name email fitnessLevel')
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      resource: 'activities',
      message: 'Activities retrieved successfully',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'activities',
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default activitiesRouter;