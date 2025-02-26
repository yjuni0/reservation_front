import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import logo_b from "./imgs/logo_b.png";
function FindId() {
  const [emailFound, setEmailFound] = useState(""); // 이메일을 찾은 상태를 저장
  const [isEmailVisible, setIsEmailVisible] = useState(false); // 이메일을 보여줄지 여부

  const handleFindEmail = () => {
    // 여기에서 실제 이메일 찾는 로직을 넣을 수 있음
    const foundEmail = "example@email.com"; // 예시 이메일
    setEmailFound(foundEmail);
    setIsEmailVisible(true); // 이메일을 찾으면 폼을 보이도록 설정
  };

  return (
    <FindIdContainer>
      <FindIdSection>
        <FindLogo>
          <img src={logo_b} />
        </FindLogo>

        <Title>
          <h4> 아이디찾기 </h4>
        </Title>
        <FindiIdInput>
          <div>
            <input type="text" placeholder="이름"></input>
            <input type="password" placeholder="전화번호"></input>
          </div>
        </FindiIdInput>

        {isEmailVisible && (
          <FoundEmailSection>
            <p>찾은 이메일: {emailFound}</p>
          </FoundEmailSection>
        )}

        <PwFind>
          <Link to="/findPw">
            <h6>비밀번호찾기 </h6>
          </Link>
        </PwFind>

        <CheckBox>
          <button>확인</button>
        </CheckBox>
      </FindIdSection>
    </FindIdContainer>
  );
}

const FindIdContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ----------------------------------------------------------------------------------

const FindIdSection = styled.div`
  margin: auto;
  align-items: center;
  margin-top: 130px;
  padding-top: 30px;
  width: 600px;
  min-height: 500px;
  background-color: #f4f4f4;
  margin-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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

const FindiIdInput = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  gap: 20px; /* input 사이의 간격을 20px로 설정 */

  div {
    width: 100%;
    height: 120px;
  }
  input:first-child {
    margin-bottom: 5px;
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
    display: block;
    margin: 0 auto;
  }
`;

const FoundEmailSection = styled.div`
  margin: 20px 0;
  text-align: center;
  p {
    font-size: 18px;
    color: #111111;
  }
`;

const PwFind = styled.div`
  margin: 12px 0;
  width: 100%; /* Make it take full width */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  height: 40px;

  a {
    text-decoration: none;
  }

  h6 {
    font-weight: regular;
    font-size: 16px;
    color: #111111;
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

export default FindId;
