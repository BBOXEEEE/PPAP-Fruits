import axios from 'axios';
import { URL } from '../server';
import { useAuthStore } from '../../store/store';

export const login = async (req) => {
    const { id, pw, owner } = req;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    console.log('onwer', owner);
    if (owner) {
        return await axios
            .post(`${URL}/owner/login`, {
                id: id,
                pw: pw,
            })
            .then((res) => res)
            .catch((error) => {
                // 아이디 or 비번이 일치 x
                if (error.response.status === 406) {
                    alert('아이디 또는 비밀번호가 틀렸습니다.');
                }
            });
    }

    return await axios
        .post(`${URL}/customer/login`, {
            id: id,
            pw: pw,
        })
        .then((res) => res)
        .catch((error) => {
            // 아이디 or 비번이 일치 x
            if (error.response.status === 406) {
                alert('아이디 또는 비밀번호가 틀렸습니다.');
            }
        });
};
