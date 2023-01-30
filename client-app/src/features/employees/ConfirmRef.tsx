import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { useStore } from "../../app/stores/store";

export const ConfirmRef = () => {
  const { accountStore } = useStore();

  const [refNbr, setRefNbr] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  const change = (e) => {
    setRefNbr(e.target.value);
  };
  const submit = async (e) => {
    e.preventDefault();

    const item = await agent.WaitingNumbers.details(id);
    if (item.refNbr === refNbr) {
      item.createdBy = null;
      item.servedBy = null;
      item.servedById = accountStore.user.id;
      item.status = "served";
      await agent.WaitingNumbers.update(item);
      toast.success("you'r ref Nbr is accepted");
      navigate("/waitingnumbers");
    } else {
      toast.error("you'r ref Nbr is rejected");
    }
  };

  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Reference Number</label>
          <input
            type="text"
            className="form-control"
            value={refNbr}
            onChange={(e) => change(e)}
          />
          <div className="form-text text-danger">
            We'll never share your reference number with anyone else.
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
