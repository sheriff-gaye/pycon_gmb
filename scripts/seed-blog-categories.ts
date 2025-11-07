import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting blog categories seed...");

  const categories = [
    { name: "Python", slug: "python" },
    { name: "Community", slug: "community" },
    { name: "Tutorials", slug: "tutorials" },
    { name: "Events", slug: "events" },
  ];

  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (existing) {
      console.log(`Category "${category.name}" already exists, skipping...`);
      continue;
    }

    const created = await prisma.category.create({
      data: category,
    });

    console.log(`✓ Created category: ${created.name}`);
  }

  console.log("\n✓ Blog categories seed completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

