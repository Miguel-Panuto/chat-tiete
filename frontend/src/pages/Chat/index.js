import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs'
import socketio from 'socket.io-client';

import { Container } from '../../global-styles';
import api from '../../services/api';

import { Header, Section, ChatContainer, Form } from './styles';

let socket;

const Chat = () => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userCity, setUserCity] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('Authorization'))
            history.push('/login')
        verifyLogin();
    }, []);

    const verifyLogin = async () => {
        api.get('/chat', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        }).then(res => {
            const { name, id, city } = res.data;
            setUserName(name);
            setUserCity(city);
            setUserId(id);
            socket = socketio('http://127.0.0.1:3333', {
            query: {
                name,
                city,
                id
            }
        })
        }).catch(err => {
            if (err) {
                handleLogout();
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('Authorization');
        return history.push('/login');
    };

    const sendMessageHandler = e => {
        e.preventDefault();
        if(message.length) {
            socket.emit('sendMessage', {
                id: userId,
                message
            });
            console.log('asd');
        }
        setMessage('');
    }

    return (
        <Container>
            <Header>
                <h1>TIETE CHAT</h1>
                <button onClick={handleLogout}>Sair</button>
            </Header>
            <Section>
                <ChatContainer>
                    <div className="messenger-container">
                        <div className="messages">

                        </div>
                        <div className="send">
                            <Form onSubmit={sendMessageHandler}>
                                <input 
                                    type="text" 
                                    name="send-message" 
                                    id="send"
                                    placeholder="Mensagem..."
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                                <button onSubmit={sendMessageHandler}>
                                    <BsArrowReturnLeft size={25}/>
                                </button>
                            </Form>
                        </div>
                    </div>
                    <div className="members">

                    </div>
                </ChatContainer>
            </Section>
        </Container>
    )
};

export default Chat;
