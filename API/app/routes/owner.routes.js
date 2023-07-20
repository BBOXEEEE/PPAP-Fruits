module.exports = app =>{
    const owner = require("../controller/owner.controller.js");

    // 소비자 회원가입
    app.post("/owner/signup", owner.ownerSignUp);

    // 아이디 중복 체크
    app.get("/owner/check/:id", owner.ownerCheckID);
    
    // 소비자 로그인
    app.post("/owner/login", owner.ownerLogIn);

    // id로 조회
    app.get("/owner/:id", owner.showOwnerInfo);

    // id로 수정
    app.put("/owner/update", owner.updateOwnerInfo);

    // id로 삭제
    app.delete("/owner/:id", owner.deleteOwnerInfo);
};