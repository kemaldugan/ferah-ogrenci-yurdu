import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Öğrenciyi bul
    const student = await prisma.student.findUnique({
      where: { student_number: body.student_number }
    });

    if (!student) {
      return NextResponse.json({ success: false, error: 'Öğrenci bulunamadı' }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Kaydı Güncelle veya Kimlik Oluşturarak Yeni Kayıt Yap
    const entry = await prisma.dailyEntry.upsert({
      where: {
        daily_entry_id: {
          student_id: student.id,
          subject_id: body.subject_id,
          entry_date: today,
        },
      },
      update: {
        questions_solved: body.questions_solved,
        questions_correct: body.questions_correct,
        questions_wrong: body.questions_wrong,
      },
      create: {
        id: randomUUID(), // Kritik dokunuş: Yeni kayıt için kimlik üretiyoruz
        student_id: student.id,
        subject_id: body.subject_id,
        questions_solved: body.questions_solved,
        questions_correct: body.questions_correct,
        questions_wrong: body.questions_wrong,
        entry_date: today,
      },
    });

    return NextResponse.json({ success: true, data: entry });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
