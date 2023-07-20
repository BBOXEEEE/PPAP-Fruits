import React from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
const Wrapper = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 70px;
`;
const Title = styled.div`
    display: flex;
    padding-top: 60px;
    padding-bottom: 60px;
    width: 100%;
    justify-content: center;
    font-size: 30px;
    color: rgb(255, 145, 175);
    font-weight: 700;
`;

const ITEMS = [
    {
        title: 'PPAP 과일',
        tags: '#싱싱한 #맛있는 #가성비 #사계절꾸준한수익',
        url: 'https://cdn.imweb.me/thumbnail/20220204/c0ae509ceaf08.jpg',
        desc: 'PPAP는 30년 이상 과일 유통 노하우와 품질기준을 바탕으로 4계절 내내 신선도와 맛이 보장된 과일을 유통합니다. 또, PPAP 본사 규격에 따라 정성스럽게 소포장하고 상품마다 바코드를 부착하여 납품함으로써 좋은 과일 선별과 소포장에 대한 부담을 오롯이 덜어드립니다.',
        pos: 'left',
    },
    {
        title: '과일 무인유통플랫폼',
        tags: '#국내최초 #자체개발프로그램 # 키오스크 #고용부담제로',
        url: 'https://cdn.imweb.me/thumbnail/20220204/fc6dcf5c3c8ca.jpg',
        desc: '국내 최초로 가공식품이 아닌 생물 그대로를 무인판매하는 유통 플랫폼 체계를 구축하여 발주/재고/매출/반품/가격표시변경/회원정보를 모바일로 All-in-one 관리할 수 있습니다. PPAP 점주님들은 매장에서 3시간 내외로 적게 일하고 안정적인 수익을 창출할 수 있습니다.',
        pos: 'right',
    },
    {
        title: '과일 반품시스템',
        tags: '#국내최초 #유통기한 #재고부담제로',
        url: 'https://cdn.imweb.me/thumbnail/20220204/e77db986261c6.jpg',
        desc: "과일은 생물이기 때문에 재고처리가 가장 큰 부담입니다. PPAP는 체계화된 선도관리 가이드와 상품별 유통기한 제도를 도입하여 국내 과일유통업계 최초로 100% 과일반품시스템을 운영하고 있습니다. 결국 점주님들의 재고관리 부담은 '제로'입니다.",
        pos: 'left',
    },
    {
        title: '차별화 인테리어',
        tags: '#프리미엄 #트렌디 #효율적동선',
        url: 'https://cdn.imweb.me/thumbnail/20220204/54c6efcd16ae2.jpg',
        desc: '핑크 / 베이지 / 그레이 색상으로 오롯 BI와 일체감을 줄 수 있는 프리미엄 과일가게 컨셉으로 구성되어 있습니다.',
        pos: 'right',
    },
];

const StorePoint = () => {
    return (
        <Wrapper>
            <Title>창업 포인트</Title>
            {ITEMS.map((item) => (
                <Card item={item} pos={item.pos} />
            ))}
        </Wrapper>
    );
};

export default StorePoint;
