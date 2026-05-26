import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { recommendationAPI } from '../services/api';

export default function RecommendedCourses({ title, type = 'home', courseId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      setError('');
      try {
        let data;
        if (type === 'similar' && courseId) {
          ({ data } = await recommendationAPI.similar(courseId));
          setItems(data.recommendations || []);
        } else if (type === 'skillgap') {
          ({ data } = await recommendationAPI.skillGap());
          setItems(data.recommendations || []);
        } else {
          ({ data } = await recommendationAPI.home());
          setItems(data.recommendations || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [type, courseId]);

  if (loading) {
    return <p className="text-slate-500 text-sm py-4">Loading recommendations...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  if (!items.length) {
    return <p className="text-slate-500 text-sm">No recommendations yet. Complete your profile!</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(({ course, reason }) => (
          <CourseCard key={course._id} course={course} reason={reason} badge="For You" />
        ))}
      </div>
    </section>
  );
}
