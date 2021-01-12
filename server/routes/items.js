const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// http://localhost:4000/api/burgers
router.get("/", (req, res, next) => {
  // Get all the burgers
  Item.find()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific burger
  Item.findById(req.params.id)
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers/{some-id}
router.patch("/:id", (req, res, next) => {
  // Update a specific burger
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
      // There's a trap !
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers
router.post("/", (req, res, next) => {
  // Create a burger
  Item.create(req.body)
    .then((itemDocument) => {
      res.status(201).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers/{some-id}
router.delete("/:id", (req, res, next) => {
  // Deletes a burger
  Item.findByIdAndRemove(req.params.id)
    .then((itemDocument) => {
      // res.sendStatus(204)
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
