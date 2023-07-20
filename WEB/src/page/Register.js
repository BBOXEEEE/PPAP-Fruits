import React, { useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../api/auth/register';

const SignUpToggle = styled.div`
    display: flex;
    gap: 10px;
`;

const SignUpToggleItem = styled.div`
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #ff91af;
    cursor: pointer;
`;

const SignUpTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
    font-size: 22px;
    font-weight: 700;
    color: #ff91af;
    cursor: pointer;
`;

const Register = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const onClickToggle = () => {
        setIsAdmin(!isAdmin);
    };

    const navigate = useNavigate();

    const email = useRef('');
    const id = useRef('');
    const password = useRef('');
    const passwordConfirm = useRef('');
    const name = useRef('');
    const phone = useRef('');

    // 서버로 회원가입 요청
    const onSubmit = async (e) => {
        e.preventDefault();
        // 폼이 하나라도 비어있음녀 회원가입 요청을 보내지 않는다.
        if (
            email.current.value === '' ||
            id.current.value === '' ||
            password.current.value === '' ||
            passwordConfirm.current.value === '' ||
            name.current.value === '' ||
            phone.current.value === ''
        ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        const data = {
            name: name.current.value,
            id: id.current.value,
            password: password.current.value,
            email: email.current.value,
            phone: phone.current.value,
            isOwner: isAdmin,
        };
        register(data)
            .then((res) => {
                console.log('Res', res);

                alert('회원가입이 완료되었습니다.');

                navigate('/home');
            })
            .catch((err) => {
                alert('회원가입에 실패하였습니다.');
            });
    };

    return (
        <SignUpContainer>
            <>
                <SignUpForm>
                    {isAdmin ? (
                        <SignUpTitle>가맹점주 회원가입</SignUpTitle>
                    ) : (
                        <SignUpTitle>일반 회원가입</SignUpTitle>
                    )}
                    <InputField
                        type='email'
                        placeholder='이메일 주소'
                        ref={email}
                        required
                    />
                    <InputField type='id' placeholder='아이디' ref={id} />
                    <InputField
                        type='password'
                        placeholder='비밀번호'
                        ref={password}
                    />
                    <InputField
                        type='password'
                        placeholder='비밀번호 확인'
                        ref={passwordConfirm}
                    />
                    <InputField type='text' placeholder='이름' ref={name} />
                    <InputField
                        type='text'
                        placeholder='전화번호'
                        ref={phone}
                    />

                    <Button onClick={onSubmit}>Register</Button>
                </SignUpForm>
            </>
            {/* ) : (
                <>
                    <SignUpToggle></SignUpToggle>
                    <SignUpForm>
                        {isAdmin ? (
                            <SignUpTitle>가맹점주 회원가입</SignUpTitle>
                        ) : (
                            <SignUpTitle>일반 회원가입</SignUpTitle>
                        )}
                        <InputField
                            type='email'
                            placeholder='이메일 주소'
                            ref={email}
                            required
                        />
                        <InputField type='id' placeholder='아이디' ref={id} />

                        <InputField
                            type='password'
                            placeholder='비밀번호'
                            ref={password}
                        />
                        <InputField
                            type='password'
                            placeholder='비밀번호 확인'
                        />
                        <InputField type='text' placeholder='이름' ref={name} />
                        <InputField
                            type='text'
                            placeholder='전화번호'
                            ref={phone}
                        />

                        <Button>Register</Button>
                    </SignUpForm>
                </>
            )} */}
            <SignUpToggleItem onClick={onClickToggle}>
                {isAdmin
                    ? '일반 회원가입하러 가기'
                    : '가맹점주 회원가입하러 가기'}
            </SignUpToggleItem>
        </SignUpContainer>
    );
};

export default Register;

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f2f2f2;
    padding-top: 30px;
`;

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 300px;
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

const SelectField = styled.select`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #ff91af;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Link = styled(NavLink)`
    color: #ff91af;
    text-decoration: none;
    font-weight: 700;
`;
