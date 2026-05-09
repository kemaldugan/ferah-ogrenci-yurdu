import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    // Önce veritabanından çekmeye çalış
    const subjects = await prisma.subject.findMany({
      orderBy: { name: 'asc' }
    });
    
    // Eğer veritabanı boşsa, sistemi kitlememek için varsayılan dersleri döndür
    if (subjects.length === 0) {
      return NextResponse.json([
        { id: '1', name: 'Matematik' },
        { id: '2', name: 'Türkçe' },
        { id: '3', name: 'Fen Bilimleri' },
        { id: '4', name: 'Sosyal Bilgiler' },
        { id: '5', name: 'İngilizce' }
      ]);
    }

    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Ders API Hatası:', error);
    // Hata olsa bile öğrenci panelini bozma, manuel listeyi gönder
    return NextResponse.json([
      { id: '1', name: 'Matematik' },
      { id: '2', name: 'Türkçe' },
      { id: '3', name: 'Fen Bilimleri' }
    ]);
  }
}
