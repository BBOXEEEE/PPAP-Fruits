const sql = require("./db.js");

// 생성자 
const Store = function(store){
    this.store_num = store.store_num;
    this.store_name = store.store_name;
    this.location = store.location;
    this.tel = store.tel;
    this.owner_num = store.owner_num;
};

// 가맹점 추가
Store.storeRegister = (id, store, result)=>{
    // 가맹점주 ID로 가맹점주 번호 찾기
    sql.query("SELECT OWNER_NUM FROM STORE_OWNER WHERE ID = ?", id, (err, owner) => {
        if(err){
            result(err, null);
            return;
        }
        if(owner.length === 0){
            result({kind: "owner_id"}, null);
            return;
        }
        const owner_num = owner[0].OWNER_NUM;

        store.owner_num = owner_num;
        // 가맹점 등록
        sql.query("INSERT INTO STORE SET ?", store, (err, res)=>{
            if(err){
                result(err, null);
                return;
            }
            result(null, {message: "Register Ok!"});
        });
    });
};

// 가맹점주가 소유한 가맹점 조회
Store.showStoreListByOwner = (id, result)=>{
    // 가맹점주 id로 가맹점주 번호 찾기
    sql.query("SELECT OWNER_NUM FROM STORE_OWNER WHERE ID = ?", id, (err,owner) => {
        if(err){
            result(err,null);
            return;
        }
        if(owner.length === 0){
            result({kind: "owner_id"});
            return;
        }
        const owner_num = owner[0].OWNER_NUM;

        sql.query("SELECT STORE_NAME, LOCATION, TEL FROM STORE WHERE OWNER_NUM = ?", owner_num, (err, res)=>{
            if(err){
                result(err, null);
                return;
            }
            result(null, res);
        });
    });
};

// 전체 가맹점 목록 조회
Store.showStoreList = (result) => {
    sql.query("SELECT STORE_NAME, LOCATION, TEL FROM STORE", (err,res) => {
        if(err){
            result(err,null);
            return;
        }
        result(null,res);
    });
};

// 가맹점 정보 수정
Store.updateStoreInfo = (store, result) => {
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", store.store_name, (err,ret) => {
        if(err){
            result(err,null);
            return;
        }
        if(ret.length === 0){
            result({kind: "store_name"});
            return;
        }
        const store_num = ret[0].STORE_NUM;

        // 가맹점 정보 수정
        sql.query("UPDATE STORE SET LOCATION = ?, TEL = ? WHERE STORE_NUM = ?", [store.location, store.tel, store_num], (err,res) => {
            if(err){
                result(err,null);
                return;
            }
            result(null, {message: "Update OK!"});
        });
    });
};

// 가맹점 삭제
Store.deleteStore = (store_name, result)=>{
    // 가맹점 이름으로 가맹점 번호 찾기
    sql.query("SELECT STORE_NUM FROM STORE WHERE STORE_NAME = ?", store_name, (err,store) => {
        if(err){
            result(err,null);
            return;
        }
        if(store.length === 0){
            result({kind: "store_name"});
            return;
        }
        const store_num = store[0].STORE_NUM;

        // 가맹점 삭제
        sql.query("DELETE FROM STORE WHERE STORE_NUM = ?", store_num, (err,res) => {
            if(err){
                result(err,null);
                return;
            }
            result(null, {message: "Delete OK!"});
        });
    });
};

module.exports = Store;
 

