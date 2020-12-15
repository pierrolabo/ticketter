import React from 'react';
import Select from 'react-select';

import { FormGroup, Label } from 'reactstrap';

export const SelectMultiProjects = (props) => {
  const { projects, id } = props;
  //  Create the options from the users received as props
  const createOptionsProjects = (projects) => {
    try {
      let filteredProjects = projects.map((project) => {
        return {
          value: project._id,
          label: `${project.name}`,
        };
      });
      return filteredProjects;
    } catch (err) {
      console.log('err: ', err);
    }
  };
  //  if the user already has a project assigned
  //  this project is selected as default inside the select
  const createDefaultProject = (projects, id) => {
    let filteredProjects = [];

    projects.forEach((project) => {
      if (project.userList.includes(id)) {
        filteredProjects.push({
          value: project._id,
          label: project.name,
        });
      }
    });
    return filteredProjects;
  };

  return (
    <FormGroup>
      <Label for="assigned">Assigned Projects</Label>
      <Select
        name="assignedProject"
        onChange={props.handleChange}
        options={createOptionsProjects(projects)}
        defaultValue={createDefaultProject(projects, id)}
        isMulti
      />
    </FormGroup>
  );
};

export default SelectMultiProjects;
