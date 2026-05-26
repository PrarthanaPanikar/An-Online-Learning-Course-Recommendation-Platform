import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { progressAPI } from '../services/api';

export default function ProgressPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressAPI
      .getAll()
      .then(({ data }) => setEnrollments(data.enrollments || []))
      .finally(() => setLoading(false));
  }, []);

  const completed = enrollments.filter((e) => e.status === 'completed').length;
  const inProgress = enrollments.filter((e) => e.status === 'active').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Progress Tracking</h1>
      <p className="text-slate-500 mt-1">Monitor your learning journey across all courses</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-5 rounded-xl border text-center">
          <p className="text-3xl font-bold text-brand-600">{enrollments.length}</p>
          <p className="text-sm text-slate-500">Total enrollments</p>
        </div>
        <div className="bg-white p-5 rounded-xl border text-center">
          <p className="text-3xl font-bold text-amber-600">{inProgress}</p>
          <p className="text-sm text-slate-500">In progress</p>
        </div>
        <div className="bg-white p-5 rounded-xl border text-center">
          <p className="text-3xl font-bold text-emerald-600">{completed}</p>
          <p className="text-sm text-slate-500">Completed</p>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-slate-500">Loading progress...</p>
      ) : (
        <div className="mt-10 space-y-6">
          {enrollments.map((e) => (
            <div key={e._id} className="bg-white border rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{e.course?.title}</h3>
                  <p className="text-sm text-slate-500">{e.course?.level} · {e.course?.category}</p>
                </div>
                <Link
                  to={`/courses/${e.course?._id}`}
                  className="text-sm text-brand-600 hover:underline"
                >
                  Continue →
                </Link>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Completion</span>
                  <span className="font-medium">{e.progressPercent}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      e.progressPercent >= 100 ? 'bg-emerald-500' : 'bg-brand-500'
                    }`}
                    style={{ width: `${e.progressPercent}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Lessons completed: {(e.completedLessons || []).length} /{' '}
                {e.course?.lessons?.length || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
