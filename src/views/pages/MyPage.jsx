import React, { useEffect, useState } from "react";
import Router from "..";

export const MyPage = () => {
  const [userInfo, setUserInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isChangeInfo, setIsChangeInfo] = useState(false);
  const [isChangePhone, setIsChangePhone] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isUnregister, setIsUnregister] = useState(false);

  useEffect(() => {
    GetUserInfo();
  }, []);

  const GetUserInfo = async () => {
    try {
      await Router.CustomAxios.get(
        "http://localhost:8081/api/v1/user/get/userinfo",
        {
          headers: {
            authorization: window.sessionStorage.getItem("authorization"),
          },
        }
      )
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
            alert(res.data.error.text);
            return;
          }
          if (res.data) {
            setPhone(res.data.result.phone);
            setGender(res.data.result.gender);
            setEmail(res.data.result.email);
            setBirth(res.data.result.birth);
            setNickname(res.data.result.nickname);
            setUserInfo(res.data.result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateUserInfo = async (e) => {
    try {
      e.preventDefault();
      let set_birth = birth;
      const regexName = /^[가-힣a-zA-Z\s]+$/;
      const regexNumber = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/;
      const regexEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (regexName.test(nickname) === false) {
        return alert(
          "닉네임은 한글 또는 영문만 입력해주세요.(단일 자음, 모음 불가)"
        );
      } else if (regexEmail.test(email) === false) {
        return alert("이메일 형식이 맞지 않습니다.");
      } else if (regexNumber.test(phone) === false) {
        return alert("전화번호 양식이 맞지 않습니다.");
      } else if (birth == undefined || birth == null || birth == "") {
        set_birth = null;
      }
      await Router.CustomAxios.post(
        "http://localhost:8081/api/v1/user/update/userinfo",
        {
          nickname: nickname,
          birth: set_birth,
          gender: gender,
          email: email,
        },
        {
          headers: {
            authorization: window.sessionStorage.getItem("authorization"),
          },
        }
      )
        .then((res) => {
          if (res.data.error) {
            if (
              res.data.error.includes("SequelizeUniqueConstraintError") == true
            ) {
              alert("이미 가입되어 있는 이메일 정보입니다.");
            } else {
              alert(res.data.error.text);
            }
            return;
          }
          if (res.data.result) {
            alert("수정이 완료되었습니다.");
            GetUserInfo();
            setIsChangeInfo(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const UpdatePassword = async (e) => {
    try {
      e.preventDefault();

      const regexPassword =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (regexPassword.test(newPassword) === false) {
        alert(
          "새 비밀번호는 하나 이상의 문자, 숫자 ,특수 문자(@$!%*?&)를 입력해주세요."
        );
        return;
      } else if (passwordCheck.length >= 1 && newPassword !== passwordCheck) {
        alert("비밀번호 확인이 일치하지 않습니다.");
        return;
      }
      await Router.CustomAxios.post(
        "http://localhost:8081/api/v1/user/update/password",
        {
          app_key: password,
          new_app_key: passwordCheck,
        },
        {
          headers: {
            authorization: window.sessionStorage.getItem("authorization"),
          },
        }
      )
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error.text);
            return;
          }
          if (res.data.result) {
            alert("수정이 완료되었습니다.");
            setPassword("");
            setPasswordCheck("");
            setNewPassword("");
            setIsChangePassword(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const Unregister = async (e) => {
    try {
      e.preventDefault();
      await Router.CustomAxios.post(
        "http://localhost:8081/api/v1/user/unregister",
        {
          app_key: password,
        },
        {
          headers: {
            authorization: window.sessionStorage.getItem("authorization"),
          },
        }
      )
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error.text);
            return;
          }
          if (res.data.result) {
            alert("탈퇴가 완료되었습니다.");
            window.sessionStorage.removeItem("authorization");
            window.localStorage.removeItem("refreshauthorization");
            window.location.replace("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const LogOut = () => {
    try {
      window.sessionStorage.removeItem("authorization");
      window.localStorage.removeItem("refreshauthorization");
      window.location.replace("/auth");
      alert("로그아웃 되셨습니다.");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {window.sessionStorage.getItem("authorization") ? (
        <div className="main">
          <h2>마이페이지</h2>

          <div
            className={isChangeInfo ? "wrap_form" : "wrap_form before_input"}
          >
            <form>
              <div className="wrap_title">
                <h2>내 정보</h2>

                {isChangeInfo ? (
                  <>
                    <button
                      className="update_btn"
                      type="submit"
                      onClick={UpdateUserInfo}
                    >
                      완료
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangeInfo(!isChangeInfo);
                        setPhone(userInfo.phone);
                        setGender(userInfo.gender);
                        setEmail(userInfo.email);
                        setBirth(userInfo.birth);
                        setNickname(userInfo.nickname);
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsChangeInfo(!isChangeInfo)}
                  >
                    수정
                  </button>
                )}
              </div>
              <p>닉네임</p>
              <input
                type="text"
                value={isChangeInfo ? nickname : userInfo.nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <p>생일</p>
              <input
                type={isChangeInfo ? "date" : "text"}
                value={
                  isChangeInfo
                    ? birth
                    : userInfo.birth || userInfo.birth
                    ? userInfo.birth
                    : "선택안함"
                }
                onChange={(e) => setBirth(e.target.value)}
              />
              <p>성별</p>
              {isChangeInfo ? (
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
                      gender == "male"
                        ? setGender(null)
                        : setGender(e.target.value)
                    }
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={
                    userInfo.gender == "female"
                      ? "여성"
                      : userInfo.gender == "male"
                      ? "남성"
                      : "선택안함"
                  }
                />
              )}
              <p>이메일</p>
              <input
                type="text"
                value={isChangeInfo ? email : userInfo.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>
          </div>

          <div
            className={isChangePhone ? "wrap_form" : "wrap_form before_input"}
          >
            <form>
              <div className="wrap_title">
                <h2>전화번호</h2>
                {isChangePhone ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangePhone(!isChangePhone);
                        setPhone(userInfo.phone);
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsChangePhone(!isChangePhone)}
                  >
                    변경
                  </button>
                )}
              </div>

              {isChangePhone ? (
                <>
                  <p>전화번호 인증</p>
                  <div className="warp_phone">
                    <form style={{"display" : "block"}}>
                      <input
                        type="text"
                        value={isChangePhone ? phone : userInfo.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="send_sms"
                        onClick={() => setIsChangePhone(true)}
                      >
                        요청
                      </button>
                    </form>
                  </div>
                  <p>인증번호 입력</p>
                  <div className="warp_phone">
                    <form style={{"display" : "block"}}>
                      <input
                        type="text"
                        value={checkPhone}
                        onChange={(e) => setCheckPhone(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="send_sms"
                      >
                        확인
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <p>인증완료 번호</p>
                  <input type="text" value={userInfo.phone} />
                </>
              )}
            </form>
          </div>

          <div className="wrap_form ">
            <form onSubmit={UpdatePassword}>
              <div
                className={
                  isChangePassword ? "wrap_title" : "wrap_title password"
                }
              >
                <h2>비밀번호</h2>
                {isChangePassword ? (
                  <>
                    <button className="update_btn" type="submit">
                      완료
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangePassword(!isChangePassword);
                        setPassword("");
                        setPasswordCheck("");
                        setNewPassword("");
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsChangePassword(!isChangePassword)}
                  >
                    변경
                  </button>
                )}
              </div>
              {isChangePassword ? (
                <>
                  <p>기존 비밀번호</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p>새 비밀번호</p>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <p>새 비밀번호 확인</p>
                  <input
                    type="password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    required
                  />
                </>
              ) : (
                ""
              )}
            </form>
          </div>
          {isUnregister ? (
            <>
              <div className="wrap_form ">
                <form onSubmit={Unregister}>
                  <div className="wrap_title">
                    <h2>회원탈퇴</h2>
                    <button className="update_btn" type="submit">
                      완료
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUnregister(!isUnregister);
                        setPassword("");
                      }}
                    >
                      취소
                    </button>
                  </div>
                  <p>비밀번호</p>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </form>
              </div>
              <button className="logout" onClick={LogOut}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="logout" onClick={LogOut}>
                로그아웃
              </button>
              <button className="unregis" onClick={() => setIsUnregister(true)}>
                회원탈퇴
              </button>
            </>
          )}
        </div>
      ) : (
        window.location.replace("/")
      )}
    </>
  );
};
