import React from "react";
import PropTypes from "prop-types";

export class InputTextConvert extends React.Component {
  static propTypes = {
    typeValue: PropTypes.func
  };
  render() {
    let { typeValue } = this.props;
    return (
      <div className="form-group col-md-3">
        <label>Wprowadz kwote</label>
        <input
          type="number"
          className="form-control"
          placeholder="np:100"
          onChange={e => typeValue(e.target.value)}
          min="1"
        />
      </div>
    );
  }
}
