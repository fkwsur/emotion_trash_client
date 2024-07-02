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

export const Main = () => {
  const [menu, setMenu] = useState("");
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="로고" />
        </div>
        <div className="nav">
          <ul>
            {/* <li>
              <button onClick={() => setMenu("")}>
                <FontAwesomeIcon icon={faHeart} />감쓰통 소개
              </button>
            </li> */}
            <li>
              <button onClick={() => setMenu("love")}>
                <FontAwesomeIcon icon={faHeart} /> 연애
              </button>
            </li>
            <li>
              <button onClick={() => setMenu("tarot")}>
                <FontAwesomeIcon icon={faStarAndCrescent} /> 타로
              </button>
            </li>
            <li>
              <button onClick={() => setMenu("subscribe")}>
                <FontAwesomeIcon icon={faAddressCard} /> 구독
              </button>
            </li>
          </ul>
        </div>
        <div className="profile login_btn">
          {window.sessionStorage.getItem("xauth") ? (
            <button onClick={() => setMenu("mypage")}>
              <div className="profile">
                <img src={profile} alt="" /> <p>김현지님</p>
              </div>{" "}
            </button>
          ) : (
            <button onClick={() => setMenu("auth")}>로그인 / 회원가입</button>
          )}
        </div>
      </div>
      <Router.DashBoard menu={menu} />
    </>
  );
};
