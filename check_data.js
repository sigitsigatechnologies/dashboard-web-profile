const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const profile = await prisma.schoolProfile.findFirst();
        const features = await prisma.feature.count();
        const facilities = await prisma.facility.count();
        const posts = await prisma.post.count();

        console.log('School Profile:', profile ? 'Found' : 'Missing');
        if (profile) {
            console.log('Hero Headline:', profile.heroHeadline);
        }
        console.log('Features count:', features);
        console.log('Facilities count:', facilities);
        console.log('Posts count:', posts);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
