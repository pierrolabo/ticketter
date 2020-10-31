require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;
const local = process.env.local;
//create connection to database
mongoose
  .connect(local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    bufferCommands: false,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  })
  .catch((err) => console.log(`DB_CONNECTION_ERROR: ${err}`));

if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

//check for connection success or failure
const db = mongoose.connection;
db.once("open", () => console.log("db connected!"));
db.on("disconnected", () => console.log("db disconnected!"));

process.on("SIGINT", () => {
  console.log("Mongoose disconnected on exit process");
  process.exit(0);
});
