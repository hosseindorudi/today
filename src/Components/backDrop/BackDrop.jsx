import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import './backDrop.css'
import RingLoader from "react-spinners/RingLoader";
import { t } from "i18next";

const BackDrop = ({ open }) => {
  let [color] = useState("#a1cfca");
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <div className="loadingClass">
        <RingLoader color={color} />
        {t("loading")}
      </div>
    </Backdrop>
  );
};

export default BackDrop;
