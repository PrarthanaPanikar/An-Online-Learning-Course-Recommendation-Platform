import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  durationMinutes: { type: Number, default: 10 },
  order: { type: Number, default: 0 },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    tags: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true }],
    thumbnail: { type: String, default: '' },
    instructor: { type: String, default: 'Expert Instructor' },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    enrollCount: { type: Number, default: 0 },
    lessons: [lessonSchema],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
