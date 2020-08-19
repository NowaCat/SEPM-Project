import React, { Component } from "react";
import TourItem from "./Tour/TourItem";
import CreateTourButton from "./Tour/CreateTourButton";
import { connect } from "react-redux";
import { getTours } from "../actions/tourActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTours();
  }
  render() {
    const tours = this.props.tour.tours;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Tours</h1>
              <br />
              <CreateTourButton />
              <br />
              <hr />
              {tours.map((tour) => (
                <TourItem key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  tour: PropTypes.object.isRequired,
  getTours: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tour: state.tour,
});

export default connect(mapStateToProps, { getTours })(Dashboard);
