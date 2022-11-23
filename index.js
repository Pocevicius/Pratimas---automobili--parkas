const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.post("/insertCar", async (req, res) => {
  try {
    const cars = await db.query(`INSERT INTO public.cars(
      id, title, image, price, numberplate)
      VALUES (${req.body.id}, '${req.body.title}', '${req.body.image}', ${req.body.price}, '${req.body.numberplate}')`);
    return res.status(200).json({ status: "Car was inserted successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});

app.get("/getAllCars", async (req, res) => {
  try {
    const cars = await db.query("SELECT * FROM cars");

    res.status(200).json({ cars: cars.rows });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getOneCarById/:id", async (req, res) => {
  try {
    const cars = await db.query(
      `SELECT * FROM cars WHERE Id='${req.params.id}'`
    );

    res.status(200).json({ cars: cars.rows });
  } catch (err) {
    console.log(err);
  }

  console.log("xxxx");
});

app.delete("/deleteCarById/:id", async (req, res) => {
  try {
    const delCar = await db.query(
      `SELECT * FROM cars WHERE Id='${req.params.id}'`
    );
    await db.query(`DELETE  FROM cars WHERE Id='${req.params.id}'`);

    res.status(200).json({ status: "deleted car", deletedCar: delCar.rows[0] });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Connected");
});
