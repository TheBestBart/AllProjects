import React from "react";
import { TBody } from "./TBody";
import { THead } from "./THead";
import PropTypes from "prop-types";

export class Table extends React.Component {
  static propTypes = {
    filteredTable: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    let { filteredTable } = this.props;
    return (
      <div className="container">
        <THead />
        <TBody filteredTable={filteredTable} />
      </div>
    );
  }
}
