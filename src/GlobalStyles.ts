import styled, { createGlobalStyle } from "styled-components";
import Textura from './assets/TexturaDica.jpg';

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Montserrat';
        font-weight: 500;
        letter-spacing: 0px;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: none;       
    }

    body {
        background-color: #F8DDC2;
        background-image: url(${Textura});
    }

    *::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: #858585;
        border-radius: 2px;
    }

    *::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }

    *::-webkit-scrollbar-corner {
        background-color: #fff;
    }
`

export const BackgroundPadrao = styled.div`
  margin-bottom: 20px;

  flex-grow: 1;

  color: #756c08;
  background-image: url(${Textura});

  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-height: 880px) {
    /* overflow-y: auto;
        overflow-x: hidden; */
  }

  h1 {
    font-size: 50px;
  }
`;

export const FundoEscuro = styled.div`
    height: 100%;
    width: 100vw;

    overflow: hidden;

    background-color: rgba(0, 0, 0, 0.5); 

    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;