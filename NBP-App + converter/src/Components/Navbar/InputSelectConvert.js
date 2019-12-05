import React from "react";
import PropTypes from "prop-types";

export class InputSelectConvert extends React.Component {
  static propTypes = {
    nowData: PropTypes.arrayOf(PropTypes.object),
    chooseOption: PropTypes.func,
    title: PropTypes.string
  };
  render() {
    let { nowData, chooseOption, title } = this.props;
    return (
      <div className="form-group col-md-3">
        <label htmlFor="sel1">{title}</label>
        <select
          className="form-control"
          id="sel1"
          onChange={e => {
            chooseOption(e.target.value);
          }}
        >
          <option>-</option>
          {nowData.map(name => {
            return <option key={name.code}>{name.currency}</option>;
          })}
        </select>
      </div>
    );
  }
}
