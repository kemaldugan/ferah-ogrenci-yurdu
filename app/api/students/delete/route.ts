import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID eksik!' }, { status: 400 });
    }

    // İlişkili tüm tabloları (Foreign Key hatası almamak için) sırayla temizliyoruz
    await prisma.$transaction([
      prisma.dailyEntry.deleteMany({ where: { student_id: id } }),
      prisma.dormitoryEvaluation.deleteMany({ where: { student_id: id } }),
      prisma.student.delete({ where: { id: id } })
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Silme API Hatası:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
