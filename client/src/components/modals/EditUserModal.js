import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import Select from 'react-select';
import SelectMultiProjects from '../Select/SelectMultiProjects';

const optionsRoles = [
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'USER', label: 'USER' },
  { value: 'PROJECT_MANAGER', label: 'PROJECT_MANAGER' },
  { value: 'DEVELOPER', label: 'DEVELOPER' },
];
// Need a big refactor
const EditUserModal = ({
  modal,
  name,
  lastname,
  email,
  address,
  city,
  state,
  zip,
  orgs,
  userRole,
  toggleModal,
  handleChange,
  handleChangeRolesSelect,
  handleChangeOrgsSelect,
  handleChangeProjects,
  handleSubmit,
  errorModal,
  users,
  id,
  projects,
}) => (
  <Modal isOpen={modal} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Edit User</ModalHeader>
    <ModalBody>
      {errorModal ? <Alert color="danger">{errorModal.msg}</Alert> : null}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">name</Label>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder="name"
            value={name ? name : ''}
            className="mb-3"
            onChange={handleChange}
          />
          <Label for="lastname">Lastname</Label>
          <Input
            type="lastname"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            className="mb-3"
            value={lastname ? lastname : ''}
            onChange={handleChange}
          />
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email ? email : ''}
            className="mb-3"
            onChange={handleChange}
            valid
          />
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input
              type="address"
              name="address"
              id="address"
              placeholder="1234 Main St"
              value={address ? address : ''}
              onChange={handleChange}
            />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="city"
                  name="city"
                  id="city"
                  value={city || ''}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="state"
                  name="state"
                  id="state"
                  value={state || ''}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="zip">Zip</Label>
                <Input
                  type="zip"
                  name="zip"
                  id="zip"
                  value={zip || ''}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="roleSelect">Select a role for the user</Label>

            <Select
              name="roleSelect"
              onChange={handleChangeRolesSelect}
              defaultValue={optionsRoles.filter(
                (role) => role.value === userRole
              )}
              options={optionsRoles}
            />
          </FormGroup>
          <SelectMultiProjects
            users={users}
            projects={projects}
            id={id}
            handleChange={handleChangeProjects}
          />
          <Button color="dark" style={{ marginTop: '2rem' }} block>
            Save
          </Button>
        </FormGroup>
      </Form>
    </ModalBody>
  </Modal>
);

export default EditUserModal;
