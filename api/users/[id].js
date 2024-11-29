import { sql } from '@vercel/postgres';

// api/users/[id].js

export default async function handler(req, res) {
    const { query: { id } } = req;

    if (req.method === 'GET') {
        const user = await sql`SELECT * FROM Users WHERE id = ${id};`;

        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: `ユーザーが見つかりませんでした。` });
        }
    } else if (req.method === 'PUT') {
        const { name, age } = req.body;

        if (!name || age === undefined) {
            return res.status(400).json({ error: '名前と年齢を入力してください。' });
        }

        try {
            const result = await sql`
                UPDATE Users
                SET name = ${name}, age = ${age}
                WHERE id = ${id}
                RETURNING *;
            `;
            if (result.length === 0) {
                return res.status(404).json({ error: 'ユーザーが見つかりませんでした。' });
            }

            return res.status(200).json({ user: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        try {
            const result = await sql`
                DELETE FROM Users
                WHERE id = ${id}
                RETURNING *;
            `;
            if (result.length === 0) {
                return res.status(404).json({ error: 'ユーザーが見つかりませんでした。' });
            }
            return res.status(200).json();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        // For other HTTP methods
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
