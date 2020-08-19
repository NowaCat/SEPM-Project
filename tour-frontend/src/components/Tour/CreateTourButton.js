import React from "react";
import { Link } from "react-router-dom";

const CreateTourButton = () => {
  return (
    <React.Fragment>
      <Link to="/addTour" className="btn btn-lg btn-info">
        Create a Project
      </Link>
    </React.Fragment>
  );
};

export default CreateTourButton;
