const Sales = require("../model/sales.model.js");

// 가맹점별 매출 목록 조회
exports.showSalesList = (req, res) => {
    Sales.showSalesList(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점별 월별 매출 목록 조회
exports.showSalesListByMonth = (req, res) => {
    Sales.showSalesListByMonth(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    }
    );
};

// 가맹점별 일별 매출 목록 조회
exports.showSalesListByDay = (req, res) => {
    Sales.showSalesListByDay(req.params.store_name, req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({ message: "요청한 가맹점을 찾을 수 없습니다." });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    }
    );
};