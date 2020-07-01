import styled from 'styled-components';
import { Container as MainContainer } from '../../global-styles';

export const Container = styled(MainContainer)`
    h1 {
        text-align: center;
        margin-bottom: 10px;
    }

     h2 {
        text-align: center;
        margin-bottom: 20px
    }

    a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
    }

    padding: 50px 2%;
`;

export const Select = styled.select`
    color: #fff;
    background-color: #333;
    border: none;
    padding: 5px 20px;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 20px;

    &:focus {
        outline: none;
    }

`;
