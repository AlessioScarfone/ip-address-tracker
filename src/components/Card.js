import React from 'react';
import styled from 'styled-components';
import { device } from '../constants';


const CardContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: var(--border-radius);
    padding: 26px;
    background-color: white;
    width: 85%;
    z-index: 999;

    @media screen and ${device.desktop} {
        flex-direction: row;
        justify-content: space-space-evenly;
        padding-left: 32px;
        padding-right: 32px;
    }
`

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and ${device.desktop} {
        align-items: start;
        border-right: 1px solid var(--gray);
        padding-right: 4rem;
        padding-left: 1.5rem;

        :last-of-type {
            border-right: 0;
            padding-right: 0.5rem;
        }
    }
`

const Label = styled.label`
    text-transform: uppercase;
    color: var(--gray);
    font-weight: 700;
    font-size: 9px;
    letter-spacing:0.15rem;

    @media screen and ${device.desktop} {
        font-size: 10px;
    }
`

const Data = styled.p`
    color: var(--dark-gray);
    font-size: 20px;
    font-weight: 500;
    margin-top: 8px;
    text-align:center;

    @media screen and ${device.desktop} {
        margin-top: 16px;
        margin-bottom: 16px;
    }
`

const Card = ({ className, ip, location, timezone, isp }) => {
    return (
        <CardContainer className={className}>
            <DataContainer>
                <Label>Ip Address</Label>
                <Data>{ip}</Data>
            </DataContainer>
            <DataContainer>
                <Label>Location</Label>
                <Data>{location}</Data>
            </DataContainer>
            <DataContainer>
                <Label>Timezone</Label>
                <Data>UTC {timezone}</Data>
            </DataContainer>
            <DataContainer>
                <Label>ISP</Label>
                <Data>{isp}</Data>
            </DataContainer>
        </CardContainer>
    );
}

export default Card;
