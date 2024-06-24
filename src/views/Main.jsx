import React, { useEffect, useState } from "react";
import {DashBoard} from "../views/DashBoard";
import logo from "../image/trash.png";
import profile from "../image/profile1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faStarAndCrescent, faHeart} from "@fortawesome/free-solid-svg-icons";


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
        <div className="profile">
          <button onClick={() => setMenu("auth")}>로그인</button>
        </div>
        {/* <div className="profile">
          <img src={profile} alt="" /> <p>김현지님</p>
        </div> */}
      </div>
      <DashBoard menu={menu}/>
    </>
  );
};
