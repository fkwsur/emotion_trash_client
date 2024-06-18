import React, { useEffect, useState } from "react";
import { Love } from "../views/page/Love";
import { Tarot } from "../views/page/Tarot";
import counselor from "../image/counselor.png";

export const DashBoard = (props) => {
  return (
    <div className="dashboard">
        {props.menu == "love" ? (
          <Love />
        ) : props.menu == "tarot" ? (
          <Tarot />
        ) : (
          ""
        )}
      <div className="footer">
        (주)세모이 &nbsp;&nbsp;|&nbsp;&nbsp; CEO &nbsp;&nbsp;김현지
        &nbsp;&nbsp;|&nbsp;&nbsp; Phone &nbsp;&nbsp;010-5790-6726
      </div>
    </div>
  );
};
