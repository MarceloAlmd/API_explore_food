require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const serverError = require("./utils/serverError");
const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) =>
  serverError(error, request, response, next)
);

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
