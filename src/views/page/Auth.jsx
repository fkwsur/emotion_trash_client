import React, { useEffect, useState } from "react";
import logo from "../../image/trash.png";

export const Auth = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState("signin");

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
      {isAuth == "signin" ? (
        <h2>로그인</h2>
      ) : isAuth == "signup" ? (
        <h2>회원가입</h2>
      ) : (
        ""
      )}
      <div className="login_box">
        <div className="title_wrap">
          <img src={logo} alt="logo" />
          <h2>감쓰통</h2>
          <h3>당신을 위한 감정 쓰레기통</h3>
        </div>
        {isAuth == "signin" ? (
          <SignIn setIsAuth={setIsAuth} />
        ) : isAuth == "signup" ? (
          <SignUp setIsAuth={setIsAuth} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export const SignIn = (props) => {
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
    <>
      <form onSubmit={onSubmit}>
        <p>아이디</p>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          로그인하기
        </button>
        <p className="help_login">
          아직 계정이 없으신가요?{" "}
          <span onClick={() => props.setIsAuth("signup")}>
            {" "}
            간편 / 자체 회원가입하기
          </span>
        </p>
        <p className="help_login">
          <span>아이디 | 비밀번호</span> 찾기
        </p>
      </form>
    </>
  );
};

export const SignUp = (props) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, seBirth] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("하이");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="signup">
        <p>아이디</p>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <p>닉네임</p>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p>비밀번호 확인</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p>휴대폰번호 ('-' 없이 전화번호만 입력해주세요)</p>
        <input
          type="text"
          // oninput={phone}
          name="phone"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g)
            )
          }
          required
        />

        <p>이메일</p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>생년월일 (*선택)</p>
        <input
          type="date"
          name="birth"
          value={birth}
          onChange={(e) => seBirth(e.target.value)}
        />

        <p>성별 (*선택)</p>
        여자
        <input
          type="checkbox"
          name="gender"
          value="female"
          checked={gender == "female" ? true : false}
          onChange={(e) => gender == "female" ? setGender("") : setGender(e.target.value)}
        />
        남자
        <input
          type="checkbox"
          name="gender"
          value="male"
          checked={gender == "male" ? true : false}
          onChange={(e) => gender == "male" ? setGender("") : setGender(e.target.value)}
        />
        <button type="submit" className="btn">
          가입완료
        </button>
        <p className="help_login">
          <span onClick={() => props.setIsAuth("signin")}>
            로그인페이지로 이동
          </span>
        </p>
      </form>
    </>
  );
};
