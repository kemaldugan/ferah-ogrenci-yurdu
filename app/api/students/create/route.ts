import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, student_number, class_name } = body;

    // 1. Önce User tablosunda kaydı oluştur
    const newUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        full_name: full_name,
        role: 'STUDENT',
      }
    });

    // 2. Sonra bu kullanıcıya bağlı Student kaydını oluştur
    const newStudent = await prisma.student.create({
      data: {
        id: randomUUID(),
        user_id: newUser.id,
        student_number: student_number,
        class_name: class_name,
      }
    });

    return NextResponse.json({ success: true, data: newStudent });
  } catch (error: any) {
    console.error('Kayıt Hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.code === 'P2002' ? 'Bu öğrenci numarası zaten kullanımda!' : error.message 
    }, { status: 500 });
  }
}
