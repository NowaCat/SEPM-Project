import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createType } from "../../actions/tourTypeActions";

class AddTourType extends Component {
  constructor() {
    super();

    this.state = {
      label: "",
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

    const newTourType = {
      label: this.state.label,
    };

    this.props.createType(newTourType, this.props.history);
    console.log(newTourType);
  }

  render() {
    return (
      <div className="tour">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Tour Type form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Label"
                    name="label"
                    value={this.state.label}
                    onChange={this.onChange}
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

AddTourType.propTypes = {
  createType: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createType })(AddTourType);
