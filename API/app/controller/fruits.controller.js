const Fruits = require("../model/fruits.model.js");

// 과일 목록 조회 : 과일명, 원가
exports.showFruitsList = (req, res) => {
    Fruits.showFruitsList((err, data) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else res.status(200).json(data);
    });
};
