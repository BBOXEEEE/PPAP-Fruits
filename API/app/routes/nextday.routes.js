module.exports = (app) => {
  const product = require("../controller/nextday.controller.js");

  // 다음날 버튼 클릭 시 상품 상태 업데이트
  app.put("/nextday", product.updateProductStatus);
};
