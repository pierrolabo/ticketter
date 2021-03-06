import React, { useState } from 'react';

import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import { history } from '../../configureStore';
import EditTicketModal from '../modals/EditTicketModal';

const TicketListSingleProject = (props) => {
  const [modal, setModal] = useState(false);
  const [editTicket, setEditTicket] = useState([]);
  const { tickets, role, users, projects } = props;

  const authorizedToEdit = role === 'ADMIN' || role === 'PROJECT_MANAGER';
  const hasRightToDelete = role === 'ADMIN' || role === 'PROJECT_MANAGER';

  const handleEdit = (event) => {
    //  The modal is close
    if (!modal) {
      let id = event.target.parentNode.id;

      //  If svg or <th> is clicked, sometimes we dont get id
      //  this fix the bug
      if (!id) {
        id = event.target.id;
      }

      let editTicket = tickets.filter((ticket) => ticket._id === id);
      //let editUserTicket = this.props.user.users.filter();
      setEditTicket(editTicket[0]);
      setModal(true);
      /*
      this.setState({
        editTicket: editTicket[0],
        modal: true,
      });
      */
    } else {
      setEditTicket([]);
      setModal(false);
      /*
      this.setState({
        modal: false,
        editTicket: [],
      });
      */
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };

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

  return (
    <Table hover className="table-responsive">
      {modal ? (
        <EditTicketModal
          modal={modal}
          users={users}
          projects={projects}
          editTicket={editTicket}
          toggleModal={toggleModal}
        />
      ) : null}
      <thead>
        <tr>
          <th scope="col">title</th>
          <th scope="col">created by</th>
          <th scope="col">assigned_to</th>
          <th scope="col">status</th>
          {authorizedToEdit ? <th>Edit</th> : null}
          <th scope="col">View</th>
          {hasRightToDelete ? <th scope="col">Delete</th> : null}
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
                <th
                  id={ticket._id}
                  onClick={handleEdit}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon id={ticket._id} icon={faEdit} />
                </th>
              ) : null}

              <th onClick={handleView} id={ticket._id}>
                <FontAwesomeIcon id={ticket._id} icon={faEye} style={{cursor: 'pointer'}}></FontAwesomeIcon>
              </th>
              {hasRightToDelete ? (
                <th
                  id={ticket._id}
                  onClick={props.handleDelete}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon id={ticket._id} icon={faTrash} />
                </th>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TicketListSingleProject;
