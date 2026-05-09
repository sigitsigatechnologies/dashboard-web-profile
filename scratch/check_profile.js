const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.schoolProfile.findFirst();
  console.log(JSON.stringify(profile, null, 2));
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
