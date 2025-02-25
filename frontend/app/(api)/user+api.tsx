import { client } from "@/configs/NilePostgresConfig";

export async function POST(req: Request) {
  await client.connect();
  const result = await client.query(
    `
    INSERT INTO users (email, password)
    `
  );
  return Response.json({});
}
