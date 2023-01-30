import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Index from "../../features/home/Index";
import Loading from "../common/Loading";
import ModalContainer from "../common/ModalContainer";
import { useStore } from "../stores/store";
import Menu from "./Menu";

function App() {
  const location = useLocation();
  const { commonStore, accountStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, accountStore]);

  if (!commonStore.appLoaded) return <Loading />;

  return (
    <>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      <ModalContainer />
      <>
        <div className="container-fluid">
          <Menu />
          <div className="mt-3">
            {location.pathname === "/" ? <Index /> : <Outlet />}
          </div>
        </div>
      </>

      {/* {location.pathname === "/" ? (
        <Index />
      ) : (
        <>
          <div className="container-fluid">
            <Menu />
            <div className="mt-3">
              <Outlet />
            </div>
          </div>
        </>
      )} */}
    </>
  );
}

export default observer(App);
