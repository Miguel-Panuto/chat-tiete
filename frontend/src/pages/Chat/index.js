import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';
import io from 'socket.io-client';


import { Container } from '../../global-styles';
import api from '../../services/api';

import { Header, Section, ChatContainer, Messages, MessagesScrollBottom,Form } from './styles';
import Message from './Components/Message';
import MeMessage from './Components/MeMessage';
import UserByCity from './Components/UserByCity';

let socket;

const Chat = () => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [myMessage, setMyMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
 
    useEffect(() => {
        if (!localStorage.getItem('Authorization'))
            history.push('/login')
        verifyLogin();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (loaded) {
            socket.on('receiveMessage', messageData => {
                setMessages([...messages, messageData]);
            });
            loadUsers();   
        }
    }, [loaded, users, messages])

    const verifyLogin = async () => {
        api.get('/chat', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        }).then(res => {
            const { name, id } = res.data;
            setUserName(name);
            setUserId(id);
            socket = io('http://127.0.0.1:3333', {
                query: {
                    name,
                    id
                }
            });
            setLoaded(true);
            loadMessages();
            
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

    const loadMessages = () => {
        socket.on('previousMessages', messageData => {
            if(messageData.length > 0) {
                setMessages(messageData)
            }
        });
        loadUsers();
    }

    const loadUsers = () => {
        socket.on('users', userConnected => {
            setUsers(userConnected);
        });
    }

    const sendMessageHandler = e => {
        e.preventDefault();
        if (myMessage.length) {
            socket.emit('sendMessage', {
                id: userId,
                message: myMessage,
                author: userName
            });
            setMessages([...messages, {
                author: userName,
                message: myMessage
            }])
        }
        setMyMessage('');
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
                        <MessagesScrollBottom>
                            <Messages>
                                {messages.map((msg, index) => {
                                    if(msg.author !== userName)
                                        return <Message
                                        key={index}
                                        author={msg.author}
                                        message={msg.message}
                                        color={msg.color}
                                    />
                                    return <MeMessage key={index} message={msg.message}/>
                                })}
                            </Messages>
                        </MessagesScrollBottom>
                        <div className="send">
                            <Form onSubmit={sendMessageHandler}>
                                <input
                                    type="text"
                                    name="send-message"
                                    id="send"
                                    placeholder="Mensagem..."
                                    value={myMessage}
                                    onChange={e => setMyMessage(e.target.value)}
                                />
                                <button onSubmit={sendMessageHandler}>
                                    <BsArrowReturnLeft size={25} />
                                </button>
                            </Form>
                        </div>
                    </div>
                    <div className="members">
                        <h2>Membros</h2>
                        {users.map((user, index) => {
                            return <UserByCity 
                                key={`${user[0].city} ${index}`}
                                city={user[0].city}
                                users={user.map(us => us.name)}
                            />
                        })}
                    </div>
                </ChatContainer>
            </Section>
        </Container>
    )
};

export default Chat;
