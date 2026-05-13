'use client';
import { useEffect, useState } from 'react';

interface Student {
  id: string;
  student_number: string;
  class_name: string;
}

export default function MentorPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  
  // Yurt değerlendirme kriterleri (1-5 arası)
  const [criteria, setCriteria] = useState({
    temizlik: 3,
    sosyalIliskiler: 3,
    programaUyum: 3,
    odevTakip: 3,
    uyku: 3,
    beslenme: 3,
    genelDavranis: 3
  });
  
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('mentorAuth');
    if (!auth) {
      window.location.href = '/mentor/login';
    } else {
      setIsAuth(true);
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students/list');
      const data = await res.json();
      if (data.students) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Öğrenci listesi alınamadı:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ortalama puan hesapla
    const values = Object.values(criteria);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    
    setMessage(`✅ Değerlendirme kaydedildi! Ortalama: ${average.toFixed(1)}/5`);
    
    // Formu sıfırla
    setSelectedStudent('');
    setCriteria({
      temizlik: 3,
      sosyalIliskiler: 3,
      programaUyum: 3,
      odevTakip: 3,
      uyku: 3,
      beslenme: 3,
      genelDavranis: 3
    });
    setNotes('');
    
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('mentorAuth');
    window.location.href = '/';
  };

  if (!isAuth) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  const criteriaLabels = [
    { key: 'temizlik', label: '🧹 Temizlik & Düzen' },
    { key: 'sosyalIliskiler', label: '👥 Sosyal İlişkiler' },
    { key: 'programaUyum', label: '📅 Programa Uyum' },
    { key: 'odevTakip', label: '📚 Ödev & Ders Takibi' },
    { key: 'uyku', label: '😴 Uyku Düzeni' },
    { key: 'beslenme', label: '🍽️ Beslenme Düzeni' },
    { key: 'genelDavranis', label: '⭐ Genel Davranış' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpeg" alt="Logo" className="h-16 w-16 rounded-full" />
            <div>
              <h1 className="text-2xl font-black">Mentor Paneli</h1>
              <p className="text-sm text-slate-600">Yurt Değerlendirme Sistemi</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold">🏠 Ana Sayfa</a>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">Çıkış</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">📋 Günlük Yurt Değerlendirmesi</h2>
          
          {message && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border-2 border-green-200">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Öğrenci Seç</label>
              <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none" required>
                <option value="">Öğrenci seçin...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>{student.student_number} - {student.class_name || 'Sınıf bilgisi yok'}</option>
                ))}
              </select>
            </div>

            <div className="border-t-2 border-slate-200 pt-6">
              <h3 className="text-lg font-bold mb-4">Değerlendirme Kriterleri (1-5)</h3>
              <div className="space-y-4">
                {criteriaLabels.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 flex-1">{label}</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCriteria({ ...criteria, [key]: val })}
                          className={`w-10 h-10 rounded-full font-bold transition-all ${
                            criteria[key as keyof typeof criteria] === val
                              ? 'bg-purple-500 text-white scale-110'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Notlar (Opsiyonel)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none" placeholder="Ek gözlemler veya notlar..." rows={3} />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-lg text-lg">
              ✅ Değerlendirmeyi Kaydet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
