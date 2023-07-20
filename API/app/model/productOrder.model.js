const sql = require("./db.js");

const Request = function (request) {
    this.store_name = request.store_name;
    this.product_num = request.product_num;
    this.id = request.id;
    this.quantity = request.quantity;
};
const Ordered = function (ordered) {
    this.store_num = ordered.store_num;
    this.product_num = ordered.product_num;
    this.customer_num = ordered.customer_num;
    this.ordered_quantity = ordered.ordered_quantity;
    this.ordered_date = ordered.ordered_date;
}
const Sales = function (sales) {
    this.product_num = sales.product_num;
    this.store_num = sales.store_num;
    this.sales_date = sales.sales_date;
    this.sales_price = sales.sales_price;
    this.sales_quantity = sales.sales_quantity;
    this.etc = sales.etc;
}

// 상품주문
Request.productOrder = (request, result) => {
    //  상품번호로 주문 가능 여부 확인
    sql.query("SELECT QUANTITY FROM PRODUCT WHERE PRODUCT_NUM = ?", request.product_num, (err, quantity) => {
        if (err) {
            result(err, null);
            return;
        }
        if (quantity[0].QUANTITY < request.quantity) {
            result({ kind: "cannot order" }, null);
            return;
        }
        const curr_quantity = quantity[0].QUANTITY;

        // 가맹점 이름으로 가맹점 번호 찾기
        sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", request.store_name, (err, store) => {
            if (err) {
                result(err, null);
                return;
            }
            if (store.length === 0) {
                result({ kind: "store_name" }, null);
                return;
            }
            const store_num = store[0].STORE_NUM;

            // 소비자 ID로 회원번호 찾기
            sql.query("SELECT CUSTOMER_NUM FROM CUSTOMER WHERE ID = ?", request.id, (err, customer) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (customer.length === 0) {
                    result({ kind: "customer_id" }, null);
                    return;
                }
                const customer_num = customer[0].CUSTOMER_NUM;

                // 현재 DATETIME (YYYY-MM-DD HH:MM:SS)
                var date = new Date();
                let currentDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
                var formattedDateTime =
                    currentDate.getFullYear() +
                    "-" +
                    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + currentDate.getDate()).slice(-2) +
                    " " +
                    ("0" + currentDate.getHours()).slice(-2) +
                    ":" +
                    ("0" + currentDate.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + currentDate.getSeconds()).slice(-2);

                // 주문 테이블 생성자
                const ordered = new Ordered({
                    store_num: store_num,
                    product_num: request.product_num,
                    customer_num: customer_num,
                    ordered_quantity: request.quantity,
                    ordered_date: formattedDateTime
                });
                // 주문 테이블에 값 추가
                sql.query("INSERT INTO ORDERED SET ?", ordered, (err, ordered) => {
                    if (err) {
                        result(err, null);
                        return;
                    }

                    // 상품번호로 상품 가격 찾아 판매가격 만들기 (상품가격 * 수량)
                    sql.query("SELECT PRICE FROM PRODUCT WHERE PRODUCT_NUM = ?", request.product_num, (err, product) => {
                        if (err) {
                            result(err, null);
                            return;
                        }
                        const sales_price = product[0].PRICE * request.quantity;

                        // 판매 테이블 생성자
                        const sales = new Sales({
                            product_num: request.product_num,
                            store_num: store_num,
                            sales_date: formattedDateTime,
                            sales_price: sales_price,
                            sales_quantity: request.quantity
                        });
                        // 판매 테이블에 값 추가
                        sql.query("INSERT INTO SALES SET ?", sales, (err, sales) => {
                            if (err) {
                                result(err, null);
                                return;
                            }

                            // 판매 수량만큼 상품 테이블의 상품 개수 차감
                            const update_quantity = (curr_quantity - request.quantity);
                            sql.query("UPDATE PRODUCT SET QUANTITY = ?, PRODUCT_STATUS = CASE WHEN ? = 0 THEN '판매완료' ELSE PRODUCT_STATUS END WHERE PRODUCT_NUM = ?", [update_quantity, update_quantity, request.product_num], (err, update) => {
                                if (err) {
                                    result(err, null);
                                    return;
                                }
                                result(null, {message: "Ordered OK!"});
                            });
                        });
                    });
                });
            });
        });
    });
};

module.exports = Request;