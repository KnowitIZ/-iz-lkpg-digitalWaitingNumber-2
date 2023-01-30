import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import Loading from "../../app/common/Loading";
import { WaitingNumber } from "../../app/models/waitingNumber";
import { useStore } from "../../app/stores/store";
import QRCode from "react-qr-code";

export default observer(function Ticket() {
  const { accountStore } = useStore();
  const [item, setItem] = useState<WaitingNumber>(null);
  const [list, setList] = useState<WaitingNumber[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (accountStore.isInRole("Customers") && accountStore.isLoggedIn) {
      agent.WaitingNumbers.getItemByUserIdForToday(accountStore.user.id).then(
        (x) => {
          setItem(x);

          agent.WaitingNumbers.todaysList().then((list) => {
            const listBefore = list.filter((xx) => xx.createdOn < x.createdOn);
            setList(listBefore);
          });
        }
      );
    } else {
      agent.WaitingNumbers.getLast().then((x) => {
        setItem(x);

        agent.WaitingNumbers.todaysList().then((list) => {
          setList(list);
        });
      });
    }
  }, []);

  // if (waitingNumbersStore.isLoading) return <Loading />;
  return (
    // <div className="text-center d-grid gap-2 col-6 mx-auto">
    <div className="text-center">
      <div className="alert alert-light" role="alert">
        Your Ticket number is:
        <p className="text-primary" style={{ fontSize: 72 }}>
          {item?.id}
        </p>
        {accountStore.isLoggedIn && item ? (
          <div>
            <p>Your reference number is: </p>
            <p className="text-primary fs-5">{item.refNbr}</p>
            <div style={{ width: "100%" }}>
              <QRCode value={item.refNbr} size={500} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="alert alert-light" role="alert">
        There are currently
        <h2 className="text-info" style={{ fontSize: 72 }}>
          {list.length > 0 ? list.length - 1 : 0}
        </h2>
        customers before you
      </div>

      <div className="alert alert-primary" role="alert">
        Your estimated waiting time is:
        <br />
        <span className="text-warning mx-3" style={{ fontSize: 32 }}>
          {list.length > 0 ? list.length - 1 : 0}
        </span>
        hours
        <span className="text-warning mx-3" style={{ fontSize: 32 }}>
          {list.length > 0 ? 60 - new Date().getMinutes() : 0}
        </span>
        minutes
      </div>

      {accountStore.isLoggedIn ? null : (
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => navigate("/customers/landing")}
          >
            back to home
          </button>
        </div>
      )}
    </div>
  );
});
