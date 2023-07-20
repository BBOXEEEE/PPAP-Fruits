module.exports = (app) => {
    const expend = require("../controller/expend.controller.js");
    
    // 가맹점별 지출 목록 조회
    app.get("/expend/store/:store_name", expend.showExpendList);

    // 가맹점별 월별 지출 목록 조회
    app.get("/expend/store/:store_name/month/:date", expend.showExpendListByMonth);

    // 가맹점별 일별 지출 목록 조회
    app.get("/expend/store/:store_name/day/:date", expend.showExpendListByDay);
  };
  