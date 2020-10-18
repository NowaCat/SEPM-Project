import React from "react";
import { Link } from "react-router-dom";

const CreateTourTypeButton = () => {
  return (
    <React.Fragment>
      <Link
        to="/addTourType"
        className="btn btn-lg btn-info"
        style={{ marginLeft: "20px" }}
      >
        Create a new Tour type
      </Link>
    </React.Fragment>
  );
};

export default CreateTourTypeButton;
