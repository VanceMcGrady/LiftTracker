import { client } from "@/configs/NilePostgresConfig";

export async function POST(req: Request) {
  const { firstName, lastName, email } = await req.json();
  console.log("firstName: ", firstName);
  console.log("lastName: ", lastName);
  console.log("email: ", email);
  await client.connect();

  const result = await client.query(
    `
    INSERT INTO USERS VALUES(DEFAULT, '${firstName}', '${lastName}' ,'${email}', DEFAULT)
    `
  );
  await client.end();
  console.log("result in POST: ", result);
  return Response.json(result);
}

export async function GET(req: Request) {
  // get email from query params and convert to lowercase
  const email = new URL(req.url).searchParams.get("email")?.toLowerCase();
  //console.log("email: ", email);
  try {
    await client.connect();

    const result = await client.query(
      `SELECT * FROM users WHERE email='${email}'`
    );
    await client.end();
    //console.log("result in GET: ", result);
    return Response.json(result);
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}
