import React, { Component } from "react";
import Timefield from "react-simple-timefield";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTour } from "../../actions/tourActions";
import classnames from "classnames";

class AddTour extends Component {
  constructor() {
    super();

    this.state = {
      tourIdentifier: "",
      tourName: "",
      tourType: "",
      tourDate: "",
      minDuration: "00:00:00",
      locations: [],
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

    const newTour = {
      tourIdentifier: this.state.tourIdentifier,
      tourName: this.state.tourName,
      tourType: this.state.tourType,
      tourDate: this.state.tourDate,
      minDuration: this.state.minDuration,
      locations: this.state.locations,
    };

    this.props.createTour(newTour, this.props.history);
    console.log(newTour);
  }

  handleLocationIdentifierChange = (index) => (e) => {
    const newLocations = this.state.locations.map((location, l_index) => {
      if (index !== l_index) return location;
      return { ...location, locationIdentifier: e.target.value };
    });

    this.setState({ locations: newLocations });
  };

  handleAddLocation = () => {
    this.setState({
      locations: this.state.locations.concat([{ locationIdentifier: "" }]),
    });
  };

  handleRemoveLocation = (index) => () => {
    this.setState({
      locations: this.state.locations.filter((l, l_index) => index !== l_index),
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="tour">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Tour form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.tourName,
                    })}
                    placeholder="Tour Name"
                    name="tourName"
                    value={this.state.tourName}
                    onChange={this.onChange}
                  />
                  {errors.tourName && (
                    <div className="invalid-feedback">{errors.tourName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.tourIdentifier,
                    })}
                    placeholder="Unique Tour ID"
                    name="tourIdentifier"
                    value={this.state.tourIdentifier}
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
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.tourType,
                    })}
                    placeholder="Tour Type"
                    name="tourType"
                    value={this.state.tourType}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.tourType && (
                    <div className="invalid-feedback">{errors.tourType}</div>
                  )}
                </div>
                <h6>Tour Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="tourDate"
                    value={this.state.tourDate}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Minimum Tour Duration</h6>
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
                <h6>Add Locations to Tours</h6>
                {this.state.locations.map((location, index) => (
                  <React.Fragment key={index}>
                    <div className="form-group">
                      {/* <select
                        className={classnames(
                          "form-control form-control-lg mt-2",
                          {
                            "is-invalid": errors.locationIdentifier,
                          }
                        )}
                      >
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option selected value="coconut">
                          Coconut
                        </option>
                        <option value="mango">Mango</option>
                      </select> */}
                      <input
                        type="text"
                        className={classnames(
                          "form-control form-control-lg mt-2",
                          {
                            "is-invalid": errors.locationIdentifier,
                          }
                        )}
                        placeholder="Location Identifier"
                        value={location.locationIdentifier}
                        onChange={this.handleLocationIdentifierChange(index)}
                      />
                      {errors.locationIdentifier && (
                        <div className="invalid-feedback">
                          {errors.locationIdentifier}
                        </div>
                      )}
                    </div>
                    <input
                      type="button"
                      onClick={this.handleRemoveLocation(index)}
                      className="btn btn-danger mr-2"
                      value="Remove Location"
                    ></input>
                  </React.Fragment>
                ))}

                <input
                  type="button"
                  onClick={this.handleAddLocation}
                  className="btn btn-success"
                  value="Add Location"
                />

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

AddTour.propTypes = {
  createTour: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createTour })(AddTour);
