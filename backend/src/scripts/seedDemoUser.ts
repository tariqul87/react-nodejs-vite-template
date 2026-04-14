import { prisma } from "../db/client";
import { env } from "../config/env";
import { hashPassword } from "../auth/password";

type SeedUser = {
  email: string;
  password: string;
  displayName: string;
};

async function upsertSeedUser(seedUser: SeedUser) {
  const email = seedUser.email.toLowerCase();
  const passwordHash = await hashPassword(seedUser.password);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      displayName: seedUser.displayName,
    },
    create: {
      email,
      passwordHash,
      displayName: seedUser.displayName,
    },
  });

  console.log(`Seeded user: ${user.email}`);
}

async function seedUsers() {
  const seedUsersData: SeedUser[] = [
    {
      email: env.DEMO_USER_EMAIL,
      password: env.DEMO_USER_PASSWORD,
      displayName: "Demo User",
    },
    {
      email: "admin@example.com",
      password: "AdminPass123!",
      displayName: "Admin User",
    },
    {
      email: "member@example.com",
      password: "MemberPass123!",
      displayName: "Member User",
    },
  ];

  for (const seedUser of seedUsersData) {
    await upsertSeedUser(seedUser);
  }
}

seedUsers()
  .catch((error) => {
    console.error("Failed to seed users", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
