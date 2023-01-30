import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

export default function TextAreaInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div>
      <label>{props.label}</label>
      <textarea {...field} {...props} className="form-control" />
      {meta.touched && meta.error ? (
        <span className="text-danger">{meta.error}</span>
      ) : null}
    </div>
  );
}
