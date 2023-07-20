import axios from 'axios';
import { URL } from '../server';

export const register = async (req) => {
    const { name, id, password, phone, email, isOwner } = req;

    console.log(req);

    console.log('reigieieiei');

    if (isOwner) {
        axios
            .post(`${URL}/owner/signup`, {
                name: name,
                id: id,
                pw: password,
                phone: phone,
                email: email,
            })
            .then((response) => {
                console.log('resgieter res', response);
                return response;
            })
            .catch((error) => {
                if (error.response.status === 406) {
                    alert('이미 존재하는 아이디입니다.');
                }
            });
    } else {
        axios
            .post(`${URL}/customer/signup`, {
                name: name,
                id: id,
                pw: password,
                phone: phone,
                email: email,
            })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
