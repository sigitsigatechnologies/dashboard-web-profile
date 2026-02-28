const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. School Profile
    await prisma.schoolProfile.upsert({
        where: { id: (await prisma.schoolProfile.findFirst())?.id || 'default' },
        update: {
            schoolName: "EduCenter Academy",
            logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200",
            vision: "Empowering students to achieve excellence and become leaders of tomorrow.",
            mission: "To provide a holistic and innovative education that nurtures creativity, critical thinking, and character.",
            history: "Founded in 1995, EduCenter Academy has been at the forefront of educational innovation for over three decades.",
            principalMessage: "Welcome to EduCenter. We are committed to fostering an environment where every student can thrive and reach their full potential.",
            address: "123 Education Excellence Way, Knowledge City, ID 12345",
            phone: "+62 21 1234 5678",
            email: "info@educenter.sch.id",
            heroHeadline: "Shaping Brilliance, Inspiring Futures",
            heroSubheadline: "Experience a curriculum that combines academic rigor with creative exploration in a supportive community.",
            heroImage: "https://images.unsplash.com/photo-1523050853064-5d5ded1217e9?auto=format&fit=crop&q=80&w=2000",
            ctaHeadline: "Join the Elite EduCenter Community",
            ctaDescription: "Enrollment is now open for the 2026 academic year. Secure your child's future today.",
            officeHours: "Mon - Fri: 07:30 - 16:00, Sat: 08:30 - 12:00",
            facebookUrl: "https://facebook.com/educenter",
            instagramUrl: "https://instagram.com/educenter_official",
            twitterUrl: "https://twitter.com/educenter",
            youtubeUrl: "https://youtube.com/educenter",
            googleMapsUrl: "https://goo.gl/maps/example"
        },
        create: {
            schoolName: "EduCenter Academy",
            logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200",
            vision: "Empowering students to achieve excellence and become leaders of tomorrow.",
            mission: "To provide a holistic and innovative education that nurtures creativity, critical thinking, and character.",
            history: "Founded in 1995, EduCenter Academy has been at the forefront of educational innovation for over three decades.",
            principalMessage: "Welcome to EduCenter. We are committed to fostering an environment where every student can thrive and reach their full potential.",
            address: "123 Education Excellence Way, Knowledge City, ID 12345",
            phone: "+62 21 1234 5678",
            email: "info@educenter.sch.id",
            heroHeadline: "Shaping Brilliance, Inspiring Futures",
            heroSubheadline: "Experience a curriculum that combines academic rigor with creative exploration in a supportive community.",
            heroImage: "https://images.unsplash.com/photo-1523050853064-5d5ded1217e9?auto=format&fit=crop&q=80&w=2000",
            ctaHeadline: "Join the Elite EduCenter Community",
            ctaDescription: "Enrollment is now open for the 2026 academic year. Secure your child's future today.",
            officeHours: "Mon - Fri: 07:30 - 16:00, Sat: 08:30 - 12:00",
            facebookUrl: "https://facebook.com/educenter",
            instagramUrl: "https://instagram.com/educenter_official",
            twitterUrl: "https://twitter.com/educenter",
            youtubeUrl: "https://youtube.com/educenter",
            googleMapsUrl: "https://goo.gl/maps/example"
        }
    });

    // 2. Features
    await prisma.feature.deleteMany({});
    await prisma.feature.createMany({
        data: [
            {
                title: "Academic Excellence",
                description: "Rigorous curriculum designed to challenge and inspire students at every level.",
                icon: "BookOpen",
                order: 1
            },
            {
                title: "Global Community",
                description: "A supportive environment where every student is valued and encouraged to grow.",
                icon: "Users",
                order: 2
            },
            {
                title: "Innovation Hub",
                description: "State-of-the-art facilities and a technology-first approach to learning.",
                icon: "Cpu",
                order: 3
            }
        ]
    });

    // 3. Facilities
    await prisma.facility.deleteMany({});
    await prisma.facility.createMany({
        data: [
            {
                name: "Olympic Science Lab",
                image: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80&w=800",
                description: "Equipped with advanced instruments for physics, chemistry, and biology research.",
                order: 1
            },
            {
                name: "Creative Arts Studio",
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
                description: "A space where students can express themselves through digital and traditional arts.",
                order: 2
            },
            {
                name: "High-Tech Library",
                image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
                description: "Quiet study zones and a vast digital archive accessible globally.",
                order: 3
            }
        ]
    });

    // 4. Posts
    await prisma.post.deleteMany({});
    await prisma.post.create({
        data: {
            title: "Opening Door to 2026 Academic Year",
            slug: "opening-2026",
            content: "We are thrilled to announce that admissions for the 2026 academic year are now open. Visit our campus to learn more about our innovative curriculum.",
            author: "Admin Team",
            category: "Admissions",
            published: true,
            featuredImage: "https://images.unsplash.com/photo-1523050853064-5d5ded1217e9?auto=format&fit=crop&q=80&w=800"
        }
    });

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
