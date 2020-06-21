import React, { Component } from 'react';

//  Bootstrap Elm
import { Jumbotron, Container } from 'reactstrap';

class Index extends Component {
  render() {
    return (
      <Container>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className='display-3'>Ticketter</h1>
            <p className='lead'>The simplest ticket manager for your team :)</p>
          </Container>
        </Jumbotron>
        <h2>Functionnalities</h2>
      </Container>
    );
  }
}

export default Index;
