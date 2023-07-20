import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useOwnerStore } from '../store/store';

const ShopList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    margin-top: 40px;
    font-weight: 800;
`;

const Sidebar = () => {
    const {
        owner,
        setOwner,
        stores,
        currentStore,
        getOwnerSession,
        fetchStores,
        setCurrentStore,
    } = useOwnerStore((state) => state);

    console.log('strore', stores, 'curSotre', currentStore);
    useEffect(() => {
        getOwnerSession(owner);
        setCurrentStore(stores[0]);

        // 아이디로 요청하는것 추후 바껴야댐
        if (owner.ID !== 'RHI') {
            fetchStores(owner.ID);
        }
    }, []);

    return (
        <>
            {currentStore && (
                <>
                    <SideBar>
                        <SideBarContent to='/manage/sales'>
                            매출 관리
                        </SideBarContent>
                        <SideBarContent to='/manage/order'>
                            발주 관리
                        </SideBarContent>
                        <SideBarContent to='/manage/product'>
                            상품 관리
                        </SideBarContent>
                        <SideBarContent to='/manage/purchase'>
                            주문 관리
                        </SideBarContent>
                        <SideBarContent to='/manage/consumption'>
                            지출 관리
                        </SideBarContent>
                        <SideBarContent to='/manage/add-shop'>
                            신규 가맹점 추가
                        </SideBarContent>

                        <ShopList>
                            {stores.map((store) => (
                                <SideBarContent
                                    onClick={() => {
                                        setCurrentStore(store);
                                    }}
                                >
                                    {store.STORE_NAME}
                                </SideBarContent>
                            ))}
                        </ShopList>
                    </SideBar>
                </>
            )}
        </>
    );
};

export default Sidebar;

const SideBar = styled.div`
    width: 200px;
    height: 100%;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 70px;
`;

const SideBarContent = styled(NavLink)`
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 18px;
    height: 60px;
    color: #ff91af;
`;
