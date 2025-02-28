import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo_b from "../../../assets/imgs/logo_b.png";

function FindPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      alert("인증번호가 확인되었습니다.");
      setIsCodeVerified(true);
    } else {
      alert("인증번호가 잘못되었습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      alert("비밀번호가 변경되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <FindPasswordContainer>
      <FindPasswordSection>
        <FindLogo>
          <img src={logo_b} alt="Logo" />
        </FindLogo>

        <Title>
          <h4>비밀번호 찾기</h4>
        </Title>

        <FindInput>
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleSendCode}>발송</button>
          </div>
        </FindInput>

        {isCodeSent && (
          <VerificationSection>
            <div>
              <input
                type="text"
                placeholder="인증번호"
                value={verificationCode}
                onChange={handleCodeChange}
              />
              <button onClick={handleVerifyCode}>인증번호 확인</button>
            </div>
          </VerificationSection>
        )}
        {isCodeVerified && (
          <PasswordSection>
            <div>
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </PasswordSection>
        )}

        {isCodeVerified && (
          <CheckBox>
            <button onClick={handleSubmit}>확인</button>
          </CheckBox>
        )}
      </FindPasswordSection>
    </FindPasswordContainer>
  );
}

const FindPasswordContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FindPasswordSection = styled.div`
  margin: auto;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: 600px;
  background-color: #f4f4f4;
  padding-bottom: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  margin-bottom: 200px;
`;

const FindLogo = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 600px;
  height: 40px;
  background-color: #f4f4f4;
  margin-bottom: 30px;
  img {
    width: 145px;
    height: 35px;
  }
`;

const Title = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 40px;
  margin-bottom: 30px;
  h4 {
    font-size: 36px;
    color: #111111;
    font-weight: bold;
  }
`;

const FindInput = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;
  position: relative;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
    margin: 0 auto;
  }
  button {
    right: 90px;
    position: absolute;
    background-color: #f4f4f4;
    color: #111111;
    border: none;
    padding: 10px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const VerificationSection = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;
  position: relative;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
    margin: 0 auto;
  }
  button {
    right: 90px;
    position: absolute;
    background-color: #f4f4f4;
    color: #111111;
    border: none;
    padding: 10px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const PasswordSection = styled.div`
  width: 600px;
  margin-top: 20px;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
    margin: 0 auto;
  }
`;

const CheckBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
  button {
    font-size: 20px;
    font-weight: 700;
    width: 460px;
    height: 60px;
    background-color: #111111;
    color: #fff;
  }
`;

export default FindPassword;
