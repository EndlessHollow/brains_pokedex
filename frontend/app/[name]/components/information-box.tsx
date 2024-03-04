type Props = {
  title: string;
  text: string;
};

export default function InformationBox(props: Props) {
  const { title, text } = props;

  return (
    <div className="text-center">
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="font-normal text-base text-default-500">{text}</p>
    </div>
  );
}
