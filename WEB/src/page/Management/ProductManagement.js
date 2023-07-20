import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';

import styled from 'styled-components';
import {
    useBearStore,
    useDateStore,
    useOwnerStore,
    useProductStore,
} from '../../store/store';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const ProductManagement = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [seletedItem, setSelectedItem] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selected', selectedRows);
            setSelectedItem(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const {
        owner,
        stores,
        setOwner,
        currentStore,
        setCurrentStore,
        getOwnerSession,
        getCurrentStore,
        fetchStores,
    } = useOwnerStore((state) => state);

    // console.log('this', owner, currentStore, stores);
    const {
        products,
        fetchProducts,
        addProduct,
        removeProduct,
        changePRODUCT_STATUS,
    } = useProductStore((state) => state);
    const { currentDate, changeNextDay } = useDateStore();

    // console.log(
    //     '!!!!',
    //     stores.length > 0,
    //     owner.ID,
    //     currentStore.STORE_NAME,
    //     owner
    // );
    console.log('prodcut', products);
    console.log('curstore', currentStore);
    useEffect(() => {
        // // shop네임 받아오는거잇어야댐

        // fetchStores(owner.ID);

        console.log('fetchProduct', currentStore);
        if (currentStore.STORE_NAME == '') {
            const store = sessionStorage.getItem('currentStore');
            const data = JSON.parse(store);
            console.log('getsessin', data);
            fetchProducts(data.STORE_NAME);
        } else {
            fetchProducts(currentStore.STORE_NAME);
        }

        // fetchStores(owner.ID);
    }, []);

    return (
        <div>
            <Wrapper>
                {true ? (
                    <>
                        <Sidebar />

                        <h1>상품 관리</h1>
                        <h2>{currentStore.STORE_NAME}</h2>
                        <Btn onClick={() => changeNextDay(currentDate)}>
                            D-day + 1
                        </Btn>

                        <ItemController>
                            <Btn
                                onClick={() => {
                                    const product_num_list = seletedItem.map(
                                        (item) => {
                                            const product_num = {
                                                product_num: item.PRODUCT_NUM,
                                            };
                                            return product_num;
                                        }
                                    );
                                    console.log(product_num_list);
                                    removeProduct(product_num_list);
                                }}
                            >
                                반품
                            </Btn>
                        </ItemController>

                        <Table
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={products}
                        />
                    </>
                ) : (
                    <></>
                )}
            </Wrapper>
        </div>
    );
};

export default ProductManagement;

const Wrapper = styled.div`
    width: 1000px;
    margin: 0 auto;
    padding-top: 70px;
    padding-left: 80px;
`;

const columns = [
    {
        title: '이름',
        dataIndex: 'PRODUCT_NAME',
        sorter: (a, b) => a.PRODUCT_NAME - b.PRODUCT_NAME,
        width: '30%',
    },
    {
        title: '개수',
        dataIndex: 'QUANTITY',
        sorter: (a, b) => a.QUANTITY - b.QUANTITY,
    },

    {
        title: '가격',
        dataIndex: 'PRICE',
        sorter: (a, b) => a.PRICE - b.PRICE,
    },
    {
        title: '유통기한',
        dataIndex: 'EXPIRE_DATE',
        sorter: (a, b) => a.EXPIRE_DATE - b.EXPIRE_DATE,
    },
    {
        title: '판매 여부',
        dataIndex: 'PRODUCT_STATUS',
        sorter: (a, b) => a.PRODUCT_STATUS - b.PRODUCT_STATUS,
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
    width: 120px;
    height: 25px;
`;

const Input = styled.input`
    width: 200px;
    height: 25px;
`;

// const nextDay = async () => {
//     const currDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
//     const response = await axios
//         .put(`${URL}/nextDay`, {
//             today: currDate,
//         })
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
