import express from "express";
import dotenv from "dotenv";
import { query } from "./db.js";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.post("/register", async (req, res) => {
  const { name, mobile } = req.body;

  if (!name || !mobile) {
    return res.status(404).json({ message: "Name and Mobile are required." });
  }

  try {
    // chekck if user already registered with this mobile number
    const existing = await query(
      `select * from patients where mobile=$1 and DATE(registered_at)=CURRENT_DATE`,
      [mobile]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        message: "Already registered today!",
        details: {
          name: existing.rows[0].name,
          mobile: existing.rows[0].mobile,
        },
      });
    }

    // register new patient
    const result = await query(
      `insert into patients (name,mobile) values($1,$2) returning *`,
      [name, mobile]
    );

    res.status(201).json({
      message: "Patient Registered Successfully.",
      patient: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/patients", async (req, res) => {
  try {
    const results = await query(`select * from patients order by registered_at ASC`);
    console.log('results',results.rows)
    return res.status(200).json({ patients: results.rows });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
