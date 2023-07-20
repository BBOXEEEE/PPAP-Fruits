const sql = require("./db.js");

// 생성자
const Sales = function (sales) {
    this.product_num = sales.product_num;
    this.store_num = sales.store_num;
    this.sales_date = sales.sales_date;
    this.sales_price = sales.sales_price;
    this.sales_quantity = sales.sales_quantity;
};

// 가맹점별 매출 목록 조회
Sales.showSalesList = (store_name, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", store_name, (err, store) => {
        if (err) {
            result(err, null);
            return;
        }
        if (store.length === 0) {
            result({ kind: "store_name" }, null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 매출 목록 조회
        sql.query("SELECT * FROM SALES WHERE STORE_NUM = ?", store_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const sales_date = res[i].SALES_DATE;
                let formattedSalesDate =
                    sales_date.getFullYear() +
                    "-" +
                    ("0" + (sales_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + sales_date.getDate()).slice(-2) +
                    " " +
                    ("0" + sales_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + sales_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + sales_date.getSeconds()).slice(-2);
                res[i].SALES_DATE = formattedSalesDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 월별 매출 목록 조회
Sales.showSalesListByMonth = (store_name, date, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ? ", store_name, (err, store) => {
        if (err) {
            result(err, null);
            return;
        }
        if (store.length === 0) {
            result({ kind: "store_name" }, null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 월별 매출 목록 조회
        sql.query("SELECT SALES_NUM, SALES_DATE, SALES_QUANTITY, SALES_PRICE, ETC FROM SALES WHERE STORE_NUM = ? AND SALES_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const sales_date = res[i].SALES_DATE;
                let formattedSalesDate =
                    sales_date.getFullYear() +
                    "-" +
                    ("0" + (sales_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + sales_date.getDate()).slice(-2) +
                    " " +
                    ("0" + sales_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + sales_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + sales_date.getSeconds()).slice(-2);
                res[i].SALES_DATE = formattedSalesDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 일별 매출 목록 조회
Sales.showSalesListByDay = (store_name, date, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ? ", store_name, (err, store) => {
        if (err) {
            result(err, null);
            return;
        }
        if (store.length === 0) {
            result({ kind: "store_name" }, null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 일별 매출 목록 조회
        sql.query("SELECT SALES_NUM, SALES_DATE, SALES_QUANTITY, SALES_PRICE, ETC FROM SALES WHERE STORE_NUM = ? and SALES_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const sales_date = res[i].SALES_DATE;
                let formattedSalesDate =
                    sales_date.getFullYear() +
                    "-" +
                    ("0" + (sales_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + sales_date.getDate()).slice(-2) +
                    " " +
                    ("0" + sales_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + sales_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + sales_date.getSeconds()).slice(-2);
                res[i].SALES_DATE = formattedSalesDate;
            }
            result(null, res);
        });
    });
};

module.exports = Sales;
