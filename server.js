const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./router/bootcamps");

//load env vars
dotenv.config({ path: "./config/config.env" });

//initialize express
const app = express();

//set port using env var or default to 5000
const PORT = process.env.PORT || 5000;

//mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
