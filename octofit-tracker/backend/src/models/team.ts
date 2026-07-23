import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
