import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export const Answer = (props) => {
  const { answer } = props;
  return (
    <Card>
      <CardHeader>
        Answer:{' '}
        <th onClick={props.handleDelete} id={answer.replyID}>
          <FontAwesomeIcon id={answer.replyID} icon={faTrash}></FontAwesomeIcon>
        </th>
      </CardHeader>
      <CardBody>{answer.reply}</CardBody>
    </Card>
  );
};
