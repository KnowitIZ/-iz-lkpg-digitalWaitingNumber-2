import React, { useState } from "react";

export const Editor = () => {
  const [name, setName] = useState("");
  const [flavor, setFlavor] = useState("Vanilla");
  const [toppings, setToppings] = useState(["Strawberries"]);
  const [twoScoops, setTwoScoops] = useState(false);
  const [order, setOrder] = useState("");

  const flavors = [
    "Chocolate",
    "Double Chocolate",
    "Triple Chocolate",
    "Vanilla",
  ];
  const allToppings = [
    "Sprinkles",
    "Fudge Sauce",
    "Strawberries",
    "Maple Syrup",
  ];

  const rules = {
    name: { required: true, minlength: 3, alpha: true },
    // email: { required: true, email: true },
    order: { required: true },
  };

  // const updateFormValue = (event) => {
  //   setName(event.target.value);
  //   // () => this.props.submit(this.state));
  // };

  const updateFormValueOptions = (event) => {
    let options = [...event.target.options]
      .filter((o) => o.selected)
      .map((o) => o.value);
    setToppings(options);
  };

  const updateFormValueCheck = (event) => {
    event.persist();
    if (event.target.checked) {
      console.log("checked");

      setToppings([...toppings, event.target.name]);
    } else {
      console.log("unchecked");

      let index = toppings.indexOf(event.target.name);

      setToppings([...toppings.slice(0, index), ...toppings.slice(index + 1)]);
    }
  };

  return (
    <div className="row p-2">
      <div className="col-6">
        <div className="h5 bg-info text-white p-2">
          <div className="form-group my-1">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              // onChange={updateFormValue}
            />
          </div>
          <hr />
          <div className="form-group my-1">
            <label>Ice Cream Flavors</label>
            <select
              className="form-select"
              name="flavor"
              value={flavor}
              onChange={(event) => setFlavor(event.target.value)}
              // onChange={updateFormValue}
            >
              {flavors.map((flavor) => (
                <option value={flavor} key={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>
          <hr />

          <div className="form-group my-1">
            <label>Ice Cream Toppings</label>
            <select
              className="form-select"
              multiple={true}
              name="topping"
              value={toppings}
              onChange={updateFormValueOptions}
            >
              {allToppings.map((top) => (
                <option value={top} key={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>
          <hr />

          <div className="form-group my-1">
            <label>Ice Cream Flavors</label>
            {flavors.map((x) => (
              <div className="form-check" key={x}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="flavor"
                  value={x}
                  checked={x === flavor}
                  onChange={(event) => setFlavor(event.target.value)}
                />
                <label className="form-check-label">{x}</label>
              </div>
            ))}
          </div>
          <hr />

          <div className="form-group my-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="twoScoops"
                checked={twoScoops}
                onChange={(event) => setTwoScoops(event.target.checked)}
              />
              <label className="form-check-label">Two Scoops</label>
            </div>
          </div>
          <hr />

          <div className="form-group">
            <label>Ice Cream Toppings</label>
            {allToppings.map((top) => (
              <div className="form-check" key={top}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={top}
                  value={top}
                  checked={toppings.indexOf(top) > -1}
                  onChange={updateFormValueCheck}
                />
                <label className="form-check-label">{top}</label>
              </div>
            ))}
          </div>
          <hr />

          <div className="form-group my-1">
            <label>Order</label>
            <textarea
              className="form-control"
              name="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
          <hr />
        </div>
      </div>
      <div className="col-6">
        <div className="h5 bg-secondary text-white p-2">
          <p>name:{name}</p>
          <hr />
          <p>flavor: {flavor}</p>
          <hr />
          <div>
            <p>toppings:</p>

            {toppings.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
          <hr />
          <p>twoScoops: {twoScoops ? "true" : "false"}</p>

          <hr />
          <p>order: {order}</p>
        </div>
      </div>
    </div>
  );
};
