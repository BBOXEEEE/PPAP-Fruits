module.exports = (app) => {
    const sales = require("../controller/sales.controller.js");
    
    // 가맹점별 매출 목록 조회
    app.get("/sales/store/:store_name", sales.showSalesList);

    // 가맹점별 매출 발주 목록 조회
    app.get("/sales/store/:store_name/month/:date", sales.showSalesListByMonth);

    // 가맹점별 매출 발주 목록 조회
    app.get("/sales/store/:store_name/day/:date", sales.showSalesListByDay);
};