const Expend = require("../model/expend.model.js");

// 가맹점별 지출 목록 조회
exports.showExpendList = (req, res) => {
    Expend.showExpendList(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 월별 지출 목록 조회
exports.showExpendListByMonth = (req, res) => {
    Expend.showExpendListByMonth(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 일별 지출 목록 조회
exports.showExpendListByDay = (req, res) => {
    Expend.showExpendListByDay(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};