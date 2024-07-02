import React, { useEffect, useState } from "react";
import logo from "../../image/trash.png";
import Router from "..";

export const Auth = () => {
  const [isAuth, setIsAuth] = useState("signin");

  return (
    <div className="main login">
      {window.sessionStorage.getItem("xauth") ? (
        <Router.MyPage />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export const SignIn = (props) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Router.CustomAxios.post(
        "http://localhost:8081/api/v1/user/signin",
        {
          oauth_id: userId,
          app_key: password,
          platform: "own",
        }
      )
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
            alert(res.data.error.text);
          }
          if (res.data) {
            alert("로그인이 완료되었습니다.");
            window.sessionStorage.setItem("xauth", res.data.authorization);
            window.localStorage.setItem(
              "rxauth",
              res.data.refreshauthorization
            );
            window.location.replace("/mypage");
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
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
  const [birth, seBirth] = useState(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [isChecked, setIsChecked] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();
    const regexUserId = /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/;
    const regexName = /^[가-힣a-zA-Z\s]+$/;
    const regexNumber = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/;
    const regexEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regexUserId.test(userId) === false) {
      return alert(
        "길이 4~20자 및 영문으로 시작하는 영문이나 숫자 조합의 아이디를 입력해주세요."
      );
    }else if (isChecked === false) {
      return alert("계정 중복확인을 진행해주세요.");
    }else if (regexName.test(nickname) === false) {
      return alert(
        "닉네임은 한글 또는 영문만 입력해주세요.(단일 자음, 모음 불가)"
      );
    } else if (regexEmail.test(email) === false) {
      return alert("이메일 형식이 맞지 않습니다.");
    } else if (regexNumber.test(phone) === false) {
      return alert("전화번호 양식이 맞지 않습니다.");
    }
    // else if (acceptCheckBox === false) {
    //   return alert("이용약관에 동의해 주세요.");
    // }
    try {
      await Router.CustomAxios.post(
        "http://localhost:8081/api/v1/user/signup",
        {
          oauth_id: userId,
          nickname: nickname,
          app_key: password,
          phone: phone,
          email: email,
          gender: gender,
          birth: birth,
          platform: "own",
        }
      )
        .then((res) => {
          if (res.data.result) {
            alert("가입이 완료되었습니다.");
            props.setIsAuth("signin");
          }
          if (res.data.error) {
            if(res.data.error.includes("SequelizeUniqueConstraintError") == true){
              alert("이미 가입되어 있는 이메일 정보입니다.")
            }else{
              alert(res.data.error.text);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };


  const CheckClick = async () => {
    if (!userId) {
        alert("가입하실 아이디를 입력해주세요.")
        return
    }
    try {
        await Router.CustomAxios.get("http://localhost:8081/api/v1/user/check/oauthid", {
            params: {
              oauth_id: userId
            }
        })
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error.text);
                    return
                }
                if (res.data) {
                    if (res.data.result === true) {
                        setIsChecked(true)
                        alert("가입가능한 계정입니다.")
                        return
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
}

  return (
    <>
      <form onSubmit={onSubmit} className="signup">
        <div className="user_id">
        <p>아이디</p>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={(e) => {setUserId(e.target.value);setIsChecked(false)}}
          className="user_id"
          required
        />
        <button type="button" className="check_id" onClick={CheckClick}>중복확인</button>
        </div>
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
        <div className="input_wrap">
          <div>
            <p>생년월일 (*선택)</p>
            <input
              type="date"
              name="birth"
              value={birth}
              onChange={(e) => seBirth(e.target.value)}
            />
          </div>
          <div>
            <p>성별 (*선택)</p>
            <div className="gender">
              <p>여성</p>
              <input
                type="checkbox"
                name="gender"
                value="female"
                checked={gender == "female" ? true : false}
                onChange={(e) =>
                  gender == "female"
                    ? setGender(null)
                    : setGender(e.target.value)
                }
              />
              <p>남성</p>
              <input
                type="checkbox"
                name="gender"
                value="male"
                checked={gender == "male" ? true : false}
                onChange={(e) =>
                  gender == "male" ? setGender(null) : setGender(e.target.value)
                }
              />
            </div>
          </div>
        </div>
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
