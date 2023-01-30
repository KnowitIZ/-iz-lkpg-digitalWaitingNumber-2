interface Props {
  content?: string;
  textClass?: string;
  loadingType?: string;
}
export default function Loading({
  content = "Loading...",
  textClass = "primary",
  loadingType = "spinner-grow",
}: Props) {
  return (
    <div className="text-center">
      <div className={`${loadingType} text-${textClass}`} role="status">
        <span className="visually-hidden">{content}</span>
      </div>
    </div>
  );
}
