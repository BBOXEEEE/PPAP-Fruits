module.exports = app =>{
    const stores = require("../controller/store.controller.js");

    // 가맹점 추가
    app.post("/store", stores.storeRegister);

    // 가맹점주가 소유한 가맹점 조회
    app.get("/store/owner/:id", stores.showStoreListByOwner);

    // 전체 가맹점 목록 조회
    app.get("/store", stores.showStoreList);

    // 가맹점 정보 수정
    app.put("/store/update", stores.updateStoreInfo);

     // 가맹점 삭제
     app.delete("/store/:store_name", stores.deleteStore);
};