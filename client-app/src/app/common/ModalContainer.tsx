import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  return (
    <div
      className={modalStore.modal.open ? "modal fade show d-block" : "modal"}
      id="exampleModalLive"
      aria-labelledby="exampleModalLiveLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLiveLabel">
              {modalStore.modal.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={modalStore.close}
            ></button>
          </div>
          <div className="modal-body">{modalStore.modal.body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={modalStore.close}
            >
              Close
            </button>
            {/* <button type="button" className="btn btn-primary">
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
});
