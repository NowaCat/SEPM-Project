import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteType } from "../../actions/tourTypeActions";

class TourTypeItem extends Component {
  onDeleteClick = (label) => {
    this.props.deleteType(label);
    window.location.reload(true);
  };

  render() {
    const { type } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">ID: {type.id}</span>
            </div>
            <br />
            <hr />
            <div className="col-lg-6 col-md-4 col-8">
              <h4>Label: {type.label}</h4>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/updateType/${type.label}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Tour Type</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, type.label)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Tour Type</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TourTypeItem.propTypes = {
  deleteType: PropTypes.func.isRequired,
};

export default connect(null, { deleteType })(TourTypeItem);
