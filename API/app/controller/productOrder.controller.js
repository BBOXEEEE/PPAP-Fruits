const Request = require("../model/productOrder.model.js");

// 상품 등록 
exports.productOrder = (req, res) => {
    if (!req.body.store_name || !req.body.product_num || !req.body.id) {
        res.status(400).json({ message: "null 값 전달 불가" });
    };
    if (req.body.quantity <= 0) {
        res.status(400).json({ message: "수량은 1개 이상이어야합니다." });
    };
    const request = new Request({
        store_name: req.body.store_name,
        product_num: req.body.product_num,
        id: req.body.id,
        quantity: req.body.quantity
    });
    Request.productOrder(request, (err, data) => {
        if (err) {
            if (err.kind === "cannot order") {
                res.status(400).json({ message: "주문 가능 수량 초과" });
            } else if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else if (err.kind === "custoer_id") {
                res.status(400).json({ message: "소비자 ID를 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        }
        else res.status(201).json(data);
    });
};

