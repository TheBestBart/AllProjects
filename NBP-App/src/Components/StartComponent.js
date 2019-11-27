import React, { Component } from "react";
import PropTypes from "prop-types";

export class StartComponent extends Component {
  static propTypes = {
    changeComponent: PropTypes.func
  };

  render() {
    let { changeComponent } = this.props;

    return (
      <div id="background">
        <div className="startComponent-mainDiv">
          <div className="img-fluid startComponent-divinside">
            <img
              id="startComponent-id"
              className="col-xs-2 rounded-circle img-fluid "
              src="https://www.mennica.com.pl/_fileserver/time20170921234950/item/1501188"
              alt="nbp"
              title="Przejdz do strony głównej"
              onClick={() => changeComponent("mainComponent")}
            />
            <h1
              className="startComponent-h1"
              onClick={() => changeComponent("mainComponent")}
            >
              NBP Api 2.0
            </h1>
            <h4>
              Aplikacja licząca różnice kursów walut na podstawie tygodnia
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
