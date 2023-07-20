module.exports = (app) => {
    const supply = require("../controller/supply.controller.js");
    
    // 가맹점별 발주 목록 조회
    app.get("/supply/store/:store_name", supply.showSupplyList);

    // 가맹점별 월별 발주 목록 조회
    app.get("/supply/store/:store_name/month/:date", supply.showSupplyListByMonth);

    // 가맹점별 일별 발주 목록 조회
    app.get("/supply/store/:store_name/day/:date", supply.showSupplyListByDay);
  };
  