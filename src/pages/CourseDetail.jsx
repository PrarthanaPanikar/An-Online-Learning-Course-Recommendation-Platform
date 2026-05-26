import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseAPI, enrollmentAPI, progressAPI, interactionAPI } from '../services/api';
import RecommendedCourses from '../components/RecommendedCourses';

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await courseAPI.getById(id);
        setCourse(data.course);
        if (user) {
          interactionAPI.track(id, 'view').catch(() => {});
          const en = await enrollmentAPI.getByCourse(id);
          setEnrollment(en.data.enrollment);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await enrollmentAPI.enroll(id);
      setEnrollment(data.enrollment);
      setMessage('Enrolled successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const markLessonComplete = async (lessonIndex) => {
    try {
      const { data } = await progressAPI.update({
        courseId: id,
        lessonIndex,
        completed: true,
      });
      setEnrollment(data.enrollment);
      setMessage('Progress updated!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update progress');
    }
  };

  const setProgressManual = async (percent) => {
    try {
      const { data } = await progressAPI.update({ courseId: id, progressPercent: percent });
      setEnrollment(data.enrollment);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (!course) return <p className="text-center py-12">Course not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full aspect-video object-cover rounded-xl"
            />
          )}
          <h1 className="text-3xl font-bold mt-6">{course.title}</h1>
          <p className="text-slate-500">{course.subtitle}</p>
          <p className="mt-4 text-slate-700">{course.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm bg-brand-50 text-brand-700 px-2 py-1 rounded">{course.category}</span>
            <span className="text-sm bg-slate-100 px-2 py-1 rounded">{course.level}</span>
            <span className="text-sm bg-slate-100 px-2 py-1 rounded">★ {course.rating}</span>
          </div>

          <h2 className="text-xl font-semibold mt-8">Lessons</h2>
          <ul className="mt-4 space-y-2">
            {(course.lessons || []).map((lesson, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-white border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-slate-500">{lesson.durationMinutes} min</p>
                </div>
                {enrollment && (
                  <button
                    onClick={() => markLessonComplete(idx)}
                    disabled={enrollment.completedLessons?.includes(idx)}
                    className="text-sm px-3 py-1 rounded bg-emerald-600 text-white disabled:bg-slate-300"
                  >
                    {enrollment.completedLessons?.includes(idx) ? 'Done' : 'Mark complete'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-6 sticky top-20">
            {!enrollment ? (
              <button
                onClick={handleEnroll}
                className="w-full py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700"
              >
                Enroll for free
              </button>
            ) : (
              <div>
                <p className="font-medium text-emerald-700">You are enrolled</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{enrollment.progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {[25, 50, 75, 100].map((p) => (
                    <button
                      key={p}
                      onClick={() => setProgressManual(p)}
                      className="text-xs px-2 py-1 border rounded hover:bg-slate-50"
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}
            {message && <p className="text-sm mt-3 text-brand-600">{message}</p>}
          </div>
        </div>
      </div>

      {user && (
        <div className="mt-16">
          <RecommendedCourses
            title="Because you viewed this course"
            type="similar"
            courseId={id}
          />
        </div>
      )}
    </div>
  );
}
