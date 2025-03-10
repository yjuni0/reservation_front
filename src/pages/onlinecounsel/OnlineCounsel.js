import React, { lazy, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonTable from "../../components/common/CommonTable";
import CustomPagination from "../../components/common/CustomPagination";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 import
import WriteGo from "../../components/button/WriteGo";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { AuthContext, HttpHeadersContext } from "../../context";

function OnlineCounsel() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCnt, setTotalCnt] = useState(0);
  const [linkValue, setLinkValue] = useState("/question"); // linkValue 상태 추가
  const navigate = useNavigate(); // navigate 훅 추가
  const columns = [
    { label: "No", field: "id" },
    { label: "제목", field: "title", link: true },
    { label: "작성자", field: "writerName" },
    { label: "작성일", field: "createdDate" },
  ];
  const getBbsList = async (page) => {
    try {
      const response = await axios.get("/api/member/question", {
        params: { page: page - 1 },
        headers: headers,
      });
      setBbsList(response.data.content || []); // 응답이 없을 경우 빈 배열 처리
      setPageSize(response.data.pageSize || 8);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.error("Error festching board data:", error);
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes("/admin")) {
      setLinkValue("/admin/question"); // "/admin/question"으로 설정
    } else {
      setLinkValue("/question"); // "/question"으로 설정
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한번만 실행

  useEffect(() => {
    getBbsList(page);
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
  }, [page]);

  const addEmptyRows = (data) => {
    const rowsWithEmpty = [];
    data.forEach((item) => {
      rowsWithEmpty.push({}); // 빈 데이터 행 추가 (공백 행)
      rowsWithEmpty.push(item); // 데이터 행 추가
    });
    return rowsWithEmpty;
  };
  const bbsListWithEmptyRows = addEmptyRows(bbsList);

  return (
    <Container>
      <ContentWrapper>
        <CommonTable
          bbsList={bbsListWithEmptyRows}
          columns={columns}
          linkPrefix={linkValue}
        />
        <BottomBox>
          <WriteGo />
        </BottomBox>
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

//  하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 140px;
  padding-right: 140px;
`;

export default OnlineCounsel;
