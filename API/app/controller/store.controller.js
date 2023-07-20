const Store = require("../model/store.model.js");

// 가맹점 추가
exports.storeRegister = (req, res) => {
    if (!req.body.name || !req.body.location) {
        res.status(400).json({message: "{name, location} cannot be null!"});
    };
    const store = new Store({
        store_name: req.body.name,
        location: req.body.location,
        tel: req.body.tel
    });
    Store.storeRegister(req.body.owner_id, store, (err, data) => {
        if (err) {
            if(err.kind === "owner_id"){
                res.status(400).json({message: "요청한 가맹점주 id를 찾을 수 없습니다."});
            } else{
                res.status(500).json({message: err.message});
            }
        } else res.status(201).json(data);
    });
};

// 가맹점주가 소유한 가맹점 조회
exports.showStoreListByOwner = (req,res) => {
    Store.showStoreListByOwner(req.params.id, (err,data) => {
        if(err){
            if(err.kind === "owner_id"){
                res.status(400).json({message: "요청한 가맹점주 id를 찾을 수 없습니다."});
            } else{
                res.status(500).json({message: err.message});
            }
        } else{
            res.status(200).json(data);
        }
    });
};

// 전체 가맹점 목록 조회
exports.showStoreList = (req, res) => {
    Store.showStoreList((err,data) => {
        if(err){
            res.status(500).json({message: err.message});
        } else res.status(200).json(data);
    });
};

// 가맹점 정보 수정
exports.updateStoreInfo = (req, res) => {
    if(!req.body.location || !req.body.tel){
        res.status(400).json({message: "{Location, TEL} cannot be null!"});
    }
    const store = new Store({
        store_name: req.body.name,
        location: req.body.location,
        tel: req.body.tel
    });
    
    Store.updateStoreInfo(store, (err,data) => {
        if(err){
            if(err.kind === "store_name"){
                res.status(400).json({message: "요청한 가맹점 이름을 찾을 수 없습니다"});
            } else{
                res.status(500).json({message: err.message});
            }
        } else res.status(201).json(data);
    });
};

// 가맹점 삭제
exports.deleteStore = (req, res) => {
    Store.deleteStore(req.params.store_name, (err, data) => {
        if (err) {
            if (err.kind === "store_name") {
                res.status(400).json({message: "요청한 가맹점 이름을 찾을 수 없습니다."});
            } else {
                res.status(500).send({message: err.message});
            }
        } else res.status(200).json(data);
    });
};