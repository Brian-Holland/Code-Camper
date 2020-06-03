const Bootcamp = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//access    Public
exports.getBootcamps = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp,
    });
};

//@desc     Get single bootcamps
//@route    GET /api/v1/bootcamps/:id
//access    Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show single bootcamp" });
};

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps
//access    Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Create new bootcamp" });
};

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//access    Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Update single bootcamp" });
};

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//access    Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Delete single bootcamp" });
};
