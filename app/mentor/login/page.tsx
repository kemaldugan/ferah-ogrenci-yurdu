'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'mentor' && password === 'mentor123') {
      localStorage.setItem('mentor_logged_in', 'true');
      router.push('/mentor');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      
      {/* Logo at top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <img src="/logo.jpeg" alt="Ferah Öğrenci Yurdu" className="h-20 w-20 rounded-full shadow-2xl" />
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mt-16">
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">👨‍🏫</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800">Mentor Girişi</h1>
          <p className="text-slate-500 mt-2">Ferah Öğrenci Yurdu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 text-slate-800 font-medium"
              placeholder="Kullanıcı adınızı girin"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 text-slate-800 font-medium"
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-700 font-bold text-sm">❌ {error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg text-lg"
          >
            🔐 Giriş Yap
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-800 text-center">
            <strong>Demo Giriş:</strong><br/>
            Kullanıcı: <code className="bg-blue-200 px-2 py-1 rounded font-mono">mentor</code><br/>
            Şifre: <code className="bg-blue-200 px-2 py-1 rounded font-mono">mentor123</code>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
