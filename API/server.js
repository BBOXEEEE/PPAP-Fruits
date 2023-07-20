const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: true,
    credentials: true
}))

app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/expend.routes.js")(app);
require("./app/routes/fruits.routes.js")(app);
require("./app/routes/nextday.routes.js")(app);
require("./app/routes/ordered.routes.js")(app);
require("./app/routes/owner.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/productOrder.routes.js")(app);
require("./app/routes/productRegister.routes.js")(app);
require("./app/routes/sales.routes.js")(app);
require("./app/routes/store.routes.js")(app);
require("./app/routes/supply.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})