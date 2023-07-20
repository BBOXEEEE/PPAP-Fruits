import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import '../styles.css';

const options = ['one', 'two', 'three'];
const defaultOption = options[0];
const NavWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 1200px;
    margin: 0 auto;

    height: 120px;
    position: fixed;
    background-color: #ff91af;

    display: flex;
    justify-content: space-between;

    align-items: center;
    z-index: 100;
`;

const Logo = styled.div`
    padding-left: 20px;
`;

const Account = styled.div`
    display: flex;
    padding-right: 20px;
    gap: 20px;
`;

const Link = styled(NavLink)`
    color: white;
    font-size: 28px;
    text-decoration: none;
    font-weight: 700;
`;

const Menu = styled.div`
    display: flex;
    padding-right: 20px;
    gap: 20px;
`;

const SlideHeader = () => {
    const active = {
        color: 'red',
    };
    return (
        <NavWrapper
            style={{
                backgroundColor: 'white',
            }}
        >
            <Wrapper>
                <Logo>
                    <Link to='/home'>PPAP</Link>
                </Logo>
                <Menu>
                    <Link to='/information/대전유성점'>과일 구매</Link>
                    <Link to='/storepoint'>가맹 안내</Link>
                </Menu>
                <Account>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </Account>
            </Wrapper>
        </NavWrapper>
    );
};

export default SlideHeader;
