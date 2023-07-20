import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';

import styled from 'styled-components';
import {
    useBearStore,
    useOwnerStore,
    usePurchaseStore,
    useShopsStore,
} from '../../store/store';
import Sidebar from '../../components/Sidebar';

const ShopManagement = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [seletedItem, setSelectedItem] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedItem(selectedRows);
            console.log('fds', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const { shops, fetchShops, addShop, deleteShop } = useShopsStore(
        (state) => state
    );

    const {
        owner,
        setOwner,
        stores,
        currentStore,
        getCurrentStore,
        setCurrentStore,
        addStore,
    } = useOwnerStore((state) => state);

    console.log('shop', stores);

    const nameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    useEffect(() => {
        // getCurrentStore();
    }, [stores]);

    return (
        <div>
            <Wrapper>
                <Sidebar />
                <h1>신규 가맹점 관리</h1>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={stores}
                />

                <h2>가맹점 추가</h2>

                <Input
                    placeholder='가맹점 이름: ex) 천안병천점'
                    name='name'
                    ref={nameRef}
                ></Input>
                <Input
                    placeholder='가맹점 주소: ex) 충청남도 천안시 동남구 병천면 충절로 1600'
                    name='name'
                    ref={addressRef}
                ></Input>
                <Input
                    placeholder='가맹점 전화번호: ex) 041-560-1234'
                    name='name'
                    ref={phoneRef}
                ></Input>
                <Btn
                    onClick={() => {
                        addStore({
                            name: nameRef.current.value,
                            location: addressRef.current.value,
                            tel: phoneRef.current.value,
                            owner_id: owner.ID,
                        });
                        nameRef.current.value = '';
                        addressRef.current.value = '';
                        phoneRef.current.value = '';
                        setCurrentStore({
                            STORE_NAME: nameRef.current.value,
                            LOCATION: addressRef.current.value,
                            TEL: phoneRef.current.value,
                        });
                    }}
                >
                    추가
                </Btn>

                <Btn
                    onClick={() => {
                        deleteShop(seletedItem[0].STORE_NAME);
                        nameRef.current.value = '';
                        addressRef.current.value = '';
                        phoneRef.current.value = '';
                    }}
                >
                    삭제
                </Btn>
            </Wrapper>
        </div>
    );
};

export default ShopManagement;

const columns = [
    {
        title: '가맹점 이름',
        dataIndex: 'STORE_NAME',
        sorter: (a, b) => a.STORE_NAME - b.STORE_NAME,
    },
    {
        title: '가맹점 위치',
        dataIndex: 'LOCATION',
        sorter: (a, b) => a.LOCATION - b.LOCATION,
    },
    {
        title: '전화번호',
        dataIndex: 'TEL',
        sorter: (a, b) => a.TEL - b.TEL,
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
