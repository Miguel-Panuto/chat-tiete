import React from 'react';

import { Container, Author, Text } from './styles';

const MeMessage = (props) => (
    <Container>
        <Author color={props.color}>{props.author}</Author>
        <Text>{props.message}</Text>
    </Container>
);

export default MeMessage;
