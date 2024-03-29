require("express-async-errors");
require("dotenv/config");
const cors = require("cors");
const express = require("express");
const uploadConfig = require("./configs/uploads");
const routes = require("./routes");
const serverError = require("./utils/serverError");
const sqliteConnection = require("./database/sqlite");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
sqliteConnection();

app.use("/files/ingredient", express.static(uploadConfig.INGREDIENTS));
app.use("/files/dish", express.static(uploadConfig.DISHES));

app.use((error, request, response, next) =>
  serverError(error, request, response, next)
);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
