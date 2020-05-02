import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Header = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    h1 {
        letter-spacing: 10px;
    }

    button {
        padding: 10px 20px;
        color: #fff;
        background-color: #d32f2f;
        border: none;
        border-radius: 20px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: 0.2s
    }

    button:hover {
        background-color: #b71c1c; 
    }

    button:focus {
        outline: none;
    }
`;

export const Section = styled.section`
    width: 100%;
`;

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80vh;

    .messenger-container {
        display: flex;
        flex-direction: column;
        flex: 5;
    }

    .messenger-container .send {
        flex: 1;
        width: 100%;
    }

    .members {
        background-color: #E6E6E6;
        height: 100%;
        flex: 1;
        padding: 10px 10px;
    }

    .members h2 {
        color: #469;
        background-color: #ccc;
        text-align: center;
        padding: 3px;
        margin: -10px -10px;
        margin-bottom: 15px;
    }

`;

export const Messages = styled.div`
    padding: 10px 5%;     
`;

export const MessagesScrollBottom = styled(ScrollToBottom)`
    flex: 12;
    width: 100%;
    background-color: #FFFFFF;
    overflow-y: auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 10px 30px;
    justify-content: space-between; 
    align-items: center;
    background-color: #222;

    input {
        flex: 12;
        height: 100%;
        border: none;
        background-color: #808080;
        padding: 10px 2%;
        color: #fff;
        border-radius: 20px;
        margin-right: 10px;
    }

    button {
        flex: 1;
        height: 100%;
        border: none;
        background-color: #404040;
        color: #fff;
        border-radius: 25px;
        cursor: pointer;
    }

    input:focus, button:focus {
        outline: none;
    }
`;