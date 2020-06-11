const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const Bootcamp = require("./models/Bootcamp");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

//import or delte depnding on flag provided in cmd line
if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
