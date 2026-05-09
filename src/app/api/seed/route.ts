import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // Clear existing data to avoid conflicts during seed
        await prisma.message.deleteMany();
        await prisma.teacher.deleteMany();
        await prisma.agenda.deleteMany();
        await prisma.post.deleteMany();
        await prisma.facility.deleteMany();
        await prisma.feature.deleteMany();
        await prisma.schoolProfile.deleteMany();
        await prisma.user.deleteMany();

        // 1. Create Users
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await prisma.user.createMany({
            data: [
                {
                    email: "admin@educenter.sch.id",
                    password: hashedPassword,
                    name: "School Administrator",
                    role: "ADMIN",
                },
                {
                    email: "dana@gmail.com",
                    password: hashedPassword, // Resetting password for simplicity during migration
                    name: "dana",
                    role: "USER",
                }
            ]
        });

        // 2. Create School Profile
        await prisma.schoolProfile.create({
            data: {
                schoolName: "SMA N 1 Pundong",
                logo: "/uploads/a055fcea-bdbc-4957-99b7-bbb4e1e00f86.png",
                vision: "Visi SMA Negeri 1 Pundong\nTerwujudnya insan yang bertakwa, berprestasi, berkompetensi global, berbudaya, dan berwawasan lingkungan (5 b)",
                mission: "Misi SMA Negeri 1 Pundong\nUntuk mencapai Visi tersebut, SMA Negeri 1 Pundong mengembangkan misi sebagai berikut :\n\nMeningkatkan ketakwaan kepada Tuhan Yang Maha Esa.\nMemfasilitasi seluruh peserta didik mencapai prestasi akademik dan non akademik.\nMembekali kecakapan global abad 21.\nMenumbuhkembangkan karakter dan kecintaaan terhadap budaya bangsa.\nMeningkatkan kepedulian terhadap lingkungan\n \n\n",
                history: "Assalamualaikum Warahmatullahi Wabarakatuh\n\nSalam Sejahtera untuk kita semua,\n\nPuji syukur rahmad dan karunia Allah SWT sehingga saya mampu menuliskan kata sambutan Kepala sekolah dalam rangka penerbitan website sekolah SMA Negeri 1 Pundong. Saya sebagai Kepala Sekolah merasa bangga dan bersyukur dapat  menjadi bagian dari SMA Negeri 1 Pundong ini. Perkembangan dan perubahan dunia pendidikan di Indonesia tidak terlepas dari pengaruh perubahan global, perkembangan ilmu pengetahuan dan teknologi, serta seni dan budaya. SMA Negeri 1  Pundongdalam menghadapi perkembangan dan perubahan dalam dunia Pendidikan,  menyiapkan peserta didik untuk mewujudkan Sumber Daya Manusia yang terampil, edukatif, Religius,Disiplin, Empati, prestasi, aktif, nasionalis.\n\nWebsite dengan nama https://www.sman1pundong.sch.id dibangun dengan tujuan",
                principalMessage: "Assalamualaikum Warahmatullahi Wabarakatuh\n\nSalam Sejahtera untuk kita semua,\n\nPuji syukur rahmad dan karunia Allah SWT sehingga saya mampu menuliskan kata sambutan Kepala sekolah dalam rangka penerbitan website sekolah SMA Negeri 1 Pundong. Saya sebagai Kepala Sekolah merasa bangga dan bersyukur dapat  menjadi bagian dari SMA Negeri 1 Pundong ini.",
                address: "123 Education Excellence Way, Knowledge City, ID 12345",
                phone: "+62 21 1234 5678",
                email: "info@smapundong.sch.id",
                googleMapsUrl: "https://goo.gl/maps/example",
                ctaHeadline: "SPMB SMA NEGERI 1 PUNDONG TAHUN 2026",
                ctaDescription: "Enrollment is now open for the 2026 academic year. Secure your child's future today.",
                heroHeadline: "Berkarya Untuk masa depan, Potential.",
                heroSubheadline: "Potential. Creative, Unggul, dan Berpendidikan.",
                heroImage: "/uploads/c02aff69-cbeb-4ed3-b2e2-9566d42d4de9.jpg",
                heroImages: [
                    "/uploads/cf74acc8-06b8-422b-ab85-fadaa6b242fc.avif",
                    "/uploads/f9480d45-62cd-4acd-b2d9-bcd946d1961d.avif",
                    "/uploads/bb9931d5-fe2b-4b5b-b9c7-3774b76a1fd0.avif"
                ],
                officeHours: "Mon - Fri: 07:30 - 16:00, Sat: 08:30 - 12:00",
                facebookUrl: "https://facebook.com/educenter",
                twitterUrl: "https://twitter.com/educenter",
                instagramUrl: "https://instagram.com/educenter_official",
                youtubeUrl: "https://youtube.com/educenter"
            }
        });

        // 3. Create Features
        await prisma.feature.createMany({
            data: [
                {
                    title: "Academic Excellence",
                    description: "Rigorous curriculum designed to challenge and inspire students at every level.",
                    icon: "BookOpen",
                    order: 1,
                },
                {
                    title: "Global Community",
                    description: "A supportive environment where every student is valued and encouraged to grow.",
                    icon: "Users",
                    order: 2,
                },
                {
                    title: "Innovation Hub",
                    description: "State-of-the-art facilities and a technology-first approach to learning.",
                    icon: "Cpu",
                    order: 3,
                },
                {
                    title: "IT Developer",
                    description: "IT dalam sekolah biasanya mencakup penggunaan teknologi untuk mendukung proses pendidikan, administrasi, dan operasional sekolah.",
                    icon: "Computer",
                    order: 0,
                },
                {
                    title: "VollyBall",
                    description: "Volleyball atau bola voli adalah olahraga tim yang dimainkan oleh dua regu, masing-masing terdiri dari 6 pemain.",
                    icon: "Volleyball",
                    order: 0,
                },
                {
                    title: "Sepak Bola",
                    description: "Football atau sepak bola adalah olahraga tim yang dimainkan oleh dua regu, masing-masing terdiri dari 11 pemain.",
                    icon: "Apple",
                    order: 0,
                }
            ]
        });

        // 4. Create Facilities
        await prisma.facility.createMany({
            data: [
                {
                    name: "Creative Arts Studio",
                    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
                    description: "A space where students can express themselves through digital and traditional arts.",
                    order: 2,
                },
                {
                    name: "High-Tech Library",
                    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
                    description: "Quiet study zones and a vast digital archive accessible globally.",
                    order: 3,
                },
                {
                    name: "Olympic Science Lab",
                    image: "/uploads/41a19968-92ab-45c3-b4cd-8b24bb951747.jpeg",
                    description: "Equipped with advanced instruments for physics, chemistry, and biology research.",
                    order: 1,
                }
            ]
        });

        // 5. Create Teachers
        await prisma.teacher.createMany({
            data: [
                {
                    name: "sigit galih f",
                    photo: "/uploads/8c599c1d-6c52-4be8-9083-062a3591111b.jpg",
                    position: "guru it",
                    bio: "sigit falih adalah seorang it yng baik hari",
                }
            ]
        });

        // 6. Create Agendas
        await prisma.agenda.createMany({
            data: [
                {
                    title: "Mancing bersama",
                    description: "mancing mania",
                    date: new Date("2026-03-06"),
                    location: "depan sekolahan",
                    image: "/uploads/af680adc-6230-49b0-92f6-2386220e3904.jpg",
                }
            ]
        });

        // 7. Create Posts
        await prisma.post.createMany({
            data: [
                {
                    slug: "opening-2026",
                    title: "Opening Door to 2026 Academic Year",
                    content: "We are thrilled to announce that admissions for the 2026 academic year are now open. Visit our campus to learn more about our innovative curriculum.",
                    featuredImage: "/uploads/69a30cc8-15db-43fa-ace7-06fa2d752384.jpg",
                    author: "Admin Team",
                    category: "Admissions",
                    published: true,
                }
            ]
        });

        return NextResponse.json({
            message: "Database seeded successfully with current data!",
            credentials: {
                email: "admin@educenter.sch.id",
                password: "admin123"
            }
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
