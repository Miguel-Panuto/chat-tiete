import React from 'react';

import { Container, Text } from './styles';

const Message = (props) => (
    <Container>
        <Text>{props.message}</Text>
    </Container>
);

export default Message;
