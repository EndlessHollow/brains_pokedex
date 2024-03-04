type Props = {
  title: string;
  content: string;
};

export default function Information(props: Props) {
  const { title, content } = props;

  return (
    <div>
      <div className="grid">
        <h4 className="font-semibold text-large transition-colors hover:text-neutral-300">
          {title}
        </h4>
        <p className="text-tiny uppercase font-semibold">{content}</p>
      </div>
    </div>
  );
}
