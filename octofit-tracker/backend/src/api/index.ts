import { Router } from 'express';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';
import { getApiBaseUrl } from '../config/baseUrl';

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  const apiBaseUrl = getApiBaseUrl();

  res.status(200).json({
    service: 'octofit-backend',
    apiBaseUrl,
    endpoints: {
      users: `${apiBaseUrl}/users/`,
      teams: `${apiBaseUrl}/teams/`,
      activities: `${apiBaseUrl}/activities/`,
      leaderboard: `${apiBaseUrl}/leaderboard/`,
      workouts: `${apiBaseUrl}/workouts/`,
    },
  });
});

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'octofit-backend' });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);

export default apiRouter;