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
      case 'UNRESOLVED':
        return unresolvedTickets;
      default:
        return '';
    }
  };
  const newTickets = (
    <Col>
      <Card>
        <CardBody>
          <CardTitle className='text-center'>New Tickets</CardTitle>
          <CardText className='text-center'>
            <FontAwesomeIcon icon={faTicketAlt} /> {ticketNumber}
          </CardText>
          <div className='text-center'>{`${ticketNumber}%`}</div>
          <Progress color='warning' value={ticketNumber} />
        </CardBody>
      </Card>
    </Col>
  );

  const progressTickets = (
    <Col>
      <Card>
        <CardBody>
          <CardTitle className='text-center'>Tickets In Progress</CardTitle>
          <CardText className='text-center'>
            <FontAwesomeIcon icon={faTicketAlt} /> {ticketNumber}
          </CardText>
          <div className='text-center'>{`${ticketNumber}%`}</div>

          <Progress color='success' value={ticketNumber} />
        </CardBody>
      </Card>
    </Col>
  );
  const urgentTickets = (
    <Col>
      <Card>
        <CardBody>
          <CardTitle className='text-center'>Urgent Tickets</CardTitle>
          <CardText className='text-center'>
            <FontAwesomeIcon icon={faTicketAlt} /> {ticketNumber}
          </CardText>
          <div className='text-center'>{`${ticketNumber}%`}</div>

          <Progress color='danger' value={ticketNumber} />
        </CardBody>
      </Card>
    </Col>
  );
  const unresolvedTickets = (
    <Col>
      <Card xs='4'>
        <CardBody>
          <CardTitle className='text-center'>Not Resolved Tickets</CardTitle>
          <CardText className='text-center'>
            <FontAwesomeIcon icon={faTicketAlt} /> {ticketNumber}
          </CardText>
          <div className='text-center'>{`${ticketNumber}%`}</div>

          <Progress color='info' value={ticketNumber}></Progress>
        </CardBody>
      </Card>
    </Col>
  );
  return (
    <Row className='d-flex flex-sm-column' xs='12' md='8' lg='12'>
      {renderSwitch(ticketType)}
    </Row>
  );
};

export default TicketCard;
