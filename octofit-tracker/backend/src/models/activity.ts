import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'hiit'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, default: null, min: 0 },
    date: { type: Date, required: true },
    notes: { type: String, default: '', trim: true },
  },
  {
    versionKey: false,
  }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity;
