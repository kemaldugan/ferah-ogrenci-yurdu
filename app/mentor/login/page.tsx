'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2024') {
      localStorage.setItem('mentorAuth', 'true');
      router.push('/mentor');
    } else {
      setError('PIN kodu hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">👨‍🏫</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Mentor Girişi</h1>
          <p className="text-slate-600">Ferah Öğrenci Yurdu</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">PIN Kodu</label>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none text-center text-2xl font-bold tracking-widest" placeholder="••••" maxLength={4} required />
          </div>
          {error && <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">{error}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg">Giriş Yap</button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-purple-600">← Ana Sayfaya Dön</a>
        </div>
      </div>
    </div>
  );
}
