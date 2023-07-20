import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../styles.css';
import { useOwnerStore, useShopsStore } from '../store/store';

const options = ['one', 'two', 'three'];
const defaultOption = options[0];
const Wrapper = styled.div`
    border-bottom: 0.5px solid #e5e7eb;
    width: 100%;
    height: 70px;
    position: fixed;
    background-color: white;
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
    color: #ff91af;
    text-decoration: none;
    font-weight: 700;
`;

const Logout = styled.div`
    color: #ff91af;
    text-decoration: none;
    font-weight: 700;
`;

const Menu = styled.div`
    display: flex;
    padding-right: 20px;
    gap: 20px;
`;

const MyPageWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const Header = () => {
    const active = {
        color: 'red',
    };

    const { shops } = useShopsStore((state) => state);
    const { owner } = useOwnerStore((state) => state);

    // session에서 owner가 있을 때만 매장관리 보이게
    const ownerSession = sessionStorage.getItem('owner');
    const user = sessionStorage.getItem('user');

    useEffect(() => {
        console.log('rerender');
    }, []);
    return (
        <Wrapper>
            <Logo>
                <Link to='/home'>PPAP</Link>
            </Logo>
            <Menu>
                <Link to={`/information/대전유성점`}>과일 구매</Link>
                <Link to='/storepoint'>가맹 안내</Link>
                {ownerSession && <Link to='/manage/add-shop'>매장 관리</Link>}
            </Menu>
            <Account>
                {
                    // owner, user가 있을 때만 로그아웃 보이게
                    ownerSession || user ? (
                        <MyPageWrapper>
                            <Logout
                                onClick={() => {
                                    alert('로그아웃 되었습니다.');
                                    sessionStorage.removeItem('owner');
                                    sessionStorage.removeItem('user');
                                    // /home으로 이동
                                    window.location.href = '/home';
                                }}
                            >
                                Logout
                            </Logout>
                            <Link to='/mypage'>Mypage</Link>
                        </MyPageWrapper>
                    ) : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                    )
                }
            </Account>
        </Wrapper>
    );
};

export default Header;
