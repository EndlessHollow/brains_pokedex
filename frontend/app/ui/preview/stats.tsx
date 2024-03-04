import ProgressBar from "../progress-bar/progress-bar";

type Props = {
  maxCP: number;
  maxHP: number;
};

export default function Stats(props: Props) {
  const { maxCP, maxHP } = props;

  //COMMENT: Values are not provided via API
  const cp = 100;
  const hp = 200;

  return (
    <div className="grid gap-2">
      <ProgressBar
        progressColor="primary"
        value={cp}
        maxValue={maxCP}
        label={"CP"}
      />
      <ProgressBar
        progressColor="success"
        value={hp}
        maxValue={maxHP}
        label={"HP"}
      />
    </div>
  );
}
