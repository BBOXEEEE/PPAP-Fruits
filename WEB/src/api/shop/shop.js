import axios from 'axios';
import { URL } from '../server';

// 상품 등록
export const postProduct = async (req) => {
    const { store_name, fruits_name, quantity } = req;
    console.log(store_name, fruits_name, quantity);
    axios
        .post(`${URL}/productRegister`, {
            store_name: store_name,
            fruits_name: fruits_name,
            quantity: quantity,
        })
        .then((response) => {
            console.log('response', response);
        })
        .catch((error) => {
            console.log(error);
        });
};
