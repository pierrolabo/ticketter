import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Table,
} from 'reactstrap';
const UserList = ({ users }) => {
  return (
    <Container>
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
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr>
                    <th scope='row'>{index}</th>
                    <th>{user.name}</th>
                    <th>{user.lastName}</th>
                    <th>{user.email}</th>
                    <th>{user.role}</th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};
export default UserList;
