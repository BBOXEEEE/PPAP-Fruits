import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 20px;
    width: 1280px;
    height: 379px;
    align-items: center;
    padding-bottom: 100px;
`;

const Image = styled.img`
    width: 610px;
    height: 320px;
    border-radius: 10px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 320px;
`;

const TitleTags = styled.div`
    border-bottom: 0.5px solid grey;
    padding-bottom: 30px;
`;

const Title = styled.div`
    font-size: 30px;
    color: rgb(255, 145, 175);
    font-weight: 700;
`;

const Tags = styled.div`
    font-size: 18px;
    color: rgb(164, 207, 56);
    font-weight: 700;
`;

const Description = styled.div`
    font-size: 18px;
    font-weight: 700;
    padding-top: 30px;
    width: 610px;
`;

const Card = ({ item, pos }) => {
    const { url, title, tags, desc } = item;

    return (
        <Container>
            {pos === 'left' ? (
                <>
                    <Image src={url} alt='apple' width='610px'></Image>
                    <Content>
                        <TitleTags>
                            <Title>{title}</Title>
                            <Tags>{tags}</Tags>
                        </TitleTags>
                        <Description>{desc}</Description>
                    </Content>
                </>
            ) : (
                <>
                    <Content>
                        <TitleTags>
                            <Title>{title}</Title>
                            <Tags>{tags}</Tags>
                        </TitleTags>
                        <Description>{desc}</Description>
                    </Content>
                    <Image src={url} alt='apple' width='610px'></Image>
                </>
            )}
        </Container>
    );
};

export default Card;
