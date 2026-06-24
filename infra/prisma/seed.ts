import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
	adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
	return null;
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await db.$disconnect();
		process.exit(1);
	});
