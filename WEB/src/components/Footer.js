import React from 'react';
import { styled } from 'styled-components';

// Footer 컴포넌트를 만들어주세요.
// Footer 컴포넌트는 아래의 내용을 보여줍니다.
// 1. FooterWrapper 컴포넌트를 만들어주세요.
// 2. FooterWrapper 컴포넌트는 화면을 가장 아래로 내렸을 때 보입니다.
// 3. FooterWrapper 컴포넌트는 화면의 가로 길이를 100% 차지합니다.
// 4. FooterWrapper 컴포넌트는 높이가 70px입니다.

const FooterWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: white;
    border-top: 0.5px solid #e5e7eb;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const Footer = () => {
    return <FooterWrapper>Footer</FooterWrapper>;
};

export default Footer;
