const sql = require("./db.js");

const Request = function(request){
    this.store_name = request.store_name;
    this.fruits_name = request.fruits_name;
    this.quantity = request.quantity;
}
const Supply = function(supply){
    this.store_num = supply.store_num;
    this.count = supply.count;
    this.supply_price = supply.supply_price;
    this.supply_date = supply.supply_date;
    this.producer_num = supply.producer_num;
}
const Expend = function(expend){
    this.store_num = expend.store_num;
    this.expend_price = expend.expend_price;
    this.expend_date = expend.expend_date;
    this.supply_num = expend.supply_num;
}
const Product = function(product){
    this.store_num = product.store_num;
    this.product_name = product.product_name;
    this.quantity = product.quantity;
    this.expire_date = product.expire_date;
    this.price = product.price;
    this.supply_num = product.supply_num;
}

// 상품 등록
Request.productRegister = (request, result) => {
    // Request의 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", [request.store_name], (err, store) => {
        if(err){
            result(err, null);
            return;
        }
        if(store.length === 0){
            result({kind:"store_name"},null);
            return;
        }
        const store_num = store[0].STORE_NUM;

        // Request의 과일 이름으로 과일번호, 원가 찾기
        sql.query("SELECT FRUITS_NUM, PRICE FROM FRUITS WHERE FRUITS_NAME = ?", [request.fruits_name], (err, fruit) => {
            if(err){
                result(err, null);
                return;
            }
            if(fruit.length === 0){
                result({kind:"fruits_name"}, null);
                return;
            }
            const fruits_num = fruit[0].FRUITS_NUM;
            const fruits_price = fruit[0].PRICE;
        
            // 과일번호로 공급자번호 찾기
            sql.query("SELECT PRODUCER_NUM FROM PRODUCER WHERE FRUITS_NUM = ?", [fruits_num], (err, producer) => {
                if(err){
                    result(err, null);
                    return;
                }
                const producer_num = producer[0].PRODUCER_NUM;

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

                // 발주테이블 생성자
                const supply = new Supply({
                    store_num: store_num,
                    count: request.quantity,
                    supply_price: request.quantity * fruits_price,
                    supply_date: formattedDateTime,
                    producer_num: producer_num
                });
                // 발주 테이블에 값 추가
                sql.query("INSERT INTO SUPPLY SET ?", supply, (err, supplyResult) => {
                    if(err){
                        result(err, null);
                        return;
                    }
                    const supply_num = supplyResult.insertId;

                    // 지출테이블 생성자를 통해 새로운 지출 튜플 생성
                    const expend = new Expend({
                        store_num: store_num,
                        expend_price: request.quantity * fruits_price,
                        expend_date: formattedDateTime,
                        supply_num: supply_num
                    });
                    // 지출 테이블에 값 추가
                    sql.query("INSERT INTO EXPEND SET ?", expend, (err, expendResult) => {
                        if(err){
                            result(err, null);
                            return;
                        }

                        // 발주날짜 (현재시간)을 기준으로 7일 후의 날짜가 유통기한
                        var nextDate = new Date(currentDate.getTime() + (8 * 24 * 60 * 60 * 1000));
                        nextDate.setHours(23);
                        nextDate.setMinutes(59);
                        nextDate.setSeconds(0);
                        var formattedExpireDate =
                            nextDate.getFullYear() +
                            "-" +
                            ("0" + (nextDate.getMonth() + 1)).slice(-2) +
                            "-" +
                            ("0" + nextDate.getDate()).slice(-2) +
                            " " +
                            ("0" + nextDate.getHours()).slice(-2) +
                            ":" +
                            ("0" + nextDate.getMinutes()).slice(-2) +
                            ":" +
                            ("0" + nextDate.getSeconds()).slice(-2);

                        // 상품테이블 생성자를 통해 새로운 상품 튜플 생성
                        const product = new Product({
                            store_num: store_num,
                            product_name: request.fruits_name,
                            quantity: request.quantity,
                            expire_date: formattedExpireDate,
                            price: fruits_price * 1.5,
                            supply_num: supply_num
                        });
                        // 상품 테이블에 값 추가
                        sql.query("INSERT INTO PRODUCT SET ?", product, (err, productResult) => {
                            if(err){
                                result(err, null);
                                return;
                            }
                            result(null, [
                                {supplyResult: {supply_num: supplyResult.insertId, ...supply}},
                                {expendResult: {expend_num: expendResult.insertId, ...expend}},
                                {productResult: {product_num: productResult.insertId, ...product}}
                            ]);
                        });
                    });
                });
            });
        });
    });
};

module.exports = Request;