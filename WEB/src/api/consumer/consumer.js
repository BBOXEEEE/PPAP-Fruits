import axios from 'axios';
import { URL } from '../server';

// 소비자가 상품 목록 요청 axios 코드 ok
export const getProductList = async (req) => {
    const store_name = req;
    console.log('storename', store_name);
    axios
        .get(`${URL}/products/customer/${store_name}`)
        .then((response) => {
            console.log('res', response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

// 소비자가 가맹점에 주문 요청 axios 코드
export const postOrder = async (req, res) => {
    const { store_name, fruits_name, id, quantity } = req;
    console.log(store_name, fruits_name, id, quantity);
    axios
        .post(`${URL}/orderRegisters`, {
            store_name: store_name,
            fruits_name: fruits_name,
            id: id,
            quantity: quantity,
        })
        .then((response) => {
            console.log(response);
            res.status(200).json({ message: '주문 성공' });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: '주문 실패' });
        });
};

// 주문 목록조회
export const getOrderList = async (req, res) => {
    const { id } = req;
    axios
        .get(`${URL}/ordered/customer/${id}`)
        .then((response) => {
            console.log(response);
            res.status(200).json({ message: '주문 목록 조회 성공' });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: '주문 목록 조회 실패' });
        });
};
