import React from "react";
import { Button } from "./Button";
import PropTypes from "prop-types";
import { ButtonCollapseConvert } from "./ButtonCollapseConvert";
import { Title } from "./Title";

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActiveButton: 0, isCollapse: false };
    this.setActiveButton = this.setActiveButton.bind(this);
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    dataToButton: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.string, PropTypes.string).isRequired
    ),
    changeComponent: PropTypes.func.isRequired,
    converterIsActive: PropTypes.bool.isRequired,
    setConverterActive: PropTypes.func.isRequired,
    nowData: PropTypes.arrayOf(PropTypes.object)
  };

  onClickCollapse = () => {
    let { isCollapse } = this.state;
    isCollapse
      ? this.setState({ isCollapse: false })
      : this.setState({ isCollapse: true });
  };

  setActiveButton = id => {
    this.setState({ isActiveButton: id });
  };

  render() {
    let {
      onClick,
      dataToButton,
      changeComponent,
      converterIsActive,
      setConverterActive,
      nowData
    } = this.props;
    let { isActiveButton, isCollapse } = this.state;

    return (
      <div
        style={{
          backgroundColor: "rgba(32, 29, 31, 0.9)",
          borderBottom: "1px solid white"
        }}
        className="container-fluid p-0"
      >
        <Title changeComponent={changeComponent} />
        <div className="container-fluid">
          <div className="navbar-header text-right div-nav-to-collapse">
            <button
              className="my-2 mr-4 btn btn-dark"
              onClick={this.onClickCollapse}
            >
              <i
                className={
                  isCollapse
                    ? "fas fa-angle-double-up"
                    : "fas fa-angle-double-down"
                }
                style={{ fontSize: "50px" }}
              />
            </button>
          </div>
          <div
            className="nav-collapse"
            style={{ display: isCollapse ? "block" : "none" }}
          >
            <ButtonCollapseConvert
              setConverterActive={setConverterActive}
              converterIsActive={converterIsActive}
              nowData={nowData}
            />
            <div
              className={
                converterIsActive ? "display-none" : "nvb-btn-div my-2"
              }
            >
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
                    converterIsActive={converterIsActive}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
