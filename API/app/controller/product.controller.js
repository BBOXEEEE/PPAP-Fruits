const Product = require("../model/product.model.js");

// 소비자에게 보여지는 상품 정보
exports.showToCustomer = (req, res) => {
    Product.showToCustomer(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.json(data);
    });
};

// 가맹점주에게 보여지는 상품 정보
exports.showToOwner = (req, res) => {
    Product.showToOwner(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.json(data);
    });
};

// 가맹점주가 상품 상태 수정s
exports.changeStatus = (req, res) => {
    Product.changeStatus(req.body, (err, data) => {
        if (err) {
            if(err.kind === "invalid_status"){
                res.status(400).json("invalid status!");
            } else {
                res.status(500).json({message: err.message});
            }
        } else res.send(data);
    });
};