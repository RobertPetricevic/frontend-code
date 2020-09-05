import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomInput from "./components/CustomInput";

import "./App.css";
import { setInputData, setInputError, checkboxToggle } from "./store/actions";
import { SingleStateItem } from "./types/reducer";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /^\+\d{10}$/;

interface ResStatus {
  status: string;
  success: boolean;
}

function App() {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [resStatus, setResStatus] = useState<ResStatus>({
    status: "",
    success: false,
  });

  const stateObj = useSelector(
    (state: { [key: string]: SingleStateItem }) => state
  );
  const { firstName, lastName, address, phone, email, checked } = stateObj;

  const inputValidations: Array<string | boolean | undefined> = [
    firstName.error,
    lastName.error,
    address.error,
    phone.error,
    email.error,
    !checked.error,
  ];

  useEffect(() => {
    let isValid: boolean = true;
    inputValidations.forEach((error: string | boolean | undefined) => {
      //console.log("Pojedinacni:", !Boolean(error));
      isValid = isValid && !Boolean(error);
    });

    //console.log("Ukupno:", isValid);
    setIsFormValid(isValid);
  }, [stateObj]);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "firstName":
      case "lastName":
      case "address":
        value.length === 0
          ? dispatch(setInputError(name, "Required"))
          : dispatch(setInputError(name, ""));
        break;
      case "phone":
        if (value.length === 0) {
          dispatch(setInputError(name, "Required"));
        } else if (!phoneRegex.test(value)) {
          dispatch(setInputError(name, "Bad Format"));
        } else {
          dispatch(setInputError(name, ""));
        }
        break;
      case "email":
        if (value.length === 0) {
          dispatch(setInputError(name, "Required"));
        } else if (!emailRegex.test(value.toLowerCase())) {
          dispatch(setInputError(name, "Bad Format"));
        } else {
          dispatch(setInputError(name, ""));
        }
        break;
      default:
        break;
    }

    dispatch(setInputData(name, value));
  };

  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.data,
          lastName: lastName.data,
          address: address.data,
          phone: phone.data,
          email: email.data,
        }),
      });
      const resData = await response.json();
      setResStatus({ ...resData, success: true });
    } catch {
      setResStatus({ status: "Something went wrong", success: false });
    }
  };

  console.log(stateObj);

  return (
    <div className="createBox">
      <h1>Create Account</h1>
      <CustomInput
        id="firstName"
        title="First Name"
        onChangeHandler={handleChange}
        value={firstName.data}
        error={firstName.error}
      />
      <CustomInput
        id="lastName"
        title="Last Name"
        onChangeHandler={handleChange}
        value={lastName.data}
        error={lastName.error}
      />
      <CustomInput
        id="address"
        title="Address"
        onChangeHandler={handleChange}
        value={address.data}
        error={address.error}
      />
      <CustomInput
        id="phone"
        title="Phone"
        onChangeHandler={handleChange}
        value={phone.data}
        error={phone.error}
      />
      <CustomInput
        id="email"
        title="Email"
        onChangeHandler={handleChange}
        value={email.data}
        error={email.error}
      />
      <p
        className={`
          server-status + ${
            resStatus.success === true ? "success" : "failure"
          }`}
      >
        {resStatus.status}
      </p>
      <div className="sendBox">
        <div className="checkbox">
          <input
            type="checkbox"
            className="input"
            name="checkbox"
            id="checkbox"
            onClick={() => {
              dispatch(checkboxToggle());
            }}
          />
          <label htmlFor="checkbox">Yes, I agree</label>
        </div>
        <div className="sendBtn">
          <button
            onClick={() => {
              sendData();
            }}
            disabled={!isFormValid}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
