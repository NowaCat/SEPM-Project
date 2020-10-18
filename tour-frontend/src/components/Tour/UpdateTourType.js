import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createType, getType } from "../../actions/tourTypeActions";

class UpdateTourType extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
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
      id: this.state.id,
      label: this.state.label,
    };

    this.props.createType(newTourType, this.props.history);
    console.log(newTourType);
  }

  componentDidMount() {
    const { label } = this.props.match.params;
    this.props.getType(label, this.props.history);
  }

  componentDidUpdate(prevProps) {
    const { tourType } = this.props;
    if (this.props.tourType !== prevProps.tourType) {
      this.setState({
        id: tourType.id,
        label: tourType.label,
      });
    }
  }

  render() {
    return (
      <div className="tour">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Tour Type form</h5>
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

UpdateTourType.propTypes = {
  createType: PropTypes.func.isRequired,
  getType: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  tourType: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  tourType: state.tourType.tourType,
});

export default connect(mapStateToProps, { getType, createType })(
  UpdateTourType
);
