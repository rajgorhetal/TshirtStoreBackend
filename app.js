const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//cookies & file middleware
app.use(cookieParser());
app.use(fileUpload());

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const home = require("./routes/home");

//router middleware
app.use("/api/v1", home);

//export app js
module.exports = app;
