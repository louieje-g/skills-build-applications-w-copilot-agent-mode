import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Pace Setters',
        city: 'Seattle',
        motto: 'Consistency beats intensity.',
        totalPoints: 0,
      },
      {
        name: 'Iron Orbit',
        city: 'Austin',
        motto: 'Lift strong, move long.',
        totalPoints: 0,
      },
    ]);

    const [paceSetters, ironOrbit] = teams;

    const users = await User.insertMany([
      {
        name: 'Maya Patel',
        email: 'maya.patel@octofit.dev',
        age: 29,
        fitnessLevel: 'intermediate',
        weeklyGoal: 'Complete 4 training sessions',
        team: paceSetters._id,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.dev',
        age: 34,
        fitnessLevel: 'advanced',
        weeklyGoal: 'Run 30km total this week',
        team: paceSetters._id,
      },
      {
        name: 'Lena Cho',
        email: 'lena.cho@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        weeklyGoal: 'Build a 3-day routine',
        team: paceSetters._id,
      },
      {
        name: 'Noah Nguyen',
        email: 'noah.nguyen@octofit.dev',
        age: 31,
        fitnessLevel: 'advanced',
        weeklyGoal: 'Improve squat volume by 10%',
        team: ironOrbit._id,
      },
      {
        name: 'Sofia Ramirez',
        email: 'sofia.ramirez@octofit.dev',
        age: 28,
        fitnessLevel: 'intermediate',
        weeklyGoal: 'Hit 12,000 steps/day average',
        team: ironOrbit._id,
      },
      {
        name: 'Kai Johnson',
        email: 'kai.johnson@octofit.dev',
        age: 37,
        fitnessLevel: 'beginner',
        weeklyGoal: 'Finish two mobility sessions',
        team: ironOrbit._id,
      },
    ]);

    const userByEmail = new Map(users.map((user) => [user.email, user]));

    const activities = await Activity.insertMany([
      {
        user: userByEmail.get('maya.patel@octofit.dev')?._id,
        type: 'run',
        durationMinutes: 42,
        caloriesBurned: 420,
        distanceKm: 7.4,
        date: new Date('2026-07-20T07:10:00Z'),
        notes: 'Steady pace before work',
      },
      {
        user: userByEmail.get('ethan.brooks@octofit.dev')?._id,
        type: 'cycle',
        durationMinutes: 55,
        caloriesBurned: 610,
        distanceKm: 21.2,
        date: new Date('2026-07-19T15:40:00Z'),
        notes: 'Hill repeats on trail loop',
      },
      {
        user: userByEmail.get('lena.cho@octofit.dev')?._id,
        type: 'yoga',
        durationMinutes: 30,
        caloriesBurned: 130,
        distanceKm: null,
        date: new Date('2026-07-18T18:30:00Z'),
        notes: 'Beginner flow and breathing drills',
      },
      {
        user: userByEmail.get('noah.nguyen@octofit.dev')?._id,
        type: 'strength',
        durationMinutes: 70,
        caloriesBurned: 520,
        distanceKm: null,
        date: new Date('2026-07-21T06:20:00Z'),
        notes: 'Lower body compound focus',
      },
      {
        user: userByEmail.get('sofia.ramirez@octofit.dev')?._id,
        type: 'hiit',
        durationMinutes: 26,
        caloriesBurned: 315,
        distanceKm: null,
        date: new Date('2026-07-21T17:15:00Z'),
        notes: '20s sprint / 40s rest intervals',
      },
      {
        user: userByEmail.get('kai.johnson@octofit.dev')?._id,
        type: 'yoga',
        durationMinutes: 25,
        caloriesBurned: 95,
        distanceKm: null,
        date: new Date('2026-07-20T20:05:00Z'),
        notes: 'Hip and thoracic mobility reset',
      },
      {
        user: userByEmail.get('maya.patel@octofit.dev')?._id,
        type: 'strength',
        durationMinutes: 48,
        caloriesBurned: 360,
        distanceKm: null,
        date: new Date('2026-07-22T12:00:00Z'),
        notes: 'Upper body pull session',
      },
      {
        user: userByEmail.get('noah.nguyen@octofit.dev')?._id,
        type: 'run',
        durationMinutes: 36,
        caloriesBurned: 390,
        distanceKm: 6.2,
        date: new Date('2026-07-22T07:45:00Z'),
        notes: 'Recovery run with cadence work',
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Beginner Full-Body Circuit',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 35,
        targetMuscles: ['legs', 'chest', 'core'],
        equipment: ['dumbbells', 'exercise mat'],
        instructions: [
          'Warm up for 5 minutes with brisk walking.',
          'Complete 3 rounds of squats, push-ups, and plank holds.',
          'Cool down with light stretching for 5 minutes.',
        ],
        recommendedFor: ['beginner'],
      },
      {
        title: 'Tempo Run Builder',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 45,
        targetMuscles: ['glutes', 'hamstrings', 'calves'],
        equipment: ['running shoes'],
        instructions: [
          'Jog 10 minutes at easy pace.',
          'Run 20 minutes at tempo effort.',
          'Recover with 15 minutes easy jog and walking.',
        ],
        recommendedFor: ['intermediate', 'advanced'],
      },
      {
        title: 'Barbell Strength Ladder',
        category: 'strength',
        difficulty: 'advanced',
        durationMinutes: 60,
        targetMuscles: ['quadriceps', 'back', 'shoulders'],
        equipment: ['barbell', 'weight plates', 'bench'],
        instructions: [
          'Ramp up through 4 warm-up sets.',
          'Perform deadlift, bench press, and front squat ladders.',
          'Finish with loaded carries and cooldown drills.',
        ],
        recommendedFor: ['advanced'],
      },
      {
        title: 'Desk Break Mobility Flow',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        targetMuscles: ['hips', 'thoracic spine', 'ankles'],
        equipment: ['exercise mat'],
        instructions: [
          'Start with controlled cat-cow and thoracic rotations.',
          'Alternate deep squat holds and lunge openers.',
          'End with ankle mobility and breathing reset.',
        ],
        recommendedFor: ['beginner', 'intermediate', 'advanced'],
      },
      {
        title: 'Post-Workout Recovery Reset',
        category: 'recovery',
        difficulty: 'intermediate',
        durationMinutes: 18,
        targetMuscles: ['hamstrings', 'calves', 'upper back'],
        equipment: ['foam roller', 'massage ball'],
        instructions: [
          'Foam roll lower body for 8 minutes.',
          'Use massage ball on upper back trigger points.',
          'Finish with box breathing for 3 minutes.',
        ],
        recommendedFor: ['intermediate', 'advanced'],
      },
      {
        title: 'HIIT Sprint Deck',
        category: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 28,
        targetMuscles: ['core', 'glutes', 'calves'],
        equipment: ['timer'],
        instructions: [
          'Alternate 30-second sprint bursts with 60-second recovery.',
          'Repeat for 12 rounds while tracking output.',
          'Cool down with 5 minutes of easy movement.',
        ],
        recommendedFor: ['intermediate', 'advanced'],
      },
    ]);

    paceSetters.members = [
      userByEmail.get('maya.patel@octofit.dev')!._id,
      userByEmail.get('ethan.brooks@octofit.dev')!._id,
      userByEmail.get('lena.cho@octofit.dev')!._id,
    ];
    paceSetters.totalPoints = 1980;

    ironOrbit.members = [
      userByEmail.get('noah.nguyen@octofit.dev')!._id,
      userByEmail.get('sofia.ramirez@octofit.dev')!._id,
      userByEmail.get('kai.johnson@octofit.dev')!._id,
    ];
    ironOrbit.totalPoints = 2060;

    await Promise.all([paceSetters.save(), ironOrbit.save()]);

    const leaderboardRows = await Leaderboard.insertMany([
      {
        period: 'weekly',
        rank: 1,
        points: 820,
        user: userByEmail.get('noah.nguyen@octofit.dev')?._id,
        team: ironOrbit._id,
      },
      {
        period: 'weekly',
        rank: 2,
        points: 790,
        user: userByEmail.get('ethan.brooks@octofit.dev')?._id,
        team: paceSetters._id,
      },
      {
        period: 'weekly',
        rank: 3,
        points: 730,
        user: userByEmail.get('maya.patel@octofit.dev')?._id,
        team: paceSetters._id,
      },
      {
        period: 'monthly',
        rank: 1,
        points: 2060,
        team: ironOrbit._id,
      },
      {
        period: 'monthly',
        rank: 2,
        points: 1980,
        team: paceSetters._id,
      },
      {
        period: 'all-time',
        rank: 1,
        points: 11840,
        user: userByEmail.get('ethan.brooks@octofit.dev')?._id,
        team: paceSetters._id,
      },
    ]);

    console.log(
      `Seed complete: ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardRows.length} leaderboard rows, ${workouts.length} workouts.`
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
