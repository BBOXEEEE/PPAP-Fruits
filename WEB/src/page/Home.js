import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../image/image1.png';
import image2 from '../image/image2.png';
import image3 from '../image/image3.png';
import React, { Component, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useOwnerStore } from '../store/store';

const Container = styled.div`
    padding-top: 70px;
`;

const Home = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const W = '100%';
    const H = '600vh';

    const { owner, stores, setOwner } = useOwnerStore((state) => state);

    console.log('owner', owner);

    // 세션에서 가져오기

    useEffect(() => {
        const isHaveOwnerSession = JSON.parse(sessionStorage.getItem('owner'));
        if (isHaveOwnerSession) {
            setOwner(isHaveOwnerSession);
        } else {
            const user = JSON.parse(sessionStorage.getItem('user'));
        }
    }, []);

    return (
        <Container>
            <Slider {...settings}>
                <div>
                    <img src={image1} alt='2' width={W} height={H}></img>
                </div>
                <div>
                    <img src={image2} alt='2' width={W} height={H}></img>
                </div>
                <div>
                    <img src={image3} alt='2' width={W} height={H}></img>
                </div>
            </Slider>
        </Container>
    );
};

export default Home;
