import React, { Component } from "react";
import { connect } from "react-redux";
import { getTypes } from "../actions/tourTypeActions";
import PropTypes from "prop-types";
import CreateTourTypeButton from "./Tour/CreateTourTypeButton";
import TourTypeItem from "./Tour/TourTypeItem";

class TourTypeDashboard extends Component {
  componentDidMount() {
    this.props.getTypes();
  }

  render() {
    const tourTypes = this.props.tourType.tourTypes;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Tour Type</h1>
              <br />
              <CreateTourTypeButton />
              <br />
              <hr />
              {tourTypes.map((type) => (
                <TourTypeItem key={type.label} type={type} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TourTypeDashboard.propTypes = {
  tourType: PropTypes.object.isRequired,
  getTypes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tourType: state.tourType,
});

export default connect(mapStateToProps, { getTypes })(TourTypeDashboard);
