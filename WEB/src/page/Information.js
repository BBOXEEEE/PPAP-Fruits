import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../styles.css';
import {
    useCustomerProductStore,
    useOwnerStore,
    usePurchaseStore,
    useShopsStore,
} from '../store/store';
import Sidebar from '../components/Sidebar';
import { NavLink, useLocation } from 'react-router-dom';

const Information = () => {
    // URL 가져오기
    const location = useLocation();
    const { shops, fetchShops, selectedShop } = useShopsStore((state) => state);
    const [currShopName, setCurrShopName] = useState(
        decodeURIComponent(location.pathname.split('/')[2] ?? '대전유성점')
    );

    const {
        owner,
        setOwner,
        currentStore,
        setCurrentStore,
        setCurrentStoreName,
    } = useOwnerStore((state) => state);

    const { products, fetchProducts } = useCustomerProductStore(
        (state) => state
    );

    const { postCustomerPurchase, curstomerPurchases } = usePurchaseStore(
        (state) => state
    );

    const productList = [
        '전체',
        ...new Set(products.map((item) => item.PRODUCT_NAME)),
    ];

    const getProductName = (e) => {
        return e.target.innerText;
    };

    const getDDay = (date) => {
        const today = new Date();
        const dDay = new Date(date);
        const gap = dDay.getTime() - today.getTime();
        const result = Math.floor(gap / (1000 * 60 * 60 * 24));
        return result;
    };

    const [selectedProduct, setSelectedProduct] = useState(productList[0]);

    console.log('currentStore', currentStore, 'products', products);

    useEffect(() => {
        fetchShops();
        fetchProducts(currShopName);
        setCurrentStoreName(currShopName);
    }, [curstomerPurchases]);

    return (
        <Wrapper>
            <SideBar>
                {shops?.map((shop) => (
                    <SideBarContent
                        to={`/information/${shop.STORE_NAME}`}
                        onClick={() => {
                            setCurrShopName(shop.STORE_NAME);
                            fetchProducts(shop.STORE_NAME);
                            setCurrentStore(shop);
                        }}
                    >
                        {shop.STORE_NAME}
                    </SideBarContent>
                ))}
            </SideBar>{' '}
            <Container>
                <ShopName>펜파인애플애플펜 {currShopName}</ShopName>
                <Location>{currentStore.LOCATION}</Location>
                <PhoneNumber>{currentStore.TEL}</PhoneNumber>
                <ProductList>
                    {productList.map((item) => (
                        <Product
                            onClick={(item) => {
                                const name = getProductName(item);
                                setSelectedProduct(name);
                            }}
                        >
                            {item}
                        </Product>
                    ))}
                </ProductList>
                <Items>
                    {selectedProduct === '전체' ? (
                        <>
                            {products.map((item, idx) => (
                                <Cards
                                    to={`/information/${currentStore.STORE_NAME}/${item.PRODUCT_NUM}`}
                                >
                                    <ImgWrapper>
                                        <Img src={item.IMAGE} />
                                    </ImgWrapper>
                                    <Content>
                                        <Title>{item.PRODUCT_NAME}</Title>
                                        <Description>
                                            {
                                                // 적당한 길이로 자르기
                                                // 나머지는 ... 표시
                                                item.FRUITS_DESC.length > 50
                                                    ? item.FRUITS_DESC.substr(
                                                          0,
                                                          50
                                                      ) + '...'
                                                    : item.FRUITS_DESC
                                            }
                                        </Description>
                                        <InfoWrapper>
                                            <div>
                                                <Price>{item.PRICE}원</Price>
                                                <Text>즉시 구매가</Text>
                                            </div>

                                            <Deadline>
                                                D -{' '}
                                                {getDDay(item.EXPIRE_DATE) + 1}
                                            </Deadline>
                                            <Purchase>구매</Purchase>
                                        </InfoWrapper>
                                    </Content>
                                </Cards>
                            ))}
                        </>
                    ) : (
                        <>
                            {products
                                .filter(
                                    (item) =>
                                        item.PRODUCT_NAME === selectedProduct
                                )
                                .map((item) => (
                                    <Cards
                                        to={`/information/${currentStore.STORE_NAME}/${item.PRODUCT_NUM}`}
                                    >
                                        <ImgWrapper>
                                            <Img src={item.IMAGE} />
                                        </ImgWrapper>
                                        <Content>
                                            <Title>{item.PRODUCT_NAME}</Title>
                                            <Description>
                                                {
                                                    // 적당한 길이로 자르기
                                                    // 나머지는 ... 표시
                                                    item.FRUITS_DESC.length > 50
                                                        ? item.FRUITS_DESC.substr(
                                                              0,
                                                              50
                                                          ) + '...'
                                                        : item.FRUITS_DESC
                                                }
                                            </Description>
                                            <InfoWrapper>
                                                <div>
                                                    <Price>
                                                        {item.PRICE}원
                                                    </Price>
                                                    <Text>즉시 구매가</Text>
                                                </div>

                                                <Deadline>
                                                    D -{' '}
                                                    {getDDay(item.EXPIRE_DATE) +
                                                        1}
                                                </Deadline>
                                                <Purchase
                                                    onClick={() => {
                                                        console.log(
                                                            '구매',
                                                            item
                                                        );
                                                        const newPurchase = {
                                                            store_name:
                                                                currentStore.STORE_NAME,
                                                            product_num:
                                                                item.PRODUCT_NUM,
                                                            id: owner.ID,
                                                            quantity:
                                                                item.QUANTITY,
                                                        };
                                                        console.log(
                                                            'new',
                                                            newPurchase
                                                        );
                                                        postCustomerPurchase(
                                                            newPurchase
                                                        );
                                                    }}
                                                >
                                                    구매
                                                </Purchase>
                                            </InfoWrapper>
                                        </Content>
                                    </Cards>
                                ))}
                        </>
                    )}
                </Items>
            </Container>
        </Wrapper>
    );
};

