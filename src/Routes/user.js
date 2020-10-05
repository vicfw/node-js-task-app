const express = require("express");
const User = require("../db/models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const data = new User(req.body);
  try {
    const user = await data.save();
    console.log(user, "added");
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }

  router.get("/users/:id", async (req, res) => {
    const input = req.params.id;
    try {
      const data = await User.findById(input);
      if (!data) {
        return res.status(404).send("User Not Found");
      }
      res.send(data);
    } catch (e) {
      res.status(500).send({ error: e });
    }
  });
});

router.patch("/users/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const data = await User.findByIdAndUpdate(param, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("Not FOund");
    }
    res.send(data);
  } catch (e) {
    res.status(400).send({ erroe: e });
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const data = await User.findByIdAndDelete(_id);
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
