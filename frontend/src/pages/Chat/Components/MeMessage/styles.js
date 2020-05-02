import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    left: 100%;
    transform: translateX(-100%);
    background-color: #aca;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 0;
    padding: 10px 20px;
    max-width: 50%;
    margin-bottom: 15px;
`;

export const Text = styled.span`
    color: #111;
    max-width: 100%;
    word-wrap: break-word;
`;