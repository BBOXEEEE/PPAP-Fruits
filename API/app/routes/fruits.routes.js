module.exports = (app) => {
  const fruits = require("../controller/fruits.controller.js");

  // 전체 조회
  app.get("/fruits", fruits.showFruitsList);
};