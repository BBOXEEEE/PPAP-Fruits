const Customer = require("../model/customer.model.js");

// 소비자로 회원가입
exports.customerSignUp = (req, res) => {
    if (!req.body.name || !req.body.id || !req.body.pw) {
        res.status(400).json({ message: "{name, ID, PW} cannot be null!" });
    };
    const customer = new Customer({
        customer_name: req.body.name,
        id: req.body.id,
        pw: req.body.pw,
        phone: req.body.phone,
        email: req.body.email
    });
    Customer.customerSignUp(customer, (err,data) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else res.status(201).json(data);
    });
};

// 아이디 중복 체크
exports.customerCheckID = (req, res) => {
    Customer.customerCheckID(req.params.id, (err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        } else res.status(200).json(data);
    });
};

// 소비자로 로그인
exports.customerLogIn = (req, res) => {
    Customer.customerLogIn(req.body.id, req.body.pw, (err, data) => {
        if (err) {
            if (err.kind === "failed") {
                res.status(406).json({message: "invalid user"});
            } else {
                res.status(500).json({message: err.message});
            }
        } else res.status(200).json(data);
    });
};

// 소비자 회원정보 조회
exports.showCustomerInfo = (req, res) => {
    Customer.showCustomerInfo(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({message: err.message});
        }
        else res.status(200).json(data);
    });
};

// 소비자 회원정보 수정
exports.updateCustomerInfo = (req, res) => {
    if (!req.body.id || !req.body.pw) {
        res.status(400).json({ message: "{ID, PW} cannot be null!" });
    }
    const customer = new Customer({
        id: req.body.id,
        pw: req.body.pw,
        phone: req.body.phone,
        email: req.body.email
    });
    Customer.updateCustomerInfo(customer, (err, data) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else res.status(201).json(data);
    }
    );
};

// 소비자 회원탈퇴
exports.deleteCustomerInfo = (req, res) => {
    Customer.deleteCustomerInfo(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else res.status(200).json(data);
    });
};