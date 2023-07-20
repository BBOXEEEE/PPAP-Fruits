import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';

import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import {
    useAdminPurchaseStore,
    useBearStore,
    useOwnerStore,
    usePurchaseStore,
    useShopsStore,
} from '../../store/store';

const PurchaseManagement = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [seletedItem, setSelectedItem] = useState([]);
    const [pageState, setPageState] = useState('product');

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

    const { owner, setOwner, getOwnerSession, currentStore } = useOwnerStore(
        (state) => state
    );

    const { selectedShop } = useShopsStore((state) => state);
    const { stores, fetchStores } = useOwnerStore((state) => state);
    const { purchases, fetchPurchases } = useAdminPurchaseStore(
        (state) => state
    );
    const { adminPurchases, fetchAdminPurchases } = usePurchaseStore(
        (state) => state
    );

    console.log(currentStore);
    useEffect(() => {
        // getOwnerSession(owner);

        if (owner.ID !== 'RHI' && currentStore.STORE_NAME !== '') {
            fetchStores(owner.ID);
            fetchPurchases(currentStore.STORE_NAME);
            fetchAdminPurchases(currentStore.STORE_NAME);
        }
    }, [currentStore]);

    return (
        <div>
            <Wrapper>
                <Sidebar />
                <h1>주문 관리</h1>
                <h2>{currentStore.STORE_NAME}</h2>

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={adminPurchases}
                />
            </Wrapper>
        </div>
    );
};

export default PurchaseManagement;

const Wrapper = styled.div`
    width: 1000px;
    margin: 0 auto;
    padding-top: 70px;
    padding-left: 80px;
`;

const columns = [
    {
        title: '주문 번호',
        dataIndex: 'ORDERED_NUM',
        sorter: (a, b) => a.ORDERDED_NUM - b.ORDERDED_NUM,
        width: '20%',
    },
    {
        title: '상품 이름',
        dataIndex: 'PRODUCT_NAME',
        sorter: (a, b) => a.PRODUCT_NAME - b.PRODUCT_NAME,
        width: '20%',
    },
    {
        title: '회원 번호',
        dataIndex: 'CUSTOMER_NUM',
        sorter: (a, b) => a.CUSTOMER_NUM - b.CUSTOMER_NUM,
        width: '20%',
    },

    {
        title: '주문 수량',
        dataIndex: 'ORDERED_QUANTITY',
        sorter: (a, b) => a.ORDERED_QUANTITY - b.ORDERED_QUANTITY,
    },
    {
        title: '주문 날짜',
        dataIndex: 'ORDERED_DATE',
        sorter: (a, b) => a.ORDERED_DATE - b.ORDERED_DATE,
    },
];

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
