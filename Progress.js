import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonIndex: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    secondsWatched: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

progressSchema.index({ enrollment: 1, lessonIndex: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
