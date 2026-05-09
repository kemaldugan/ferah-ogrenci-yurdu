'use client';
import { useState, useEffect } from 'react';

export default function OgrenciGirisPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [form, setForm] = useState({ student_number: '', subject_id: '', solved: '', correct: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/subjects').then(res => res.json()).then(data => setSubjects(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('⏳ Kaydediliyor...');
    try {
      const response = await fetch('/api/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_number: form.student_number,
          subject_id: form.subject_id,
          questions_solved: parseInt(form.solved || '0'),
          questions_correct: parseInt(form.correct || '0'),
          questions_wrong: Math.max(0, parseInt(form.solved || '0') - parseInt(form.correct || '0'))
        })
      });
      const result = await response.json();
      if (result.success) {
        setMessage('✅ Başarıyla kaydedildi!');
        setForm({ ...form, solved: '', correct: '' });
      } else {
        setMessage('❌ Hata: ' + result.error);
      }
    } catch (err) { setMessage('❌ Sunucu Hatası!'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl">
        <h1 className="text-2xl font-black text-center text-slate-800 mb-8">Günlük Soru Girişi</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Öğrenci No" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-center" value={form.student_number} onChange={(e) => setForm({...form, student_number: e.target.value})} required />
          <select className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" value={form.subject_id} onChange={(e) => setForm({...form, subject_id: e.target.value})} required>
            <option value="">-- Ders Seçiniz --</option>
            {subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Soru" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-center" value={form.solved} onChange={(e) => setForm({...form, solved: e.target.value})} />
            <input type="number" placeholder="Doğru" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-center" value={form.correct} onChange={(e) => setForm({...form, correct: e.target.value})} />
          </div>
          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest">💾 KAYDI TAMAMLA</button>
        </form>
        {message && <div className="mt-6 p-4 rounded-2xl text-center text-xs font-bold bg-slate-50">{message}</div>}
      </div>
    </div>
  );
}
