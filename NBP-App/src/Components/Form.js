import React from "react";
import PropTypes from "prop-types";

export class Form extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  render() {
    let { onChange } = this.props;
    return (
      <div className="form-group input-margin">
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <input
              type="search"
              className="container form-control"
              placeholder="Search currency"
              onChange={e => onChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }
}
