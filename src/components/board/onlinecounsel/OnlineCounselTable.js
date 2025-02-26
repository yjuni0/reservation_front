import React, { useState } from "react";
import styled from "styled-components";

import search from "./imgs/search.png";
import { Link } from "react-router-dom";
import OnlineCounsel from "./OnlineCounsel";

function OnlineCounselTable({ bbsList }) {
   console.log("bbsList여부",bbsList);  // bbsList가 전달되고 있는지 확인
  // const notices = [
  //   { id: 1, title: "제목", date: "2025-02-20", views: 11 },
  //   { id: 2, title: "제목", date: "2025-02-20", views: 10 },
  //   { id: 3, title: "제목", date: "2025-02-20", views: 10 },
  //   { id: 4, title: "제목", date: "2025-02-20", views: 10 },
  //   { id: 5, title: "제목", date: "2025-02-20", views: 10 },
  //   { id: 6, title: "제목", date: "2025-02-20", views: 11 },
  //   { id: 7, title: "제목", date: "2025-02-20", views: 10 },
  //   { id: 8, title: "제목", date: "2025-02-20", views: 10 },
  // ];

// const addEmptyRows = (data) => {
//   // 데이터가 배열인지 확인하고, 배열이 아니면 빈 배열을 반환
//   if (!Array.isArray(data)) {
//     return [];
//   }

//   const rowsWithEmpty = [];
//   data.forEach((item, index) => {
//     rowsWithEmpty.push({});  // 빈 데이터 행 추가
//     rowsWithEmpty.push(item); // 실제 데이터 행 추가
//   });
//   return rowsWithEmpty;
// };

  const addEmptyRows = (data) => {
  
  // 데이터가 배열인지 확인하고, 배열이 아니면 빈 배열을 반환
  if (!Array.isArray(data)) {
    return [];
  }

  const rowsWithEmpty = [];
  data.forEach((item, index) => {
    rowsWithEmpty.push({});  // 빈 데이터 행 추가
    rowsWithEmpty.push(item); // 실제 데이터 행 추가
  });
  return rowsWithEmpty;
};
    const noticesWithEmptyRows = bbsList;



  return (
    <Container>
      <NoticeSearchBox>
        <img src={search} />
        <SearchField type="text" placeholder="검색 할 것을 적어보세요." />
      </NoticeSearchBox>

      <NoticeTableBox>
        <NoticeTabled>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>등록일</th>
              <th>답변</th>




            </tr>
          </thead>

          <tbody>
            {noticesWithEmptyRows.map((response, index) => (
              <tr key={index}>
                

                  
                    <td>{response.id}</td>
                    <Link to={`/onlineCounselDetail/${response.id}`}>
                      <td className="content">{response.title}</td>
                     </Link>
                <td>{response.writerName}</td>
                <td>{response.createDate }</td>

                  
                

                  

                  
                
              </tr>
            ))}
          </tbody>
        </NoticeTabled>
      </NoticeTableBox>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width:100%
  max-width: 1920px;
`;

//  검색 박스
const NoticeSearchBox = styled.div`
  display: flex;
  width: 1280px;
  height: 90px;
  justify-content: center;
  position: relative;
  img {
    position: absolute;
    left: 180px;
    top: 35px;
    width: 30px;
    height: 30px;
  }
  input {
    padding-left: 50px;
    padding-bottom: 10px;
  }
  input:focus {
    outline: none;
  }
`;

//  검색 필드 스타일
const SearchField = styled.input`
  margin-top: 25px;
  width: 920px;
  height: 55px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-weight: regular;
  font-size: 36px;
  font-family: "Noto Sans KR", serif;
`;

//  공지사항 테이블 박스
const NoticeTableBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding-left: 140px;
  padding-right: 140px;
`;

//  공지사항 테이블
const NoticeTabled = styled.table`
  width: 100%;
  
    border-collapse: separate;
   border-spacing: 20px 20px 10px 0px;

  

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  thead th {
    padding: 10px;
    font-weight: medium;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
  }

  tbody tr {


      background-color: #f4f4f4;
      border-bottom: 1px solid #111111;
      height: 70px;

    width: 1280px;
}
  
  tbody td {
    padding: 10px;
    font-weight: regular;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
    vertical-align: middle;
  
  &:nth-of-type(1) {  /* 첫 번째 <td> */
    width: 80px;
    text-align: center;
  }

  &:nth-of-type(2) {  /* 두 번째 <td> */
    width: 920px;
    text-align: center;
  }

  &:nth-of-type(3) {  /* 세 번째 <td> */
    width: 180px;
    text-align: center;
  }

  &:nth-of-type(4) {  /* 네 번째 <td> */
    width: 100px;
    text-align: center;
  }
`;

export default OnlineCounselTable;
