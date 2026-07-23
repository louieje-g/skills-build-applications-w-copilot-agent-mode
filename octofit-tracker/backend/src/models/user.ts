import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13, max: 100 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    weeklyGoal: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    joinedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
