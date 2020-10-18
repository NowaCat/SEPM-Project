import React, { Component } from "react";
import Timefield from "react-simple-timefield";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getTour, createTour } from "../../actions/tourActions";
import { getTypes } from "../../actions/tourTypeActions";

class UpdateTour extends Component {
  constructor() {
    super();

    this.state = {
      tourIdentifier: "",
      tourName: "",
      tourType: "",
      tourDate: "",
      minDuration: "00:00:00",
      locations: [],
      allAllocations: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTour(id, this.props.history);
    this.props.getTypes();
  }

  componentDidUpdate(prevProps) {
    const { tour } = this.props;
    if (this.props.tour !== prevProps.tour) {
      if (tour.tourDate === null) {
        tour.tourDate = "";
      }
      this.setState({
        id: tour.id,
        tourName: tour.tourName,
        tourIdentifier: tour.tourIdentifier,
        tourTypes: [{ label: this.state.tourType }],
        tourDate: tour.tourDate,
        minDuration: tour.minDuration,
        locations: tour.locations,
        allAllocations: tour.allAllocations,
      });
    }
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
      id: this.state.id,
      tourIdentifier: this.state.tourIdentifier,
      tourName: this.state.tourName,
      tourTypes: [{ label: this.state.tourType }],
      tourDate: this.state.tourDate,
      minDuration: this.state.minDuration,
      locations: this.state.locations,
      allAllocations: this.state.allAllocations,
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
    const tourTypes = this.props.tourType.tourTypes;

    return (
      <div className="tour">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Tour form</h5>
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
                    disabled
                  />
                  {errors.tourIdentifier && (
                    <div className="invalid-feedback">
                      {errors.tourIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.tourType,
                    })}
                    name="tourType"
                    value={this.state.tourType}
                    onChange={this.onChange}
                  >
                    <option value="">Select Tour Type:</option>
                    {tourTypes.map((t, i) => (
                      <option value={t.label} key={i}>
                        {t.label}
                      </option>
                    ))}
                  </select>
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
                    value={this.state.minDuration}
                    onChange={this.onChange}
                    input={
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="minDuration"
                      />
                    }
                    showSeconds
                  />
                </div>
                <h6>Update Location</h6>
                {this.state.locations.map((location, index) => (
                  <React.Fragment key={index}>
                    <div className="form-group">
                      <select
                        className={classnames(
                          "form-control form-control-lg mt-2",
                          {
                            "is-invalid": errors.locationIdentifier,
                          }
                        )}
                        onChange={this.handleLocationIdentifierChange(index)}
                      >
                        {this.state.allAllocations.map((l, i) => (
                          <option value={l} key={i}>
                            {l}
                          </option>
                        ))}
                      </select>
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

UpdateTour.propTypes = {
  getTour: PropTypes.func.isRequired,
  createTour: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  tour: PropTypes.object.isRequired,
  getTypes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tour: state.tour.tour,
  errors: state.errors,
  tourType: state.tourType,
});

export default connect(mapStateToProps, { getTypes, getTour, createTour })(
  UpdateTour
);
