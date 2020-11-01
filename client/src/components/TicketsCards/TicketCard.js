import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Progress,
  Row,
  Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';

import './style.css';
const TicketCard = (props) => {
  const { ticketNumber, ticketType } = props.ticketInfo;
  const renderSwitch = (param) => {
    switch (param) {
      case 'NEW':
        return newTickets;
      case 'PROGRESS':
        return progressTickets;
      case 'URGENT':
        return urgentTickets;
      case 'COMPLETED':
        return completedTickets;
      default:
        return '';
    }
  };
  const newTickets = (
    <Col>
      <Card className="ticketcard">
        <CardBody>
          <CardTitle className="text-center">New Tickets</CardTitle>
          <CardText className="text-center">
            <FontAwesomeIcon icon={faTicketAlt} color="#ffc107" />{' '}
            {ticketNumber}
          </CardText>
          <div className="text-center text-warning">{`${ticketNumber}%`}</div>
          <Progress color="warning" value={ticketNumber} />
        </CardBody>
      </Card>
    </Col>
  );

  const progressTickets = (
    <Col>
      <Card className="ticketcard">
        <CardBody>
          <CardTitle className="text-center">Tickets In Progress</CardTitle>
          <CardText className="text-center">
            <FontAwesomeIcon icon={faTicketAlt} color="#28a745" />{' '}
            {ticketNumber}
          </CardText>
          <div className="text-center text-success">{`${ticketNumber}%`}</div>

          <Progress color="success" value={ticketNumber} />
        </CardBody>
      </Card>
    </Col>
  );
  const urgentTickets = (
    <Col>
      <Card className="ticketcard">
        <CardBody>
          <CardTitle className="text-center">Urgent Tickets</CardTitle>
          <CardText className="text-center">
            <FontAwesomeIcon icon={faTicketAlt} color="#dc3545" />{' '}
            {ticketNumber}
          </CardText>
          <div className="text-center text-danger">{`${ticketNumber}%`}</div>

          <Progress color="danger" value={ticketNumber} />
        </CardBody>
      </Card>
    </Col>
  );
  const completedTickets = (
    <Col>
      <Card xs="4" className="ticketcard">
        <CardBody>
          <CardTitle className="text-center">Completed Tickets</CardTitle>
          <CardText className="text-center">
            <FontAwesomeIcon icon={faTicketAlt} color="#17a2b8" />{' '}
            {ticketNumber}
          </CardText>
          <div className="text-center text-info">{`${ticketNumber}%`}</div>

          <Progress color="info" value={ticketNumber}></Progress>
        </CardBody>
      </Card>
    </Col>
  );
  return (
    <Row className="d-flex flex-sm-column" xs="12" md="8" lg="12">
      {renderSwitch(ticketType)}
    </Row>
  );
};

export default TicketCard;
