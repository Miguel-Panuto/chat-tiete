import React from 'react';

import { Container, Ul } from './styles';

const UserByCity = (props) => {
    return(
        <Container>
            <h3>{props.city}</h3>
            <Ul>
                {props.users.map((user, index) => <li key={`${user} ${index}`}>{user}</li>)}
            </Ul>
        </Container>
)};

export default UserByCity;