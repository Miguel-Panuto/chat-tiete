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