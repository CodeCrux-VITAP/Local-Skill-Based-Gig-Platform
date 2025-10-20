require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Client } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ DB connection error:", err.message));

app.post("/signup", async (req, res) => {
  const { username, password, city, role, bio } = req.body;

  if (!username || !password || !city || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (username, password_hash, city, role, bio) VALUES ($1,$2,$3,$4,$5) RETURNING id, username, role, city",
      [username, hashedPassword, city, role, bio || null]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ error: "Something went wrong during signup" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Both username and password are required" });

  try {
    const result = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid username or password" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid)
      return res.status(400).json({ error: "Invalid username or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, city: user.city },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        city: user.city,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

app.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, username, role, city, bio FROM users WHERE id=$1",
      [req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Fetch /me error:", err.message);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
});

app.post("/gigs", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ error: "Only clients can create gigs" });
    }

    const result = await db.query(
      `INSERT INTO gigs (client_id, title, description, city) 
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [req.user.id, title, description, req.user.city]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/gigs", authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
         g.id, 
         g.title, 
         g.description, 
         g.city, 
         g.created_at,
         u.username AS client_name
       FROM gigs g
       JOIN users u ON g.client_id = u.id`
    );
    console.log("Fetched gigs:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/gigs/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const gigCheck = await db.query("SELECT * FROM gigs WHERE id=$1", [id]);
    if (!gigCheck.rows.length)
      return res.status(404).json({ error: "Gig not found" });

    if (gigCheck.rows[0].client_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await db.query(
      "UPDATE gigs SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/gigs/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const gigCheck = await db.query("SELECT * FROM gigs WHERE id=$1", [id]);
    if (!gigCheck.rows.length)
      return res.status(404).json({ error: "Gig not found" });

    if (gigCheck.rows[0].client_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await db.query("DELETE FROM gigs WHERE id=$1", [id]);
    res.json({ message: "Gig deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
