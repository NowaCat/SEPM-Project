import React from "react";
import { Link } from "react-router-dom";

const CreateTourButton = () => {
  return (
    <React.Fragment>
      <Link id="createtour" to="/addTour" className="btn btn-lg btn-info">
        Create a new Tour
      </Link>
    </React.Fragment>
  );
};

export default CreateTourButton;
