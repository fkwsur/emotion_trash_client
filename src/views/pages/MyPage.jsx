import React, { useEffect, useState } from "react";

export const MyPage = () => {
  const LogOut = () => {
    try {
      console.log("?");
      window.sessionStorage.removeItem("xauth");
      window.localStorage.removeItem("rxauth");
      window.location.replace("/auth");
      alert("로그아웃 되셨습니다.");
      return;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {window.sessionStorage.getItem("xauth") ? (
        <div className="main">
          <h2>마이페이지</h2>
          <div className="chat_container">
            안녕
            <button onClick={LogOut}>로그아웃</button>
          </div>
        </div>
      ) : (
        window.location.replace("/")
      )}
    </>
  );
};
