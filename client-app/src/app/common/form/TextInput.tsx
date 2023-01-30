import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  // label?: string;
  type?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div>
      <label className="form-label">{props.placeholder}</label>
      <input {...field} {...props} className="form-control" />
      {meta.touched && meta.error ? (
        <span className="text-danger">{meta.error}</span>
      ) : null}
    </div>
  );
}
