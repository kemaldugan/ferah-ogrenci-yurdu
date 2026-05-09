import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { full_name, student_number, class_name } = await request.json();

    // 1. Önce User tablosuna kayıt
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        full_name,
        role: 'STUDENT',
      }
    });

    // 2. Sonra Student tablosuna kayıt
    const student = await prisma.student.create({
      data: {
        id: uuidv4(),
        user_id: user.id,
        student_number,
        class_name,
      }
    });

    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
