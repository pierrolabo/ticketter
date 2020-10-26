import React from 'react';
import { Jumbotron, Container, Col, Row } from 'reactstrap';
import image from '../../assets/images/fixing_bug.svg';
import './style.css';
const JumbotronLanding = () => {
  return (
    <Jumbotron className="jumbotron" fluid={true}>
      <Container fluid={true} className="jumbotron__container">
        <Row>
          <Col
            className="d-flex justify-content-center align-content-center justify-content-md-end"
            xs="12"
            sm="6"
          >
            <img
              src={image}
              className="img-fluid jumbotron__image"
              alt="fixing bug"
            />
          </Col>
          <Col xs="12" sm="6">
            <Container className="jumbotron__description  d-flex flex-column justify-content-md-start">
              <h3 className="d-flex justify-content-center justify-content-md-start">
                Lightweight Bug Tracking System
              </h3>
              <ul className="d-flex flex-column align-items-center align-items-md-start p-0 pl-md-4">
                <li>Easy to use</li>
                <li>Open Source</li>
                <li>Manage multiple projects</li>
              </ul>
            </Container>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default JumbotronLanding;
