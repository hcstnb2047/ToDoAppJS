import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:password@db:5432/todoapp",
});

// GET: 一覧取得
app.get("/todos", async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  res.json(result.rows);
});

// POST: 追加
app.post("/todos", async (req: Request, res: Response) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title],
  );
  res.json(result.rows[0]);
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
