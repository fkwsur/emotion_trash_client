import React, { useEffect, useState } from "react";
import Router from "..";
import { Route,useLocation } from 'react-router-dom'

export const DashBoard = () => {
  const pathname = useLocation();
  return (
    <div className={pathname.pathname == "/mypage" ? "dashboard mypage_dashboard" : "dashboard"}>
      <Route exact path="/love" component={Router.Love} />
      <Route exact path="/tarot" component={Router.Tarot} />
      <Route exact path="/auth" component={Router.Auth} />
      <Route exact path="/mypage" component={Router.MyPage} />
      <div className="footer">
        (주) 세모이 &nbsp;&nbsp;|&nbsp;&nbsp; CEO &nbsp;&nbsp;김현지
        &nbsp;&nbsp;|&nbsp;&nbsp; Phone &nbsp;&nbsp;010-5790-6726
      </div>
    </div>
  );
};
