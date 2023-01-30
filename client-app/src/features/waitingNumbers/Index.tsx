import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import Loading from "../../app/common/Loading";
import { WaitingNumber } from "../../app/models/waitingNumber";
import { useStore } from "../../app/stores/store";

export default observer(function Index() {
  const { accountStore } = useStore();

  const [list, setList] = useState<WaitingNumber[]>();
  const [isLoading, setIsLoading] = useState(true);

  let row = 1;
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    if (accountStore.isInRole("Employees")) {
      agent.WaitingNumbers.todaysList().then((x) => {
        setList(x);
      });
    } else if (accountStore.isInRole("Managers")) {
      agent.WaitingNumbers.list().then((x) => {
        setList(x);
      });
    }

    setIsLoading(false);
  };

  const onDelete = async (id: number) => {
    const resp = window.confirm("Are you sure deleting this item?");
    if (resp) {
      await agent.WaitingNumbers.delete(id);
      load();
    }
  };

  const accept = async (item: WaitingNumber) => {
    item.status = "served";
    item.createdBy = null;
    item.servedBy = null;
    await agent.WaitingNumbers.update(item);
    await load();
  };

  const reject = async (item: WaitingNumber) => {
    const resp = window.confirm("Are you sure rejecting this customer?");
    if (resp) {
      item.status = "rejected by employee";
      item.createdBy = null;
      item.servedBy = null;
      await agent.WaitingNumbers.update(item);
      await load();
    }
  };

  const getStatusClassName = (status: string) => {
    let suffix = "";
    if (status === "waiting") {
      suffix = "warning";
    } else if (status === "served") {
      suffix = "success";
    } else if (status === "rejected by customer") {
      suffix = "dark";
    } else if (status === "rejected by employee") {
      suffix = "danger";
    }
    return "badge bg-" + suffix;
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <h3>Waiting number List</h3>
      {/* <Link className="btn btn-primary" to="/waitingNumbers/create">
        Create
      </Link> */}
      <hr />
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">createdOn</th>
            <th scope="col">createdBy</th>
            {accountStore.isInRole("Managers") ? (
              <th scope="col">servedBy</th>
            ) : null}
            <th scope="col">status</th>
            <th scope="col">ref Nr</th>
            <th scope="col" className="fit"></th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((x, index) => (
              <tr key={x.id} className={x.createdById ? "bg-light" : ""}>
                <th scope="row">{row++}</th>
                <td>{x.id}</td>
                <td>
                  {x.createdOn ? x.createdOn.toString().split("T")[0] : ""}
                </td>
                <td>
                  {x.createdBy ? (
                    <span className="badge bg-warning">{x.createdBy}</span>
                  ) : (
                    <span className="badge bg-primary">onplace</span>
                  )}
                </td>
                {accountStore.isInRole("Managers") ? (
                  <td>{x.servedBy ? x.servedBy : ""}</td>
                ) : null}
                <td>
                  <span className={getStatusClassName(x.status)}>
                    {x.status}
                  </span>
                </td>
                <td>{x.refNbr}</td>
                <td className="fit">
                  <button
                    className="btn btn-info mx-1"
                    onClick={() => navigate(`/waitingNumbers/details/${x.id}`)}
                    title="Details"
                  >
                    <i className="fa fa-info text-light"></i>
                  </button>

                  {accountStore.isInRole("Employees") && index === 0 ? (
                    <>
                      {x.createdById ? (
                        <>
                          <button
                            className="btn btn-warning mx-1"
                            onClick={() => navigate("/confirmRef/" + x.id)}
                            title="Check ref number"
                          >
                            <i className="fa fa-user-check text-light"></i>
                          </button>
                          <button
                            className="btn btn-dark mx-1"
                            onClick={() => navigate("/qr/" + x.id)}
                            title="Check qr code"
                          >
                            <i className="fa fa-qrcode text-light"></i>
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-success mx-1"
                          onClick={() => accept(x)}
                          title="Accept"
                        >
                          <i className="fa fa-check text-light"></i>
                        </button>
                      )}
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => reject(x)}
                        title="Reject"
                      >
                        <i className="fa fa-times text-light"></i>
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
});
