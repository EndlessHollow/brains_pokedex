import { Progress } from "@nextui-org/react";
import { TProgressColor } from "./types";
import { ReactNode } from "react";

type Props = {
  value: number;
  maxValue: number;
  label?: ReactNode;
  progressColor?: TProgressColor;
};

export default function ProgressBar(props: Props) {
  const { value, maxValue, label, progressColor = "default" } = props;

  function renderLabel() {
    if (typeof label === "string") {
      return (
        <p className="col-start-12 col-end-13 place-self-end text-small uppercase font-semibold whitespace-nowrap">{`${label}: ${value}`}</p>
      );
    }

    return label;
  }

  return (
    <div className="grid grid-cols-12 items-center">
      <Progress
        color={progressColor}
        value={value}
        maxValue={maxValue}
        className="col-start-1 col-end-11"
      />
      {renderLabel()}
    </div>
  );
}
