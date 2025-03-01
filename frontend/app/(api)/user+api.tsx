import { client } from "@/configs/NilePostgresConfig";

export async function POST(req: Request) {
  const { name, email, image } = await req.json();

  await client.connect();

  const result = await client.query(
    `
    INSERT INTO users VALUES(DEFAULT, '${name}', '${email}', '${image}')
    `
  );
  await client.end();

  return Response.json(result);
}
