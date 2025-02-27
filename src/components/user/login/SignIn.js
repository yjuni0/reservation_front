import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext, HttpHeadersContext } from "../../../context";
import logo from "./imgs/logo_b.png";

function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const { setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const googleLogin = async () => {
    try {
      const resp = await axios.get(`/api/auth/google-login`);
      console.log(resp.data);
      console.log("[✅ 응답 데이터]", resp.data);

      alert(resp.data.email + "님, 성공적으로 로그인 되었습니다요");

      // JWT 토큰 저장
      localStorage.setItem("access_token", resp.data.token);
      localStorage.setItem("id", resp.data.email);

      setAuth(resp.data.email);
      setHeaders({ Authorization: `Bearer ${resp.data.token}` }); // HttpHeadersContext에 Authorization 헤더 저장

      navigate("/"); // 로그인 후 홈으로 리다이렉트
    } catch (err) {
      console.log("Login failed");
      console.error("Error Details:", err); // 전체 오류 객체 출력
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  const login = async () => {
    const req = {
      email: id,
      password: pwd,
    };

    try {
      const resp = await axios.post("/api/login", req); // axios로 POST 요청
      console.log("Login OK");
      console.log(resp.data);

      alert(resp.data.email + "님, 성공적으로 로그인 되었습니다요");

      // JWT 토큰 저장
      localStorage.setItem("access_token", resp.data.token);
      localStorage.setItem("id", resp.data.email);

      setAuth(resp.data.email);
      setHeaders({ Authorization: `Bearer ${resp.data.token}` }); // HttpHeadersContext에 Authorization 헤더 저장

      navigate("/"); // 로그인 후 홈으로 리다이렉트
    } catch (err) {
      console.log("Login failed");
      console.error("Error Details:", err); // 전체 오류 객체 출력

      // err.response?.data가 객체라면 JSON.stringify로 문자열로 변환하여 출력
      const errorMessage = err.response?.data
        ? JSON.stringify(err.response?.data)
        : "알 수 없는 오류 발생";
      alert(
        "로그인 실패! " +
          (err.response?.data
            ? JSON.stringify(err.response?.data)
            : "알 수 없는 오류 발생")
      );
    }
  };

  return (
    <LoginContainer>
      <LoginSection>
        <img src={logo} alt="logo" />
        <LoginTitle>
          <h1>로그인</h1>
        </LoginTitle>
        <InputBox>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={changeId}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={changePwd}
            onKeyDown={handleKeyDown}
          />
          <IdFind>
            <Link to="/findId">
              <h6>아이디찾기</h6>
            </Link>
          </IdFind>
          <PwFind>
            <Link to="/findPw">
              <h6>비밀번호찾기</h6>
            </Link>
          </PwFind>
          <SignInButton onClick={login}>로그인</SignInButton>
          <SignupButton>
            <Link to="/signup">회원가입</Link>
          </SignupButton>
          <button onClick={googleLogin}>구글 로그인</button>
        </InputBox>
      </LoginSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 1040px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 600px;
  height: 740px;
  text-align: center;
  background: #f4f4f4;
  img {
    margin-top: 30px;
    width: 145px;
    height: 35px;
    margin-bottom: 30px;
  }
`;

const LoginTitle = styled.div`
  width: 600px;
  height: 40px;
  h1 {
    font-weight: bold;
    font-size: 36px;
  }
`;

const InputBox = styled.div`
  margin-top: 30px;
  width: 480px;
  height: 370px;
  box-sizing: border-box;
  text-align: center;

  input {
    font-family: "Noto Sans KR", serif;
    border: none;
    padding-left: 15px;
    width: 460px;
    height: 60px;
    color: #111111;
    background: #ffffff;
    font-weight: medium;
    font-size: 20px;
    outline: none;
  }
  input:nth-child(2) {
    margin-top: 5px;
  }
`;

const IdFind = styled.div`
  float: left;
  margin: 12px 50px 12px 100px;
  width: 90px;
  height: 16px;
  display: flex;
  a {
    text-decoration: none;
  }
  h6 {
    font-weight: regular;
    font-size: 16px;
    color: #111111;
  }
`;

const PwFind = styled.div`
  margin: 12px 100px 12px 30px;
  float: right;
  width: 110px;
  height: 16px;
  display: flex;
  a {
    text-decoration: none;
  }
  h6 {
    font-weight: regular;
    font-size: 16px;
    color: #111111;
  }
`;

const SignInButton = styled.button`
  margin-top: 12px;
  margin-left: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 60px;
  background: #111111;
  font-weight: medium;
  font-size: 20px;
  color: white;
  border: none;
`;

const SignupButton = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 60px;
  background: #111111;
  font-weight: medium;
  font-size: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`;

export default SignIn;
