import Control from "./Control";
import HTMLElementGenerator from "./HTMLElementGenerator";

export default class Checkbox extends Control implements HTMLElementGenerator {
  protected _caption: string;
  protected _defaultValue: string;
  protected _key: string;
  protected _type: string;

  public generateHTMLElement = (): string => {
    let checked: string = this._defaultValue === "true" ? "checked" : "";
    let template = `<label class="checkbox-label"><div class="div-inside text-center"><input type="${this._type.toLowerCase()}" name="${
      this._key
    }" class="input-checkbox" ${checked}></div><div class="checkbox-div">${
      this._caption
    }</div></label>`;

    return template;
  };

  public getName = (): string => {
    return this._key;
  };
}
