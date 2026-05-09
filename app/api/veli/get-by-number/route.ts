import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noParam = searchParams.get('no');

    if (!noParam) {
      return NextResponse.json({ success: false, error: 'Numara girilmedi' }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Prisma metin (String) beklediği için noParam'ı doğrudan kullanıyoruz
    const student = await prisma.student.findFirst({
      where: {
        student_number: noParam // String tipinde gönderiyoruz
      },
      include: {
        user: true,
        daily_entries: { 
          where: { entry_date: { gte: today } }
        },
        dormitory_evaluations: { 
          where: { evaluation_date: { gte: today } }
        }
      }
    });

    if (!student) {
      return NextResponse.json({ success: true, data: null, message: 'Öğrenci bulunamadı' });
    }

    const totalSolved = student.daily_entries.reduce((acc, curr) => acc + curr.questions_solved, 0);
    const totalCorrect = student.daily_entries.reduce((acc, curr) => acc + curr.questions_correct, 0);
    const successRate = totalSolved > 0 ? ((totalCorrect / totalSolved) * 100).toFixed(0) : "0";

    return NextResponse.json({
      success: true,
      data: {
        name: student.user?.full_name || 'İsimsiz',
        number: student.student_number,
        class: student.class_name || 'Bilgi Yok',
        success_rate: successRate,
        has_daily: student.daily_entries.length > 0,
        has_eval: student.dormitory_evaluations.length > 0,
        last_comment: student.dormitory_evaluations[0]?.overall_comment || "Bugün için henüz mentor notu girilmedi."
      }
    });
  } catch (error: any) {
    console.error("Kritik API Hatası:", error);
    return NextResponse.json({ success: false, error: 'Sorgu hatası oluştu' }, { status: 500 });
  }
}
