const express = require("express");
const db = require("./db/db");
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

// GET /api/users
app.get("/api/users", async (req, res) => {
  try {
    const users = await db("user").select("*");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/users
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    // Insert user, return new id
    const [id] = await db("user").insert({ name, email });
    res.status(201).json({ id, name, email });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
