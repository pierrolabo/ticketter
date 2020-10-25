import React from 'react';
import { Container, Row } from 'reactstrap';

//  Components
import NavBar from '../NavBar';
import Footer from '../Footer/footer';

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
