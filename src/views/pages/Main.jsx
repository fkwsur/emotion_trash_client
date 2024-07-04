import React, { useState } from "react";
import logo from "../../image/trash.png";
import profile from "../../image/profile1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faStarAndCrescent,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Router from "..";
import { NavLink } from "react-router-dom";

export const Main = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="로고" />
        </div>
        <div className="nav">
          <ul>
            <li>
              <NavLink to={`/love`}>
                <FontAwesomeIcon icon={faHeart} /> 연애
              </NavLink>
            </li>
            <li>
              <NavLink to={`/tarot`}>
                <FontAwesomeIcon icon={faStarAndCrescent} /> 타로
              </NavLink>
            </li>
            <li>
              <NavLink to={`/subscribe`}>
                <FontAwesomeIcon icon={faAddressCard} /> 구독
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="profile login_btn">
          {window.sessionStorage.getItem("authorization") ? (
            <NavLink to={`/mypage`}>
              <div className="profile">
                <img src={profile} alt="" /> <p>김현지님</p>
              </div>{" "}
            </NavLink>
          ) : (
            <NavLink to={`/auth`}>로그인 / 회원가입
            </NavLink>
          )}
        </div>
      </div>
      <Router.DashBoard />
    </>
  );
};
