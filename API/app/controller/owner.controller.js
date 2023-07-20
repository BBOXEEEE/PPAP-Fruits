const Owner = require("../model/owner.model.js");

// 가맹점주 회원가입
exports.ownerSignUp = (req, res) => {
    if (!req.body.name || !req.body.id || !req.body.pw) {
        res.status(400).json({ message: "{name, ID, PW} cannot be null!" });
    };
    const owner = new Owner({
        owner_name: req.body.name,
        id: req.body.id,
        pw: req.body.pw,
        phone: req.body.phone,
        email: req.body.email
    });
    Owner.ownerSignUp(owner, (err,data) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else res.status(201).json(data);
    });
};

// 아이디 중복 체크
exports.ownerCheckID = (req, res) => {
    Owner.ownerCheckID(req.params.id, (err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        } else res.status(200).json(data);
    });
};

// 가맹점주 로그인
exports.ownerLogIn = (req, res) => {
    Owner.ownerLogIn(req.body.id, req.body.pw, (err, data) => {
        if (err) {
            if (err.kind === "failed") {
                res.status(406).json({ message: "invalid user" });
            } else {
                res.status(500).json({ message: err.message });
            }
        } else res.status(200).json(data);
    });
};

// 가맹점주 회원정보 조회
exports.showOwnerInfo = (req, res) => {
    Owner.showOwnerInfo(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({message: err.message});
        }
        else res.status(200).json(data);
    });
};

// 가맹점주 회원정보 수정
exports.updateOwnerInfo = (req, res) => {
    if (!req.body.id || !req.body.pw) {
        res.status(400).json({ message: "{ID, PW} cannot be null!" });
    };
    const owner = new Owner({
        id: req.body.id,
        pw: req.body.pw,
        phone: req.body.phone,
        email: req.body.email
    });
    Owner.updateOwnerInfo(owner, (err, data) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else res.status(201).json(data);
    }
    );
};

// 가맹점주 회원탈퇴
exports.deleteOwnerInfo = (req, res) => {
    Owner.deleteOwnerInfo(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else res.status(200).json(data);
    });
};