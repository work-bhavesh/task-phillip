const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const rootRouter = require("./route");

require("dotenv").config();
require("./model/conn");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/api", rootRouter);

app.get("/test", async (req, res) => {
    res.json("Test API run successfully. Server is Running...");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));