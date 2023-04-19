const app = require("./app");
const { DB, PORT = 3000 } = process.env;
const mongoose = require("mongoose");

mongoose
  .connect(DB)
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
