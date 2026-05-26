import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecommendedCourses from '../components/RecommendedCourses';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-600 to-brand-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Learn smarter with personalized courses</h1>
          <p className="mt-4 text-brand-100 max-w-2xl mx-auto">
            Browse courses, enroll, track progress, and get recommendations powered by hybrid
            content + collaborative filtering.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-white text-brand-700 rounded-lg font-medium hover:bg-brand-50"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white text-brand-700 rounded-lg font-medium"
                >
                  Get Started
                </Link>
                <Link
                  to="/courses"
                  className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white/10"
                >
                  Browse Courses
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {user ? (
          <>
            <RecommendedCourses title="Recommended for you" type="home" />
            <div className="mt-12">
              <RecommendedCourses title="Close your skill gaps" type="skillgap" />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Sign in to unlock recommendations</h2>
            <p className="text-slate-500 mt-2">Create a free account and set your interests & skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}
