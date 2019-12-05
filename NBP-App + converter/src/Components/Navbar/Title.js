import React from "react";
import PropTypes from "prop-types";

export class Title extends React.Component {
  static propTypes = {
    changeComponent: PropTypes.func
  };
  render() {
    let { changeComponent } = this.props;
    return (
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#1f1d20"
        }}
      >
        <img
          className="col-xs-2 rounded-circle nvb-cpt-img"
          src="https://www.mennica.com.pl/_fileserver/time20170921234950/item/1501188"
          alt="nbp"
          height="200px"
          width="200px"
          title="Przejdz do strony startowej"
          onClick={() => changeComponent("startComponent")}
        />
        <div style={{ flex: 1 }}>
          <div className="nvb-cpt-div">NBP Api 2.0</div>
        </div>
      </div>
    );
  }
}
