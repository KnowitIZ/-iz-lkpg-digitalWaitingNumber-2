import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { WaitingNumber } from "../../app/models/waitingNumber";
import { useStore } from "../../app/stores/store";

export default observer(function Details() {
  // const { waitingNumbersStore } = useStore();
  const [item, setItem] = useState<WaitingNumber>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      agent.WaitingNumbers.details(id).then((x) => {
        setItem(x);
      });
    }
  }, []);

  if (!item) {
    return <h3>no item</h3>;
  }

  return (
    <>
      <table className="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Id</th>
            <td>{item?.id}</td>
          </tr>
          <tr>
            <th scope="row">createdOn</th>
            <td>{item?.createdOn.toString().split("T")[0]}</td>
          </tr>
          <tr>
            <th scope="row">createdBy</th>
            <td>{item?.createdBy}</td>
          </tr>
          <tr>
            <th scope="row">refNbr</th>
            <td>{item?.refNbr}</td>
          </tr>
          <tr>
            <th scope="row">servedBy</th>
            <td>{item?.servedBy}</td>
          </tr>
          <tr>
            <th scope="row">status</th>
            <td>{item?.status}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
