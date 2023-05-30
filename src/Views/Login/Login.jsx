import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { configlogin } from "../../config/configlogin";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import { Spinner } from "../../Component/SpinnerComponent/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { GetData, LoginUser } from "../../Services/APIServices_2";

export const Login = () => {
  const h = useHistory();

  const [check, setcheck] = useState();
  const [tokenapi, settokenapi] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [cmp, setcmp] = useState(true);

  const [states, setStates] = useState({
    db:"odoo15",
    username: "samjad@gmail.com",
    password: "Cover112233",
    token: "",
    showPassword: false,
    username2: "Zaid-Lawi@gmail.com",
    password2: "Zaid1122",
    token2: "",
    showPassword2: false,
  });

  const LoginButton =  () => {
    console.log('first');
    const result =  LoginUser(states.db, states.username , states.password);
    if (result) {
      h.push("/Blank");
      showSuccess("Successfully");
      console.log(result)
    } else {
      showSuccess("Error");

    }
  };
  const Get =  () => {
    console.log('first');
    const result =  GetData();
    if (result) {
      h.push("/Blank");
      showSuccess("Successfully");
      console.log(result)
    } else {
      showSuccess("Error");

    }
  };



  const login = useCallback(async (e) => {
    setIsActive((current) => !current);

    e.preventDefault();
    if (states.username === "Zaid-Lawi@gmail.com") {
      axios
        .post(
          `${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}bcLjGkX1B65o0gRxdH2L4FLC8`
        )
        .then((response) => {
          settokenapi(response.data.access_token);
          localStorage.setItem("tokenapi", JSON.stringify(tokenapi));
          setTimeout(() => {
            h.push("/Contact");
          }, 1000);
          showSuccess("Login Successfully");
          setIsLoading(true);
        })

        .catch((error) => {
          showError("Login Fail");
        });
    } else {
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
    }
  });

  const logout = () => {
    localStorage.removeItem("tokenapi");

    setStates({
      username: "",
      password: "",
    });
  };

  const closeHome = () => {
    setcmp(true);
  };

  useEffect(() => {
    if (tokenapi !== undefined)
      localStorage.setItem("tokenapi", JSON.stringify(tokenapi));
  }, [tokenapi]);

  var retrievedObject = localStorage.getItem("tokenapi");

  const handleChange = (prop) => (event) => {
    setStates({ ...states, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setStates({
      ...states,
      showPassword: !states.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Spinner isActive={isLoading} isAbsolute />

      {cmp ? (
        <div class="session">
          <ToastContainer />

          <div class="left"></div>
          <form action="" class="log-in" autocomplete="off">
  
            <h4>
              {/* We are  */}
              <div class="containerS">
    <h1>
      <div class="animation">
        <span class="first">O</span> 
        <span class="oh">
          <span class="second">
          </span>
        </span>
        <span class="oh">
          <span class="second">doo
          </span>
        </span>
      </div>
    </h1>
  </div>
            </h4>
            <p>Welcome back! Log in to your account to view  clients:</p>
            <div class="floating-label">
              <TextField
                label="Email"
                value={states.username}
                onChange={(event) => {
                  setStates((item) => ({
                    ...item,
                    username: event.target.value,
                  }));
                }}
              />
            </div>
            <div class="floating-label">
              <FormControl>
                <TextField
                  id="outlined-search"
                  label="Password"
                  variant="outlined"
                  type={states.showPassword ? "text" : "password"}
                  value={states.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <VisibilityIcon
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {states.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </VisibilityIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
            <button
              className={
                check !== 400 ? "button" : "errorbutton"
                // isActive ? "button" : "errorbutton"
              }
              type="submit"
              onClick={login}
            >
              Log in
            </button>
          </form>
        </div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};
