import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ccc;
    max-width: 50%;
    border-top-left-radius: 0;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 10px 20px;
    margin-bottom: 15px;
`;

export const Author = styled.span`
    color: ${props => props.color};
    font-weight: bold;
    margin-bottom: 8px;
`;

export const Text = styled.span`
    color: #111;
    max-width: 100%;
    word-wrap: break-word;
`;