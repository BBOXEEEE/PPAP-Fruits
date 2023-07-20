const sql = require("./db.js");

// fruits 생성자
const Fruits = function (fruits) {
    this.fruits_name = fruits.fruits_name;
    this.fruits_num = fruits.fruits_num;
    this.price = fruits.price;
    this.image = fruits.image;
    this.fruits_desc = fruits.fruits_desc;
};

// 과일 목록 조회 : 과일명, 원가
Fruits.showFruitsList = (result) => {
    sql.query("SELECT FRUITS_NAME, PRICE FROM FRUITS", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Fruits;
