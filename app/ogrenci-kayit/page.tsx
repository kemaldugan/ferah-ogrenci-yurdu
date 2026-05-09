'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OgrenciKayitPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const res = await fetch('/api/students/create', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    
    const result = await res.json();
    if (result.success) {
      setMessage({ type: 'success', text: 'Öğrenci başarıyla sisteme tanımlandı!' });
      setTimeout(() => router.push('/denetim'), 2000);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Yeni Kayıt</h1>
          <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mt-2">Öğrenci Tanımlama Paneli</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">Ad Soyad</label>
            <input name="full_name" required className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all" placeholder="Örn: Ali Yılmaz" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">Öğrenci No</label>
              <input name="student_number" required className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all" placeholder="28" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">Sınıf</label>
              <select name="class_name" className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all appearance-none">
                <option>5. SINIF</option>
                <option>6. SINIF</option>
                <option>7. SINIF</option>
                <option>8. SINIF</option>
              </select>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all mt-4 disabled:opacity-50">
            {loading ? 'SİSTEME İŞLENİYOR...' : 'KAYDI TAMAMLA'}
          </button>
        </form>

        {message.text && (
          <div className={`mt-8 p-4 rounded-2xl text-center font-black text-xs uppercase tracking-widest ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
