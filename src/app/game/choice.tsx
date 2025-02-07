"use client";

import { Cell } from "./board";

interface ChoiceOptions {
  selection: Cell;
  id: number;
  onSelected: (id: number) => void;
}
const ChoiceComponent = ({
  selection = null,
  id,
  onSelected,
}: ChoiceOptions) => {
  const style = {
    fontWeight: "bolder",
    fontSize: "xxx-large",
    lineHeight: "100px",
    // width: "100px",
    height: "100px",
    cursor: "pointer",
  };

  const clickHandler = (id: number) => {
    if (selection) return false;
    onSelected(id);
  };
  return (
    <div
      style={{ ...style }}
      className="col m-1 rounded text-bg-light"
      onClick={() => clickHandler(id)}
    >
      {selection}
    </div>
  );
};

export default ChoiceComponent;
