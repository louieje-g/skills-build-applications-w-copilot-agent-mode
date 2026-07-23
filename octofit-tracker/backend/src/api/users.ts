import { Router } from 'express';
import User from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const items = await User.find()
      .populate('team', 'name city')
      .sort({ joinedAt: -1 })
      .lean();

    res.status(200).json({
      resource: 'users',
      message: 'Users retrieved successfully',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'users',
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default usersRouter;