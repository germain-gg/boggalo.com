import styled, { css } from "styled-components";

export const Letter = styled.div`

    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 0;
        padding-bottom: 100%;
    }

    ${props => props.selected && css`
        background: red;
        color: white;    
    `}
`;

export const BoggleBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.size}, 1fr);
    grid-template-rows: repeat(${props => props.size}, 1fr);
    border: 1px solid black;
    max-width: 500px;
    margin: 20px auto;
    position: relative;

    ${Letter} {
        font-size: 5vh;
    }
`;

export const ResultBoard = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: center;

    ${Letter} {
        width: 100px;
        font-size: 2.5vh;
    }
    
`;