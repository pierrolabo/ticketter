import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const PopOver = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => {
    setPopoverOpen(true);
    setTimeout(() => setPopoverOpen(false), 1500);
  };
  const { user, index } = props;
  return (
    <Popover
      placement="bottom"
      isOpen={popoverOpen}
      target={`popover${index}`}
      toggle={toggle}
      className="popover"
    >
      <PopoverHeader>{`${user.name} ${user.lastname}`}</PopoverHeader>
      <PopoverBody>{user.email}</PopoverBody>
    </Popover>
  );
};

export default PopOver;
