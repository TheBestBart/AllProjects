import React from "react";
import "/../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

export class Form extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    searchValue: PropTypes.string,
    numberOfFound: PropTypes.number
  };

  render() {
    let { onChange, searchValue, numberOfFound } = this.props;
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
        {searchValue !== "" && (
          <div className="container-fluid text-center">
            Liczba znalezionych: {numberOfFound}
          </div>
        )}
      </div>
    );
  }
}
