import React from 'react';
//import Select from 'react-select';
import Select from 'react-select';

import { FormGroup, Label } from 'reactstrap';

export const SelectSingleUser = (props) => {
  const { users, assigned_to } = props;

  //  Create the options from the users received as props
  const createOptionsUser = (users) => {
    let filteredUsers = users.map((user) => {
      return {
        value: user._id,
        label: `${user.name} ${user.lastname} | ${user.role}`,
      };
    });
    return [{ value: '', label: 'UNSASSIGNED' }, ...filteredUsers];
  };
  //  if the user already has a project assigned
  //  this project is selected as default inside the select
  const createDefaultUser = (users, userID) => {
    if (userID !== '') {
      let defaultUser = users.forEach((user) => {
        if (user._id === userID) {
          return {
            value: user._id,
            label: `${user.name} ${user.lastname} | ${user.role}`,
          };
        }
      });
      return defaultUser;
    } else {
      return [{ value: '', label: 'UNSASSIGNED' }];
    }
  };
  return (
    <FormGroup>
      <Label for="assigned">Assigned User</Label>
      <Select
        name="assignedProject"
        onChange={props.handleChange}
        options={createOptionsUser(users)}
        defaultValue={createDefaultUser(users, assigned_to)}
      />
    </FormGroup>
  );
};

export default SelectSingleUser;
