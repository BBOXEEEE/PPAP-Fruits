const sql = require("./db.js");

// 생성자 
const Owner = function(owner){
    this.owner_name = owner.owner_name;
    this.id = owner.id;
    this.pw = owner.pw;
    this.phone = owner.phone;
    this.email = owner.email
};

// 소비자 회원가입
Owner.ownerSignUp = (owner, result) => {
    sql.query("INSERT INTO STORE_OWNER SET ?", owner, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {message: "SignUp Ok!"});
    });
};

// 아이디 중복 체크
Owner.ownerCheckID = (id, result) => {
    sql.query("SELECT ID FROM STORE_OWNER WHERE ID = ?", id, (err,res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// 가맹점주 로그인
Owner.ownerLogIn = (id, pw, result) => {
    sql.query("SELECT OWNER_NAME, ID FROM STORE_OWNER WHERE ID = ? AND PW = ?", [id, pw], (err, res) => {
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

// 가맹점주 회원정보 조회
Owner.showOwnerInfo = (id, result) => {
    sql.query("SELECT OWNER_NAME, ID, PHONE, EMAIL FROM STORE_OWNER WHERE ID = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// 가맹점주 회원정보 수정
Owner.updateOwnerInfo = (owner, result) => {
    // 소비자 ID로 회원번호 찾기
    sql.query("SELECT OWNER_NUM FROM STORE_OWNER WHERE ID = ?", owner.id, (err,ret) => {
        if(err){
            result(err, null);
            return;
        }
        const owner_num = ret[0].OWNER_NUM;
        // 회원정보 수정
        sql.query("UPDATE STORE_OWNER SET PW = ?, PHONE = ?, EMAIL = ? WHERE OWNER_NUM= ?", [owner.pw, owner.phone, owner.email, owner_num], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {message: "Update OK!"});
        });
    });
};

// 가맹점주 회원탈퇴
Owner.deleteOwnerInfo = (id, result) => {
    // 소비자 ID로 회원번호 찾기
    sql.query("SELECT OWNER_NUM FROM STORE_OWNER WHERE ID = ?", id, (err,ret) => {
        if(err){
            result(err,null);
            return;
        }
        const owner_num = ret[0].OWNER_NUM;
        // 회원정보 삭제
        sql.query("DELETE FROM STORE_OWNER WHERE OWNER_NUM = ?", owner_num, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {message: "Delete OK!"});
        });
    });
};

module.exports = Owner;
 

