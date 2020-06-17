import React from 'react';
import Select from 'react-select';

import { FormGroup, Label } from 'reactstrap';

export const SelectSingleProject = (props) => {
  const { projects, id } = props;

  //  Create the options from the projects received as props
  const createOptionsProjects = (projects) => {
    return projects.map((project) => {
      return {
        value: project._id,
        label: project.name,
      };
    });
  };
  //  if the user already has a project assigned
  //  this project is selected as default inside the select
  const createDefaultProject = (projects, projectID) => {
    try {
      let defaultProject = projects.filter(
        (project) => project._id == projectID
      )[0];
      if (defaultProject) {
        return [{ value: defaultProject._id, label: defaultProject.name }];
      } else {
        console.log('not found: ', defaultProject);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FormGroup>
      <Label for='assigned'>Assigned Project</Label>
      <Select
        name='assignedProject'
        onChange={props.handleChange}
        options={createOptionsProjects(projects)}
        defaultValue={createDefaultProject(projects, id)}
      />
    </FormGroup>
  );
};

export default SelectSingleProject;
