import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const INTEREST_OPTIONS = [
  'Web Development',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Mobile Development',
  'Cloud Computing',
];

const SKILL_OPTIONS = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'Machine Learning',
  'Cybersecurity',
  'Linux',
];

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [interests, setInterests] = useState(user?.interests || []);
  const [skills, setSkills] = useState(user?.skills || []);
  const [targetSkills, setTargetSkills] = useState(user?.targetSkills || []);
  const [loading, setLoading] = useState(false);

  const toggle = (list, setList, item) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ interests, skills, targetSkills });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const ChipGroup = ({ label, options, selected, setSelected }) => (
    <div>
      <p className="font-medium mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(selected, setSelected, opt)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selected.includes(opt)
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white border-slate-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Set up your learning profile</h1>
      <p className="text-slate-500 mt-2">
        We use your interests and skills to power personalized course recommendations.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8 bg-white p-6 rounded-xl border">
        <ChipGroup
          label="Interests"
          options={INTEREST_OPTIONS}
          selected={interests}
          setSelected={setInterests}
        />
        <ChipGroup label="Current skills" options={SKILL_OPTIONS} selected={skills} setSelected={setSkills} />
        <ChipGroup
          label="Skills you want to learn (for skill-gap recommendations)"
          options={SKILL_OPTIONS}
          selected={targetSkills}
          setSelected={setTargetSkills}
        />
        <button
          type="submit"
          disabled={loading || !interests.length || !skills.length}
          className="w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save & go to Dashboard'}
        </button>
      </form>
    </div>
  );
}
