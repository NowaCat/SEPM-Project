import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/securityAction";

class UserItem extends Component {
  onDeleteClick = (username) => {
    this.props.deleteUser(username);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <p>Username: {user.username}</p>
              <p>
                Role(s):
                {user.roles.map(
                  (r, index) => (index ? ", " : "") + " " + r.name
                )}
              </p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, user.username)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete User</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(UserItem);
