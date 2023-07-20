import React from 'react';
import { FullPage, Slide } from 'react-full-page/lib';
import { NavLink } from 'react-router-dom';

import { styled } from 'styled-components';
import image from '../image/slide.png';
import image2 from '../image/slide2.png';
import Header from '../components/Header';
import SlideHeader from '../components/SlideHeader';

const SlideContent1 = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    gap: 200px;
    font-weight: bold;
    color: #000;
    background-color: #ff91af;
`;

const SlideContent2 = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    gap: 400px;
    font-weight: bold;
    color: #000;
    background-color: #ff91af;
`;

const SlideContent3 = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding-left: 200px;
    justify-content: center;
    align-items: center;
    font-size: 4em;

    font-weight: bold;
    color: white;
    background-color: #ff91af;
`;

const ContentTitle1 = styled.div`
    font-size: 88px;
    width: 100%;

    font-weight: 900;
    color: white;
`;

const ContentDesc = styled.div`
    color: white;
    width: 100%;

    font-size: 32px;
    font-weight: 400;
`;

const Link = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-weight: 700;
`;

const Logo = styled.div`
    color: pink;
`;

const Slider = () => {
    return (
        <div>
            <SlideHeader />
            <FullPage>
                <Slide>
                    <SlideContent1>
                        <div>
                            <ContentTitle1>
                                가장 신선한
                                <br /> 과일을
                                <br /> 내 손 안에
                            </ContentTitle1>
                            <ContentDesc>
                                전국 어디서든 빠르게 배송되는!
                            </ContentDesc>
                        </div>
                        <div>
                            <img src={image} alt='imaged' />
                        </div>
                    </SlideContent1>
                </Slide>

                <Slide>
                    <SlideContent2>
                        <div>
                            <ContentTitle1>
                                이제껏
                                <br /> 없었던
                                <br /> 과일 관리
                            </ContentTitle1>
                            <ContentDesc>강력한 매장 관리 시스템</ContentDesc>
                        </div>
                        <div>
                            <img src={image2} alt='imaged' width='300px' />
                        </div>
                    </SlideContent2>
                </Slide>

                <Slide>
                    <SlideContent3>
                        <ContentTitle1>
                            <Link to='/home'>가맹점🏡 개설하러 가기</Link>
                        </ContentTitle1>
                    </SlideContent3>
                </Slide>
            </FullPage>
        </div>
    );
};

export default Slider;
