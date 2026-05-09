'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function VeliViewContent() {
  const searchParams = useSearchParams();
  const studentNo = searchParams.get('no');
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'academic' | 'dormitory'>('academic');

  useEffect(() => {
    if (!studentNo) return;
    
    fetch(`/api/veli/student?no=${studentNo}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [studentNo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Öğrenci Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Öğrenci numarası: {studentNo}</p>
          <a href="/veli" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
            Geri Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      
      {/* Header - Sticky */}
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-black text-slate-900">{data.student.full_name}</h1>
              <p className="text-sm text-slate-500">{data.student.class_name} • No: {data.student.student_number}</p>
            </div>
            
            {data.overall_stats && (
              <div className="text-center bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-3 shadow-lg">
                <p className="text-3xl font-black">{data.overall_stats.accuracy_percent}%</p>
                <p className="text-xs opacity-90">Başarı</p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                activeTab === 'academic'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              📚 Akademik
            </button>
            <button
              onClick={() => setActiveTab('dormitory')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                activeTab === 'dormitory'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              🏠 Yurt
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'academic' ? (
          <AcademicTab data={data} />
        ) : (
          <DormitoryTab data={data.dormitory} />
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <a 
          href="/veli"
          className="block w-full text-center bg-slate-100 text-slate-700 font-bold py-3 rounded-xl"
        >
          ← Ana Sayfa
        </a>
      </div>
    </div>
  );
}

function AcademicTab({ data }: any) {
  if (!data.subjects || data.subjects.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-6xl mb-4">⏳</p>
        <p className="text-gray-600">Henüz akademik veri girilmemiş</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.subjects.map((subject: any, i: number) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-lg">{subject.subject_name}</h3>
              <p className="text-xs text-slate-500">{subject.total_questions} / {subject.target_questions} soru</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-slate-800">%{subject.accuracy_percent}</p>
              <p className="text-xs text-slate-500">doğruluk</p>
            </div>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className={`h-full rounded-full ${
                subject.completion_percent >= 100 ? 'bg-green-500' :
                subject.completion_percent >= 80 ? 'bg-blue-500' :
                'bg-yellow-500'
              }`}
              style={{ width: `${Math.min(subject.completion_percent, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DormitoryTab({ data }: any) {
  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-6xl mb-4">🏠</p>
        <p className="text-gray-600">Henüz yurt değerlendirmesi yapılmamış</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600 bg-green-50';
    if (score >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-3">
      
      {/* Ortalama */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl shadow-xl p-6 text-center">
        <p className="text-6xl font-black mb-2">{data.avg_score}</p>
        <p className="text-sm opacity-90">Genel Ortalama</p>
        <p className="text-xs opacity-75 mt-2">
          {new Date(data.evaluation_date).toLocaleDateString('tr-TR')}
        </p>
      </div>

      {/* Kriterler */}
      {data.criteria.map((c: any, i: number) => (
        <div key={i} className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-800 text-sm flex-1">{c.label}</h4>
            <span className={`px-3 py-1 rounded-full text-lg font-black ${getScoreColor(c.score)}`}>
              {c.score}
            </span>
          </div>
          {c.notes && (
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mt-2">
              {c.notes}
            </p>
          )}
        </div>
      ))}

      {/* Genel Yorum */}
      {data.overall_comment && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <h4 className="font-bold text-blue-900 mb-2">💬 Genel Değerlendirme</h4>
          <p className="text-slate-700 text-sm">{data.overall_comment}</p>
        </div>
      )}
    </div>
  );
}

export default function VeliViewPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <VeliViewContent />
    </Suspense>
  );
}
