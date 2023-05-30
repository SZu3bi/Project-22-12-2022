import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Contact.scss";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  CreateMainInfo_Contact,
  GetMainInfo_Contact,
  DeleteInfo_Contact,
  Clone_Contact,
} from "../../Services/APIServices_2";
import { useHistory } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import { Spinner } from "../../Component/SpinnerComponent/Spinner";
import moment from "moment/moment";
import { showError } from "../../Helper/Tostify.Helper";
import { Button, ButtonBase } from "@material-ui/core";
import { ContactPageupsert } from "./ContactPageupsert";

export const Contact = () => {
  const [result, setResult] = useState();
  const [count, setcount] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [EditVal, setEditVal] = useState();

  const h = useHistory();
  const logout = () => {
    localStorage.removeItem("tokenapi");
    h.push("/Login");
  };

  const openvalchangeContact = () => {
    setOpen(false);
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

  let scrl = useRef(null || 0);

  const [active, setactive] = useState(0);
  const slide = (shift, index) => {
    if (index !== active) {
      setactive(index);
      console.log(index);
    } else scrl.current.scrollLeft += shift;
  };

  useEffect(() => {
    if (active) scrl.current.scrollLeft += 25;
  }, [active]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tokenapi"))) {
    } else {
      h.replace("/Login");
    }
  }, []);
  const effectRun = useRef(false);
  useEffect(() => {
    if (effectRun.current === false) {
      showError("Please Login");

      GetAllData();
    }
    return () => {
      effectRun.current = true;
    };
  }, [GetAllData]);

  return (
    <div>
      <div>

      {open && (
        <ContactPageupsert
          open={open}
          DTO={EditVal}
          GetAllData={() => GetAllData()}
          openvalchangeContact={openvalchangeContact}
        />
      )}
      </div>
      <div className="basket-card-uicomponents">
        <Spinner isActive={loading} isAbsolute />

        <div className="firstDiv">
          {" "}
          <Menu />
        </div>
        <div className="secDiv">
          <div
            className="mainCard"
          >
            <div className="card-1">
              {result &&
                result.map((s, index) => (
                  <div className="header">
                    <div>{s.Id}</div>
                    <div>{s.Name}</div>
                    <div>{s.Email}</div>
                    <div>{s.Phone}</div>
                    <Button
                          style={{ margin: "1%" }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setOpen(true);
                            setEditVal(s);
                          }}
                        >
                          Edit
                        </Button>
                  </div>
                ))}
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
};
