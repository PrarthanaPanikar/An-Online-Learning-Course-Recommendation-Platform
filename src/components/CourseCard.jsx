import { Link } from 'react-router-dom';

export default function CourseCard({ course, reason, badge }) {
  if (!course) return null;

  return (
    <Link
      to={`/courses/${course._id}`}
      className="block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-slate-100 relative">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
        )}
        {badge && (
          <span className="absolute top-2 left-2 text-xs bg-brand-600 text-white px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-brand-600 font-medium">{course.category}</p>
        <h3 className="font-semibold mt-1 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-slate-500 mt-1">
          {course.level} · ★ {course.rating} · {course.enrollCount || 0} learners
        </p>
        {reason && (
          <p className="text-xs text-emerald-700 bg-emerald-50 mt-2 px-2 py-1 rounded">{reason}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {(course.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-slate-100 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
