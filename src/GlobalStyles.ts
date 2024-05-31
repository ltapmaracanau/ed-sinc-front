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