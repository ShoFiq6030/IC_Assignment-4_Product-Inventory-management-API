require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Database
const mongoose = require('mongoose')
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {

        console.log("DB Connected");
    })
    .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
    res.send("<h1 style='text-align: center; font-size: 50px'>Hello World!</h1>");
});

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
