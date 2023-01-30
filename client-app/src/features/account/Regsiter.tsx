import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";
import TextInput from "../../app/common/form/TextInput";
import { useStore } from "../../app/stores/store";

export default observer(function Regsiter() {
  const { accountStore } = useStore();
  return (
    <Formik
      initialValues={{ userName: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        accountStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        userName: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="error d-grid gap-2 col-6 mx-auto"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 className="text-center text-primary">Register</h3>
          <hr />
          <TextInput placeholder="User Name" name="userName" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error} />}
          />

          <div className="d-grid">
            <button
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              className="btn btn-primary mt-3"
            >
              {isSubmitting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null}
              Register
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
