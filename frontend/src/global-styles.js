import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    html, body, #root {
        font-family: 'Roboto', sans-serif;
    }

    body {
        min-height: 100vh;
        background: #323232;
    }
`;