import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      const users = await sql`SELECT * FROM users ORDER BY id;`;
      return response.status(200).json({ users });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  } else if (request.method === 'POST') {
    const { name, age } = request.body;
    if (!name || age === undefined) {
      return response.status(400).json({ error: '名前と年齢を入力してください。' });
    }
 
    try {
      const result = await sql`
        INSERT INTO Users (name, age)
        VALUES (${name}, ${age})
        RETURNING *;
      `;
      return response.status(201).json({ user: result });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  } else {
    response.setHeader('Allow', ['GET', 'POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}