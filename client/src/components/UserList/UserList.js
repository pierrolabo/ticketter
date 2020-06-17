import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Container, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

//  Redux
import { connect } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import { getUsers } from '../../actions/userActions';
import { getProjects } from '../../actions/projectActions';
import PropTypes from 'prop-types';

import EditUserModal from '../modals/EditUserModal';

class UserList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    loadingUser: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
  };
  state = {
    modal: false,
    name: null,
    lastname: null,
    email: null,
    role: null,
    address: null,
    city: '',
    state: '',
    zip: '',
    id: null,
    orgs: [],
    prevProjects: [],
    nextProjects: null,
  };
  componentDidMount() {
    this.props.getUsers();
    this.props.getProjects();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeRolesSelect = (e) => {
    this.setState({
      role: e.value,
    });
  };
  handleChangeOrgsSelect = (e) => {
    const orgSelected = e;
    //  If no org is select we set se orgs state to empty
    //  Because a user can have no orgs affected
    if (orgSelected) {
      //  We only keep to value of the select
      const filteredOrgs = orgSelected.map((org) => org.value);
      this.setState({
        orgs: [...filteredOrgs],
      });
    } else {
      this.setState({
        orgs: [],
      });
    }
  };
  handleChangeProjects = (projects) => {
    let nextProjects = [];
    if (projects) {
      nextProjects = projects.map((project) => project.value);
    }
    console.log('change projects: ', projects);
    this.setState({
      nextProjects,
    });
    console.log('filtered: ', nextProjects);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      lastname,
      address,
      city,
      zip,
      state,
      email,
      role,
      id,
      orgs,
      nextProjects,
    } = this.state;
    const updatedUser = {
      name,
      lastname,
      address,
      email,
      role,
      id,
      orgs,
      city,
      state,
      zip,
      nextProjects,
    };
    this.props.updateUser(updatedUser);
    this.setState({
      modal: false,
      name: null,
      lastname: null,
      email: null,
      role: null,
      address: null,
      city: '',
      state: '',
      zip: '',
      id: null,
      orgs: [],
      nextProjects: null,
    });
  };
  toggleModal = (e) => {
    if (!this.state.modal) {
      let id = e.target.parentNode.id;
      //  If svg or <th> is clicked, sometimes we dont get id
      //  this fix the bug
      if (!id) {
        id = e.target.id;
      }

      try {
        let filteredUsers = this.props.users.filter(
          (user) => user._id === id
        )[0];
        const {
          name,
          lastname,
          address,
          city,
          zip,
          state,
          email,
          role,
          orgs,
        } = filteredUsers;
        this.setState({
          modal: !this.state.modal,
          id,
          name,
          lastname,
          email,
          role,
          address,
          city,
          zip,
          state,
          orgs,
        });
      } catch (err) {
        console.log(err);
      }
    }

    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { users, projects } = this.props;
    return (
      <Container>
        <EditUserModal
          modal={this.state.modal}
          handleChange={this.handleChange}
          handleChangeRolesSelect={this.handleChangeRolesSelect}
          handleChangeOrgsSelect={this.handleChangeOrgsSelect}
          handleChangeProjects={this.handleChangeProjects}
          handleSubmit={this.handleSubmit}
          toggleModal={this.toggleModal}
          name={this.state.name}
          lastname={this.state.lastname}
          email={this.state.email}
          userRole={this.state.role}
          address={this.state.address}
          city={this.state.city}
          zip={this.state.zip}
          state={this.state.state}
          orgs={this.state.orgs}
          projects={projects}
          users={users}
          id={this.state.id}
        />
        <Card>
          <CardHeader>User List</CardHeader>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <th scope='row'>{index}</th>
                      <th>{user.name}</th>
                      <th>{user.lastname}</th>
                      <th>{user.email}</th>
                      <th>{user.role}</th>
                      <th onClick={this.toggleModal} id={user._id}>
                        <FontAwesomeIcon id={user._id} icon={faUserEdit} />
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loadingUser: state.user.loadingUser,
  user: state.user,
  projects: state.project.projects,
});
export default connect(mapStateToProps, { updateUser, getUsers, getProjects })(
  UserList
);
