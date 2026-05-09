import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    // Toplam öğrenci
    const totalStudents = await prisma.student.count();

    // Sınıf dağılımı
    const classDistribution = await prisma.$queryRaw`
      SELECT class_name, COUNT(*)::int as count
      FROM students
      GROUP BY class_name
      ORDER BY class_name
    `;

    // Toplam ders
    const totalSubjects = await prisma.subject.count();

    // Bugünkü günlük girişler
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyEntriesToday = await prisma.dailyEntry.count({
      where: {
        entry_date: {
          gte: today
        }
      }
    });

    // Yurt değerlendirme istatistikleri
    const evaluatedStudents = await prisma.dormitoryEvaluation.groupBy({
      by: ['student_id']
    });

    const allEvaluations = await prisma.dormitoryEvaluation.findMany();
    
    let avgScore = 0;
    if (allEvaluations.length > 0) {
      const totalScore = allEvaluations.reduce((acc, ev) => {
        return acc + (
          ev.study_program_score +
          ev.prayer_program_score +
          ev.cleanliness_score +
          ev.peer_relations_score +
          ev.teacher_relations_score +
          ev.general_discipline_score
        ) / 6;
      }, 0);
      avgScore = parseFloat((totalScore / allEvaluations.length).toFixed(1));
    }

    const dormitoryStats = {
      evaluated_count: evaluatedStudents.length,
      not_evaluated_count: totalStudents - evaluatedStudents.length,
      avg_score: avgScore || 0
    };

    // Akademik istatistikler
    const allEntries = await prisma.dailyEntry.findMany();
    
    let academicStats = null;
    if (allEntries.length > 0) {
      const totalQuestions = allEntries.reduce((acc, e) => acc + e.questions_solved, 0);
      const totalCorrect = allEntries.reduce((acc, e) => acc + e.questions_correct, 0);
      
      academicStats = {
        total_questions: totalQuestions,
        total_correct: totalCorrect,
        total_wrong: totalQuestions - totalCorrect,
        accuracy: totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        total_students: totalStudents,
        total_subjects: totalSubjects,
        daily_entries_today: dailyEntriesToday,
        class_distribution: classDistribution,
        dormitory_stats: dormitoryStats,
        academic_stats: academicStats
      }
    });

  } catch (error: any) {
    console.error('Admin dashboard hatası:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
