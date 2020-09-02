import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../assets/icon-arrow.svg';


const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  --input-size: 52px;
`

const IPInput = styled.input`
  box-sizing: border-box;
  color: #ffffff;
  border:none;
  outline: none;
  padding: 14px;
  color: black;
  font-size: 18px;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  height: var(--input-size);
  width: 100%;
  z-index:1;

  ::placeholder{
    color: var(--gray);
  }
`

const SearchBtn = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  height: var(--input-size);
  width: var(--input-size);
  /* background-color:var(--dark-gray); */
  background-color: black;
  border:none;
  outline: none;
  padding: 12px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  cursor:pointer;

  :hover {
    box-shadow: 4px 4px 12px 0px var(--dark-gray);
    transform: scale(1.05);
  }
`

const Input = ({className, onClick}) => {

    const inputRef = useRef(null);
    return (
        <InputContainer className={className}>
            <IPInput placeholder={"Search for any IP address or domain"} ref={inputRef}/>
            <SearchBtn onClick={() => onClick(inputRef.current.value)}><Arrow /></SearchBtn>
        </InputContainer>
    );
}

export default Input;
