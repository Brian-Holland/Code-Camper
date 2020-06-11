const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
        success: true,
        numberResults: bootcamps.length,
        data: bootcamps,
    });
});

//@desc     Get single bootcamps
//@route    GET /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id: ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: bootcamp });
});

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps
//access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp,
    });
});

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id: ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: bootcamp });
});

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id: ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        data: `Deleted ${bootcamp.name}`,
    });
});

//@desc     Get bootcamps within radius
//@route    GET api/v1/bootcamps/radius/:zipcode/:distance
//@access   Private

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    //get lat/long from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //calc radius in radians
    //divide distance by radius of earth (3,963mi)
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    });
});
