import { TMeasurements } from "@/app/lib/types";
import { Divider } from "@nextui-org/divider";
import InformationBox from "./information-box";

type Props = {
  weight: TMeasurements;
  height: TMeasurements;
};

export default function AdditionalInformation(props: Props) {
  const { weight, height } = props;

  return (
    <div className="grid grid-cols-3 justify-items-center items-center">
      <InformationBox
        title={"Weight"}
        text={`${weight.minimum} - ${weight.maximum}`}
      />
      <Divider orientation="vertical" className="h-16" />
      <InformationBox
        title={"Height"}
        text={`${height.minimum} - ${height.maximum}`}
      />
    </div>
  );
}
