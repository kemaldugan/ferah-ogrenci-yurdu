import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { user: true },
      orderBy: { user: { full_name: 'asc' } }
    });
    
    const data = students.map(s => ({
      id: s.id,
      name: s.user?.full_name,
      number: s.student_number,
      class: s.class_name
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
