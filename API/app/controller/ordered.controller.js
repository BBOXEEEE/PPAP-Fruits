const Ordered = require("../model/ordered.model.js");

// 가맹점별 주문 목록 조회: 가맹점주에게 보여지는 목록
exports.showToOwner = (req, res) => {
    Ordered.showToOwner(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 월별 주문 목록 조회: 가맹점주에게 보여지는 목록
exports.showToOwnerByMonth = (req, res) => {
    Ordered.showToOwnerByMonth(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 일별 주문 목록 조회: 가맹점주에게 보여지는 목록
exports.showToOwnerByDay = (req, res) => {
    Ordered.showToOwnerByDay(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// customer_num 으로 조회
exports.showToCustomer = (req, res) => {
    Ordered.showToCustomer(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "customer_id") {
                res.status(400).json({ message: "요청한 회원아이디를 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

