const mongoose = require("mongoose");
const {DB_URL} = require("./index");

const connectDb = () => {
    return mongoose.connect(DB_URL);
}
module.exports = connectDb;