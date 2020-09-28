import React, { Component } from "react";
import Timefield from "react-simple-timefield";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLocation } from "../../actions/locationActions";
import classnames from "classnames";

class AddLocation extends Component {
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newLocation = {
      locationIdentifier: this.state.locationIdentifier,
      name: this.state.name,
      coordinates: this.state.coordinates,
      description: this.state.description,
      minDuration: this.state.minDuration,
    };

    this.props.createLocation(newLocation, this.props.history);
    console.log(newLocation);
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
                      "is-invalid": errors.tourIdentifier,
                    })}
                    placeholder="Unique Location ID"
                    name="locationIdentifier"
                    value={this.state.locationIdentifier}
                    onChange={this.onChange}
                  />
                  {errors.tourIdentifier && (
                    <div className="invalid-feedback">
                      {errors.tourIdentifier}
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

AddLocation.propTypes = {
  createLocation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createLocation })(AddLocation);
