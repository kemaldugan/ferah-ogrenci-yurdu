'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OgrenciPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentNo, setStudentNo] = useState('');

  useEffect(() => {
    const no = localStorage.getItem('ogrenciNo');
    if (!no) {
      router.push('/ogrenci/login');
      return;
    }
    setStudentNo(no);
    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ogrenciNo');
    router.push('/ogrenci/login');
  };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpeg" alt="Logo" className="h-16 w-16 rounded-full" />
            <div>
              <h1 className="text-2xl font-black">Öğrenci Paneli</h1>
              <p className="text-sm text-slate-600">Öğrenci No: {studentNo}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">Çıkış</button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Günlük Soru Takibi</h2>
          <p className="text-slate-600">Bugün çözdüğün soruları girebilirsin.</p>
        </div>
      </div>
    </div>
  );
}
