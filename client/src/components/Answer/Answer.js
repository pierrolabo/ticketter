import React from 'react';
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export const Answer = (props) => {
  const { answer } = props;
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <span>{props.getUserFromId(answer.created_by)}</span>
          </Col>
          <Col>
            <span>{new Date(answer.date).toUTCString()}</span>
          </Col>
          <Col md='1'>
            <th
              className='row align-items-end'
              onClick={props.handleDelete}
              id={answer.replyID}
            >
              <FontAwesomeIcon
                id={answer.replyID}
                icon={faTrash}
              ></FontAwesomeIcon>
            </th>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>{answer.reply}</CardBody>
    </Card>
  );
};
