module.exports = (app) => {
  const ordered = require("../controller/ordered.controller.js");

  // 가맹점별 주문 목록 조회
  app.get("/ordered/store/:store_name", ordered.showToOwner);

  // 가맹점별 월별 주문 목록 조회
  app.get("/ordered/store/:store_name/month/:date", ordered.showToOwnerByMonth);

  // 가맹점별 일별 주문 목록 조회
  app.get("/ordered/store/:store_name/day/:date", ordered.showToOwnerByDay);

  // 소비자별 주문 목록 조회
  app.get("/ordered/customer/:id", ordered.showToCustomer);
};
