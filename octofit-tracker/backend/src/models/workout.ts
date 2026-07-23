import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'mobility', 'recovery'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    targetMuscles: [{ type: String, required: true, trim: true }],
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, required: true, trim: true }],
    recommendedFor: [{ type: String, enum: ['beginner', 'intermediate', 'advanced'] }],
  },
  {
    versionKey: false,
  }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;
