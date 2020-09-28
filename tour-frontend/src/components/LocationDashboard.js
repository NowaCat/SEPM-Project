import React, { Component } from "react";
import LocationItem from "./Location/LocationItem";
import { connect } from "react-redux";
import { getLocations } from "../actions/locationActions";
import PropTypes from "prop-types";
import CreateLocationButton from "./Location/CreateLocationButton";

class LocationDashboard extends Component {
  componentDidMount() {
    this.props.getLocations();
  }
  render() {
    const locations = this.props.location.locations;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Location</h1>
              <br />
              <CreateLocationButton />
              <br />
              <hr />
              {locations.map((location) => (
                <LocationItem key={location.id} location={location} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationDashboard.propTypes = {
  location: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, { getLocations })(LocationDashboard);
