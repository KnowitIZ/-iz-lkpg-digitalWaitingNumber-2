import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { WaitingNumber } from "../../app/models/waitingNumber";
import { useStore } from "../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer(function Index() {
  const { waitingNumbersStore, accountStore } = useStore();

  const [list, setList] = useState<WaitingNumber[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const nowHour = new Date().getHours();
    const hourStart = 8;
    const hourEnd = 17;
    setIsDisabled(nowHour < hourStart && nowHour > hourEnd);

    load();
  }, []);

  const load = async () => {
    const list = await agent.WaitingNumbers.todaysList();
    setList(list);

    if (accountStore.isInRole("Customers") && accountStore.isLoggedIn) {
      const item = await agent.WaitingNumbers.getItemByUserIdForToday(
        accountStore.user.id
      );
      if (item) {
        navigate("/customers/ticket");
      }
    }
  };

  const create = async () => {
    if (accountStore.isLoggedIn) {
      const model: WaitingNumber = {
        id: 0,
        createdOn: new Date(),
        status: "waiting",
        createdById: accountStore.user.id,
        refNbr: uuid(),
      };
      await agent.WaitingNumbers.create(model);
    } else {
      const initModel: WaitingNumber = {
        id: 0,
        createdOn: new Date(),
        status: "waiting",
      };
      await agent.WaitingNumbers.create(initModel);
    }

    navigate("/customers/ticket");
  };

  return (
    <div className="text-center d-grid gap-2 col-6 mx-auto">
      <button
        type="button"
        disabled={isDisabled}
        className="btn btn-outline-primary btn-lg p-5"
        onClick={create}
      >
        Please Take a Number
      </button>

      <div className="alert alert-light" role="alert">
        There are currently <br />
        <span className="text-primary" style={{ fontSize: 72 }}>
          {list.length}
        </span>
        <br />
        customers before you
      </div>
      <div className="alert alert-primary" role="alert">
        Estimated waiting time:
        <br />
        <span className="text-warning mx-1" style={{ fontSize: 32 }}>
          {list.length == 0 ? 0 : list.length - 1}
        </span>
        hours
        <span className="text-warning mx-1" style={{ fontSize: 32 }}>
          {list.length > 1 ? 60 - new Date().getMinutes() : 0}
        </span>
        minutes
      </div>
    </div>
  );
});
