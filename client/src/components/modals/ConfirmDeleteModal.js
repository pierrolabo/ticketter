import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ConfirmDeleteModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const handleDelete = () => {
    props.delete(props.projectID);
    toggle();
  };
  return (
    <div>
      <th onClick={toggle}>
        <FontAwesomeIcon icon={faTrash} />
      </th>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Warning</ModalHeader>
        <ModalBody>
          This project may contain multiple tickets, are you sure to delete this
          project and all its related tickets ? Warning !! this action is
          irreversible
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={handleDelete}>
            DELETE
          </Button>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmDeleteModal;
