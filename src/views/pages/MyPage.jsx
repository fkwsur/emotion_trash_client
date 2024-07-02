import React, { useEffect, useState } from "react";
export const MyPage = () => {

   const LogOut = () => {
           try {
                   window.sessionStorage.removeItem("xauth")
                   window.localStorage.removeItem("rxauth")
                   
           } catch (error) {
                   console.log(error)
           }
   }

  return (
    <div className="main">
     <h2>마이페이지</h2>
     <div className="chat_container">
             안녕

             <button onClick={LogOut}>로그아웃</button>
     </div>
    </div>
  );
};