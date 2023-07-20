const sql = require("./db.js");

// 생성자
const Customer = function (customer) {
    this.customer_name = customer.customer_name;
    this.id = customer.id;
    this.pw = customer.pw;
    this.phone = customer.phone;
    this.email = customer.email;
};

// 소비자 회원가입
Customer.customerSignUp = (customer, result) => {
    sql.query("INSERT INTO CUSTOMER SET ?", customer, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {message: "SignUp Ok!"});
    });
};

// 아이디 중복 체크
Customer.customerCheckID = (id, result) => {
    sql.query("SELECT ID FROM CUSTOMER WHERE ID = ?", id, (err,res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// 소비자 로그인
Customer.customerLogIn = (id, pw, result) => {
    sql.query("SELECT CUSTOMER_NAME, ID FROM CUSTOMER WHERE ID = ? AND PW = ?", [id, pw], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "failed" }, null);
            return;
        }
        result(null, res);
    });
};

// 소비자 회원정보 조회
Customer.showCustomerInfo = (id, result) => {
    sql.query("SELECT CUSTOMER_NAME, ID, PHONE, EMAIL FROM CUSTOMER WHERE ID = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// 소비자 회원정보 수정
Customer.updateCustomerInfo = (customer, result) => {
    // 소비자 ID로 회원번호 찾기
    sql.query("SELECT CUSTOMER_NUM FROM CUSTOMER WHERE ID = ?", customer.id, (err,ret) => {
        if(err){
            result(err, null);
            return;
        }
        const customer_num = ret[0].CUSTOMER_NUM;
        // 회원정보 수정
        sql.query("UPDATE CUSTOMER SET PW = ?, PHONE = ?, EMAIL = ? WHERE CUSTOMER_NUM= ?", [customer.pw, customer.phone, customer.email, customer_num], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {message: "Update OK!"});
        });
    });
};

// 소비자 회원탈퇴
Customer.deleteCustomerInfo = (id, result) => {
    // 소비자 ID로 회원번호 찾기
    sql.query("SELECT CUSTOMER_NUM FROM CUSTOMER WHERE ID = ?", id, (err,ret) => {
        if(err){
            result(err,null);
            return;
        }
        const customer_num = ret[0].CUSTOMER_NUM;
        // 회원정보 삭제
        sql.query("DELETE FROM CUSTOMER WHERE CUSTOMER_NUM = ?", customer_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {message: "Delete OK!"});
        });
    });
};

module.exports = Customer;


