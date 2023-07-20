// 발주 관리 - 가맹점별 발주 목록, 월별, 일별 조회

import axios from 'axios';

// 가맹점별 발주 목록 조회
// 1) 가맹점별 조회 http://API ip/supply/store/:store_name

export const getOrderList = async (params) => {
    const { store_name } = params;
    return await axios.get(`${URL}/supply/store/${store_name}`);
};

// 2) 가맹점별 월별 조회 http://API ip/supply/store/:store_name/month/:date

export const getOrderListByMonth = async (params) => {
    const { store_name, date } = params;
    return await axios.get(`${URL}/supply/store/${store_name}/month/${date}`);
};

// 3) 가맹점별 일별 조회 http://API ip/supply/store/:store_name/day/:date
export const getOrderListByDay = async (params) => {
    const { store_name, date } = params;
    return await axios.get(`${URL}/supply/store/${store_name}/day/${date}`);
};

// 지출 관리 - 가맹점별 지출 목록, 월별, 일별 조회

// 1) 가맹점별 조회     http://API ip/expend/store/:store_name
export const getExpenditureList = async (params) => {
    const { store_name } = params;
    return await axios
        .get(`${URL}/expend/store/${store_name}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({ message: '지출 목록 가맹점별 조회 성공' });
        })
        .catch((error) => {
            console.log(error);
            error.status(500).json({ message: '지출 목록 가맹점별 조회 실패' });
        });
};

// 2) 가맹점별 월별 조회 http://API ip/expend/store/:store_name/month/:date
export const getExpenditureListByMonth = async (params) => {
    const { store_name, date } = params;
    return await axios
        .get(`${URL}/expend/store/${store_name}/month/${date}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({
                message: '지출 목록 가맹점별 월별 조회 성공',
            });
        })
        .catch((error) => {
            console.log(error);
            error
                .status(500)
                .json({ message: '지출 목록 가맹점별 월별 조회 실패' });
        });
};

// 3) 가맹점별 일별 조회 http://API ip/expend/store/:store_name/day/:date
export const getExpenditureListByDay = async (params) => {
    const { store_name, date } = params;
    return await axios
        .get(`${URL}/expend/store/${store_name}/day/${date}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({
                message: '지출 목록 가맹점별 일별 조회 성공',
            });
        })
        .catch((error) => {
            console.log(error);
            error
                .status(500)
                .json({ message: '지출 목록 가맹점별 일별 조회 실패' });
        });
};

// 매출 관리
// 1) 가맹점별 조회 http://API ip/sales/store/:store_name
export const getSalesList = async (params) => {
    const { store_name } = params;
    return await axios
        .get(`${URL}/sales/store/${store_name}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({ message: '매출 목록 가맹점별 조회 성공' });
        })
        .catch((error) => {
            console.log(error);
            error.status(500).json({ message: '매출 목록 가맹점별 조회 실패' });
        });
};

// 2) 가맹점별 월별 조회 http://API ip/sales/store/:store_name/month/:date
export const getSalesListByMonth = async (params) => {
    const { store_name, date } = params;
    return await axios
        .get(`${URL}/sales/store/${store_name}/month/${date}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({
                message: '매출 목록 가맹점별 월별 조회 성공',
            });
        })
        .catch((error) => {
            console.log(error);
            error
                .status(500)
                .json({ message: '매출 목록 가맹점별 월별 조회 실패' });
        });
};

// 3) 가맹점별 일별 조회 http://API ip/sales/store/:store_name/day/:date
export const getSalesListByDay = async (params) => {
    const { store_name, date } = params;
    return await axios
        .get(`${URL}/sales/store/${store_name}/day/${date}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({
                message: '매출 목록 가맹점별 일별 조회 성공',
            });
        })
        .catch((error) => {
            console.log(error);
            error
                .status(500)
                .json({ message: '매출 목록 가맹점별 일별 조회 실패' });
        });
};

// 주문 관리

// 1) 가맹점별 조회     http://API ip/ordered/store/:store_name
export const getStoreOrderList = async (params) => {
    const { store_name } = params;
    return await axios

        .get(`${URL}/ordered/store/${store_name}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({ message: '주문 목록 가맹점별 조회 성공' });
        })
        .catch((error) => {
            console.log(error);

            error.status(500).json({ message: '주문 목록 가맹점별 조회 실패' });
        });
};

// 2) 가맹점별 월별 조회 http://API ip/ordered/store/:store_name/month/:date
export const getStoreOrderListByMonth = async (params) => {
    const { store_name, date } = params;
    return await axios

        .get(`${URL}/ordered/store/${store_name}/month/${date}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({
                message: '주문 목록 가맹점별 월별 조회 성공',
            });
        })
        .catch((error) => {
            console.log(error);
            error

                .status(500)
                .json({ message: '주문 목록 가맹점별 월별 조회 실패' });
        });
};

// 3) 가맹점별 일별 조회 http://API ip/ordered/store/:store_name/day/:date
export const getStoreOrderListByDay = async (params) => {
    const { store_name, date } = params;
    return await axios

        .get(`${URL}/ordered/store/${store_name}/day/${date}`)
        .then((res) => {
            console.log(res);
            res.status(200).json({
                message: '주문 목록 가맹점별 일별 조회 성공',
            });
        })
        .catch((error) => {
            console.log(error);
            error

                .status(500)
                .json({ message: '주문 목록 가맹점별 일별 조회 실패' });
        });
};
