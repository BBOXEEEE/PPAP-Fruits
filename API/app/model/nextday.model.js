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

// 다음날 버튼 클릭 시 상품 상태 업데이트
Product.updateProductStatus = (today, result) => {
    // 다음날 생성
    let nextDay = new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000));

    // 모든 가맹점의 상품 상태가 판매중인 상품의 가격을 2% 할인된 가격으로 변경
    sql.query("UPDATE PRODUCT SET PRICE = PRICE * 0.98 WHERE PRODUCT_STATUS = '판매중'", (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        // 모든 가맹점의 유통 기한이 지난 상품 중 상품 상태가 판매중인 상품을 반품처리 상태로 변경
        sql.query("UPDATE PRODUCT SET PRODUCT_STATUS = '반품처리' WHERE CONVERT_TZ(EXPIRE_DATE, '+00:00', @@session.time_zone) < ? AND PRODUCT_STATUS = '판매중'", nextDay, (err, res) => {
            if(err){
                result(err,null);
                return;
            }
            
            // 다음날 반환
            result(null, nextDay);
        });
    });
};

module.exports = Product;
