import React from "react";
import { TBody } from "./Tbody";
import { THead } from "./Thead";
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
