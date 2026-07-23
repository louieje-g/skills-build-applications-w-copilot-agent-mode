import { Router } from 'express';
import Workout from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const items = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();

    res.status(200).json({
      resource: 'workouts',
      message: 'Workouts retrieved successfully',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'workouts',
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default workoutsRouter;