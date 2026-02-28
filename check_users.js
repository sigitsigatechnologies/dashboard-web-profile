const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const count = await prisma.user.count();
        console.log('User count:', count);
        if (count === 0) {
            console.log('No users found. Creating default admin...');
            // We don't want to create one without knowing the password hashing method usually,
            // but let's just check for now.
        } else {
            const users = await prisma.user.findMany({ select: { email: true, role: true } });
            console.log('Users:', users);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
