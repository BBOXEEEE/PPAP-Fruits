module.exports = (app) => {
  const ordered = require("../controller/productOrder.controller.js");

  // 상품 주문
  app.post("/productOrder", ordered.productOrder);
};
