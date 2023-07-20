import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../api/auth/login';
import { useAuthStore, useOwnerStore } from '../store/store';

const Login = () => {
    const id = useRef();
    const password = useRef();

    const { setId } = useAuthStore((state) => state);
    const { owner, setOwner } = useOwnerStore((state) => state);

    const [setDisabled, setDisabledState] = useState(true);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(id.current.value);
        console.log(password.current.value);

        // TODO: 서버로 로그인 요청하기
        const data = {
            id: id.current.value,
            pw: password.current.value,
        };

        login(data)
            .then((res) => {
                if (res?.status === 200) {
                    setId(res?.data[0]);
                    console.log('success', res);

                    console.log('res!!!!!!', res?.data[0]);

                    const owner = {
                        ID: res?.data[0].ID,
                        OWNER_NAME: res?.data[0].OWNER_NAME,
                    };
                    setOwner(owner);

                    // 세션에 저장
                    sessionStorage.setItem('user', JSON.stringify(owner));

                    alert('로그인 성공');
                    navigate('/home');
                }
            })
            .finally(() => {
                id.current.value = '';
                password.current.value = '';
            });
    };

    const onSubmitOwner = (e) => {
        e.preventDefault();
        console.log(id.current.value);
        console.log(password.current.value);

        // TODO: 서버로 로그인 요청하기
        const data = {
            id: id.current.value,
            pw: password.current.value,
            owner: 'owner',
        };

        login(data)
            .then((res) => {
                if (res?.status === 200) {
                    setId(res?.data[0]);
                    console.log('success', res);
                    const owner = {
                        ID: res?.data[0].ID,
                        OWNER_NAME: res?.data[0].OWNER_NAME,
                    };
                    setOwner(owner);

                    // 세션에 저장
                    sessionStorage.setItem('owner', JSON.stringify(owner));

                    alert('로그인 성공');
                    navigate('/home');
                }
            })
            .finally(() => {
                id.current.value = '';
                password.current.value = '';
            });
    };

    return (
        <LoginContainer>
            <LoginForm>
                <LoginTitle>Login</LoginTitle>

                <InputField
                    type='text'
                    placeholder='아이디'
                    ref={id}
                    // 비어있으면 로그인 버튼 비활성화
                    onChange={(e) => {
                        if (e.target.value === '') {
                            setDisabledState(true);
                        } else {
                            setDisabledState(false);
                        }
                    }}
                />
                <InputField
                    type='password'
                    placeholder='비밀번호'
                    ref={password}
                    // 비어있으면 로그인 버튼 비활성화

                    onChange={(e) => {
                        if (e.target.value === '') {
                            setDisabledState(true);
                        } else {
                            setDisabledState(false);
                        }
                    }}
                />
                <ButtonWrapper>
                    <Button
                        type='submit'
                        onClick={onSubmit}
                        disabled={setDisabled}
                    >
                        일반 Login
                    </Button>
                    <Button
                        type='submit'
                        onClick={onSubmitOwner}
                        disabled={setDisabled}
                    >
                        가맹점주 Login
                    </Button>
                </ButtonWrapper>
                <div>
                    <ForgotPasswordButton>비밀번호 찾기</ForgotPasswordButton>
                    <RegisterButton to='/register'>
                        Create an Account
                    </RegisterButton>
                </div>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 40px;
`;

const LoginTitle = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    font-weight: 700;
    color: #ff91af;
    padding-bottom: 40px;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f2f2f2;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 400px;
    height: 300px;

    padding: 40px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 160px;
    padding: 12px;
    background-color: #ff91af;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    margin-top: 20px;
    cursor: pointer;
`;

const ForgotPasswordButton = styled.button`
    margin-top: 12px;
    background-color: transparent;
    border: none;
    color: #ff91af;
    font-size: 14px;
    cursor: pointer;
`;

const RegisterButton = styled(NavLink)`
    margin-top: 12px;
    background-color: transparent;
    border: none;
    color: #ff91af;
    font-size: 14px;
    cursor: pointer;
`;
