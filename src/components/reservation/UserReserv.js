import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";





function UserReserv() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPet, setSelectedPet] = useState([]);
  

  
  useEffect(() => {
  console.log("selectedTime:", selectedTime);
}, [selectedTime]);  // selectedTime 상태를 추적

useEffect(() => {
  console.log("타임슬롯 데이터:", timeSlots);  // 타임슬롯 데이터 확인
}, [timeSlots]);




  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const formattedDate = selectedDate.toISOString().split("T")[0];

      axios
        .get(`/api/slot?departmentName=${selectedDepartment}&date=${formattedDate}`)
        .then((response) => {
          console.log(response.data);
          setTimeSlots(response.data);
        })
        .catch((error) => {
          console.error("타임슬롯 데이터를 불러오는 중 오류 발생:", error);
          setTimeSlots([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate, selectedDepartment]);

  return (
    <Container>
      <Title>회원 예약</Title>

      <DepartmentWrapper>
        {["안과", "내과", "외과", "치과", "정형외과"].map((dept) => (
          <DepartmentButton
            key={dept}
            active={selectedDepartment === dept}
            onClick={() => setSelectedDepartment(dept)}
          >
            {dept}
          </DepartmentButton>
        ))}
      </DepartmentWrapper>

      <CalendarBox>
        <StyledCalendar
          onChange={setSelectedDate}
          value={selectedDate}
          calendarType="gregory"
          view="month"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
          locale="ko"
        />
      </CalendarBox>

      {selectedDate && (
        <TimeBox>
          {loading ? (
            <p>예약 시간을 불러오는 중...</p>
          ) : timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
              
                <TimeButton
                  key={index}
                  disabled={!slot.isAvailable}
                  active={selectedTime === slot.slotTime}
                  onClick={() => setSelectedTime(slot.slotTime)}
                >
                {slot.slotTime.slice(0, 5)}
              </TimeButton>
            ))
          ) : (
            <p>예약 가능한 시간이 없습니다.</p>
          )}

        </TimeBox>

        
      )}

      <AnimalInfoBox

      >
        <p className="title"><strong>반려동물 정보</strong></p>
        <p className="content">구름이</p>
        <p className="content">7세</p>
        <p className="content">고양이</p>
        <p className="content">5.2kg</p>
      </AnimalInfoBox>

      <ReserveBtn>예약하기</ReserveBtn>
    </Container>
  );
}

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 제목 스타일
const Title = styled.h1`
  margin-top: 100px;
  margin-bottom: 50px;
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR", serif;
  
  
`;

// 진료과목 버튼 그룹
const DepartmentWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 50px;
  
`;

const DepartmentButton = styled.button`
  width:120px;
  padding: 10px 20px;
  border: 1px solid #111;
  background-color: ${(props) => (props.active ? "#000" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

// 캘린더 박스
const CalendarBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

`;

// 캘린더 스타일
const StyledCalendar = styled(Calendar)`
  border: none;
  width: 500px; /* 변경된 가로 크기 */
  height: 350px; /* 변경된 세로 크기 */
  font-size: 20px;
  font-family: "Noto Sans KR", serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;


// 타임 슬롯 박스
// 타임 슬롯 박스
const TimeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px;
  max-width: 500px;
  margin: 20px 0;
  margin-left:30px;
`;

// 타임 슬롯 버튼
const TimeButton = styled.button`
  padding: 10px;
  width: 110px; /* 버튼 크기 변경 */
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#fff")};
  color: ${(props) => (props.disabled ? "#111" : "#111")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) => (props.active ? "#000" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};  
  font-size: 20px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#111111")};
    color: ${(props) => (props.disabled ? "#111111" : "#fff")};
  }
`;


// 반려동물 정보 박스
const AnimalInfoBox = styled.button`
  border: 1px solid #f4f4f4;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 40px;
  border-color: ${(props) => (props.active ? "#111111" : "#fff")};
 
  font-family: "Noto Sans KR", serif;
  .title{
    font-size:20px;
    font-weight:400;

  }
  .content{
    font-size:16px;
    font-weight:300;
    
  }  
  
  
`;

const ReserveBtn = styled.button`
  width:200px;
  height:100px;
  margin-bottom: 100px;
  background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#fff")};
  color: ${(props) => (props.disabled ? "#111" : "#111")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 20px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#111111")};
    color: ${(props) => (props.disabled ? "#111111" : "#fff")};
  }
  border:1px solid #111111;
  border-radius:5px;
  margin-top: 20px;

  
`

export default UserReserv;
