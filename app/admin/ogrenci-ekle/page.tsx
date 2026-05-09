'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AddStudent() {
  const [form, setForm] = useState({ name: '', number: '', class: '' });
  const [status, setStatus] = useState('');

  const save = async () => {
    if(!form.name || !form.number) return setStatus('⚠️ Ad ve Numara zorunludur!');
    
    setStatus('⌛ Kaydediliyor...');
    const res = await fetch('/api/admin/student-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        full_name: form.name, 
        student_number: form.number, 
        class_name: form.class 
      })
    });
    
    const result = await res.json();
    if (result.success) {
      setStatus('✅ ' + form.name + ' başarıyla eklendi!');
      setForm({ name: '', number: '', class: '' });
    } else {
      setStatus('❌ Hata: ' + result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-800">👤 Öğrenci Kaydı</h1>
          <Link href="/" className="text-xs font-bold text-blue-600">← Geri Dön</Link>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Öğrenci Ad Soyad</label>
            <input placeholder="Örn: Yusuf Kerem Dugan" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-400" 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Okul Numarası</label>
            <input placeholder="Örn: 562" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-400" 
              value={form.number} onChange={e => setForm({...form, number: e.target.value})} />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Sınıf</label>
            <input placeholder="Örn: 6. SINIF" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-400" 
              value={form.class} onChange={e => setForm({...form, class: e.target.value})} />
          </div>

          <button onClick={save} className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-all">
            SİSTEME KAYDET
          </button>
          
          {status && (
            <div className={`p-4 rounded-xl text-center font-bold text-sm ${status.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
