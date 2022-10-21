const mongose = require("mongoose");

const connectdb = async () => {
  try {
    const connect = await mongose.connect(process.env.MONGO_URI, () => {
      console.log("Dadabase connected");
    });
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectdb;
