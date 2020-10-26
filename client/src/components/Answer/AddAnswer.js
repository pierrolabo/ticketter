import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Container,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap';

export const AddAnswer = (props) => {
  const [reply, setReply] = useState();
  const handleChange = (e) => {
    setReply(e.target.value);
  };
  const handleClick = () => {
    setReply('');
    props.handleAddReply(reply);
  };
  return (
    <Container>
      <Card>
        <CardHeader>Reply</CardHeader>
        <InputGroup>
          <Input placeholder="and..." value={reply} onChange={handleChange} />
          <InputGroupAddon addonType="append">
            <Button onClick={handleClick} color="success">
              Reply
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Card>
    </Container>
  );
};
