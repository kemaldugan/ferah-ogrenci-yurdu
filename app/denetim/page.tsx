'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DenetimRadarPage() {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const loadData = () => {
    fetch('/api/students/list').then(res => res.json()).then(res => { if (res.success) setData(res.data); });
  };

  useEffect(() => { loadData(); const i = setInterval(loadData, 30000); return () => clearInterval(i); }, []);

  const filteredData = data.filter(s => 
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.student_number.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-10 font-sans print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 print:hidden">
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Radar</h1>
            <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.5em] mt-2">İzmir Bölge Denetim Sistemi</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <input 
              type="text" placeholder="Öğrenci Adı veya No..." 
              className="bg-white border-2 border-slate-200 px-6 py-4 rounded-2xl font-bold text-sm outline-none focus:border-indigo-500 transition-all flex-grow md:w-80 shadow-sm"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all">
              📄 PDF RAPORU AL
            </button>
          </div>
        </div>

        {/* Radar Table */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-300/50 border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="p-8">Numara</th>
                <th className="p-8">Öğrenci Ad Soyad</th>
                <th className="p-8 text-center">Akademik Takip</th>
                <th className="p-8 text-center">Yurt Takip</th>
                <th className="p-8 text-right print:hidden">Detay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((s) => (
                <tr key={s.id} className="hover:bg-indigo-50/40 transition-all group">
                  <td className="p-8 text-slate-900 font-black text-2xl tracking-tighter">{s.student_number}</td>
                  <td className="p-8">
                    <span className="font-black text-slate-800 text-xl uppercase block">{s.full_name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.class_name}</span>
                  </td>
                  <td className="p-8 text-center">
                    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${s.academic_status ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {s.academic_status ? `✓ ${s.total_questions} SORU` : '✖ VERİ EKSİK'}
                    </div>
                  </td>
                  <td className="p-8 text-center">
                     <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${s.dorm_status ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {s.dorm_status ? '✓ GİRİŞ YAPILDI' : '✖ BEKLİYOR'}
                    </div>
                  </td>
                  <td className="p-8 text-right print:hidden">
                    <button onClick={() => router.push(`/denetim/${s.id}`)} className="bg-slate-100 text-slate-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">DETAYLAR →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
