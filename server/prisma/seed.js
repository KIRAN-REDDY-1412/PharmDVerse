const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting PharmDVerse ERP Multi-Tenant Seeding...');

  // 1. Seed Colleges
  const college1 = await prisma.college.upsert({
    where: { code: 'AMRCP-01' },
    update: {},
    create: {
      id: 'COL-001',
      slug: 'amr',
      name: 'AMR College of Pharmacy',
      code: 'AMRCP-01',
      domain: 'amr.pharmdverse.com',
      principalName: 'Dr. K. V. Raman',
      contactEmail: 'contact@amrcp.edu.in',
      status: 'ACTIVE'
    }
  });

  // 2. Seed Super Admin User
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@pharmdverse.com' },
    update: {},
    create: {
      id: 'USR-SA-001',
      name: 'Super Admin',
      email: 'admin@pharmdverse.com',
      passwordHash: passwordHash,
      role: 'SUPERADMIN',
      status: 'Active'
    }
  });

  console.log('✅ Seeding completed successfully!');
  console.log(` Super Admin: admin@pharmdverse.com / Admin@123`);
  console.log(` College: ${college1.name} (${college1.slug})`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
