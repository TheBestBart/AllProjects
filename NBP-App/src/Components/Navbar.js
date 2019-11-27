import React from "react";
import { Button } from "./Button";
import PropTypes from "prop-types";

export class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActiveButton: 0 };
    this.setActiveButton = this.setActiveButton.bind(this);
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    dataToButton: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.string, PropTypes.string).isRequired
    ),
    changeComponent: PropTypes.func.isRequired
  };

  setActiveButton = id => {
    this.setState({ isActiveButton: id });
  };

  render() {
    let { onClick, dataToButton, changeComponent } = this.props;
    let { isActiveButton } = this.state;

    return (
      <div
        style={{
          backgroundColor: "#1f1d20",
          borderBottom: "1px solid white"
        }}
        className="container-fluid"
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row"
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
        <div className="row">
          {dataToButton.map((d, index) => {
            return (
              <Button
                key={index}
                onClick={onClick}
                text={d.text}
                functionParam={d.functionParam}
                id={index}
                isActive={index === isActiveButton}
                setActiveButton={this.setActiveButton}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
