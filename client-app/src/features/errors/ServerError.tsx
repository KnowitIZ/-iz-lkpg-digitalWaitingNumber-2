import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
  const { commonStore } = useStore();
  return (
    <div className="text-danger">
      <h1>Server Error</h1>
      <h5>{commonStore.error?.message}</h5>
      {commonStore.error?.details && (
        <div>
          <h4 className="text-info">Stack trace</h4>
          <code style={{ marginTop: "10px" }}>{commonStore.error.details}</code>
        </div>
      )}
    </div>
  );
});
