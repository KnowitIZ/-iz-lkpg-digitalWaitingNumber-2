interface Props {
  errors?: any;
}

export default function ValidationError({ errors }: Props) {
  return (
    <div>
      {/* <h3 className="text-danger">Validation Error</h3> */}
      {errors && (
        <ul className="text-danger mt-3">
          {errors.map((err: string, i: any) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
