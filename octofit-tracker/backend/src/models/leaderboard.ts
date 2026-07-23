import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'all-time'],
      required: true,
    },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
