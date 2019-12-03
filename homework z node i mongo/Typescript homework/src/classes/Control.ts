export default abstract class Control {
  protected _caption: string;
  protected _defaultValue: string;
  protected _key: string;
  protected _type: string;

  constructor(
    caption: string,
    defaultValue: string,
    key: string,
    type: string
  ) {
    this._caption = caption.slice(0, 20);
    this._defaultValue = defaultValue;
    this._key = key;
    this._type = type;
  }
}
