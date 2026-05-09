'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CRITERIA = [
  { key: 'study_program', label: '📚 Dahili Ders Programı', desc: 'Ders programına uyum' },
  { key: 'prayer_program', label: '🕌 Namaz Programı', desc: 'Dini görevlere katılım' },
  { key: 'cleanliness', label: '🧹 Temizlik & Düzen', desc: 'Oda ve yatak düzeni' },
  { key: 'peer_relations', label: '👥 Arkadaş İlişkileri', desc: 'Sosyal münasebet kalitesi' },
  { key: 'teacher_relations', label: '👨‍🏫 Hoca İlişkileri', desc: 'Saygı ve iletişim' },
  { key: 'general_discipline', label: '🎯 Genel Disiplin', desc: 'Kurallara uyum' }
];

export default function MentorPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({
    study_program: 3,
    prayer_program: 3,
    cleanliness: 3,
    peer_relations: 3,
    teacher_relations: 3,
    general_discipline: 3
  });
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [overallComment, setOverallComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Giriş kontrolü
    const loggedIn = localStorage.getItem('mentor_logged_in');
    if (loggedIn !== 'true') {
      router.push('/mentor/login');
      return;
    }
    
    setIsAuthenticated(true);

    // Öğrencileri yükle
    fetch('/api/students/list')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStudents(data.data);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('mentor_logged_in');
    localStorage.removeItem('mentor_username');
    router.push('/mentor/login');
  };

  const avgScore = Object.values(scores).length > 0
    ? (Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length).toFixed(1)
    : '0';

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) {
      setMessage('❌ Lütfen öğrenci seçin!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/mentor/evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_number: selectedStudent,
          study_program_score: scores.study_program,
          prayer_program_score: scores.prayer_program,
          cleanliness_score: scores.cleanliness,
          peer_relations_score: scores.peer_relations,
          teacher_relations_score: scores.teacher_relations,
          general_discipline_score: scores.general_discipline,
          study_program_notes: notes.study_program || null,
          prayer_program_notes: notes.prayer_program || null,
          cleanliness_notes: notes.cleanliness || null,
          peer_relations_notes: notes.peer_relations || null,
          teacher_relations_notes: notes.teacher_relations || null,
          general_discipline_notes: notes.general_discipline || null,
          overall_comment: overallComment || null
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage('✅ Değerlendirme başarıyla kaydedildi!');
        setNotes({});
        setOverallComment('');
        setSelectedStudent('');
        setScores({
          study_program: 3, prayer_program: 3, cleanliness: 3,
          peer_relations: 3, teacher_relations: 3, general_discipline: 3
        });
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ ' + (result.error || 'Kayıt hatası'));
      }
    } catch (error) {
      setMessage('❌ Sunucu hatası!');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  const grouped = students.reduce((acc: any, s: any) => {
    const cls = s.class_name || 'Diğer';
    if (!acc[cls]) acc[cls] = [];
    acc[cls].push(s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-900">🏫 Yurt Değerlendirme</h1>
              <p className="text-slate-500 mt-1">Mentor Paneli</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-4 shadow-lg mb-2">
                <p className="text-4xl font-black">{avgScore}</p>
                <p className="text-xs opacity-90 mt-1">Ortalama</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                🚪 Çıkış
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Öğrenci Seçimi */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              👤 Öğrenci Seçin
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 transition-all font-medium text-slate-800"
              required
            >
              <option value="">-- Öğrenci Seçiniz --</option>
              {Object.entries(grouped).sort().map(([cls, studs]: any) => (
                <optgroup key={cls} label={cls}>
                  {studs.map((s: any) => (
                    <option key={s.student_number} value={s.student_number}>
                      {s.full_name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Kriterler */}
          {CRITERIA.map((criterion) => (
            <div key={criterion.key} className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-800">{criterion.label}</h3>
                  <p className="text-xs text-slate-500">{criterion.desc}</p>
                </div>
                <span className={`text-3xl font-black ${getScoreColor(scores[criterion.key])}`}>
                  {scores[criterion.key]}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                value={scores[criterion.key]}
                onChange={(e) => setScores({...scores, [criterion.key]: parseInt(e.target.value)})}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-purple-600 bg-slate-200"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 mb-3">
                <span>1 Zayıf</span>
                <span>3 Orta</span>
                <span>5 Mükemmel</span>
              </div>

              <textarea
                value={notes[criterion.key] || ''}
                onChange={(e) => setNotes({...notes, [criterion.key]: e.target.value})}
                placeholder="Not ekleyin (opsiyonel)..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-purple-400 transition-all"
                rows={2}
              />
            </div>
          ))}

          {/* Genel Yorum */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">💬 Genel Değerlendirme</h3>
            <textarea
              value={overallComment}
              onChange={(e) => setOverallComment(e.target.value)}
              placeholder="Öğrencinin genel durumu hakkında yorum yazın..."
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 transition-all"
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg"
          >
            {loading ? 'Kaydediliyor...' : '💾 Değerlendirmeyi Kaydet'}
          </button>

          {message && (
            <div className={`text-center font-bold p-4 rounded-xl ${
              message.includes('✅')
                ? 'bg-green-50 text-green-700 border-2 border-green-200'
                : 'bg-red-50 text-red-700 border-2 border-red-200'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
