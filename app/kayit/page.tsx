'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KayitPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const router = useRouter();

  const handleKayit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/students/create', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus({ type: 'success', msg: 'Öğrenci Başarıyla Tanımlandı! Radara aktarılıyor...' });
        setTimeout(() => router.push('/denetim'), 2000);
      } else {
        setStatus({ type: 'error', msg: data.error });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Bağlantı Hatası!' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-100">
        <button onClick={() => router.push('/')} className="mb-8 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-all">← Kumanda Merkezi</button>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Öğrenci Kaydı</h1>
          <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mt-2">Sisteme Yeni Birim Tanımla</p>
        </div>

        <form onSubmit={handleKayit} className="space-y-6">
          <input name="full_name" required className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all" placeholder="Ad Soyad" />
          <div className="grid grid-cols-2 gap-4">
            <input name="student_number" required className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all" placeholder="Öğrenci No (Örn: 150)" />
            <select name="class_name" className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all">
              <option>5. SINIF</option><option>6. SINIF</option><option>7. SINIF</option><option>8. SINIF</option>
            </select>
          </div>
          <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all disabled:opacity-50">
            {loading ? 'İŞLENİYOR...' : 'SİSTEME KAYDET'}
          </button>
        </form>
        {status.msg && <div className={`mt-6 p-4 rounded-2xl text-center font-black text-[10px] uppercase ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{status.msg}</div>}
      </div>
    </div>
  );
}
