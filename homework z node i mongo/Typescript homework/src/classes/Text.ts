import Control from "./Control";
import HTMLElementGenerator from "./HTMLElementGenerator";

export default class Text extends Control implements HTMLElementGenerator {
  protected _caption: string;
  protected _defaultValue: string;
  protected _key: string;
  protected _type: string;

  public generateHTMLElement = (): string => {
    let template = `<form class="form"><div class="p-input-form text-center">${
      this._caption
    }:</div>
    <input class="form-control input-form" type="${this._type.toLocaleLowerCase()}" name="${
      this._key
    }" value="${this._defaultValue}"/></form>`;

    return template;
  };

  public getName = (): string => {
    return this._key;
  };
}
