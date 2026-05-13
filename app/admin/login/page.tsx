'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin');
    } else {
      setError('PIN kodu hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.jpeg" alt="Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Girişi</h1>
          <p className="text-slate-600">Yönetim Paneli</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">PIN Kodu</label>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none text-center text-2xl font-bold tracking-widest" placeholder="••••" maxLength={4} required />
          </div>
          {error && <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">{error}</div>}
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors">Giriş Yap</button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-slate-600 hover:text-purple-600">← Ana Sayfaya Dön</a>
        </div>
      </div>
    </div>
  );
}
