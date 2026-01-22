const express = require("express");
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
});

router.get("/", auth, async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

router.put("/:id", auth, async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

router.delete("/:id", auth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
