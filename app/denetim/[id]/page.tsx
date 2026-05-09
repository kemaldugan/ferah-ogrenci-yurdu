'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function OgrenciDetayPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: '', student_number: '', class_name: '' });

  const loadStudent = () => {
    fetch('/api/students/list').then(res => res.json()).then(res => {
      if (res.success) {
        const found = res.data.find((s: any) => s.id === id);
        if (found) {
          setStudent(found);
          setEditForm({ full_name: found.full_name, student_number: found.student_number, class_name: found.class_name });
        }
      }
    });
  };

  useEffect(() => { loadStudent(); }, [id]);

  const handleUpdate = async () => {
    const res = await fetch('/api/students/update', { method: 'PATCH', body: JSON.stringify({ id, ...editForm }) });
    if ((await res.json()).success) { setIsEditing(false); loadStudent(); }
  };

  const handleDelete = async () => {
    if (confirm(`${student.full_name} isimli öğrenciyi ve TÜM VERİLERİNİ silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) {
      const res = await fetch('/api/students/delete', { method: 'DELETE', body: JSON.stringify({ id }) });
      if ((await res.json()).success) {
        alert('Öğrenci başarıyla silindi.');
        router.push('/denetim');
      }
    }
  };

  if (!student) return <div className="p-20 text-center font-black animate-pulse text-slate-400">📡 VERİ SENKRONİZE EDİLİYOR...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 print:hidden">
          <button onClick={() => router.back()} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-all">← Listeye Dön</button>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(!isEditing)} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
              {isEditing ? '✖ İPTAL' : '✏️ DÜZENLE'}
            </button>
            {isEditing && (
              <button onClick={handleDelete} className="bg-rose-50 text-rose-600 border border-rose-100 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                🗑️ ÖĞRENCİYİ TAMAMEN SİL
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50 overflow-hidden">
          {isEditing ? (
            <div className="space-y-6">
              <div className="mb-8"><h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Bilgi Güncelleme</h2><p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Öğrenci dosyası düzenleniyor</p></div>
              <input value={editForm.full_name} onChange={e => setEditForm({...editForm, full_name: e.target.value})} className="w-full bg-slate-50 p-6 rounded-2xl font-black border-2 border-slate-50 focus:border-indigo-500 outline-none transition-all" />
              <div className="grid grid-cols-2 gap-4">
                <input value={editForm.student_number} onChange={e => setEditForm({...editForm, student_number: e.target.value})} className="w-full bg-slate-50 p-6 rounded-2xl font-black border-2 border-slate-50 focus:border-indigo-500 outline-none transition-all" />
                <select value={editForm.class_name} onChange={e => setEditForm({...editForm, class_name: e.target.value})} className="w-full bg-slate-50 p-6 rounded-2xl font-black border-2 border-slate-50 focus:border-indigo-500 outline-none transition-all">
                  <option>5. SINIF</option><option>6. SINIF</option><option>7. SINIF</option><option>8. SINIF</option>
                </select>
              </div>
              <button onClick={handleUpdate} className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">DEĞİŞİKLİKLERİ KAYDET</button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start mb-16 border-b border-slate-100 pb-12">
                <div><h1 className="text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{student.full_name}</h1><div className="flex items-center gap-4 mt-6"><span className="bg-indigo-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{student.class_name}</span><span className="text-slate-300 font-bold text-sm tracking-[0.2em] uppercase italic">NO: {student.student_number}</span></div></div>
                <div className="text-right"><button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl print:hidden">📄 PDF RAPORU</button></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">Bugünkü Toplam</span><span className="text-6xl font-black text-slate-900">{student.total_questions} <small className="text-xl font-bold opacity-30 tracking-normal">Soru</small></span></div>
                <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">Başarı Oranı</span><span className="text-6xl font-black text-emerald-500">%{student.accuracy_rate}</span></div>
              </div>
              <div className="space-y-4">
                {student.subjects?.map((sub: any) => (
                  <div key={sub.name} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl"><span className="font-black text-slate-700 uppercase">{sub.name}</span><span className="font-black text-indigo-600">%{sub.accuracy} Başarı</span></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
