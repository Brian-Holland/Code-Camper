const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to db
connectDB();

//initialize express
const app = express();

//set port using env var or default to 5000
const PORT = process.env.PORT || 5000;

//mount routers
app.use("/api/v1/bootcamps", bootcamps);

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1));
});
