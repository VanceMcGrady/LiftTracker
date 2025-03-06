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

export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email");
  console.log("email: ", email);
  try {
    await client.connect();

    const result = await client.query(
      `SELECT * FROM users WHERE email='${email}'`
    );
    await client.end();
    console.log("result: ", result);
    return Response.json(result);
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}
