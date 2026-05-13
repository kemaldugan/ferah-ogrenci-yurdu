'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OgrenciLoginPage() {
  const [studentNo, setStudentNo] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (studentNo && parseInt(studentNo) > 0 && parseInt(studentNo) <= 50) {
      localStorage.setItem('ogrenciNo', studentNo);
      router.push('/ogrenci');
    } else {
      setError('Geçerli bir öğrenci numarası girin (1-50)!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.jpeg" alt="Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Öğrenci Girişi</h1>
          <p className="text-slate-600">Günlük Soru Takibi</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Öğrenci Numarası</label>
            <input type="number" value={studentNo} onChange={(e) => setStudentNo(e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none text-center text-2xl font-bold" placeholder="1-50" required min="1" max="50" />
          </div>
          {error && <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">{error}</div>}
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">Giriş Yap</button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-slate-600 hover:text-green-600">← Ana Sayfaya Dön</a>
        </div>
      </div>
    </div>
  );
}
