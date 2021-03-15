import React from 'react';
import { Card, CardImg } from 'reactstrap';

import Popover from '../popover/popover';

const UserListSingleProject = (props) => {
  const { user, index } = props;
  return (
    <Card
      key={user._id}
      id={`popover${index}`}
      style={{ width: '50px', height: '50px', cursor: 'pointer'}}
    >
      <CardImg
        top
        width="50%"
        src={process.env.PUBLIC_URL + '/avatar.png'}
        alt="Card image cap"
      />

      <Popover user={user} index={index} />
    </Card>
  );
};
export default UserListSingleProject;
