import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const students = await prisma.student.findMany({
      include: {
        user: true,
        daily_entries: { where: { entry_date: today } },
        dormitory_evaluations: { where: { evaluation_date: today } }
      }
    });

    const formattedData = students.map(s => ({
      id: s.id,
      name: s.user?.full_name || 'İsimsiz Öğrenci',
      number: s.student_number,
      class_name: s.class_name,
      token: s.access_token,
      has_daily: s.daily_entries.length > 0,
      has_eval: s.dormitory_evaluations.length > 0
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
