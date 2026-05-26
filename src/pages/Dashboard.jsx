import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RecommendedCourses from '../components/RecommendedCourses';
import { enrollmentAPI } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState({ active: 0, avgProgress: 0 });

  useEffect(() => {
    enrollmentAPI.getMy().then(({ data }) => {
      const list = data.enrollments || [];
      setEnrollments(list.slice(0, 3));
      const active = list.filter((e) => e.status === 'active').length;
      const avg =
        list.length > 0
          ? Math.round(list.reduce((s, e) => s + (e.progressPercent || 0), 0) / list.length)
          : 0;
      setStats({ active: list.length, avgProgress: avg });
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name} 👋</h1>
      <p className="text-slate-500 mt-1">Your personalized learning dashboard</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-slate-500">Enrolled courses</p>
          <p className="text-3xl font-bold text-brand-600">{stats.active}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-slate-500">Average progress</p>
          <p className="text-3xl font-bold text-emerald-600">{stats.avgProgress}%</p>
        </div>
        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-slate-500">Your interests</p>
          <p className="text-sm mt-2">{(user?.interests || []).join(', ') || 'Not set'}</p>
        </div>
      </div>

      {enrollments.length > 0 && (
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Continue learning</h2>
            <Link to="/enrolled" className="text-sm text-brand-600">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {enrollments.map((e) => (
              <Link
                key={e._id}
                to={`/courses/${e.course?._id}`}
                className="block bg-white p-4 rounded-xl border hover:border-brand-300"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{e.course?.title}</span>
                  <span className="text-sm text-brand-600">{e.progressPercent}%</span>
                </div>
                <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${e.progressPercent}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <RecommendedCourses title="Recommended for you" type="home" />
      </div>

      <div className="mt-12">
        <RecommendedCourses title="Skill-gap suggestions" type="skillgap" />
      </div>
    </div>
  );
}
