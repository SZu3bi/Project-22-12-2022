import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogContent,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import "./Landing.scss";
import { useHistory } from "react-router-dom";
import {
  CreateMainInfo_Contact,
  DeleteInfo_Contact,
  GetMainInfo_Contact,
} from "../../Services/APIServices_2";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { Menu } from "../Menu/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ErrorIcon from "@material-ui/icons/Error";
import { Spinner } from "../../Component/SpinnerComponent/Spinner";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import nocontact from "../../Views/nodata.png";
import { useTheme } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DialogActions from "@material-ui/core/DialogActions";
import moment from "moment";
import { Source } from "../../Views/Option/Option";
import AddIcon from "@material-ui/icons/Add";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { Rating, Skeleton } from "@mui/material";
import { StayPrimaryLandscapeOutlined } from "@material-ui/icons";
import { ToastContainer } from "react-toastify";
export const Landing = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("l"));
  const main = [
    {
      name: "Slide",
      inf: [
        {
          id: "b",
          Num: 1,
          test: "A",
        },
        {
          Num: 2,
          test: "B",
        },
        {
          Num: 3,
          test: "C",
        },
        {
          Num: 4,
          test: "D",
        },
      ],
    },
  ];
  const [openD, setOpenD] = useState(false);

  const [result, setResult] = useState();
  const [count, setcount] = useState();
  const [loading, setLoading] = useState(true);
  const [openContactAdd, setOpenContactAdd] = useState(false);
  const [states, setStates] = useState({
    name: "",
    phone: "",
    email: "",
    firstname: "",
    leadSource: "",
    rate: 0,
    active: false,
    amount: 0,
    qy: null,
  });

  const hundle = () => {
    if (states.name !== "") {
      handleCreateButtons_2();
    } else showError("Fill Name ");
  };
  const handleCreateButtons_2 = async () => {
    setLoading(true);
    handleCloseD();
    const result = await CreateMainInfo_Contact(states);
    if (result) {
      showSuccess("Create Successfully");
      GetAllData();
      setLoading(false);
      handleClose();
      clearState();
    } else {
      GetAllData();
      handleClose();
    }
  };

  const handleOpenD = () => setOpenD(true);
  const handleCloseD = () => {
    setOpenD(false);
  };
  const handleClose = () => {
    setOpenContactAdd(false);
  };
  const handleOpen = () => {
    setOpenContactAdd(true);
  };
  const handleStaffRatingChange = (event) => {
    setStates((item) => ({ ...item, rate: event.target.value }));
  };

  const clearState = () => {
    setStates({
      name: "",
      phone: "",
      email: "",
      firstname: "",
      leadSource: "",
      rate: 0,
      active: false,
      amount: 0,
    });
  };

  const h = useHistory();
  const logout = () => {
    localStorage.removeItem("tokenapi");
    h.push("/Login");
  };
  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {
      setcount(result.data.length);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
    } else setResult(null);
  }, []);

  const handleDeleteButton = async (deletedId) => {
    setLoading(false);

    const result = await DeleteInfo_Contact(deletedId);
    if (result) {
      GetAllData();
      showSuccess("Deleted Successfully");
    } else {
      showError("Delete Failed");
    }
  };

  let scrl = useRef(null || 0);

  const [active, setactive] = useState(0);
  const slide = (shift, index) => {
    if (index !== active) {
      setactive(index);
    } else scrl.current.scrollLeft += shift;
  };

  // const effectRun = useRef(false);
  // useEffect(() => {
  //   if (effectRun.current === false) {
  //     showError("Please Login");

  //     GetAllData();
  //   }
  //   return () => {
  //     effectRun.current = true;
  //   };
  // }, [GetAllData]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tokenapi"))) {
      GetAllData();
    } else {
      showError("Please Login");
      h.replace("/Login");
    }
  }, [GetAllData]);

  useEffect(() => {
    if (active) scrl.current.scrollLeft += 25;
  }, [active]);

  return (
    <div>
      <ToastContainer />

      <div>
        <Menu />
      </div>
      <div className="addButton">
        <Button
          onClick={() => {
            handleOpen();
          }}
        >
          <AddIcon /> Add New Contact
        </Button>
      </div>

      <Spinner isActive={loading} isAbsolute />
      <div className="count">
        <SupervisorAccountIcon /> = {count}
      </div>
      {count !== 0 ? (
        <div>
          {result ? (
            <div className="card-uicomponents">
              {main &&
                main &&
                main.map((m, index) => (
                  <div className="cards-wrappercards">
                    <div className="title"></div>

                    <div className="flex-center">
                      <div
                        className={
                          m.inf.length <= 3 ? "three-element" : "ContentWrapper"
                        }
                        ref={active === index ? scrl : null}
                        key={index}
                      >
                        {result &&
                          result.map((s, index) => (
                            <div className="cards-bodycard">
                              <div className="card-1">
                                <div className="linecard"></div>
                                <div className="dotnumcard">
                                  <div style={{ margin: "3%" }}>
                                    <span>Name :</span>
                                    {s.Name}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span>Phone :</span>
                                    {s.Phone || "N/A"}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span>Id :</span>
                                    {s.Id}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span>LeadSource :</span>
                                    {s.LeadSource || "N/A"}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span>Active :</span>
                                    {s.Active__c === true
                                      ? "Active"
                                      : "Not Active"}{" "}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span>User Name :</span>
                                    {s.User_Name__c}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span>Created Date :</span>
                                    {(s.CreatedDate &&
                                      moment(s.CreatedDate).format(
                                        "DD/MM/YYYY"
                                      )) ||
                                      "N/A"}
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span> Email :</span>
                                    <a
                                      style={{
                                        textDecoration: "auto",
                                        color: "red",
                                      }}
                                      href={`mailto:${s.Email}&text=Hi ${s.Name} From Psi Amman.`}
                                    ></a>
                                  </div>
                                  <div style={{ margin: "3%" }}>
                                    {" "}
                                    <span> WhatsApp :</span>
                                    <a
                                      style={{
                                        textDecoration: "auto",
                                        color: "green",
                                      }}
                                      href={`https://api.whatsapp.com/send/?phone=${s.Phone}&text=Hi ${s.Name} From Psi Amman.`}
                                      target="_blank"
                                    ></a>
                                  </div>

                                  <div className="deleteButton">
                                    <Button
                                      disabled={s.Active__c === true}
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => {
                                        handleDeleteButton(s.Id);
                                      }}
                                    >
                                      <DeleteForeverIcon />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <div className="buttons">
                        <div className="dir">
                          <div className="buttons-1">
                            <ButtonBase
                              className="btns-icons mx-2 mb-2 basebtnss"
                              onClick={() => {
                                slide(-400, index);
                              }}
                            >
                              <ArrowBackIosIcon />
                            </ButtonBase>
                          </div>
                          <div className="buttons-1">
                            <ButtonBase
                              className="btns-icons mx-2 mb-2 basebtnss"
                              onClick={() => {
                                slide(+400, index);
                              }}
                            >
                              <ArrowForwardIosIcon />
                            </ButtonBase>
                          </div>
                          <div className="buttons-1">
                            <ButtonBase
                              className="btns-icons mx-2 mb-2 basebtnss"
                              onClick={() => {
                                slide(-1000000, 0);
                              }}
                            >
                              <ErrorIcon />
                            </ButtonBase>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt="ss"
            style={{
              borderRadius: "5px",
              filter: "drop-shadow(2px 4px 6px black)",
              width: "25%",
            }}
            src={nocontact}
          ></img>
        </div>
      )}
      <Dialog
        open={openContactAdd}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {loading ? (
            <Box>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <div className="div1">
              <form>
                <div>
                  <Checkbox
                    checked={states.active}
                    onChange={(event) => {
                      setStates((item) => ({
                        ...item,
                        active: event.target.checked,
                      }));
                    }}
                    label="Active"
                    color="success"
                  ></Checkbox>
                  <span>Active</span>
                </div>
                <div className="textfield">
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    variant="outlined"
                    error={states.name === "" ? "error" : null}
                    value={states.name}
                    onChange={(event) => {
                      setStates((names) => ({
                        ...names,
                        name: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="textfield">
                  <TextField
                    required
                    id="outlined-required"
                    label="User Name"
                    variant="outlined"
                    error={states.firstname === "" ? "error" : null}
                    value={states.firstname}
                    onChange={(event) => {
                      setStates((names) => ({
                        ...names,
                        firstname: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="textfield">
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    variant="outlined"
                    error={states.phone === "" ? "error" : null}
                    value={states.phone}
                    onChange={(event) => {
                      setStates((item) => ({
                        ...item,
                        phone: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="textfield">
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    variant="outlined"
                    error={states.email === "" ? "error" : null}
                    value={states.email}
                    onChange={(event) => {
                      setStates((item) => ({
                        ...item,
                        email: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="textfield">
                  <TextField
                    required
                    id="outlined-required"
                    label="Amount"
                    variant="outlined"
                    error={states.amount === "" ? "error" : null}
                    value={states.amount}
                    onChange={(event) => {
                      setStates((item) => ({
                        ...item,
                        amount: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="textfield">
                  <TextField
                    required
                    id="outlined-required"
                    label="Qy"
                    variant="outlined"
                    error={states.qy === "" ? "error" : null}
                    value={states.qy}
                    onChange={(event) => {
                      setStates((item) => ({
                        ...item,
                        qy: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="textfield">
                  <TextField
                    select
                    error={states.leadSource === "" ? "error" : null}
                    label="Lead Source"
                    helperText="Please select lead Source"
                    variant="outlined"
                    value={states.leadSource}
                    onChange={(event) => {
                      setStates((item) => ({
                        ...item,
                        leadSource: event.target.value,
                      }));
                    }}
                  >
                    {Source.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </form>
              {/* <div className="rate-class">
                <Rating
                  name="text-feedback"
                  value={states.rate}
                  precision={0.5}
                  emptyIcon={
                    <StayPrimaryLandscapeOutlined
                      style={{ opacity: 0.55 }}
                      fontSize="inherit"
                    />
                  }
                  onChange={handleStaffRatingChange}
                />
                <span>Rate</span>
              </div> */}
            </div>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <ButtonGroup
            variant="contained"
            size="large"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={hundle}>Save</Button>
            <Button
              color="inherit"
              onClick={() => {
                clearState();
              }}
            >
              Clear
            </Button>
            <Button color="secondary" onClick={handleClose}>
              Exit
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </div>
  );
};