export default Information;
const Wrapper = styled.div`
    height: 800px;

    padding-top: 70px;
`;

const Container = styled.div`
    padding-top: 60px;
    width: 900px;
    margin: 0 auto;
`;

const ShopName = styled.div`
    font-size: 30px;
    font-weight: 700;
`;

const PhoneNumber = styled.div`
    font-size: 18px;
    font-weight: 200;
`;

const Location = styled.div`
    font-size: 20px;
    font-weight: 200;
`;

const ProductList = styled.div`
    display: flex;
    padding-top: 20px;
    width: 900px;
    margin: 0 auto;
    gap: 10px;
`;

const Product = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    border: 0.5px solid gray;
    border-radius: 10px;

    color: #ff91af;
    font-weight: 700;
`;

const Items = styled.div`
    padding-top: 100px;
    width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    margin: 0 auto;
`;

const Cards = styled(NavLink)`
    width: 300px;
    height: 370px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 커서를 올리면 깔끔한 커서 효과를 주는 코드
    &:hover {
        cursor: pointer;
        // 약간의 효과도 작성해줘
        transition: 0.3s;
        transform: scale(1.02);
    }
`;

const ImgWrapper = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
`;

const Img = styled.img`
    width: 200px;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 30px;
`;

const Title = styled.div`
    padding-bottom: 2px;
    font-size: 23px;
    font-weight: 700;
    color: #222;
`;
const Description = styled.div`
    font-size: 13px;
    color: #222;
`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Price = styled.div`
    font-size: 20px;
    padding-top: 10px;
    text-decoration: none;
    color: black;
`;
const Text = styled.div`
    line-height: 13px;
    font-size: 12px;
    color: rgba(34, 34, 34, 0.5);
`;

const Purchase = styled.div`
    width: 100px;
    height: 30px;
    background-color: #ff91af;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 15px;
    font-weight: 700;
`;

const Deadline = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: black;
    font-weight: 700;
    text-align: center;
`;

const SideBar = styled.div`
    width: 200px;
    height: 100%;
    background-color: white;
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
