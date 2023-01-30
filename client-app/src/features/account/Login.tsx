import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import TextInput from "../../app/common/form/TextInput";
import Loading from "../../app/common/Loading";
import { useStore } from "../../app/stores/store";

export default observer(function Login() {
  const { accountStore, modalStore } = useStore();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ userName: "", password: "", error: null }}
      // onSubmit={async (values, { setErrors }) => {
      onSubmit={(values, { setErrors, setSubmitting }) => {
        try {
          accountStore.login(values).catch((error) => {
            setErrors({ error: "Invalid user or password" });
            setSubmitting(false);
          });
          // console.log(values);
        } catch (error) {
          setErrors({ error: "Invalid user or password" });
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          className="d-grid gap-2 col-6 mx-auto"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 className="text-center text-primary">Login</h3>
          <hr />

          <TextInput placeholder="User Name" name="userName" />
          <TextInput placeholder="Password" name="password" type="password" />

          <div className="d-grid">
            <button
              className="btn btn-primary mt-3"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null}
              Login
            </button>
          </div>

          <ErrorMessage
            name="error"
            render={() => (
              <div className="my-2 text-center">
                <span className="text-danger" style={{ marginBottom: 10 }}>
                  {errors.error.toString()}
                </span>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
});
