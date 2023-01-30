import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { WaitingNumber } from "../../app/models/waitingNumber";
import { useStore } from "../../app/stores/store";
import QrReader from "react-qr-scanner";

const QrReaderConfirm = () => {
  const { accountStore } = useStore();

  const [item, setItem] = useState<WaitingNumber>();
  const [refNbr, setRefNbr] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    agent.WaitingNumbers.details(id).then((x) => {
      setItem(x);
    });
  }, []);

  const handleScan = async (data) => {
    if (data) {
      console.log(data);
      setItem(data);

      item.createdBy = null;
      item.servedBy = null;
      item.status = "served";
      item.servedById = accountStore.user.id;
      await agent.WaitingNumbers.update(item);

      toast.success("qr scanned");

      navigate("/waitingnumbers");
    }
  };
  const handleError = (err) => {
    console.error(err);
    toast.error("qr scan failed");
  };

  const previewStyle = {
    height: 900,
    width: 900,
  };

  return (
    <div className="text-center">
      <QrReader
        delay={100}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{refNbr}</p>
    </div>
  );
};

export default QrReaderConfirm;
