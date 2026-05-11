export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpeg" alt="Ferah Öğrenci Yurdu" className="h-24 w-24 rounded-full object-cover" />
            <div>
              <h1 className="text-2xl font-black text-slate-900">Ferah Öğrenci Yurdu</h1>
              <p className="text-sm text-slate-600 italic">Dikili / İzmir • Zirvede Yarışanlar</p>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Zirvede Yarışanlar</h2>
        <p className="text-lg md:text-xl text-slate-600 mb-8">Geleceğin Eğitim Modeli • 21. Yüzyıl Öğrencileri İçin</p>
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl p-6 md:p-8 mb-12 border-4 border-red-800">
          <div className="text-4xl md:text-5xl mb-4">🇹🇷</div>
          <p className="text-base md:text-lg font-semibold leading-relaxed italic max-w-4xl mx-auto">"Bir milletin ıslahı kötülerin imhası ile değil, yeni neslin eğitim ve terbiyesi ile mümkündür"</p>
          <p className="text-sm md:text-base font-bold mt-4 opacity-90">— S.H.T.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/veli" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">👨‍👩‍👦</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Veli Paneli</h3>
            <p className="text-slate-600 text-sm">Çocuğunuzu anlık takip edin</p>
          </a>
          <a href="/mentor/login" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Mentor Girişi</h3>
            <p className="text-slate-600 text-sm">Yurt değerlendirme sistemi</p>
          </a>
          <a href="/ogrenci/login" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Öğrenci Girişi</h3>
            <p className="text-slate-600 text-sm">Günlük soru takibi</p>
          </a>
          <a href="/admin/login" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">🏫</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Admin Paneli</h3>
            <p className="text-slate-600 text-sm">Genel durum raporu</p>
          </a>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-t-8 border-green-600">
          <div className="text-center">
            <div className="text-5xl mb-6">💬</div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Tüm Soru ve Sorunlarınız İçin</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a href="tel:+905552553456" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-xl transition-all shadow-lg hover:shadow-xl">
                <span className="text-2xl">📞</span>
                0555 255 34 56
              </a>
              <a href="https://wa.me/905552553456" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-xl transition-all shadow-lg hover:shadow-xl">
                <span className="text-2xl">💬</span>
                WhatsApp
              </a>
            </div>
            <div className="border-t-2 border-slate-200 pt-6 mt-6">
              <p className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Kemal Dugan</p>
              <p className="text-base md:text-lg text-slate-600 font-semibold">Ferah Eğitim Direktörü</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">© 2026 Ferah Öğrenci Yurdu - Dikili / İzmir</p>
          <p className="text-xs opacity-50 mt-2">Zirvede Yarışanlar</p>
        </div>
      </footer>
    </div>
  );
}
