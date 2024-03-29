import React, { useEffect, useState } from "react";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { EditInfo_Contact } from "../../Services/APIServices_2";
import { Source } from "../Option/Option";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

export const ContactPageupsert = ({
  openvalchangeContact,
  GetAllData,
  DTO,
  open,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [idedit, setidedit] = useState();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [state, setState] = useState({
    id: "",
    name: "",
    phone: "",
    leadsource: "",
    email: "",
    rate: 0,
    active: false,
    amount: 0,
    firstname: "",
  });

  const handleEditButton = async () => {
    setLoading(true);
    openvalchangeContact();
    const result = await EditInfo_Contact(idedit, state);
    if (result) {
      GetAllData();
      showSuccess("Edit Successfully");
    } else showError("Edit Failed");
    setLoading(false);
  };

  const handleStaffRatingChange = (event) => {
    setState((item) => ({ ...item, rate: event.target.value }));
  };

  useEffect(() => {
    if (DTO) {
      setidedit(DTO && DTO.Id);
      setState((item) => ({
        ...item,
        id: (DTO && DTO.Id) || "",
        name: (DTO && DTO.Name) || "",
        phone: (DTO && DTO.Phone) || "",
        email: (DTO && DTO.Email) || "",
        leadsource: (DTO && DTO.LeadSource) || "",
        firstname: (DTO && DTO.FirstName) || "",
        rate: (DTO && DTO.Rating__c) || "",
        active: DTO && DTO.Active__c,
        amount: DTO && DTO.Amount__c,
      }));
    }
  }, [DTO]);

  return (
    <Dialog
      onClose={openvalchangeContact}
      aria-labelledby="simple-dialog-title"
      open={open}
      className="D1"
      maxWidth={"xl"}
      fullScreen={fullScreen}
    >
      <div className="login-form">
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              error={state.id === "" ? "error" : null}
              label="Id"
              value={state.id}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              onChange={(event) => {
                setState((item) => ({ ...item, id: event.target.value }));
              }}
            />
          </div>
          <div>
            <TextField
              error={state.name === "" ? "error" : null}
              label="Name"
              variant="outlined"
              value={state.name}
              onChange={(event) => {
                setState((item) => ({ ...item, name: event.target.value }));
              }}
            />
          </div>
          <div>
            <TextField
              error={state.firstname === "" ? "error" : null}
              label="User Name"
              variant="outlined"
              value={state.firstname}
              onChange={(event) => {
                setState((item) => ({
                  ...item,
                  firstname: event.target.value,
                }));
              }}
            />
          </div>
          <div></div>
          <div>
            <TextField
              error={state.email === "" ? "error" : null}
              label="email"
              variant="outlined"
              value={state.email}
              onChange={(event) => {
                setState((item) => ({ ...item, email: event.target.value }));
              }}
            />
          </div>
          <div>
            <TextField
              error={state.amount === "" ? "error" : null}
              label="Amount"
              variant="outlined"
              value={state.amount}
              onChange={(event) => {
                setState((item) => ({ ...item, amount: event.target.value }));
              }}
            />
          </div>
          <div>
            <TextField
              error={state.phone === "" ? "error" : null}
              label="phone"
              variant="outlined"
              value={state.phone}
              onChange={(event) => {
                setState((item) => ({ ...item, phone: event.target.value }));
              }}
            />
          </div>

          <div>
            <TextField
              id="select-Status"
              select
              variant="outlined"
              error={state.leadsource === "" ? "error" : null}
              label="lead source"
              className="dialog"
              value={state.leadsource}
              onChange={(event) => {
                setState((item) => ({
                  ...item,
                  leadsource: event.target.value,
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
          <div>
            <div>
              <Checkbox
                checked={state.active}
                onChange={(event) => {
                  setState((item) => ({
                    ...item,
                    active: event.target.checked,
                  }));
                }}
                label="Active"
                color="success"
              ></Checkbox>
              <span>Active</span>
            </div>
            <div className="rate-class">
              <Rating
                name="text-feedback"
                value={state.rate}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                onChange={handleStaffRatingChange}
              />
              <span>Rate</span>
            </div>
          </div>
        </form>
      </div>

      <DialogActions style={{ justifyContent: "center" }}>
        <ButtonGroup
          variant="contained"
          size="large"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => {
              handleEditButton();
            }}
          >
            Save
          </Button>
          
          <Button color="secondary" onClick={openvalchangeContact}>
            Exit
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};
