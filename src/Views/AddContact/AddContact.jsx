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
import "./AddContact.scss";
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
import { Source } from "../Option/Option";
import AddIcon from "@material-ui/icons/Add";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { Rating, Skeleton } from "@mui/material";
import { StayPrimaryLandscapeOutlined } from "@material-ui/icons";
import { ToastContainer } from "react-toastify";
import { ContactPageupsert } from "../Contact";
export const AddContact = ({a}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("l"));

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
    a();
      setLoading(false);
      handleClose();
      clearState();
    } else {
      GetAllData();
      handleClose();
    }
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




  
  useEffect(() => {
      GetAllData();
  
  }, [GetAllData]);


  return (
    <div>


      <div className="addButton">
        <Button
        style={{color: 'white'}}
          onClick={() => {
            handleOpen();
          }}
        >
          <AddIcon /> Add New Contact
        </Button>
      </div>

 
      <Dialog
        open={openContactAdd}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="D1"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogContent>
          {loading ? (
            <Box>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <div className="login-form"  style={{display: 'flex',
            justifyContent: 'center'}}>
              <form>
              <div style={{display: 'flex'}}>

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
                </div>
                <div style={{display: 'flex'}}>

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
                </div>
                <div style={{display: 'flex'}}>

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
                </div>
                <div style={{display: 'flex'}}>

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
                <div style={{    display: 'flex',
    alignItems: 'center',}}>
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
