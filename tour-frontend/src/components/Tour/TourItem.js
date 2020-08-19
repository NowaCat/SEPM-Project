import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTour } from "../../actions/tourActions";

class TourItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteTour(id);
  };

  render() {
    const { tour } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">ID: {tour.customTourIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{tour.tourName}</h3>
              <p>Tour type: {tour.tourType}</p>
              <p>Tour date: {tour.tourDate}</p>
              <p>Tour duration: {tour.minDuration}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <a href="#">
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Tour Details </i>
                  </li>
                </a>
                <Link to={`/updateTour/${tour.customTourIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Tour Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    tour.customTourIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Tour</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TourItem.propTypes = {
  deleteTour: PropTypes.func.isRequired,
};

export default connect(null, { deleteTour })(TourItem);
