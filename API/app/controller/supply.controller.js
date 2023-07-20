const Supply = require("../model/supply.model.js");

// 가맹점별 발주 목록 조회
exports.showSupplyList = (req, res) => {
    Supply.showSupplyList(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 월별 발주 목록 조회
exports.showSupplyListByMonth = (req, res) => {
    Supply.showSupplyListByMonth(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 일별 발주 목록 조회
exports.showSupplyListByDay = (req, res) => {
    Supply.showSupplyListByDay(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};