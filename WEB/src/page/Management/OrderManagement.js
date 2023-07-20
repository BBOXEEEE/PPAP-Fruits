import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';

// plz index.css import
import '../../index.css';

import styled from 'styled-components';
import {
    useCustomerProductStore,
    useOrderStore,
    useOwnerStore,
} from '../../store/store';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
// import { postProduct } from '../../api/shop/shop';
import { URL } from '../../api/server';

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 50px;
    border-radius: 10px;
    z-index: 100;
    border: 0.5px solid #e5e7eb;
    // 배경과 내용물이 겹치지 않게
    background-color: aliceblue;
`;

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const OrderManagement = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [seletedItem, setSelectedItem] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fruits, setFruits] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedItem(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const { owner, setOwner, currentStore, getOwnerSession } = useOwnerStore(
        (state) => state
    );
    const {
        orders,
        orderHistory,
        fetchOrders,
        addOrder,
        deleteOrder,
        postProduct,
    } = useOrderStore((state) => state);

    const { products } = useCustomerProductStore((state) => state);

    const name = useRef('');
    const count = useRef('');
    const price = useRef('');
    const imgSrc = useRef('');
    const expire = useRef('');

    useEffect(() => {
        console.log('rerenderere', products, owner);
        // getOwnerSession(owner);

        if (owner.ID !== 'RHI' && currentStore.STORE_NAME) {
            fetchOrders(currentStore.STORE_NAME);
        }
    }, [currentStore, products, fruits, orderHistory]);

    return (
        <div>
            {showModal && (
                <ModalWrapper>
                    <h1>🍎 과일 목록</h1>
                    <Table
                        rowClassName='table'
                        pagination={{ pageSize: 7 }}
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={fruitsColumns}
                        dataSource={fruits}
                    />

                    <Btn
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        닫기
                    </Btn>
                </ModalWrapper>
            )}
            <Wrapper>
                <Sidebar />
                <h1>발주 관리</h1>
                <h2>{currentStore.STORE_NAME}</h2>

                <ItemController>
                    <Input placeholder='상품명' name='name' ref={name}></Input>
                    <Input placeholder='개수' name='count' ref={count}></Input>
                    <Btn
                        onClick={() => {
                            postProduct({
                                store_name: currentStore.STORE_NAME,
                                fruits_name: name.current.value,
                                quantity: count.current.value,
                            });
                        }}
                    >
                        추가
                    </Btn>
                    <Btn
                        // 클릭하면 과일 목록을 모달로 보여줌
                        onClick={() => {
                            setShowModal(true);

                            // /fruits에 요청
                            // fruits를 받아옴
                            // fruits를 모달로 보여줌

                            // fruits를 받아오는 함수
                            const fetchFruits = async () => {
                                const response = await axios.get(
                                    `${URL}/fruits`
                                );
                                setFruits(response.data);
                                console.log('과일들', response);
                            };
                            fetchFruits();
                        }}
                    >
                        과일 목록 보기
                    </Btn>
                </ItemController>

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={orders}
                />
            </Wrapper>
        </div>
    );
};

export default OrderManagement;

const columns = [
    {
        title: '발주 번호',
        dataIndex: 'SUPPLY_NUM',
        sorter: (a, b) => a.SUPPLY_NUM - b.SUPPLY_NUM,
        width: '18%',
    },
    {
        title: '매장 번호',
        dataIndex: 'STORE_NUM',
        sorter: (a, b) => a.STORE_NUM - b.STORE_NUM,
        width: '18%',
    },
    {
        title: '발주 수량',
        dataIndex: 'COUNT',
        sorter: (a, b) => a.COUNT - b.COUNT,
        width: '18%',
    },
    {
        title: '발주 가격',
        dataIndex: 'SUPPLY_PRICE',
        sorter: (a, b) => a.SUPPLY_PRICE - b.SUPPLY_PRICE,
        width: '18%',
    },
    {
        title: '발주 날짜',
        dataIndex: 'SUPPLY_DATE',
        sorter: (a, b) => a.SUPPLY_DATE - b.SUPPLY_DATE,
        width: '18%',
    },
];

const fruitsColumns = [
    {
        title: '과일 이름',
        dataIndex: 'FRUITS_NAME',
        sorter: (a, b) => a.FRUITS_NAME - b.FRUITS_NAME,
        width: '400px',
    },
    {
        title: '과일 가격',
        dataIndex: 'PRICE',
        sorter: (a, b) => a.PRICE - b.PRICE,
        width: '400px',
    },
];

const Wrapper = styled.div`
    width: 1000px;
    margin: 0 auto;
    padding-top: 70px;
    padding-left: 80px;
`;

const ItemController = styled.div`
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    height: 70px;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
`;

const Btn = styled.button`
    width: 100px;
    height: 25px;
`;

const Input = styled.input`
    width: 200px;
    height: 25px;
`;
