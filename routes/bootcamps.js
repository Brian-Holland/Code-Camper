const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

router.get("/:id", (req, res) => {
    res.status(200).json({ success: true, msg: "Show single bootcamps" });
});

router.post("", (req, res) => {
    res.status(200).json({ success: true, msg: "Create new bootcamp" });
});

router.put("/:id", (req, res) => {
    res.status(200).json({ success: true, msg: "Update single bootcamp" });
});

router.delete("/:id", (req, res) => {
    res.status(200).json({ success: true, msg: "Delete single bootcamp" });
});
