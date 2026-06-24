import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const db = new PrismaClient({
	adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		db.$disconnect().catch((e: Error) => {
			console.error(e);
		});
	});
