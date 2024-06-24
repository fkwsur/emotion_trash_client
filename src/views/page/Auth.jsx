import React, { useEffect, useState } from "react";
import logo from "../../image/trash.png";
export const Auth = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("하이");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main login">
      <div className="login_box">
        <div className="title_wrap">
          <img src={logo} alt="logo" />
          <h2>감쓰통</h2>
          <h3>당신을 위한 감정 쓰레기통</h3>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit" className="btn">
            로그인
          </button>
          <p>
            아직 계정이 없으신가요? <span>회원가입하기</span>
          </p>
          <p>
            <span>아이디 | 비밀번호</span> 찾기
          </p>
        </form>
      </div>
    </div>
  );
};
