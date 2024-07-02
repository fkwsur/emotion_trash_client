import React, { useEffect, useState } from "react";
import Router from "..";

export const DashBoard = (props) => {
  return (
    <div className="dashboard">
        {props.menu == "love" ? (
          <Router.Love />
        ) : props.menu == "tarot" ? (
          <Router.Tarot />
        ) : props.menu == "auth" ? (
          <Router.Auth />
        ):  props.menu == "mypage" ? (
          <Router.MyPage />
        ):(
          ""
        )}
      <div className="footer">
        (주) 세모이 &nbsp;&nbsp;|&nbsp;&nbsp; CEO &nbsp;&nbsp;김현지
        &nbsp;&nbsp;|&nbsp;&nbsp; Phone &nbsp;&nbsp;010-5790-6726
      </div>
    </div>
  );
};
