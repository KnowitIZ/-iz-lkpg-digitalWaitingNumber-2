import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import Login from "../account/Login";
import Regsiter from "../account/Regsiter";

export default observer(function Index() {
  const [isDisabled, setIsDisabled] = useState(true);

  const { accountStore, modalStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accountStore.isLoggedIn) {
      if (accountStore.isInRole("Customers")) {
        return navigate("/customers/landing");
      } else if (accountStore.isInRole("Employees")) {
        return navigate("/employees");
      } else if (accountStore.isInRole("Managers")) {
        return navigate("/managers");
      }
    }

    const hour = new Date().getHours();
    const hourStart = 8;
    const hourEnd = 17;
    setIsDisabled(hour < hourStart && hour > hourEnd);
  }, []);

  return (
    <div className="text-center">
      <h3 className="m-5 text-primary">Welcome to Digital Waiting Number</h3>
      <hr />

      {/* <p>
        {accountStore.isInRole("Customers")
          ? "is a customer"
          : "is not a customer"}
      </p>
      <p>
        {accountStore.isInRole("Admins") ? "is an admin" : "is not an admin"}
      </p>

      <p>{accountStore.user ? accountStore.user.roles : null}</p> */}

      {accountStore.isLoggedIn ? (
        <>
          {/* <h3>Welcome</h3> */}
          <div>
            <button className="btn btn-primary" onClick={accountStore.logout}>
              <i className="fa-solid fa-power-off mx-1"></i>
              log out
            </button>
          </div>
        </>
      ) : (
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-outline-primary p-5"
            onClick={() => navigate("/register")}
            // onClick={() => modalStore.open(<Regsiter />)}
          >
            <h3>New Customer?</h3>
            <span style={{ fontSize: 32 }}>
              {" "}
              <i className="fa-solid fa-user-plus mx-3"></i>
            </span>
            Please Register
          </button>

          <button
            className="btn btn-outline-success p-5"
            onClick={() => navigate("login")}
            // onClick={() => modalStore.open(<Login />)}
            disabled={isDisabled}
          >
            <h3>Already a Customer?</h3>
            <span style={{ fontSize: 32 }}>
              {" "}
              <i className="fa-solid fa-sign-in mx-3"></i>
            </span>
            Please login
          </button>

          {/* <button className="btn btn-primary" onClick={() => navigate("login")}>
            login
          </button> */}
        </div>
      )}
    </div>
  );
});
