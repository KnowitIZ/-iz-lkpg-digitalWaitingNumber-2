import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  options: Option[];
  label?: string;
}

interface Option {
  text: string;
  value: string;
}

export default function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div>
      <label>{props.label}</label>

      <select
        className="form-select"
        // value="film"
        onChange={(value) => helpers.setValue(value)}
        // onChange={(e) => console.log(e.target.value)}
      >
        {props.options.map((x) => (
          <option value={x.value} key={x.value}>
            {x.text}
          </option>
        ))}
      </select>
      {/* <select
        className="form-select"
        aria-label={props.placeholder}
        value={field.value || null}
        onChange={(e) => helpers.}
        onBlur={() => helpers.setTouched(true)}
        // onSelect={}
      >
        <option selected>{props.placeholder}</option>
        {props.options.map((x) => (
          <option value={x.value}>{x.value}</option>
        ))}
      </select> */}

      {meta.touched && meta.error ? (
        <span className="text-danger">{meta.error}</span>
      ) : null}
    </div>
  );
}
