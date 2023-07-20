import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';

import styled from 'styled-components';
import {
    useBearStore,
    useOwnerStore,
    useSalesStore,
    useShopsStore,
} from '../../store/store';
import Sidebar from '../../components/Sidebar';

const SalesManagement = () => {
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

    const { owner, setOwner, currentStore, getOwnerSession } = useOwnerStore(
        (state) => state
    );
    const { sales, fetchSales } = useSalesStore((state) => state);

    const [yyyymmdd, setYyyymmdd] = useState('');

    console.log('세일즈');

    useEffect(() => {
        // getOwnerSession(owner);

        if (owner.ID !== 'RHI' && currentStore.STORE_NAME !== '') {
            fetchSales(currentStore.STORE_NAME);
        }
    }, [currentStore]);

    return (
        <div>
            <Wrapper>
                <Sidebar />
                <h1>매출 관리</h1>
                <h2>{currentStore.STORE_NAME}</h2>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={sales}
                />
            </Wrapper>
        </div>
    );
};

export default SalesManagement;

const Wrapper = styled.div`
    width: 1000px;
    margin: 0 auto;
    padding-top: 70px;
    padding-left: 80px;
`;

const columns = [
    {
        title: '매출 번호',
        dataIndex: 'SALES_NUM',
        sorter: (a, b) => a.SALES_NUM - b.SALES_NUM,
        width: '20%',
    },
    {
        title: '상품 번호',
        dataIndex: 'PRODUCT_NUM',
        sorter: (a, b) => a.PRODUCT_NUM - b.PRODUCT_NUM,
        width: '20%',
    },
    {
        title: '가맹점 번호',
        dataIndex: 'STORE_NUM',
        sorter: (a, b) => a.STORE_NUM - b.STORE_NUM,
        width: '20%',
    },
    {
        title: '판매 날짜',
        dataIndex: 'SALES_DATE',
        sorter: (a, b) => a.SALES_DATE - b.SALES_DATE,
        width: '20%',
    },
    {
        title: '판매 가격',
        dataIndex: 'SALES_PRICE',
        sorter: (a, b) => a.SALES_PRICE - b.SALES_PRICE,
        width: '20%',
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
