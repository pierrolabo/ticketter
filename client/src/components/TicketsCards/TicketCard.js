import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Progress,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
const TicketCard = (props) => {
  const { cardTitle, ticketNumber, ticketType } = props.ticketInfo;
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
  );

  const progressTickets = (
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
  );
  const urgentTickets = (
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
  );
  const unresolvedTickets = (
    <Card>
      <CardBody>
        <CardTitle className='text-center'>Not Resolved Tickets</CardTitle>
        <CardText className='text-center'>
          <FontAwesomeIcon icon={faTicketAlt} /> {ticketNumber}
        </CardText>
        <div className='text-center'>{`${ticketNumber}%`}</div>

        <Progress color='info' value={ticketNumber}></Progress>
      </CardBody>
    </Card>
  );
  return <div>{renderSwitch(ticketType)}</div>;
};

export default TicketCard;
