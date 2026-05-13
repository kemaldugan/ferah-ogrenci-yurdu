'use client';
import { useEffect, useState } from 'react';

export default function MentorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpeg" alt="Logo" className="h-16 w-16 rounded-full" />
            <div>
              <h1 className="text-2xl font-black">Mentor Paneli</h1>
              <p className="text-sm text-slate-600">Yurt Değerlendirme</p>
            </div>
          </div>
          <a href="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">Ana Sayfa</a>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Hoş Geldiniz</h2>
          <p className="text-slate-600">Mentor paneline hoş geldiniz.</p>
        </div>
      </div>
    </div>
  );
}
