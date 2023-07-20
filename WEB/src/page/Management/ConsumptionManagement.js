import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';

import styled from 'styled-components';
import { useExpenseStore, useOwnerStore } from '../../store/store';
import Sidebar from '../../components/Sidebar';

const ConsumptionManagement = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [seletedItem, setSelectedItem] = useState([]);

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
    const { expenseData, fetchExpenseData } = useExpenseStore((state) => state);

    const [yyyymmdd, setYyyymmdd] = useState('');

    useEffect(() => {
        // getOwnerSession(owner);

        if (owner.ID !== 'RHI' && currentStore.STORE_NAME !== '') {
            fetchExpenseData(currentStore.STORE_NAME);
        }
    }, [currentStore]);

    return (
        <div>
            <Wrapper>
                <Sidebar />
                <h1>지출 관리</h1>
                <h2>{currentStore.STORE_NAME}</h2>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={expenseData}
                />
            </Wrapper>
        </div>
    );
};

export default ConsumptionManagement;

const Wrapper = styled.div`
    width: 1000px;
    margin: 0 auto;
    padding-top: 70px;
    padding-left: 80px;
`;

const columns = [
    {
        title: '지출 번호',
        dataIndex: 'EXPEND_NUM',
        sorter: (a, b) => a.EXPEND_NUM - b.EXPEND_NUM,
        width: '20%',
    },
    {
        title: '지출 금액',
        dataIndex: 'EXPEND_PRICE',
        sorter: (a, b) => a.EXPENDE_PRIC - b.EXPENDE_PRIC,
        width: '20%',
    },
    {
        title: '가맹점 번호',
        dataIndex: 'STORE_NUM',
        sorter: (a, b) => a.STORE_NUM - b.STORE_NUM,
        width: '20%',
    },
    {
        title: '지출 날짜',
        dataIndex: 'EXPEND_DATE',
        sorter: (a, b) => a.EXPEND_DATE - b.EXPEND_DATE,
        width: '20%',
    },
    {
        title: '발주 번호',
        dataIndex: 'SUPPLY_NUM',
        sorter: (a, b) => a.SUPPLY_NUM - b.SUPPLY_NUM,
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
