import HTMLElelementGenerator from "./HTMLElementGenerator";
import Text from "./Text";
import List from "./List";
import Checkbox from "./Checkbox";

export const ControlsFactory = (
  caption: string,
  defaultValue: string,
  key: string,
  type: string,
  items: Array<{ caption: string; value: string }> = undefined
): HTMLElelementGenerator => {
  if (type === "TEXT") {
    return new Text(caption, defaultValue, key, type);
  } else if (type === "CHECKBOX") {
    return new Checkbox(caption, defaultValue, key, type);
  } else {
    return new List(caption, defaultValue, key, type, items);
  }
};
