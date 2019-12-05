import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MainComponent } from "./Components/MainComponent";
import { StartComponent } from "./Components/StartComponent";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentId: ""
    };

    this.changeComponent = this.changeComponent.bind(this);
  }

  changeComponent = id => {
    this.setState({ componentId: id });
  };

  render() {
    let { componentId } = this.state;

    return (
      <div className="App">
        {componentId === "mainComponent" ? (
          <MainComponent changeComponent={this.changeComponent} />
        ) : (
          <StartComponent changeComponent={this.changeComponent} />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
