import React, { useState } from "react";
import axios from "axios";
import ValidationError from "./ValidationError";

export default function TestErrors() {
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios.get("/buggy/not-found").catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios.get("/buggy/bad-request").catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios.get("/buggy/server-error").catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios.get("/buggy/unauthorised").catch((err) => console.log(err.response));
  }

  // function handleBadGuid() {
  //   axios.get("/activities/notaguid").catch((err) => console.log(err.response));
  // }

  function handleValidationError() {
    axios.post("/employees", {}).catch((err) => setErrors(err));
    // axios.post("/employees", {}).catch((err) => console.log(err));
    // .catch((err) => console.log(err.response.data.errors));
    // axios
    //   .post("/employees", {})
    //   .catch((err) => setErrors(err.response.data.errors));
  }

  return (
    <>
      <h1 className="text-danger">Test Error component</h1>
      <div className="row text-center">
        <div className="col-12">
          <button
            className="btn btn-outline-danger mx-1"
            onClick={handleNotFound}
          >
            Not Found
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={handleBadRequest}
          >
            Bad Request
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={handleValidationError}
          >
            Validation Error
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={handleServerError}
          >
            Server Error
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={handleUnauthorised}
          >
            Unauthorized Error
          </button>
          {/* <button
            className="btn btn-outline-danger mx-1"
            onClick={handleBadGuid}
          >
            Bad Guid
          </button> */}
        </div>
      </div>
      {errors && <ValidationError errors={errors} />}
    </>
  );
}
