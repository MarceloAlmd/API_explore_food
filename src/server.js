require("express-async-errors");

const express = require("express");
const uploadConfig = require("./configs/uploads");
const routes = require("./routes");
const serverError = require("./utils/serverError");
const sqliteConnection = require("./database/sqlite");

const app = express();

app.use(express.json());
app.use(routes);

sqliteConnection();

app.use("/files", express.static(uploadConfig.DISHES));
app.use("/files", express.static(uploadConfig.INGREDIENTS));

app.use((error, request, response, next) =>
  serverError(error, request, response, next)
);

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
