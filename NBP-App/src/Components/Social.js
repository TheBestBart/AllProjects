import React from "react";
import PropTypes from "prop-types";

export class Social extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    img: PropTypes.string
  };

  render() {
    let { img, alt } = this.props;

    return (
      <div className="col-sm-4 ml-0 mr-0 social-cpt-div">
        <div className="socials-div-inside">
          <img
            className="img-fluid rounded-circle social-cpt-img"
            src={img}
            alt={alt}
          />
        </div>
      </div>
    );
  }
}
