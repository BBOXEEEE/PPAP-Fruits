const Request = require("../model/productRegister.model.js");

// 상품 등록
exports.productRegister = (req,res)=>{
    if(!req.body.store_name || !req.body.fruits_name){
        res.status(400).json({message: "null 값 전달 불가"});
    };
    if(req.body.quantity <= 0){
        res.status(400).json({message: "수량은 1개 이상이어야합니다."});
    };
    const request = new Request({
        store_name: req.body.store_name,
        fruits_name: req.body.fruits_name,
        quantity: req.body.quantity
    });
    Request.productRegister(request, (err,data) =>{
        if(err){
            if(err.kind === "store_name"){
                res.status(400).json({message: "요청한 가맹점을 찾을 수 없습니다."});
            } else if(err.kind === "fruits_name"){
                res.status(400).json({message: "요청한 과일을 찾을 수 없습니다."});
            } else{
                res.status(500).json({message: err.message});
            }
        }
        else res.status(201).json(data);
    });
};
