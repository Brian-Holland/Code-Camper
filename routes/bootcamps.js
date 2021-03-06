const express = require("express");

//include other resource routers
const courseRouter = require("./courses");

const router = express.Router();
const {
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
} = require("../controllers/bootcamps");

//re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
    .route("/:id")
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;
