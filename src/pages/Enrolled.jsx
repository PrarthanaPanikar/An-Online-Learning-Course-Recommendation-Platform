import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentAPI } from '../services/api';

export default function Enrolled() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollmentAPI
      .getMy()
      .then(({ data }) => setEnrollments(data.enrollments || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">My Learning</h1>
      <p className="text-slate-500 mt-1">Courses you are enrolled in</p>

      {loading ? (
        <p className="mt-8 text-slate-500">Loading...</p>
      ) : enrollments.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-slate-500">You have not enrolled in any course yet.</p>
          <Link to="/courses" className="inline-block mt-4 text-brand-600 font-medium">
            Browse courses →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 mt-8">
          {enrollments.map((e) => (
            <Link
              key={e._id}
              to={`/courses/${e.course?._id}`}
              className="flex gap-4 bg-white border rounded-xl p-4 hover:shadow-sm"
            >
              {e.course?.thumbnail && (
                <img
                  src={e.course.thumbnail}
                  alt=""
                  className="w-32 h-20 object-cover rounded-lg hidden sm:block"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{e.course?.title}</h3>
                <p className="text-sm text-slate-500">{e.course?.category} · {e.status}</p>
                <div className="mt-3 h-2 bg-slate-100 rounded-full max-w-xs">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${e.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs mt-1 text-slate-500">{e.progressPercent}% complete</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
