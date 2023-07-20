import axios from 'axios';

// 과일 목록 조회 - 발주 시 발주 가능 과일 목록 (이름, 원가)
export const getFruitList = async () => {
    return await axios.get(`${URL}/fruits`).then((res) => {
        console.log(res);
        res.status(200).json({ message: '과일 목록 조회 성공' });
    });
};
