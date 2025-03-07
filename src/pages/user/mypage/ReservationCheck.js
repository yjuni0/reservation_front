import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CustomPagination from "../../../components/common/CustomPagination";
import { AuthContext, HttpHeadersContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";

function ReservationCheck() {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const [reserveList, setReserveList] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [totalCnt, setTotalCnt] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    



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



  const getReserveList = async()=>{
    try {
      const response = await axios.get("/api/member/reservation", {params:{page:page -1}, headers: headers } );
      console.log("예약 리스트", response.data);
      setReserveList(response.data.content);
      setPageSize(response.data.pageSize || 8);
      setTotalCnt(response.data.totalElements);
      setTotalPages(response.data.totalPages);
  

      
    }catch(error){
      console.error("예약 리스트 불러오시 실패", error);
    }
  };
  useEffect(()=> {
    getReserveList();

  }, [page]);

// const [date, time] = reserveList.reservationDateTime.slice("T");

console.log("예약정보",reserveList);

  return (
    <ReservCheckContainer>
      <ReservCheckTableBox>
        <ReservCheckTable>
          <thead>
            <TableRow>
              <TableHeader>예약번호</TableHeader>  
              <TableHeader>닉네임</TableHeader>
              <TableHeader>날짜</TableHeader>
              <TableHeader>시간</TableHeader>
            </TableRow>
          </thead>
          <tbody>              
          
          {reserveList.map((response) => {
            const [date, time] = response.reservationDateTime.split("T");
            return (
              <tr key={response.id}>
                <td>{response.id}</td>
                <td>
                  <Link to={`/mypage/ReservationDetail/${response.id}`} >
                  {response.nickName}
                  </Link>
                </td>
                <td>{date}</td>
                <td>{time.slice(0, 5)}</td> {/* HH:mm 형식으로 시간만 출력 */}
              </tr>
            );
          })}
         </tbody>
          
        </ReservCheckTable>
      </ReservCheckTableBox>

       <PaginationBox>
          <CustomPagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalCnt={totalCnt}
            totalPages={totalPages}
          />
        </PaginationBox> 
    </ReservCheckContainer>
  );
}

const ReservCheckContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReservCheckTableBox = styled.div`
  width: 100%;
  max-width: 1000px;
  overflow-x: auto; /* 테이블이 너무 길어질 경우 스크롤 */
`;

const ReservCheckTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableHeader = styled.th`
  background-color: #111111;
  color: white;
  font-size: 16px;
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
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

export default ReservationCheck;
