import React, { Component } from 'react';
//  Router
import { Route, Switch } from 'react-router-dom';
import { history } from '../configureStore';
import { Row, Col } from 'reactstrap';
//  Routes
import PrivateRoute from './PrivateRoute';
import AdminOrPGRoute from './AdminOrPGRoute';
//  Redux
import { connect } from 'react-redux';
//  Components
import NavBar from '../components/NavBar';
import SideBar from '../components/sidebar/SideBar';
import Layout from '../components/layout/layout';

//  Pages
import Index from '../views/Index';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Users from '../views/Users';
import Tickets from '../views/Tickets';
import CreateTicket from '../views/CreateTicket';
import Projects from '../views/Projects';
import CreateProject from '../views/CreateProject';
import ViewSingleTicket from '../views/ViewSingleTicket';
import { getTickets } from '../actions/ticketActions';
import { getProjects } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';
import DetailsProject from '../views/DetailsProject';

class Routes extends Component {
  componentDidMount() {
    this.props.getTickets();
    this.props.getProjects();
  }

  componentWillReceiveProps(nextProps) {
    //  If a user just logged in
    if (
      nextProps.auth.isAuthenticated !== this.props.auth.isAuthenticated &&
      nextProps.auth.isAuthenticated
    ) {
      this.props.getProjects();
      this.props.getTickets();
      this.props.getUsers();
    }
  }
  render() {
    const location = history.location;
    return (
      <Layout>
        <Row className="m-auto">
          {this.props.auth.isAuthenticated && location.pathname !== '/' ? (
            <Col className="sidebar-container" md="2" xl="2">
              <SideBar
                role={this.props.auth.role}
                tickets={this.props.ticket.tickets}
                projects={this.props.project.projects}
              />
            </Col>
          ) : (
            ''
          )}
          <Col className="content__col">
            <Switch className="switch">
              <Route exact path="/" component={Index} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/home" auth={this.props.auth}>
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/tickets" auth={this.props.auth}>
                <Tickets />
              </PrivateRoute>
              <AdminOrPGRoute
                path="/users"
                auth={this.props.auth}
                role={this.props.auth.role}
              >
                <Users />
              </AdminOrPGRoute>
              <PrivateRoute
                path="/tickets/create"
                auth={this.props.auth}
                role={this.props.auth.role}
              >
                <CreateTicket />
              </PrivateRoute>
              <AdminOrPGRoute
                path="/projects/create/"
                auth={this.props.auth}
                role={this.props.auth.role}
              >
                <CreateProject />
              </AdminOrPGRoute>
              <PrivateRoute
                path="/projects"
                auth={this.props.auth}
                role={this.props.auth.role}
              >
                <Projects />
              </PrivateRoute>
              <PrivateRoute
                path="/tickets/view/:id"
                auth={this.props.auth}
                role={this.props.auth.role}
              >
                <ViewSingleTicket
                  auth={this.props.auth}
                  role={this.props.auth.role}
                  router={this.props.router}
                />
              </PrivateRoute>
              <PrivateRoute
                path="/project/view/:id"
                auth={this.props.auth}
                role={this.props.auth.role}
                component={DetailsProject}
              ></PrivateRoute>
            </Switch>
          </Col>
        </Row>
      </Layout>
    );
  }
}

const mapStateToprops = (state) => ({
  auth: state.auth,
  router: state.router,
  isLoading: state.ticket.isLoading,
  project: state.project,
  ticket: state.ticket,
});

export default connect(mapStateToprops, { getTickets, getProjects, getUsers })(
  Routes
);
//export default withRouter(connect(mapStateTothis.props)(Routes));
