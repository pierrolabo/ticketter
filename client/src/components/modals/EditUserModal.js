import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';

const EditUserModal = ({
  modal,
  name,
  lastname,
  email,
  address,
  toggleModal,
  handleChange,
  handleSubmit,
  errorModal,
}) => (
  <Modal isOpen={modal} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Edit User</ModalHeader>
    <ModalBody>
      {errorModal ? <Alert color='danger'>{errorModal.msg}</Alert> : null}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for='name'>name</Label>
          <Input
            type='name'
            name='name'
            id='name'
            placeholder='name'
            value={name}
            className='mb-3'
            onChange={handleChange}
          />
          <Label for='lastname'>Lastname</Label>
          <Input
            type='lastname'
            name='lastname'
            id='lastname'
            placeholder='lastname'
            className='mb-3'
            value={lastname}
            onChange={handleChange}
          />
          <Label for='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={email}
            className='mb-3'
            onChange={handleChange}
          />
          <Button color='dark' style={{ marginTop: '2rem' }} block>
            Login
          </Button>
        </FormGroup>
      </Form>
    </ModalBody>
  </Modal>
);

export default EditUserModal;
