import React from 'react';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../configureStore';

const TicketListSingleProject = (props) => {
  const { tickets, role, users } = props;
  const authorizedToEdit = role === 'ADMIN' || 'PROJECT_MANAGER';
  const getUserFromID = (id) => {
    //  If ID is null then te ticket is unassigned
    if (id === '') {
      return 'Unassigned';
    }
    const filteredUser = users.filter((user) => user._id === id);
    //  If no user has been found, return default
    if (filteredUser.length !== 0) {
      return filteredUser[0].email;
    }
    return 'User not Found';
  };
  const handleView = (event) => {
    //  The modal is close
    let id = event.target.parentNode.id;
    //  If svg or <th> is clicked, sometimes we dont get id
    //  this fix the bug
    if (!id) {
      id = event.target.id;
    }
    history.push(`/tickets/view/${id}`);
  };

  const handleEdit = () => {};
  return (
    <Card xs='8'>
      <CardHeader className='text-center'>Tickets List</CardHeader>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>title</th>
              <th>created by</th>
              <th>assigned_to</th>
              <th>status</th>
              {authorizedToEdit ? <th>Edit</th> : ''}
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              return (
                <tr key={ticket._id} id={ticket._id}>
                  <th>{ticket.title}</th>
                  <th>{getUserFromID(ticket.created_by)}</th>
                  <th>{getUserFromID(ticket.assigned_to)}</th>
                  <th>{ticket.status}</th>
                  {authorizedToEdit ? (
                    <th id={ticket._id} onClick={handleEdit}>
                      <FontAwesomeIcon id={ticket._id} icon={faEdit} />
                    </th>
                  ) : (
                    ''
                  )}

                  <th onClick={handleView} id={ticket._id}>
                    <FontAwesomeIcon
                      id={ticket._id}
                      icon={faEye}
                    ></FontAwesomeIcon>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TicketListSingleProject;
