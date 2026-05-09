'use client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function WeeklyReport({ studentData }: { studentData: any }) {
  const downloadPDF = async () => {
    const element = document.getElementById('report-area');
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${studentData.name}_Haftalik_Karne.pdf`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="report-area" className="w-[210mm] min-h-[297mm] bg-white p-12 text-slate-900 shadow-xl border border-slate-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b-4 border-blue-600 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-blue-900">HAFTALIK GELİŞİM KARNESİ</h1>
            <p className="text-slate-500 font-bold">Dijital Öğrenci Takip Sistemi Eğitim & Yurt Yönetim Sistemi</p>
          </div>
          <img src="/logo.png" className="h-16 w-auto object-contain" onError={(e) => (e.currentTarget.style.display='none')} />
        </div>

        {/* Öğrenci Bilgileri */}
        <div className="grid grid-cols-2 gap-8 mb-10 bg-slate-50 p-6 rounded-3xl">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Öğrenci Bilgileri</p>
            <h2 className="text-2xl font-black text-slate-800">{studentData.name}</h2>
            <p className="text-slate-500 font-bold">{studentData.class} • No: {studentData.number}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase">Rapor Dönemi</p>
            <p className="text-lg font-bold text-slate-800">10 - 16 Şubat 2026</p>
          </div>
        </div>

        {/* Akademik Başarı */}
        <div className="mb-10">
          <h3 className="text-xl font-black mb-4 border-l-4 border-blue-600 pl-3">📚 Akademik Performans</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-black uppercase tracking-widest">
                <th className="p-4">Ders</th>
                <th className="p-4">Toplam Soru</th>
                <th className="p-4">Doğru</th>
                <th className="p-4">Başarı Oranı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentData.entries.map((e: any, i: number) => (
                <tr key={i} className="text-sm font-medium">
                  <td className="p-4 font-bold">{e.subject}</td>
                  <td className="p-4 text-slate-600">{e.solved}</td>
                  <td className="p-4 text-green-600">{e.correct}</td>
                  <td className="p-4 font-black">%{((e.correct / e.solved) * 100).toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mentor Notu */}
        <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-100 relative">
          <div className="absolute -top-4 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase">Mentor Değerlendirmesi</div>
          <p className="text-blue-900 italic leading-relaxed text-lg">"{studentData.last_comment}"</p>
        </div>

        {/* İmza Alanı */}
        <div className="mt-20 flex justify-end gap-20">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-12">Yurt Müdürü</p>
            <div className="h-px w-32 bg-slate-300 mx-auto mb-2"></div>
            <p className="text-sm font-bold">İbrahim Dağlar</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-12">Bölge Yöneticisi</p>
            <div className="h-px w-32 bg-slate-300 mx-auto mb-2"></div>
            <p className="text-sm font-bold">Kemal Dugan</p>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-black transition-all">
        📥 PDF OLARAK İNDİR
      </button>
    </div>
  );
}
