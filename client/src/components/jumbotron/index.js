import React from 'react';
import { Jumbotron, Container, Col, Row } from 'reactstrap';
import image from '../../assets/images/fixing_bug.svg';

import './style.css';
const JumbotronLanding = () => {
  return (
    <div>
      <Jumbotron className="jumbotron-landing">
        <Row>
          <Col>
            <img
              src={image}
              className="img-fluid jumbotron-image"
              alt="fixing bug"
            />
          </Col>
          <Col>
            <h1 className="display-5 text-center">
              Lightweight bug tracking system
            </h1>
            <p className="lead"></p>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default JumbotronLanding;
