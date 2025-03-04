import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ReservationCheck from "./ReservationCheck";
import UserProfile from "./UserProfile";
import UserUpdate from "./UserUpdate";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext, HttpHeadersContext } from "../../../context";

function MyPage() {
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [page, setPage] = useState("0");
  // const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    const nick_name = localStorage.getItem("nick_name");
    console.log("LocalStorage ID:", localStorage.getItem("nick_name"));
    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const getProfile = async () => {
    const req = {
      password: password,
    };
    await axios
      .post("/api/myPage", req, { headers: headers })
      .then((response) => {
        console.log("응답 데이터", response.data);
        const profile = response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <MyPageContainer>
      <MyPageTitle>
        <TitleH1>마이페이지</TitleH1>
      </MyPageTitle>

      <ButtonContainer>
        <MyPageButton onClick={() => setPage("1")}>프로필</MyPageButton>
        <MyPageButton className="middle" onClick={() => setPage("2")}>
          회원정보수정
        </MyPageButton>
        <MyPageButton onClick={() => setPage("3")}>예약확인</MyPageButton>
      </ButtonContainer>

      <MyPageContentBox>
        {page === "0" && (
          <Container>
            <div>
              <input
                type="password"
                value={password}
                onChange={changePassword}
              ></input>
              <button onClick={getProfile}>확인</button>
            </div>
          </Container>
        )}

        {page === "1" && <UserProfile />}
        {page === "2" && <UserUpdate />}
        {page === "3" && <ReservationCheck />}
      </MyPageContentBox>
    </MyPageContainer>
  );
}
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const MyPageTitle = styled.div`
  margin-top: 100px;
  text-align: left;
`;

const TitleH1 = styled.h1`
  margin-left: 0;
  font-size: 36px;
  font-family: "Noto Sans KR", serif;
  font-weight: bold;
`;

// 버튼들을 가운데 수평정렬하기 위해 flex 컨테이너로 변경
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  .middle {
    border: none;
    border-top: 1px solid #111111;
    border-bottom: 1px solid #111111;
  }
`;

const MyPageButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#fff")};
  color: ${(props) => (props.disabled ? "#111" : "#111")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 20px;
  font-family: "Noto Sans KR", serif;
  border: 1px solid #111111;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#111111")};
    color: ${(props) => (props.disabled ? "#111111" : "#fff")};
  }
`;

const MyPageContentBox = styled.div`
  width: 100%;
  max-width: 1280px;
  padding-left: 140px;
  padding-right: 140px;
  margin-bottom: 30px;
`;

export default MyPage;
