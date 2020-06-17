import React from 'react';
import Select from 'react-select';

import { FormGroup, Label } from 'reactstrap';

export const SelectMultiUsers = (props) => {
  const { users, userList } = props;

  //  Create the options from the users received as props
  const createOptionsUsers = (users) => {
    try {
      let filteredUsers = users.map((user) => {
        return {
          value: user._id,
          label: `${user.name} ${user.lastname} | ${user.role}`,
        };
      });
      return [...filteredUsers];
    } catch (err) {
      console.log('err: ', err);
    }
  };
  //  if the user already has a project assigned
  //  this project is selected as default inside the select
  const createDefaultUser = (users, userList) => {
    if (userList.length > 0) {
      let filteredUsers = users.map((user) => {
        if (userList.includes(user._id)) {
          return {
            value: user._id,
            label: `${user.name} ${user.lastname} | ${user.role}`,
          };
        }
      });
      return filteredUsers;
    }
  };
  return (
    <FormGroup>
      <Label for='assigned'>Assigned Users</Label>
      <Select
        name='assignedProject'
        onChange={props.handleChange}
        options={createOptionsUsers(users)}
        defaultValue={createDefaultUser(users, userList)}
        isMulti
      />
    </FormGroup>
  );
};

export default SelectMultiUsers;
