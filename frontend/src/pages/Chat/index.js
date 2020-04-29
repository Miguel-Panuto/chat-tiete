import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

// import { Container } from './styles';

const Chat = () => {
    const history = useHistory();
    useEffect(() => {
        verifyLogin();
    });

    const verifyLogin = async () => {
         api.get('/chat', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
         }).then().catch(err =>{
            if(err) {
                history.push('/login')
            }
         })
    }

    return(
        <div>
            chat
        </div>
    )
};

export default Chat;
