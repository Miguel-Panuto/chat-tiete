import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Components
import { Container } from './styles';
import { Form, Label, Input, Button } from '../../global-styles';

import api from '../../services/api';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // This will verify if the user already is authorized
        if(localStorage.getItem('Authorization')) {
            // And return to the main page
            history.push('/');
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();
        // Login sending the email and the password
        api.post('/sessions', {
            email,
            password
        }).then(res => {
            // And then put the token to the local storage
            localStorage.setItem('Authorization', 'Bearer ' + res.data.token);
            return history.push('/');
        })
            .catch(err => alert('Email ou senha incorreto(s)'));
    }
    return (
        <Container>
            <h1>TIETÊ CHAT</h1>
            <h2>Faça o seu login</h2>
            <Form onSubmit={handleLogin}>
                <Label htmlFor="email">E-mail</Label>
                <Input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Label htmlFor="password">Senha</Label>
                <Input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    )
};

export default Login;
