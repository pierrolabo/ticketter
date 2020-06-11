import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Table,
} from 'reactstrap';
import { getTickets } from '../actions/'';

export class Tickets extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    ticket: PropTypes.object.isRequired,
    getTickets: PropTypes.func.isRequired,
  };
  render() {
    return (
      <Container className='tickets-container'>
        <Card>
          <CardHeader>Tickets List</CardHeader>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>description</th>
                  <th>created by</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoading: state.ticket.isLoading,
  ticket: state.ticket,
});
export default connect(mapStateToProps, { getTickets })(Tickets);
