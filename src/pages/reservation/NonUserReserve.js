import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NonUserReserve() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const changeNonMemberName = (event) => {
    setName(event.target.value);
  };

  const changeNonMemberPhone = (event) => {
    setPhoneNum(event.target.value);
  };

  // 예약 등록
  const createNonMemberReserve = async () => {
    const req = {
      name: name,
      phoneNum: phoneNum,
    };
    console.log("보내는 데이터", req);

    await axios
      .post("/api/nonMember", req)
      .then((response) => {
        console.log("비회원 예약 성공: ", response.data);
        const reserveId = response.data.id;
        console.log("nonMemberReserveId: ", reserveId);

        alert("비회원 예약이 등록되었습니다. 곧 관리자가 연락드리겠습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log("비회원 예약 실패", error);
      });
  };

  return (
    <Container>
      <Title>비회원 예약</Title>
      <Form>
        <InputField
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={changeNonMemberName}
        />
        <InputField
          type="text"
          placeholder="전화번호를 입력해주세요."
          value={phoneNum}
          onChange={changeNonMemberPhone}
        />
        <SubmitButton onClick={createNonMemberReserve}>예약하기</SubmitButton>
      </Form>
    </Container>
  );
}

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

// 제목
const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 25px;
`;

// 폼 스타일
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

// 입력 필드
const InputField = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 18px;
`;

// 버튼 스타일
const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 6px;
  background-color: #002f6c;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #001f4d;
  }
`;

export default NonUserReserve;
