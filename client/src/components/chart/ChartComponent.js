import React from 'react';
import { Container, Card, CardHeader, CardBody } from 'reactstrap';
import { Chart } from '@bit/primefaces.primereact.chart';

const ChartComponent = (props) => {
  const data = {
    labels: ['New', 'In Progress', 'Urgent', 'Unresolved'],
    datasets: [
      {
        data: [300, 50, 300, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  return (
    <Container className='ticketOverview-container' fluid>
      <h4></h4>
      <Card>
        <CardHeader>Ticket Status Overview</CardHeader>
        <CardBody>
          <Chart type='pie' data={data} />
        </CardBody>
      </Card>
    </Container>
  );
};

export default ChartComponent;
