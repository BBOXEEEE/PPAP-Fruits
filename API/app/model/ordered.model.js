const sql = require("./db.js");

// 생성자
const Ordered = function (ordered) {
    this.ordered_num = ordered.ordered_num;
    this.product_num = ordered.product_num;
    this.customer_num = ordered.customer_num;
    this.ordered_quantity = ordered.ordered_quantity;
    this.ordered_date = ordered.ordered_date;
};

// 가맹점별 주문 목록 조회: 가맹점주에게 보여지는 목록
Ordered.showToOwner = (store_name, result) => {
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

        sql.query("SELECT O.ORDERED_NUM, P.PRODUCT_NAME, O.CUSTOMER_NUM, O.ORDERED_QUANTITY, O.ORDERED_DATE FROM ORDERED AS O JOIN PRODUCT AS P ON O.PRODUCT_NUM = P.PRODUCT_NUM WHERE O.STORE_NUM = ?", store_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const ordered_date = res[i].ORDERED_DATE;
                let formattedOrderedDate =
                    ordered_date.getFullYear() +
                    "-" +
                    ("0" + (ordered_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + ordered_date.getDate()).slice(-2) +
                    " " +
                    ("0" + ordered_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getSeconds()).slice(-2);
                res[i].ORDERED_DATE = formattedOrderedDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 월별 주문 목록 조회: 가맹점주에게 보여지는 목록
Ordered.showToOwnerByMonth = (store_name, date, result) => {
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

        sql.query("SELECT O.ORDERED_NUM, O.ORDERED_DATE, P.PRODUCT_NAME, O.CUSTOMER_NUM, O.ORDERED_QUANTITY FROM ORDERED AS O JOIN PRODUCT AS P ON O.PRODUCT_NUM = P.PRODUCT_NUM WHERE O.STORE_NUM = ? AND ORDERED_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const ordered_date = res[i].ORDERED_DATE;
                let formattedOrderedDate =
                    ordered_date.getFullYear() +
                    "-" +
                    ("0" + (ordered_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + ordered_date.getDate()).slice(-2) +
                    " " +
                    ("0" + ordered_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getSeconds()).slice(-2);
                res[i].ORDERED_DATE = formattedOrderedDate;
            }
            result(null, res);
        });
    });
};

// 가맹점별 일별 주문 목록 조회: 가맹점주에게 보여지는 목록
Ordered.showToOwnerByDay = (store_name, date, result) => {
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

        sql.query("SELECT O.ORDERED_NUM, O.ORDERED_DATE, P.PRODUCT_NAME, O.CUSTOMER_NUM, O.ORDERED_QUANTITY FROM ORDERED AS O JOIN PRODUCT AS P ON O.PRODUCT_NUM = P.PRODUCT_NUM WHERE O.STORE_NUM = ? AND ORDERED_DATE LIKE ?", [store_num, date + '%'], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const ordered_date = res[i].ORDERED_DATE;
                let formattedOrderedDate =
                    ordered_date.getFullYear() +
                    "-" +
                    ("0" + (ordered_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + ordered_date.getDate()).slice(-2) +
                    " " +
                    ("0" + ordered_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getSeconds()).slice(-2);
                res[i].ORDERED_DATE = formattedOrderedDate;
            }
            result(null, res);
        });
    });
};

// 주문 목록 조회 : 소비자에게 보여지는 목록
Ordered.showToCustomer = (id, result) => {
    // 소비자 ID로 회원번호 찾기
    sql.query("SELECT CUSTOMER_NUM FROM CUSTOMER WHERE ID = ?", id, (err, customer) => {
        if (err) {
            result(err, null);
            return;
        }
        if (customer.length === 0) {
            result({ kind: "customer_id" }, null);
            return;
        }
        const customer_num = customer[0].CUSTOMER_NUM;

        // 주문 목록 조회
        sql.query("SELECT S.STORE_NAME, P.PRODUCT_NAME, O.ORDERED_QUANTITY, O.ORDERED_DATE FROM ORDERED AS O JOIN STORE AS S ON O.STORE_NUM = S.STORE_NUM JOIN PRODUCT AS P ON O.PRODUCT_NUM = P.PRODUCT_NUM WHERE CUSTOMER_NUM = ?", customer_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const ordered_date = res[i].ORDERED_DATE;
                let formattedOrderedDate =
                    ordered_date.getFullYear() +
                    "-" +
                    ("0" + (ordered_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + ordered_date.getDate()).slice(-2) +
                    " " +
                    ("0" + ordered_date.getHours()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + ordered_date.getSeconds()).slice(-2);
                res[i].ORDERED_DATE = formattedOrderedDate;
            }
            result(null, res);
        });
    });
};

module.exports = Ordered;
