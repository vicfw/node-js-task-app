const express = require("express");
const router = new express.Router();
const Task = require("../db/models/task");

router.post("/tasks", async (req, res) => {
  const data = new Task(req.body);

  try {
    const task = await data.save();
    res.status(201).send(task);
    console.log("task added");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", (req, res) => {
  Task.find({})
    .then(response => {
      res.send(response);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await Task.findById(_id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const param = req.params.id;
  const body = Object.keys(req.body);
  const options = ["descreption", "isComplated"];
  const ValidOption = body.every(item => {
    return options.includes(item);
  });
  console.log(ValidOption);
  if (!ValidOption) {
    return res.status(400).send("Invalid Option!");
  }

  try {
    const data = await Task.findByIdAndUpdate(param, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return res.status(404).send("Task Not Found !");
    }
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const data = await Task.findByIdAndDelete(_id);
  try {
    if (!data) {
      return res.status(404).send("User Not Found");
    }
    res.send(data);
  } catch (e) {
    res.send(400).send(e);
  }
});

module.exports = router;
