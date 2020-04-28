import React, { useEffect } from 'react';

import { Container } from './styles';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
    }
    return (
        <Container>
            <form onSubmit={handleLogin}>

            </form>
        </Container>
    )
};

export default Login;
