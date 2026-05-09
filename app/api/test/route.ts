import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const student = await prisma.student.findUnique({
      where: { student_number: '12345' },
      include: {
        user: true,
        daily_entries: {
          include: {
            subject: true
          }
        },
        dormitory_evaluations: {
          orderBy: { evaluation_date: 'desc' },
          take: 1
        }
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Öğrenci bulunamadı' }, { status: 404 });
    }

    const subjectStats = student.daily_entries.reduce((acc: any, entry: any) => {
      const subjectName = entry.subject.name;
      
      if (!acc[subjectName]) {
        acc[subjectName] = {
          subject_name: subjectName,
          subject_code: entry.subject.code,
          subject_color: entry.subject.color_hex || '#3B82F6',
          total_questions: 0,
          total_correct: 0,
          total_wrong: 0,
          entry_count: 0,
          target_questions: 100,
          target_accuracy: 80
        };
      }
      
      acc[subjectName].total_questions += entry.questions_solved;
      acc[subjectName].total_correct += entry.questions_correct;
      acc[subjectName].total_wrong += entry.questions_wrong;
      acc[subjectName].entry_count += 1;
      
      return acc;
    }, {});

    const subjects = Object.values(subjectStats).map((stat: any) => ({
      ...stat,
      accuracy_percent: stat.total_questions > 0 
        ? ((stat.total_correct / stat.total_questions) * 100).toFixed(1)
        : 0,
      completion_percent: ((stat.total_questions / stat.target_questions) * 100).toFixed(1)
    }));

    const totalStats = student.daily_entries.reduce((acc, entry) => {
      acc.total_solved += entry.questions_solved;
      acc.total_correct += entry.questions_correct;
      acc.total_wrong += entry.questions_wrong;
      return acc;
    }, { total_solved: 0, total_correct: 0, total_wrong: 0 });

    const dormEval = student.dormitory_evaluations[0] || null;
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
          { 
            label: '📚 Dahili Ders Programı', 
            score: dormEval.study_program_score,
            notes: dormEval.study_program_notes 
          },
          { 
            label: '🕌 Namaz Programı', 
            score: dormEval.prayer_program_score,
            notes: dormEval.prayer_program_notes 
          },
          { 
            label: '🧹 Temizlik & Düzen', 
            score: dormEval.cleanliness_score,
            notes: dormEval.cleanliness_notes 
          },
          { 
            label: '👥 Arkadaş İlişkileri', 
            score: dormEval.peer_relations_score,
            notes: dormEval.peer_relations_notes 
          },
          { 
            label: '👨‍🏫 Hoca İlişkileri', 
            score: dormEval.teacher_relations_score,
            notes: dormEval.teacher_relations_notes 
          },
          { 
            label: '🎯 Genel Disiplin', 
            score: dormEval.general_discipline_score,
            notes: dormEval.general_discipline_notes 
          }
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
          class_name: student.class_name || '10-A',
          total_entries: student.daily_entries.length
        },
        overall_stats: {
          ...totalStats,
          accuracy_percent: totalStats.total_solved > 0
            ? ((totalStats.total_correct / totalStats.total_solved) * 100).toFixed(1)
            : 0
        },
        subjects: subjects,
        dormitory: dormitoryData
      }
    });

  } catch (error: any) {
    console.error('❌ API HATA:', error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
