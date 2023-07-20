const sql = require("./db.js");

const Expend = function (expend) {
    this.expend_num = expend.expend_num;
    this.store_num = expend.store_num;
    this.expend_price = expend.expend_price;
    this.expend_date = expend.expend_date;
    this.supply_num = expend.supply_num;
} 

// 가맹점별 지출 목록 조회
Expend.showExpendList = (store_name, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", store_name, (err, store) => {
        if (err) {
            result(err, null);
            return;
        }
        if (store.length === 0) {
            result({kind: "store_name"}, null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 지출 목록 조회
        sql.query("SELECT * FROM EXPEND WHERE STORE_NUM = ?", store_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const expend_date = res[i].EXPEND_DATE;
                let formattedExpendDate =
                    expend_date.getFullYear() +
                    "-" +
                    ("0" + (expend_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + expend_date.getDate()).slice(-2) +
                    " " +
                    ("0" + expend_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + expend_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + expend_date.getSeconds()).slice(-2);
                res[i].EXPEND_DATE = formattedExpendDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 월별 지출 목록 조회
Expend.showExpendListByMonth = (store_name, date, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", store_name, (err, store) => {
        if (err) {
            result(err, null);
            return;
        }
        if (store.length === 0) {
            result({kind: "store_name"}, null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 월별 지출 목록 조회
        sql.query("SELECT EXPEND_NUM, EXPEND_DATE, EXPEND_PRICE, SUPPLY_NUM FROM EXPEND WHERE STORE_NUM = ? AND EXPEND_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const expend_date = res[i].EXPEND_DATE;
                let formattedExpendDate =
                    expend_date.getFullYear() +
                    "-" +
                    ("0" + (expend_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + expend_date.getDate()).slice(-2) +
                    " " +
                    ("0" + expend_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + expend_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + expend_date.getSeconds()).slice(-2);
                res[i].EXPEND_DATE = formattedExpendDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 일별 지출 목록 조회
Expend.showExpendListByDay = (store_name, date, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT * FROM STORE WHERE STORE_NAME = ?", store_name, (err, store) => {
        if (err) {
            result(err, null);
            return;
        }
        if (store.length === 0) {
            result({kind: "store_name"}, null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 일별 지출 목록 조회
        sql.query("SELECT EXPEND_NUM, EXPEND_DATE, EXPEND_PRICE, SUPPLY_NUM FROM EXPEND WHERE STORE_NUM = ? AND EXPEND_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const expend_date = res[i].EXPEND_DATE;
                let formattedExpendDate =
                    expend_date.getFullYear() +
                    "-" +
                    ("0" + (expend_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + expend_date.getDate()).slice(-2) +
                    " " +
                    ("0" + expend_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + expend_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + expend_date.getSeconds()).slice(-2);
                res[i].EXPEND_DATE = formattedExpendDate;
            }
            result(null, res);
        });
    });
};

module.exports = Expend;