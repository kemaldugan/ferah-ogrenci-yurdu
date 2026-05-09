import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📝 Gelen veri:', body);

    const student = await prisma.student.findUnique({
      where: { student_number: body.student_number }
    });

    if (!student) {
      return NextResponse.json({ 
        success: false, 
        error: 'Öğrenci bulunamadı: ' + body.student_number
      }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.dormitoryEvaluation.findFirst({
      where: {
        student_id: student.id,
        evaluation_date: today
      }
    });

    let evaluation;

    if (existing) {
      evaluation = await prisma.dormitoryEvaluation.update({
        where: { id: existing.id },
        data: {
          study_program_score: body.study_program_score,
          prayer_program_score: body.prayer_program_score,
          cleanliness_score: body.cleanliness_score,
          peer_relations_score: body.peer_relations_score,
          teacher_relations_score: body.teacher_relations_score,
          general_discipline_score: body.general_discipline_score,
          study_program_notes: body.study_program_notes || null,
          prayer_program_notes: body.prayer_program_notes || null,
          cleanliness_notes: body.cleanliness_notes || null,
          peer_relations_notes: body.peer_relations_notes || null,
          teacher_relations_notes: body.teacher_relations_notes || null,
          general_discipline_notes: body.general_discipline_notes || null,
          overall_comment: body.overall_comment || null
        }
      });
    } else {
      evaluation = await prisma.dormitoryEvaluation.create({
        data: {
          student_id: student.id,
          evaluation_date: today,
          study_program_score: body.study_program_score,
          prayer_program_score: body.prayer_program_score,
          cleanliness_score: body.cleanliness_score,
          peer_relations_score: body.peer_relations_score,
          teacher_relations_score: body.teacher_relations_score,
          general_discipline_score: body.general_discipline_score,
          study_program_notes: body.study_program_notes || null,
          prayer_program_notes: body.prayer_program_notes || null,
          cleanliness_notes: body.cleanliness_notes || null,
          peer_relations_notes: body.peer_relations_notes || null,
          teacher_relations_notes: body.teacher_relations_notes || null,
          general_discipline_notes: body.general_discipline_notes || null,
          overall_comment: body.overall_comment || null
        }
      });
    }

    console.log('✅ Kaydedildi:', evaluation.id);
    return NextResponse.json({ success: true, data: evaluation });

  } catch (error: any) {
    console.error('❌ HATA:', error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
