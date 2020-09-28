import React, { Component } from "react";
import Timefield from "react-simple-timefield";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLocation, createLocation } from "../../actions/locationActions";
import classnames from "classnames";

class UpdateLocation extends Component {
  constructor() {
    super();

    this.state = {
      locationIdentifier: "",
      name: "",
      coordinates: "",
      description: "",
      minDuration: "00:00:00",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getLocation(id, this.props.history);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (this.props.location !== prevProps.location) {
      this.setState({
        id: location.id,
        name: location.name,
        locationIdentifier: location.locationIdentifier,
        coordinates: location.coordinates,
        description: location.description,
        minDuration: location.minDuration,
      });
      // console.log(this.props);
      // console.log(prevProps);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newLocation = {
      id: this.state.id,
      locationIdentifier: this.state.locationIdentifier,
      name: this.state.name,
      coordinates: this.state.coordinates,
      description: this.state.description,
      minDuration: this.state.minDuration,
    };

    this.props.createLocation(newLocation, this.props.history);
    console.log(newLocation);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="location">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Location form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Location name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.locationIdentifier,
                    })}
                    placeholder="Unique Location ID"
                    name="locationIdentifier"
                    value={this.state.locationIdentifier}
                    disabled
                  />
                  {errors.locationIdentifier && (
                    <div className="invalid-feedback">
                      {errors.locationIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Location Coordinates"
                    name="coordinates"
                    value={this.state.coordinates}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Location Description</h6>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Location Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Minimum Location Duration</h6>
                <div className="form-group">
                  <Timefield
                    value="00:00:00"
                    onChange={this.onChange}
                    input={
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="minDuration"
                        value={this.state.minDuration}
                        onChange={this.onChange}
                      />
                    }
                    showSeconds
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateLocation.propTypes = {
  createLocation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location.location,
  errors: state.errors,
});

export default connect(mapStateToProps, { getLocation, createLocation })(
  UpdateLocation
);
