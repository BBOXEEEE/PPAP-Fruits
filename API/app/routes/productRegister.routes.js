module.exports = app =>{
    const productRegister = require("../controller/productRegister.controller.js");

    app.post("/productRegister", productRegister.productRegister);
};