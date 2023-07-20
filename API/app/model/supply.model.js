const sql = require("./db.js");

// 생성자
const Supply = function (supply) {
    this.supply_num = supply.supply_num;
    this.store_num = supply.store_num;
    this.count = supply.count;
    this.supply_price = supply.supply_price;
    this.supply_date = supply.supply_date;
    this.producer_num = supply.producer_num;
};

// 가맹점별 발주 목록 조회
Supply.showSupplyList = (store_name, result) => {
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

        // 가맹점별 발주 목록 조회
        sql.query("SELECT * FROM SUPPLY WHERE STORE_NUM = ?", store_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const supply_date = res[i].SUPPLY_DATE;
                let formattedSupplyDate =
                    supply_date.getFullYear() +
                    "-" +
                    ("0" + (supply_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + supply_date.getDate()).slice(-2) +
                    " " +
                    ("0" + supply_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + supply_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + supply_date.getSeconds()).slice(-2);
                res[i].SUPPLY_DATE = formattedSupplyDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 월별 발주 목록 조회
Supply.showSupplyListByMonth = (store_name, date, result) => {
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

        // 가맹점별 월별 발주 목록 조회
        sql.query("SELECT SUPPLY_NUM, SUPPLY_DATE, COUNT, SUPPLY_PRICE, PRODUCER_NUM FROM SUPPLY WHERE STORE_NUM = ? AND SUPPLY_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const supply_date = res[i].SUPPLY_DATE;
                let formattedSupplyDate =
                    supply_date.getFullYear() +
                    "-" +
                    ("0" + (supply_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + supply_date.getDate()).slice(-2) +
                    " " +
                    ("0" + supply_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + supply_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + supply_date.getSeconds()).slice(-2);
                res[i].SUPPLY_DATE = formattedSupplyDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 일별 발주 목록 조회
Supply.showSupplyListByDay = (store_name, date, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT * FROM STORE WHERE STORE_NAME = ?", store_name, (err, store) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (store.length === 0) {
            console.log("Store Name not found.");
            result("Store Name not found.", null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점별 일별 발주 목록 조회
        sql.query("SELECT SUPPLY_NUM, SUPPLY_DATE, COUNT, SUPPLY_PRICE, PRODUCER_NUM FROM SUPPLY WHERE STORE_NUM = ? AND SUPPLY_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const supply_date = res[i].SUPPLY_DATE;
                let formattedSupplyDate =
                    supply_date.getFullYear() +
                    "-" +
                    ("0" + (supply_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + supply_date.getDate()).slice(-2) +
                    " " +
                    ("0" + supply_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + supply_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + supply_date.getSeconds()).slice(-2);
                res[i].SUPPLY_DATE = formattedSupplyDate;
            }
            result(null, res);
        });
    });
};

module.exports = Supply;