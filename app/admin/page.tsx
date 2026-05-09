'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-900">🏫 Admin Dashboard</h1>
              <p className="text-slate-500 mt-2">Yurt Genel Durum Raporu</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Son Güncelleme</p>
              <p className="text-lg font-bold text-slate-900">{new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard title="Toplam Öğrenci" value={stats.total_students} icon="👥" color="blue" />
              <StatCard title="Aktif Mentor" value={stats.total_mentors || 'N/A'} icon="👨‍🏫" color="green" />
              <StatCard title="Toplam Ders" value={stats.total_subjects} icon="📚" color="purple" />
              <StatCard title="Günlük Giriş" value={stats.daily_entries_today || 0} icon="📝" color="orange" />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">📊 Sınıf Dağılımı</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.class_distribution.map((cls: any) => (
                  <div key={cls.class_name} className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-black text-blue-600">{cls.count}</p>
                    <p className="text-sm text-slate-600 mt-1">{cls.class_name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">🏠 Yurt Değerlendirme Durumu</h2>
              {stats.dormitory_stats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                    <p className="text-5xl font-black text-green-600">{stats.dormitory_stats.evaluated_count}</p>
                    <p className="text-sm text-slate-600 mt-2">Değerlendirilen Öğrenci</p>
                  </div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
                    <p className="text-5xl font-black text-yellow-600">{stats.dormitory_stats.not_evaluated_count}</p>
                    <p className="text-sm text-slate-600 mt-2">Değerlendirilmemiş</p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-5xl font-black text-blue-600">{stats.dormitory_stats.avg_score}</p>
                    <p className="text-sm text-slate-600 mt-2">Ortalama Puan (5 üzerinden)</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">Henüz değerlendirme yapılmamış</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">📈 Genel Akademik Başarı</h2>
              {stats.academic_stats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-4xl font-black text-slate-800">{stats.academic_stats.total_questions}</p>
                    <p className="text-sm text-slate-600 mt-2">Toplam Çözülen Soru</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-4xl font-black text-green-600">{stats.academic_stats.total_correct}</p>
                    <p className="text-sm text-slate-600 mt-2">Doğru Cevap</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-4xl font-black text-blue-600">%{stats.academic_stats.accuracy}</p>
                    <p className="text-sm text-slate-600 mt-2">Başarı Oranı</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">Henüz akademik veri girilmemiş</p>
              )}
            </div>
          </>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <a href="/mentor" className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center block">
            <p className="text-4xl mb-2">👨‍🏫</p>
            <p className="text-sm font-bold">Mentor Paneli</p>
          </a>
          <a href="/ogrenci" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center block">
            <p className="text-4xl mb-2">📝</p>
            <p className="text-sm font-bold">Öğrenci Girişi</p>
          </a>
          <a href="/veli" className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center block">
            <p className="text-4xl mb-2">👨‍👩‍👦</p>
            <p className="text-sm font-bold">Veli Paneli</p>
          </a>
          <a href="/admin" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center block">
            <p className="text-4xl mb-2">📊</p>
            <p className="text-sm font-bold">Raporlar</p>
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-4xl font-black mt-2">{value}</p>
        </div>
        <span className="text-5xl opacity-80">{icon}</span>
      </div>
    </div>
  );
}
