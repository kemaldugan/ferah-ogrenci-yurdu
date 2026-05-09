'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VeliLoginPage() {
  const [studentNo, setStudentNo] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentNo) {
      router.push(`/veli/view?no=${studentNo}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      
      {/* Logo Header */}
      <div className="max-w-md mx-auto mb-8 text-center pt-8">
        <img src="/logo.jpeg" alt="Ferah Öğrenci Yurdu" className="h-24 w-24 mx-auto rounded-full shadow-lg mb-4" />
        <h1 className="text-2xl font-black text-slate-900">Ferah Öğrenci Yurdu</h1>
        <p className="text-sm text-slate-600">Dikili / İzmir</p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">👨‍👩‍👦</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800">Veli Paneli</h2>
          <p className="text-slate-500 mt-2">Öğrenci Takip Sistemi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Öğrenci Numarası
            </label>
            <input
              type="number"
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-800 font-medium"
              placeholder="Örn: 28"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            📊 Bilgilerimi Görüntüle
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-800 text-center">
            <strong>Not:</strong> Öğrenci numaranızı bilmiyorsanız yurt yönetimine başvurun.
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
