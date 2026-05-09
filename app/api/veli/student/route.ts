import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentNo = searchParams.get('no');

    if (!studentNo) {
      return NextResponse.json({ 
        success: false, 
        error: 'Öğrenci numarası gerekli' 
      }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { student_number: studentNo },
      include: {
        user: true,
        daily_entries: {
          include: { subject: true }
        },
        dormitory_evaluations: {
          orderBy: { evaluation_date: 'desc' },
          take: 1
        }
      }
    });

    if (!student) {
      return NextResponse.json({ 
        success: false, 
        error: 'Öğrenci bulunamadı' 
      }, { status: 404 });
    }

    // Ders bazlı istatistikler
    const subjectStats = student.daily_entries.reduce((acc: any, entry: any) => {
      const name = entry.subject.name;
      if (!acc[name]) {
        acc[name] = {
          subject_name: name,
          total_questions: 0,
          total_correct: 0,
          total_wrong: 0,
          target_questions: 100,
          target_accuracy: 80
        };
      }
      acc[name].total_questions += entry.questions_solved;
      acc[name].total_correct += entry.questions_correct;
      acc[name].total_wrong += entry.questions_wrong;
      return acc;
    }, {});

    const subjects = Object.values(subjectStats).map((s: any) => ({
      ...s,
      accuracy_percent: s.total_questions > 0 
        ? ((s.total_correct / s.total_questions) * 100).toFixed(1)
        : 0,
      completion_percent: ((s.total_questions / s.target_questions) * 100).toFixed(1)
    }));

    const totalStats = student.daily_entries.reduce((acc, e) => {
      acc.total_solved += e.questions_solved;
      acc.total_correct += e.questions_correct;
      acc.total_wrong += e.questions_wrong;
      return acc;
    }, { total_solved: 0, total_correct: 0, total_wrong: 0 });

    // Yurt değerlendirmesi
    const dormEval = student.dormitory_evaluations[0];
    let dormitoryData = null;

    if (dormEval) {
      const avgScore = (
        dormEval.study_program_score +
        dormEval.prayer_program_score +
        dormEval.cleanliness_score +
        dormEval.peer_relations_score +
        dormEval.teacher_relations_score +
        dormEval.general_discipline_score
      ) / 6;

      dormitoryData = {
        avg_score: avgScore.toFixed(1),
        evaluation_date: dormEval.evaluation_date,
        criteria: [
          { label: '📚 Ders Programı', score: dormEval.study_program_score, notes: dormEval.study_program_notes },
          { label: '🕌 Namaz', score: dormEval.prayer_program_score, notes: dormEval.prayer_program_notes },
          { label: '🧹 Temizlik', score: dormEval.cleanliness_score, notes: dormEval.cleanliness_notes },
          { label: '👥 Arkadaşlık', score: dormEval.peer_relations_score, notes: dormEval.peer_relations_notes },
          { label: '👨‍🏫 Hoca İlişkisi', score: dormEval.teacher_relations_score, notes: dormEval.teacher_relations_notes },
          { label: '🎯 Disiplin', score: dormEval.general_discipline_score, notes: dormEval.general_discipline_notes }
        ],
        overall_comment: dormEval.overall_comment
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        student: {
          full_name: student.user?.full_name || 'Öğrenci',
          student_number: student.student_number,
          class_name: student.class_name || ''
        },
        overall_stats: {
          ...totalStats,
          accuracy_percent: totalStats.total_solved > 0
            ? ((totalStats.total_correct / totalStats.total_solved) * 100).toFixed(1)
            : 0
        },
        subjects,
        dormitory: dormitoryData
      }
    });

  } catch (error: any) {
    console.error('Veli API hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
