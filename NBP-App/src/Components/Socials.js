import React from "react";
import GitHub from "./Img/github.jpeg";
import LinkedIn from "./Img/linkedIN.jpeg";
import Spoj from "./Img/spoj.jpeg";
import { Social } from "./Social";

export class Socials extends React.Component {
  ImgObjectArray = [];

  constructor(prop) {
    super(prop);

    this.ImgObjectArray = [
      { img: GitHub, alt: "github" },
      { img: LinkedIn, alt: "linkedIn" },
      { img: Spoj, alt: "Spoj" }
    ];
  }
  render() {
    return (
      <div className="row col">
        {this.ImgObjectArray.map(img => {
          return (
            <Social key={img.alt.toUpperCase()} img={img.img} src={img.alt} />
          );
        })}
      </div>
    );
  }
}
