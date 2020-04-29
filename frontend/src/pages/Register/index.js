import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Select } from './styles';
import { Form, Label, Input, Button } from '../../global-styles';
import CITIES from '../../utils/cities';
import api from '../../services/api';

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if(localStorage.getItem('Authorization')) {
            history.push('/');
        }
    })

    const handleRegister = (e) => {
        e.preventDefault();
        api.post('/users', {
            email,
            name,
            city,
            password
        }).then(res => {
            localStorage.setItem('Authorization', 'Bearer ' + res.data.token);
            return history.push('/');
        })
            .catch(err => alert('Email em uso'));
    }

    return (
        <Container>
            <h2>Crie sua conta</h2>
            <Form onSubmit={handleRegister}>
                <Label htmlFor="email">Nome</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Label htmlFor="email">E-mail</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Label htmlFor="password">Senha</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Label htmlFor="city">Cidade</Label>
                <Select id="city" value={city} onChange={e => setCity(e.target.value)}>
                    {CITIES.map((city, index) => (
                        <option value={city} key={index}>{city}</option>
                    ))}
                </Select>
                <p>Já tem conta? <Link to="/login">Entre</Link></p>
                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    )
};

export default Register;
