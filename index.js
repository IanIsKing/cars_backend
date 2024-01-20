const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "cars_frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "cars_frontend", "build", "index.html")
    );
  });
}

app.use(bodyParser.json());

function getCar() {
  try {
    const content = fs.readFileSync("cars.json");
    return JSON.parse(content);
  } catch (e) {
    fs.writeFileSync("cars.json", "[]");
    return [];
  }
}

// Get list of cars
app.get("/api", (req, res) => {
  let cars = getCar();
  res.send(cars);
  console.log(cars);
});

// Add a new car
app.post("/api", (req, res) => {
  const car = req.body;
  let cars = getCar();
  car.id = cars.length + 1;
  cars.push(car);
  res.json(car);
  fs.writeFileSync("cars.json", JSON.stringify(cars));
});

// Get a car by id
app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  let cars = getCar();
  let car = cars.find((car) => car.id == id);
  res.json(car);
});

// Update a car by id
app.put("/api/:id", (req, res) => {
  const id = req.params.id;
  const newCar = req.body;
  let cars = getCar();
  let car = cars.find((car) => car.id == id);
  car.make = newCar.make;
  car.model = newCar.model;
  car.seats = newCar.seats;
  res.json(car);
  fs.writeFileSync("cars.json", JSON.stringify(cars));
});

// Delete a car by id
app.delete("/api/:id", (req, res) => {
  const id = req.params.id;
  let cars = getCar();
  let car = cars.find((car) => car.id == id);
  const index = cars.indexOf(car);
  cars.splice(index, 1);
  res.json(car);
  fs.writeFileSync("cars.json", JSON.stringify(cars));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
