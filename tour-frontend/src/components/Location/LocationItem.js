import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLocation } from "../../actions/locationActions";

class LocationItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteLocation(id);
  };

  render() {
    const { location } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">ID: {location.locationIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{location.name}</h3>
              <hr />
              <p>Location description: {location.description}</p>
              <p>Location coordinates: {location.coordinates}</p>
              <p>Location minimum duration: {location.minDuration}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/updateLocation/${location.locationIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Location Info</i>
                  </li>
                </Link>

                <Link to={`/copyLocation/${location.locationIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-clone pr-1"> Copy Location</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    location.locationIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Location</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationItem.propTypes = {
  deleteLocation: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation })(LocationItem);
