import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/securityAction";
import PropTypes from "prop-types";
import UserItem from "./UserManagement/UserItem";

class UserDashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const users = this.props.security.users;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Users</h1>
              <br />
              <br />
              <hr />
              {users.map((user) => (
                <UserItem key={user.username} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserDashboard.propTypes = {
  security: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUsers })(UserDashboard);
