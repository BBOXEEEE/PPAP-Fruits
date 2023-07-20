const Product = require("../model/nextday.model.js");


// 다음날 버튼 클릭 시 상품 상태 업데이트
exports.updateProductStatus = (req, res) => {
    let today = new Date(req.body.today);
    Product.updateProductStatus(today, (err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        } else res.status(200).json(data);
    });
};
