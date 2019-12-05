import React from "react";
import { getPercent, getColor } from "../../Functions/functions";
import PropTypes from "prop-types";

export class TBody extends React.Component {
  static propTypes = {
    filteredTable: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    let { filteredTable } = this.props;
    return (
      <section className="container">
        {filteredTable.map((d, index) => (
          <div
            className="text-center row tbody-div"
            style={{
              backgroundColor: getColor(index, "#201d1f", "white"),
              color: getColor(index, "white", "#201d1f")
            }}
            key={d.code}
          >
            <div className="col-sm-3">{d.currency}</div>
            <div className="col-sm-2">
              <b>{d.code}</b>
            </div>
            <div className="col-sm-3">{d.currentMid}</div>
            <div
              style={{
                color:
                  getPercent(d.currentMid, d.previousMid) >= 0 ? "green" : "red"
              }}
              className="col-sm-2"
            >
              {getPercent(d.currentMid, d.previousMid)}
            </div>
            <div
              style={{
                color:
                  getPercent(d.previousMid, d.currentMid) >= 0 ? "green" : "red"
              }}
              className="col-sm-2"
            >
              {getPercent(d.previousMid, d.currentMid)}
            </div>
          </div>
        ))}
      </section>
    );
  }
}
