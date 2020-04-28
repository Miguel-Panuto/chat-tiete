import React, { useEffect } from 'react';

import { Container } from './styles';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
    }
    return (
        <Container>
            <form onSubmit={handleRegister}>

            </form>
        </Container>
    )
};

export default Register;
