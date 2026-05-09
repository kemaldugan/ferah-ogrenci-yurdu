'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [pathname]);

  if (!mounted || pathname === '/login' || pathname === '/' || !user) return null;

  return (
    <nav className="bg-slate-950 text-white p-4 sticky top-0 z-50 shadow-2xl border-b border-white/5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex gap-3 md:gap-6 overflow-x-auto no-scrollbar">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">🏠</Link>
          <Link href="/denetim" className="hover:text-blue-400 px-1 py-1 text-xs font-bold whitespace-nowrap">🚩 Radar</Link>
          <Link href="/mentor" className="hover:text-purple-400 px-1 py-1 text-xs font-bold whitespace-nowrap">👨‍🏫 Mentor</Link>
          <Link href="/admin/ogrenci-ekle" className="hover:text-emerald-400 px-1 py-1 text-xs font-bold whitespace-nowrap">👤 Kayıt</Link>
          {/* Velilerin ne gördüğünü admin/mentor da görebilmeli */}
          <Link href="/veli" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all">👨‍👩‍👦 Veli Görünümü</Link>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => { localStorage.removeItem('user'); router.push('/login'); }} className="text-red-500 text-[10px] font-black uppercase">ÇIKIŞ</button>
        </div>
      </div>
    </nav>
  );
}
