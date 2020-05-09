import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';
import io from 'socket.io-client';

// Components
import { Container } from '../../global-styles';
import { Header, Section, ChatContainer, Messages, MessagesScrollBottom, Form } from './styles';
import Message from './components/Message';
import MeMessage from './components/MeMessage';
import UserByCity from './components/UserByCity';

import api from '../../services/api';

let socket;

const Chat = () => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [myMessage, setMyMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [userColor, setColor] = useState('');
    const [loaded, setLoaded] = useState(false);
 
    useEffect(() => {
        // Veirfy if there isn't an authorization
        if (!localStorage.getItem('Authorization'))
            history.push('/login') // and send back to login page
        verifyLogin();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // loaded is to verify if user is loaded from backend
        if (loaded) {
            // add all messages to the state on receive message
            socket.on('receiveMessage', messageData => {
                setMessages([...messages, messageData]);
            });
            loadUsers();   
        }
    }, [loaded, users, messages])

    const verifyLogin = async () => {
        // verigy if the token is valid
        api.get('/chat', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        }).then(res => {
            // Picks the username and id
            const { name, id, color } = res.data;
            setUserName(name);
            setUserId(id);
            setColor(color);
            // connect to the connect
            socket = io('http://127.0.0.1:3333', {
                query: {
                    name,
                    id,
                }
            });
            // Set the loaded to true
            setLoaded(true);
            loadMessages();
            
        }).catch(err => {
            // if any erorr logout the user
            if (err) {
                handleLogout();
            }
        });
    };

    const handleLogout = () => {
        // Remove the authrozation, if has one will be removed
        localStorage.removeItem('Authorization');
        // Return to the login page
        return history.push('/login');
    };

    // load all previous messages
    const loadMessages = () => {
        socket.on('previousMessages', messageData => {
            // if there isn't any message just return
            if(messageData.length <= 0) return; 
            
            return setMessages(messageData);
        });
        // Load all users that is registred
        loadUsers();
    }

    const loadUsers = () => {
        socket.on('users', userConnected => {
            setUsers(userConnected);
        });
    }

    // Just to send messages
    const sendMessageHandler = e => {
        // with this function will not refreash the page
        e.preventDefault();
        // Verify if the message the is anything
        if (myMessage.length) {
            // Send to backend
            socket.emit('sendMessage', {
                id: userId,
                message: myMessage,
                author: userName,
                color: userColor
            });
            // Set the massages locally
            setMessages([...messages, {
                author: userName,
                message: myMessage,
            }])
        }
        // Set the message locally
        setMyMessage('');
    }

    return (
        <Container>
            <Header>
                <h1>TIETÊ CHAT</h1>
                <button onClick={handleLogout}>Sair</button>
            </Header>
            <Section>
                <ChatContainer>
                    <div className="messenger-container">
                        <MessagesScrollBottom>
                            <Messages>
                                {messages.map((msg, index) => {
                                    // Render the component if the author isn't the user
                                    if(msg.author !== userName)
                                        return <Message
                                        key={index}
                                        author={msg.author}
                                        message={msg.message}
                                        color={msg.color}
                                    />
                                    // If is the user the render will be different
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
                            // Picks the cities and render the users
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
