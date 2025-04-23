import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Suppression des utilisateurs existants pour éviter les duplications
    await prisma.user.deleteMany({});

}

main()
  .catch((e) => {
    console.error('Erreur pendant le seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });