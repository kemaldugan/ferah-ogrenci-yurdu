export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Logo */}
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

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
          Zirvede Yarışanlar
        </h2>
        <p className="text-xl text-slate-600 mb-12">
          Geleceğin Eğitim Modeli • 21. Yüzyıl Öğrencileri İçin
        </p>

        {/* Panel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          
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

          <a href="/ogrenci" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Öğrenci Girişi</h3>
            <p className="text-slate-600 text-sm">Günlük soru takibi</p>
          </a>

          <a href="/admin" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">🏫</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Admin Paneli</h3>
            <p className="text-slate-600 text-sm">Genel durum raporu</p>
          </a>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">© 2026 Ferah Öğrenci Yurdu - Dikili / İzmir</p>
          <p className="text-xs opacity-50 mt-2">Zirvede Yarışanlar</p>
        </div>
      </footer>
    </div>
  );
}
