module.exports = app =>{
    const product = require("../controller/product.controller.js");

    // 소비자에게 보여지는 상품정보
    app.get("/product/customer/:store_name", product.showToCustomer);

    // 가맹점주에게 보여지는 상품정보
    app.get("/product/owner/:store_name", product.showToOwner);

    // 가맹점주가 상품 상태 변경
    app.post("/product/return", product.changeStatus);
};