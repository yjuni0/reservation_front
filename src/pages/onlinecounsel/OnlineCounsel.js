import React, { lazy, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonTable from "../../components/common/CommonTable";
import CustomPagination from "../../components/common/CustomPagination";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 import
import { Link } from "react-router-dom";
import { AuthContext, HttpHeadersContext } from "../../context";

function OnlineCounsel() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCnt, setTotalCnt] = useState(0);
  const [linkValue, setLinkValue] = useState("");
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
      console.error("Error fetching board data:", error);
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
  }, [page]);

  return (
    <Container>
      <ContentWrapper>
        <CommonTable
          bbsList={bbsList}
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
        <Link to="/onlinecounsel/write">
          <button>작성</button>
        </Link>
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

export default OnlineCounsel;
