import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("🔑 Giriş Denemesi:", email);

    // Veritabanında kullanıcıyı ara
    const user = await prisma.user.findFirst({
      where: { 
        email: email,
        password_hash: password 
      }
    });

    if (!user) {
      console.log("❌ Kullanıcı Bulunamadı veya Şifre Yanlış");
      return NextResponse.json({ success: false, error: 'Hatalı e-posta veya şifre' }, { status: 401 });
    }

    console.log("✅ Giriş Başarılı:", user.full_name);
    return NextResponse.json({ 
      success: true, 
      user: { name: user.full_name, role: user.role } 
    });
  } catch (error: any) {
    console.error("🔥 Auth API Hatası:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
