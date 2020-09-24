import React from "react";
import { Link } from "react-router-dom";

const CreateLocationButton = () => {
  return (
    <React.Fragment>
      <Link to="/addLocation" className="btn btn-lg btn-info">
        Create a new Location
      </Link>
    </React.Fragment>
  );
};

export default CreateLocationButton;
