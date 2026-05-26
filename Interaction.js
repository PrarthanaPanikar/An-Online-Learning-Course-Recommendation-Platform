import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    event: {
      type: String,
      enum: ['view', 'wishlist', 'enroll', 'start_lesson', 'finish_lesson', 'rate'],
      required: true,
    },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

interactionSchema.index({ user: 1, course: 1, event: 1 });

const Interaction = mongoose.model('Interaction', interactionSchema);
export default Interaction;
