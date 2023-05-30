import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { configlogin } from "../../config/configlogin";
import { useHistory } from "react-router-dom";
import "./NewLogin.scss";
import { Spinner } from "../../Component/SpinnerComponent/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { GetData, LoginUser } from "../../Services/APIServices_2";
import icon from "../../Views/sales.png";

export const NewLogin = () => {
  const h = useHistory();
  const [states, setStates] = useState({
    username: "samjad@gmail.com",
    password: "",
    token: "",
  });

  const [check, setcheck] = useState();
  const [tokenapi, settokenapi] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [cmp, setcmp] = useState(true);

  const login = useCallback(async (e) => {
    setIsActive((current) => !current);

    e.preventDefault();
    axios
      .post(
        `${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}bcLjGkX1B65o0gRxdH2L4FLC8`
      )
      .then((response) => {
        setcheck(response.status);

        settokenapi(response.data.access_token);
        console.log(check);
        localStorage.setItem("tokenapi", JSON.stringify(tokenapi));
        setTimeout(() => {
          h.push("/Landing");
        }, 400);
        showSuccess("Login Successfully");
        setIsLoading(true);
      })
      .catch((error) => {
        setcheck(error.response.status);
        setTimeout(() => {
          setIsActive(false);
          showError("Login Fail");
        }, 400);
      });
  });

  useEffect(() => {
    if (tokenapi !== undefined)
      localStorage.setItem("tokenapi", JSON.stringify(tokenapi));
  }, [tokenapi]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <ToastContainer />

      <form class="form">
        <img style={{ width: "30%" }} src={icon} alt="icon"></img>

        <p class="form-title">Sales Force</p>
        <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <input
            type="email"
            placeholder="Enter email"
            value={states.username}
            onChange={(event) => {
              setStates((item) => ({
                ...item,
                username: event.target.value,
              }));
            }}
          />
          <span></span>
        </div>
        <div class="input-container">
          <input
            type="password"
            placeholder="Enter password"
            value={states.password}
            onChange={(event) => {
              setStates((item) => ({
                ...item,
                password: event.target.value,
              }));
            }}
          />
        </div>
        <button
          type="submit"
          class="submit"
          style={{ cursor: "pointer" }}
          onClick={login}
        >
          Sign in
        </button>

        <p class="signup-link">
          <a href="">Sign up</a>
        </p>
      </form>
    </div>
  );
};
