'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center"><div>Yükleniyor...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpeg" alt="Logo" className="h-16 w-16 rounded-full" />
            <div>
              <h1 className="text-2xl font-black">Admin Paneli</h1>
              <p className="text-sm text-slate-600">Yönetim Dashboard</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">Çıkış Yap</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/admin/ogrenci-ekle" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">➕</div>
            <h3 className="text-xl font-bold">Öğrenci Ekle</h3>
            <p className="text-slate-600 mt-2">Yeni öğrenci kaydı</p>
          </a>
          <a href="/denetim" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold">Yoklama & Denetim</h3>
            <p className="text-slate-600 mt-2">Günlük yoklama</p>
          </a>
        </div>
      </div>
    </div>
  );
}
