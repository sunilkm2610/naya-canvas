const dotenv = require("dotenv");
const express = require("express");
var cors = require("cors");
const userRouter = require("./routes/user.route");
const path = require("path");

const app = express();
dotenv.config();
require("./config/config")();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT || PORT}`);
});
