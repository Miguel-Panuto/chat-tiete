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
        color: #fff;
    }
`;

export const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 50px;
    background-color: #222;
    border-radius: 5px;
`;

export const Label = styled.label`
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.2rem;
`;

export const Input = styled.input`
    margin-bottom: 30px;
    height: 40px;
    padding: 5px 10px;
    border: none;
    border-radius: 10px;
    background-color: #444;
    color: #fff;

    &:focus {
        outline: none;
    }
`;

export const Button = styled.button`
    background: rgb(57,59,82);
    background: linear-gradient(90deg, #26FF35 0%, #17E896 60%, #19E0FF 100%);
    border: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;

    &:focus{
        outline: none;
    }
`;