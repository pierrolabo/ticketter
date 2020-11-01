import React from 'react';
import { Container, Row } from 'reactstrap';

import NavBar from '../NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <Container fluid={true}>
        <Row>
          <NavBar />
        </Row>
        <Row>
          <main>{children}</main>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
