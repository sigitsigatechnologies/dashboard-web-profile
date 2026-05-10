const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log("Starting seeding process to Neon DB...");

    try {
        // Clear existing data
        console.log("Cleaning up existing data...");
        await prisma.message.deleteMany();
        await prisma.teacher.deleteMany();
        await prisma.agenda.deleteMany();
        await prisma.post.deleteMany();
        await prisma.facility.deleteMany();
        await prisma.feature.deleteMany();
        await prisma.schoolProfile.deleteMany();
        await prisma.user.deleteMany();

        // 1. Create Users
        console.log("Creating users...");
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
                    password: hashedPassword,
                    name: "dana",
                    role: "USER",
                }
            ]
        });

        // 2. Create School Profile
        console.log("Creating school profile...");
        await prisma.schoolProfile.create({
            data: {
                schoolName: "SMA N 1 Pundong",
                logo: "/uploads/a055fcea-bdbc-4957-99b7-bbb4e1e00f86.png",
                vision: "Visi SMA Negeri 1 Pundong\nTerwujudnya insan yang bertakwa, berprestasi, berkompetensi global, berbudaya, dan berwawasan lingkungan (5 b)",
                mission: "Misi SMA Negeri 1 Pundong\nUntuk mencapai Visi tersebut, SMA Negeri 1 Pundong mengembangkan misi sebagai berikut :\n\nMeningkatkan ketakwaan kepada Tuhan Yang Maha Esa.\nMemfasilitasi seluruh peserta didik mencapai prestasi akademik dan non akademik.\nMembekali kecakapan global abad 21.\nMenumbuhkembangkan karakter dan kecintaaan terhadap budaya bangsa.\nMeningkatkan kepedulian terhadap lingkungan",
                history: "SMA Negeri 1 Pundong dalam menghadapi perkembangan dan perubahan dalam dunia Pendidikan, menyiapkan peserta didik untuk mewujudkan Sumber Daya Manusia yang terampil, edukatif, Religius, Disiplin, Empati, prestasi, aktif, nasionalis.",
                principalMessage: "Selamat datang di website resmi SMA Negeri 1 Pundong. Kami berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri Anda.",
                address: "Klisat, Srihardono, Kec. Pundong, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55771",
                phone: "+62 274 123456",
                email: "info@sman1pundong.sch.id",
                googleMapsUrl: "https://goo.gl/maps/example",
                ctaHeadline: "SPMB SMA NEGERI 1 PUNDONG TAHUN 2026",
                ctaDescription: "Pendaftaran siswa baru tahun ajaran 2026 telah dibuka. Daftarkan putra-putri Anda sekarang.",
                heroHeadline: "Berkarya Untuk masa depan, Potential.",
                heroSubheadline: "Potential. Creative, Unggul, dan Berpendidikan.",
                heroImage: "/uploads/c02aff69-cbeb-4ed3-b2e2-9566d42d4de9.jpg",
                heroImages: [
                    "/uploads/cf74acc8-06b8-422b-ab85-fadaa6b242fc.avif",
                    "/uploads/f9480d45-62cd-4acd-b2d9-bcd946d1961d.avif",
                    "/uploads/bb9931d5-fe2b-4b5b-b9c7-3774b76a1fd0.avif"
                ],
                officeHours: "Senin - Jumat: 07:30 - 16:00",
                facebookUrl: "https://facebook.com/sman1pundong",
                instagramUrl: "https://instagram.com/sman1pundong",
                youtubeUrl: "https://youtube.com/sman1pundong"
            }
        });

        // 3. Create Features
        console.log("Creating features...");
        await prisma.feature.createMany({
            data: [
                { title: "Kurikulum Merdeka", description: "Implementasi kurikulum terbaru untuk kebebasan belajar.", icon: "BookOpen", order: 1 },
                { title: "Fasilitas Modern", description: "Laboratorium dan ruang kelas berbasis teknologi.", icon: "Cpu", order: 2 },
                { title: "Ekstrakurikuler", description: "Berbagai pilihan pengembangan bakat dan minat.", icon: "Trophy", order: 3 }
            ]
        });

        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Error during seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
