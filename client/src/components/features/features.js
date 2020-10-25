import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinux } from '@fortawesome/free-brands-svg-icons';
import { faHeadset, faUsers } from '@fortawesome/free-solid-svg-icons';

import './style.css';

const Features = () => {
  return (
    <section className="features">
      <Container>
        <h1 className="text-center features__title">Features</h1>
        <Container className="features__container mt-5" fluid={true}>
          <Container>
            <Row className="d-flex justify-content-center">
              <Col className="d-flex justify-content-center" xs="12">
                <Col
                  className="d-flex justify-content-end align-items-center"
                  xs="4"
                >
                  <FontAwesomeIcon icon={faLinux} size="3x" color="#3a3fa0" />{' '}
                </Col>
                <Col>
                  <h4>Open source</h4>
                  <p>
                    Ticketter is Open Source so that everyone can use and
                    contribute
                  </p>
                </Col>
              </Col>
              <Col className="d-flex justify-content-center" xs="12">
                <Col
                  className="d-flex justify-content-end align-items-center"
                  xs="4"
                >
                  <FontAwesomeIcon icon={faHeadset} size="2x" color="#3a3fa0" />
                </Col>
                <Col>
                  <h4>Easy Support</h4>
                  <p>Answer tickets like never before!!</p>
                </Col>
              </Col>
              <Col className="d-flex justify-content-center" xs="12">
                <Col
                  className="d-flex justify-content-end align-items-center"
                  xs="4"
                >
                  <FontAwesomeIcon icon={faUsers} size="2x" color="#3a3fa0" />
                </Col>
                <Col>
                  <h4>Unlimited projects</h4>
                  <p>Manage support for an endlessly amount of users</p>
                </Col>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </section>
  );
};

export default Features;
