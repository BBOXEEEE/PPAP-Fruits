import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import {
    useOwnerStore,
    useProductStore,
    usePurchaseStore,
} from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 40px;
    padding-top: 100px;
    display: flex;
    gap: 80px;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    width: 400px;
    height: 400px;

    border-radius: 10px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 500px;
    border-left: 0.5px solid gray;
    gap: 30px;
    padding-left: 30px;
`;

const Title = styled.div`
    font-size: 32px;
    letter-spacing: -0.09px;
    font-weight: 400;
`;

const Desc = styled.div`
    font-size: 20px;
    color: rgba(34, 34, 34, 0.5);
    padding-bottom: 30px;

    border-bottom: 1px solid #ebebeb;
`;

const Buy = styled.button`
    background-color: #ef6253;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 0px;
    color: #fff;
    width: 300px;
    height: 60px;
    font-size: 24px;

    // 마우스 커서 올리면 커짐
    &:hover {
        transform: scale(1.05);
    }
`;

const Quantity = styled.div`
    line-height: 17px;
    font-size: 28px;
    letter-spacing: -0.21px;
    letter-spacing: -0.15px;
    color: rgba(34, 34, 34, 0.5);
    padding-bottom: 30px;
`;

const Info = styled.div`
    font-size: 20px;
`;

const Text = styled.div`
    // 오른쪽에 얇은 선
    border-right: 1px solid #fff;
    padding-right: 20px;
    margin-right: 20px;
`;

const QuantityWrapper = styled.div`
    font-size: 20px;
    color: rgba(34, 34, 34, 0.5);
    padding-bottom: 30px;

    border-bottom: 1px solid #ebebeb;
`;

const BuyWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const QuantityInput = styled.input`
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 0px;
    color: black;
    width: 60px;
    height: 60px;
    font-size: 24px;
    border-radius: 10px;
    border: 1px solid #ebebeb;
    padding-left: 20px;
    font-size: 20px;
`;

const PurchaseDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    );
    const navigate = useNavigate();

    const { currProduct, products, fetchProducts } = useProductStore(
        (state) => state
    );

    const { postCustomerPurchase, curstomerPurchases } = usePurchaseStore(
        (state) => state
    );
    const { owner, setOwner } = useOwnerStore((state) => state);
    console.log('fsdahifdsahi');
    console.log('user', user, owner);
    const { id, pid } = useParams();

    // user session가져오기

    useEffect(() => {
        fetchProducts(id, pid);
        // setUser
        setUser(JSON.parse(sessionStorage.getItem('user')));
    }, []);
    return (
        <Wrapper>
            {currProduct && (
                <>
                    <Image src={`${currProduct.IMAGE_URL}`} />

                    <Details>
                        <Title>{currProduct.PRODUCT_NAME}</Title>
                        <QuantityWrapper>
                            남은 갯수
                            <Quantity>{currProduct.QUANTITY}개</Quantity>
                        </QuantityWrapper>
                        <Desc>{currProduct.PRODUCT_DESC}</Desc>
                        <BuyWrapper>
                            <Buy
                                onClick={() => {
                                    // 로그인 안됐으면 구매불가
                                    if (!user && owner.ID == 'RHI') {
                                        alert('로그인 먼저 해주세요.');
                                        return;
                                    }
                                    if (!user && !owner) {
                                        alert('로그인 먼저 해주세요.');
                                        return;
                                    }

                                    if (!user && owner.ID != 'RHI') {
                                        alert('자신의 상품은 구매 불가합니다.');
                                        return;
                                    }

                                    console.log('구매', currProduct);
                                    const newPurchase = {
                                        store_name: id,
                                        product_num: currProduct.PRODUCT_NUM,
                                        id: owner.ID,
                                        quantity: quantity,
                                    };
                                    console.log('new', newPurchase);
                                    postCustomerPurchase(newPurchase);
                                    // 홈화면으로 이동

                                    alert('구매가 완료되었습니다.');
                                    navigate('/home');
                                }}
                            >
                                <Text>{quantity}개 구매</Text>{' '}
                                <div>
                                    {(
                                        currProduct.PRICE * quantity
                                    ).toLocaleString()}
                                    원
                                </div>
                            </Buy>
                            <QuantityInput
                                type='number'
                                min='1'
                                max={currProduct.QUANTITY}
                                defaultValue='1'
                                onChange={(e) => {
                                    // 100개 넘으면 100개로 고정
                                    if (e.target.value > currProduct.QUANTITY) {
                                        setQuantity(currProduct.QUANTITY);
                                        // input값도
                                        e.target.value = currProduct.QUANTITY;
                                    } else {
                                        setQuantity(e.target.value);
                                    }
                                }}
                            ></QuantityInput>
                        </BuyWrapper>
                        <Info>유통기한 {currProduct.EXPIRE_DATE}</Info>
                    </Details>
                </>
            )}
        </Wrapper>
    );
};

export default PurchaseDetails;
