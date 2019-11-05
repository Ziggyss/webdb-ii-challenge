const express = require("express");
const Cars = require("./carsDb");

const router = express.Router();

router.get("/", (req, res) => {
  Cars.get()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve cars" + err.message
      });
    });
});

router.get("/:id", validateCarId, (req, res) => {
  const car = req.car;
  res.status(200).json(car);
});

router.post("/", validateCar, (req, res) => {
  const newCar = req.body;
  Cars.insert(newCar)
    .then(car => {
      res.status(200).json({
        message: "New car added successfully",
        car
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Uh oh. There was an error adding the car",
        error: err.message
      });
    });
});


router.delete("/:id", validateCarId, (req, res) => {
  Cars.remove(req.car.id)
    .then(() => {
      res.status(200).json({ message: "The car has been deleted" });
    })
    .catch(error => {
      res.status(500).json({
        message: `Error removing the car: ${error.message}`
      });
    });
});

router.put("/:id", validateCarId, (req, res) => {
  const { id } = req.params;
  const updatedCar = req.body;
  Cars.update(id, updatedCar)
    .then(car => {
      res.status(200).json({
        message: `You successfully updated ${updatedCar.make}`,
        car
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the user: " + error.message
      });
    });
});


function validateCarId(req, res, next) {
  const { id } = req.params;
  Cars.getById(id)
    .then(car => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(400).json({
          message: "Invalid car id"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
}

function validateCar(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing car data" });
  } else if (!req.body.VIN) {
    res.status(400).json({
      message: "missing VIN"
    });
  } else if (!req.body.make) {
    res.status(400).json({
      message: "missing make"
    });
  } else if (!req.body.model) {
    res.status(400).json({
      message: "missing model"
    });
  } else if (!req.body.mileage) {
    res.status(400).json({
      message: "missing mileage"
    });
  } else {
    next();
  }
}


module.exports = router;
