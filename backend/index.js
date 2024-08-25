const express = require("express");
const connectDb = require("./config/connectDb");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("res...");
// });
const allowedOrigins = ["http://localhost:5173"];

const corsOrigin = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials such as cookies
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};
app.use(cors(corsOrigin));

const PORT = "4000";
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server connected on ${PORT}...`));

    await connectDb();
    console.log("db connected..");
  } catch (err) {
    console.log("error: ", err);
  }
};

// routes
app.use("/api", routes);

start();
