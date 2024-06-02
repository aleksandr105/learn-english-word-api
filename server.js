const app = require("./app");
const { DB, PORT = 3000 } = process.env;
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://aleksandr105:SpLink_aleksandr105@nodejs-homework-rest-ap.bugpojg.mongodb.net/learn-english-words?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);

    process.exit(1);
  });
