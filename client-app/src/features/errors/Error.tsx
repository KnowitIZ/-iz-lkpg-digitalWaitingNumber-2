interface Props {
  title: string;
}
export default function Error({ title }: Props) {
  return (
    <div>
      <h1 className="text-danger">{title}</h1>
    </div>
  );
}
