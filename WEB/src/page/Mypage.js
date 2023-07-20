import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useCustomerStore, useOwnerStore } from '../store/store';
import { Table } from 'antd';

const Wrapper = styled.div`
    margin: 0 auto;
    padding-top: 200px;
    width: 80vw;
`;

const Container = styled.div`
    display: flex;
`;

const InfoWindow = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    padding: 20px;
    gap: 20px;
    /* background-color: #f0f0f0; */
    border-right: 1px solid #e5e7eb;
    width: 400px;
`;

const Text = styled.div`
    font-size: 20px;
    border-bottom: 1px solid #e5e7eb;
`;

const OrderListWindow = styled.div`
    flex: 1;
    padding: 20px;
    /* background-color: #e0e0e0; */
`;

const InfoLabel = styled.span`
    font-weight: bold;
`;

const Mypage = () => {
    const { user, order, setUser, fetchUser, fetchOrder } = useCustomerStore(
        (state) => state
    );
    const {
        owner,
        stores,
        setOwner,
        ownerInfo,
        fetchOwner,
        fetchStores,
        getOwnerSession,
    } = useOwnerStore((state) => state);

    console.log(user[0], order);
    console.log(owner, stores, ownerInfo);

    useEffect(() => {
        // session에서 user가져오기
        const user = JSON.parse(sessionStorage.getItem('user'));
        const owner = JSON.parse(sessionStorage.getItem('owner'));

        if (user) {
            setUser(user);
            fetchUser(user.ID);
            fetchOrder(user.ID);
        } else if (owner) {
            setUser(owner);
            getOwnerSession(owner.ID);
            fetchStores(owner.ID);
            fetchOwner(owner.ID);
        } else {
            // 로그인 안되어있으면 로그인 페이지로 이동
            window.location.href = '/login';
        }
    }, []);
    return (
        <Wrapper>
            <Container>
                <InfoWindow>
                    <h2>내 정보</h2>

                    {user[0] && (
                        <>
                            <Text>등급: 일반 회원</Text>
                            <Text>
                                <InfoLabel>아이디:</InfoLabel> {user[0].ID}
                            </Text>
                            <Text>
                                <InfoLabel>이메일:</InfoLabel> {user[0].EMAIL}
                            </Text>
                            <Text>
                                <InfoLabel>이름:</InfoLabel>{' '}
                                {user[0].CUSTOMER_NAME}
                            </Text>
                        </>
                    )}
                    {ownerInfo[0] && (
                        <>
                            <Text>등급: 가맹점주</Text>
                            <Text>
                                <InfoLabel>아이디:</InfoLabel> {ownerInfo[0].ID}
                            </Text>
                            <Text>
                                <InfoLabel>이메일:</InfoLabel>{' '}
                                {ownerInfo[0].EMAIL}
                            </Text>
                            <Text>
                                <InfoLabel>이름:</InfoLabel>{' '}
                                {ownerInfo[0].OWNER_NAME}
                            </Text>
                        </>
                    )}
                </InfoWindow>
                <OrderListWindow>
                    {order && (
                        <div>
                            <h2>주문 내역</h2>
                            <Table
                                rowClassName='table'
                                pagination={{ pageSize: 7 }}
                                columns={columns}
                                dataSource={order}
                            />
                        </div>
                    )}
                </OrderListWindow>
            </Container>
        </Wrapper>
    );
};

export default Mypage;

const OrderItem = styled.div`
    display: flex;
    gap: 20px;
    border-bottom: 0.5px solid gray;
`;

const columns = [
    {
        title: '이름',
        dataIndex: 'PRODUCT_NAME',
        sorter: (a, b) => a.PRODUCT_NAME - b.PRODUCT_NAME,
        width: '20%',
    },

    {
        title: '가맹점명',
        dataIndex: 'STORE_NAME',
        sorter: (a, b) => a.STORE_NAME - b.STORE_NAME,
    },
    {
        title: '주문 날짜',
        dataIndex: 'ORDERED_DATE',
        sorter: (a, b) => a.ORDERED_DATE - b.ORDERED_DATE,
    },
    {
        title: '개수',
        dataIndex: 'ORDERED_QUANTITY',
        sorter: (a, b) => a.ORDERED_QUANTITY - b.ORDERED_QUANTITY,
    },
];
