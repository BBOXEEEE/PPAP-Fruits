const sql = require("./db.js");

const Product = function (product) {
    this.product_num = product.product_num;
    this.store_num = product.store_num;
    this.product_name = product.product_name;
    this.quantity = product.quantity;
    this.expire_date = product.expire_date;
    this.price = product.price;
    this.supply_num = product.supply_num;
};

// 소비자에게 보여지는 상품 정보
Product.showToCustomer = (store_name, result) => {
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

        // 소비자에게 보여지는 상품 정보 조회
        sql.query("SELECT P.PRODUCT_NUM, P.PRODUCT_NAME, P.PRICE, P.QUANTITY, P.EXPIRE_DATE, F.IMAGE, F.FRUITS_DESC FROM PRODUCT AS P JOIN SUPPLY AS S ON P.SUPPLY_NUM = S.SUPPLY_NUM JOIN PRODUCER AS G ON S.PRODUCER_NUM = G.PRODUCER_NUM JOIN FRUITS AS F ON G.FRUITS_NUM = F.FRUITS_NUM WHERE P.STORE_NUM = ? AND P.PRODUCT_STATUS = '판매중'", store_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const expire_date = res[i].EXPIRE_DATE;
                let formattedExpireDate =
                    expire_date.getFullYear() +
                    "-" +
                    ("0" + (expire_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + expire_date.getDate()).slice(-2);
                res[i].EXPIRE_DATE = formattedExpireDate;
            }
            result(null, res);
            return;
        });
    });
};

// 가맹점주에게 보여지는 상품 정보
Product.showToOwner = (store_name, result) => {
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

        // 가맹점주에게 보여지는 상품 정보 조회
        sql.query("SELECT * FROM PRODUCT WHERE STORE_NUM = ?", store_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            // 날짜 형식 변환
            for (let i = 0; i < res.length; ++i) {
                const expire_date = res[i].EXPIRE_DATE;
                let formattedExpireDate =
                    expire_date.getFullYear() +
                    "-" +
                    ("0" + (expire_date.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + expire_date.getDate()).slice(-2);
                res[i].EXPIRE_DATE = formattedExpireDate;
            }
            result(null, res);
        });
    });
};

// 가맹점주가 반품 버튼 클릭 시 상품 반품 처리 (매출 테이블에 판매가격의 50%로 반품상품으로 등록)
Product.changeStatus = async (request, result) => {
    try {
        for (let i = 0; i < request.length; ++i) {
            const statuses = await new Promise((resolve, reject) => {
                sql.query("SELECT PRODUCT_STATUS FROM PRODUCT WHERE PRODUCT_NUM = ?", request[i].product_num, (err, statuses) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(statuses);
                    }
                });
            });

            if (statuses[0].PRODUCT_STATUS !== "반품처리") {
                result({ kind: "invalid_status" });
                return;
            }
        }

        for (let i = 0; i < request.length; ++i) {
            const product = await new Promise((resolve, reject) => {
                sql.query("SELECT PRICE, QUANTITY, STORE_NUM FROM PRODUCT WHERE PRODUCT_NUM = ?", request[i].product_num, (err, product) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(product);
                    }
                });
            });

            const price = product[0].PRICE;
            const quantity = product[0].QUANTITY;
            const store_num = product[0].STORE_NUM;

            await new Promise((resolve, reject) => {
                sql.query("UPDATE PRODUCT SET PRODUCT_STATUS = '반품' WHERE PRODUCT_NUM = ?", request[i].product_num, (err, status) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

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

            await new Promise((resolve, reject) => {
                sql.query("INSERT INTO SALES (PRODUCT_NUM, STORE_NUM, SALES_DATE, SALES_PRICE, SALES_QUANTITY, ETC) VALUES(?, ?, ?, ?, ?, 1)",
                    [
                        request[i].product_num,
                        store_num,
                        formattedDateTime,
                        price * 0.5 * quantity,
                        quantity
                    ], (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
        }

        result(null, { message: "Return OK!" });
    } catch (err) {
        result(err, null);
    }
};



module.exports = Product;