import React, { useContext, useEffect, useState } from "react";
import { AuthContext, HttpHeadersContext } from "../../../context";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function ReservationDetail () {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const [reserveDetail, setReserveDetail] = useState({});
    const {reservationId} = useParams();
    
    
    


    const getReserveDetail = async () => {
        try{
            const response = await axios
            .get(`/api/member/reservation/${reservationId}`, {headers:headers});
            console.log("예약 상세", response);
            setReserveDetail(response.data);
            console.log("예약상세데이터", reserveDetail);

        }catch(error){
            console.log("예약 상세 실패", error);
        }
    };
  useEffect(()=> {
    getReserveDetail();

  }, [date]);


  

  const deleteReserve = async () => {
    try{
        const response = await axios
        .delete(`/api/member/reservation/${reservationId}`, {headers:headers});
        console.log("예약 삭제 완료");
        if (response.status == 200) {
            alert("예약이 삭제되었습니다.")
            navigate("/mypage/ReservationCheck")
        }
    }catch (error) {
        console.log("예약 삭제 실패", error);
    }
  };

  if (!reserveDetail || !reserveDetail.createdDate) {
    return <p>로딩 중...</p>;
  }
  const [date] = reserveDetail.createdDate.split("T");

    return(
        <Container>
             <DetailTitle>예약 상세 정보</DetailTitle>
            <DetailTable>


 
                <tbody>
                    <tr>
                        <th>진료과목</th>
                        <td>{reserveDetail.departmentName}</td>
                    </tr>  
                    <tr>
                        <th>예약날짜</th>
                        <td>{reserveDetail.availableDate}</td>
                    </tr>
                    <tr>
                        <th>예약시간</th>
                        <td>{reserveDetail.slotTime}</td>
                    </tr>
                    <tr>
                        <th>반려동물이름</th>
                        <td>{reserveDetail.petName}</td>
                    </tr>                                                                              
                    <tr>
                        <th>예약자</th>
                        <td>{reserveDetail.memberName}</td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{date}</td>
                    </tr>
                </tbody>
            </DetailTable>
            <DeleteButton
                onClick={deleteReserve}
            >
                삭제
            </DeleteButton>
            
        </Container>
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
const DetailTable = styled.table`
    width: 100%;
    max-width: 1000px;
     text-align: center;



`

const DetailTitle = styled.h1`
    text-align: center;
`
const DeleteButton = styled.button`
    margin-top:100px;
    border: 1px solid, #111111;
`

export default ReservationDetail;