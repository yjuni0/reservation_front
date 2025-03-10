import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonTable from "../../../components/common/CommonTable";
import CustomPagination from "../../../components/common/CustomPagination";
import { AuthContext, HttpHeadersContext } from "../../../context";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function A_User() {
    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCnt, setTotalCnt] = useState(0);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  let useRole = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      useRole = decodedToken.roles;
    } catch (e) {
      console.log("토큰 디코딩 오류 : ", e);
    }
  }
  const linkValue = "adminuser";
  const columns = [
    { label: "No", field: "id" },
    { label: "이메일", field: "email" },
    { label: "닉네임", field: "nickName" },
    { label: "전화번호", field: "phoneNum" },
    { label: "삭제", field: "actions" },
  ];

  const getBbsList = async (page) => {
    try {
      const response = await axios.get("/api/admin/member", {
        params: { page: page - 1 }, headers:headers
      });
      setBbsList(response.data.content || []);
      setPageSize(response.data.pageSize || 10);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  const handleDelete = async (memberId) => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`/api/admin/member/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("삭제하였습니다.");
        // 목록 페이지로 이동
        navigate("/admin/adminuser");
      } else {
        alert("삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error(
        "Error during deletion:",
        error.response ? error.response.data : error
      );
      alert("삭제에 실패하였습니다.");
    }
  };

  useEffect(() => {
    getBbsList(page);
  }, [page]);

  const addEmptyRows = (data) => {
    const rowsWithEmpty = [];
    data.forEach((item, index) => {
      rowsWithEmpty.push({ key: `empty-${index * 2}` }); // 빈 데이터 행 추가 (공백 행)
      rowsWithEmpty.push({ ...item, key: `item-${index * 2 + 1}` }); // 데이터 행 추가
    });
    return rowsWithEmpty;
  };

  const bbsListWithEmptyRows = addEmptyRows(bbsList);

  const handleEmailClick = (memberId) => {
    navigate(`/admin/adminuser/member/${memberId}`);
  };

  return (
    <Container>
      <ContentWrapper>
        <CommonTable
          bbsList={bbsListWithEmptyRows.map((item) => ({
            ...item,
            email: item.email ? (
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleEmailClick(item.id)}
              >
                {item.email}
              </span>
            ) : null,
            actions: item.id ? (
              <button onClick={() => handleDelete(item.id)}>삭제</button>
            ) : null,
          }))}
          columns={columns}
          linkPrefix={linkValue}
        />
        <PaginationBox>
          <CustomPagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalCnt={totalCnt}
          />
        </PaginationBox>
      </ContentWrapper>
    </Container>
  );
}

// 스타일 컴포넌트들
const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
  }
`;

const PaginationBox = styled.div`
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 50px;
  background-color: #ffffff;
  flex-direction: row;

  .pagination {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
  }
`;

const WriteBtn = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  background-color: #f4f4f4;
  border: 1px solid #111111;
`;

const WriteBtnBox = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

export default A_User;
