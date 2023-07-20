module.exports = app =>{
    const customer = require("../controller/customer.controller.js");

    // 소비자 회원가입
    app.post("/customer/signup", customer.customerSignUp);

    // 아이디 중복 체크
    app.get("/customer/check/:id", customer.customerCheckID);

    // 소비자 로그인
    app.post("/customer/login",customer.customerLogIn);

    // id로 조회
    app.get("/customer/:id", customer.showCustomerInfo);

    // id로 수정
    app.put("/customer/update", customer.updateCustomerInfo);

    // id로 삭제
    app.delete("/customer/:id", customer.deleteCustomerInfo);
};