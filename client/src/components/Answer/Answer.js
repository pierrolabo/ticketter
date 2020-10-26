import React from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export const Answer = (props) => {
  const { answer, role } = props;
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col md="12" lg="4">
            <span>{props.getUserFromId(answer.created_by)}</span>
          </Col>
          <Col md="12" lg="4">
            <span>{new Date(answer.date).toUTCString()}</span>
          </Col>
          {role !== "USER" ? (
            <Col md="12" lg="4" className="d-flex justify-content-lg-center">
              <div
                key={answer.replyID}
                onClick={props.handleDelete}
                id={answer.replyID}
                className=" text-center"
              >
                <FontAwesomeIcon
                  id={answer.replyID}
                  icon={faTrash}
                ></FontAwesomeIcon>
              </div>
            </Col>
          ) : null}
        </Row>
      </CardHeader>
      <CardBody>{answer.reply}</CardBody>
    </Card>
  );
};
