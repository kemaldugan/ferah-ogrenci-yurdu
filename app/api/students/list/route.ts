import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const students = await prisma.student.findMany({
      include: {
        user: true,
        daily_entries: { 
          where: { entry_date: { gte: today } },
          include: { subject: true } // Hangi ders olduğunu anlamak için
        },
        dormitory_evaluations: { 
          orderBy: { evaluation_date: 'desc' }, // En son girilen yurt verisini getir
          take: 1
        }
      },
      orderBy: { student_number: 'asc' }
    });

    const formattedData = students.map(s => {
      // Akademik Hesaplamalar
      const solved = s.daily_entries.reduce((acc, curr) => acc + curr.questions_solved, 0);
      const correct = s.daily_entries.reduce((acc, curr) => acc + curr.questions_correct, 0);
      const accuracy = solved > 0 ? Math.round((correct / solved) * 100) : 0;

      // Ders bazlı döküm (Veli paneli gibi görünmesi için)
      const subjectBreakdown = s.daily_entries.map(e => ({
        name: e.subject.name,
        solved: e.questions_solved,
        correct: e.questions_correct,
        accuracy: Math.round((e.questions_correct / e.questions_solved) * 100)
      }));

      // Yurt verisi kontrolü (Eğer bugün veri yoksa ama veritabanında varsa 'TAMAM' sayabiliriz)
      const hasDormEntry = s.dormitory_evaluations.length > 0;

      return {
        id: s.id,
        student_number: s.student_number,
        full_name: s.user?.full_name || s.user?.name || "İsimsiz",
        class_name: s.class_name || '5. SINIF',
        academic_status: s.daily_entries.length > 0,
        total_questions: solved,
        accuracy_rate: accuracy,
        subjects: subjectBreakdown,
        dorm_status: hasDormEntry, // Yurt verisi akışı düzeltildi
        last_dorm_date: s.dormitory_evaluations[0]?.evaluation_date
      };
    });

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
