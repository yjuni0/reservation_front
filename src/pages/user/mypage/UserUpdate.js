import React, { useContext, useState } from "react";
import styled from "styled-components";
import AnimalProfile from "./AnimalProfile";
import { useLocation } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { AuthContext, HttpHeadersContext } from "../../../context";
import axios from "axios";

function UserUpdate() {
    const { headers, setHeaders } = useContext(HttpHeadersContext);



  const location = useLocation();
  const userData = location.state?.userData;
  console.log("회원 정보",userData);

  const [petData, setPetData] = useState(userData.pets);
  console.log("펫 정보" , petData);
  const memberId = userData.id;

  const [addr, setAddr] = useState("");
  const [nickName, setNickName] = useState(userData.nickName)
  const [phone, setPhone] = useState(userData.phoneNum)

  const changeNickName = (event) => {
    setNickName(event.target.value);
  }
  const changePhoneNum = (event) => {
    setPhone(event.target.value);
  }
// 🔹 정규식을 사용해 기본 주소와 상세 주소 분리
const match = userData.addr.match(/^(\d{5}\s[^\d]+[\d-]+)\s(.+)$/);
const baseAddr = match ? match[1] : userData.addr; // 기본 주소
const detailAddr = match ? match[2] : ""; // 상세 주소

// 🔹 초기 상태 설정 (정규식으로 분리한 값 적용)
const [postcode, setPostcode] = useState(baseAddr.split(" ")[0]); // 우편번호
const [address, setAddress] = useState(baseAddr); // 기본 주소
const [detailAddress, setDetailAddress] = useState(detailAddr); // 상세 주소

const [isOpen, setIsOpen] = useState(false);


// 🔹 주소 검색 완료 시 실행되는 함수
const handleComplete = (data) => {
  const newBaseAddr = data.zonecode + " " + data.address; // 새 기본 주소 설정
  setPostcode(data.zonecode);
  setAddress(newBaseAddr);
  setIsOpen(false);
  setAddr(newBaseAddr + " " + detailAddress); 
};

// 🔹 상세 주소 입력 변경 시 전체 주소 업데이트
const handleDetailAddressChange = (e) => {
  setDetailAddress(e.target.value);
  setAddr(address + " " + e.target.value); // 전체 주소 업데이트
};

const handlePetDataChange = (updatedPetData) => {
  setPetData(updatedPetData); // 반려동물 데이터 업데이트
};
const handleUpdate = ()=>{
  userUpdate();
  petUpdate();
}

  const userUpdate = async()=>{
    try{
      const token = localStorage.getItem("access_token");
      if(!token){
        console.error("토큰이 없음 로그인 확인");
        return;
      }
      const fullAddr = address + " " + detailAddress;  // 기본 주소 + 상세 주소
      const req = {
        nickName,
        addr : fullAddr,
        phone,

      }
      console.log("보내는 데이터" , req);
      await axios.patch(
        `/api/${memberId}`,
        req,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

    }catch (error) {
      console.error("회원정보 업데이트 에러" , error)
    }
  };
  
//펫정보 업데이트
  const petUpdate = async()=>{
    try{
      const token = localStorage.getItem("access_token");
      if(!token){
        console.error("토큰이 없음 로그인 확인");
        return;
      }

      const req = petData.map(pet => ({
        id: pet.id,       // 기존 pet ID 유지 (없으면 추가)
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        memberId: memberId, // ✅ 어떤 회원의 반려동물인지 명확히 전달
      }));
      console.log("보내는 데이터" , req);
      await axios
      .patch(`/api/pet`, req, {headers: {Authorization: `Bearer ${token}`}}
      );

    }catch (error) {
      console.error("회원정보 업데이트 에러" , error)
    }
  };
  
  return (
    <UserUpdateContainer>
      <UserUpdateUserBox>
        <UserUpdateUserTable>
          <thead>
            <tr>
              <TableHeader colSpan="3">회원 정보</TableHeader>
            </tr>
          </thead>
          <tbody>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableData>{userData.name}</TableData>
          </TableRow>
          <TableRow>
            <TableHead>생년월일</TableHead>
            <TableData>{userData.birth}</TableData>
          </TableRow>
            
          <TableRow>
            <TableHead>이메일</TableHead>
            <TableData>{userData.email}</TableData>
          </TableRow>          
          <TableRow>
            <TableHead>닉네임</TableHead>
            <TableData><input value={nickName} onChange={changeNickName} ></input></TableData>
          </TableRow>

          <TableRow className="th_title">
            <TableHead>
              주소
            </TableHead>
            <TableData>
              <AddrBtn type="button" onClick={() => setIsOpen(true)}>
                검색
              </AddrBtn>
              <input
                  type="text"
                  value={address} // 우편번호 검색 결과 주소 표
                  readOnly
              />
            </TableData>
          </TableRow>
          
          <TableRow>
            <TableHead>상세주소</TableHead>
            <TableData>
              <input
                className="address"
                type="text"
                value={detailAddress} // 상세 주소 표시 및 변경 가능
                onChange={handleDetailAddressChange} // 상세 주소 변경 시 addr 업데이트
                placeholder="상세주소를 입력하세요"
              />
              {isOpen && (
                <Modal>
                  <Overlay onClick={() => setIsOpen(false)} />
                  <PostcodeWrapper>
                    <DaumPostcode onComplete={handleComplete} />
                  </PostcodeWrapper>
                </Modal>
              )}
            </TableData>
          </TableRow>

          <TableRow>
            <TableHead>휴대폰번호</TableHead>
            <TableData><input value={phone} onChange={changePhoneNum} ></input></TableData>
          </TableRow>
          <TableRow>
          </TableRow>
        </tbody>
        </UserUpdateUserTable>
      </UserUpdateUserBox>

      <UserUpdateAnimalBox>
        <AnimalProfile petData={petData} onPetDataChange={handlePetDataChange} />
      </UserUpdateAnimalBox>

      <UserUpdateButtonBox>
        <SubmitButton onClick={handleUpdate}>수정</SubmitButton>
        <CancelButton>취소</CancelButton>
      </UserUpdateButtonBox>
    </UserUpdateContainer>
  );
}

const userFields = [
  { label: "이름", type: "text" },
  { label: "이메일", type: "text" },
  { label: "비밀번호", type: "password" },
  { label: "비밀번호 확인", type: "password" },
  { label: "닉네임", type: "text", button: "중복 확인" },
  { label: "주소", type: "text", button: "검색" },
  { label: "상세 주소", type: "text" },
  { label: "생년월일", type: "date" },
  { label: "핸드폰 번호", type: "text" },
];

const UserUpdateContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "Noto Sans KR", serif;
`;

const UserUpdateUserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const UserUpdateUserTable = styled.table`
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  font-size: 20px;
  padding: 12px;
  text-align: center;
  background-color: #111111;
  color: #ffffff;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ffffff;
  }
`;

const TableHead = styled.th`
  font-size: 16px;
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  width: 30%;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  background-color: #f4f4f4;
  color: #111111;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: medium;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #111111;
    color: #ffffff;
  }
`;

const UserUpdateAnimalBox = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const UserUpdateButtonBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #111111;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #111111;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #111111;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #111111;
  }
`;
const Tabless = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 15px;
  
  .th_title{
    min-width: 92px;
    font-size: 14px;
    color: #111;
    margin-right: 40px;
  }

  .th_form{
   margin-right: 20px;
  }

  //버튼
  button {
    width: 144px;
    height: 54px;
    background-color: transparent;
    border: 1px solid #000;
    border-radius: 5px;
    max-width: 16rem;
    color: #111;
    font-size: 14.2px;
    font-weight: 600;
    float: left; 
    margin-right: 10px;
    
    &:hover{
      background-color: #0D326F;
      border: 1px solid #0D326F;
      color: #fff;
    }
`;
const TableBox = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 135px;
  margin-bottom: 35px;

  //인풋
  .address {
    width: 630px;
    height: 53px;
    padding: 0 32px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    outline: none;
    font-size: 14.2px;
    color: #111;
    font-weight: 400;
  }

  .th_title {
    min-width: 92px;
    font-size: 14px;
    color: #111;
    margin-right: 40px;
  }

  .th_form {
    margin-right: 20px;
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const PostcodeWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;
const AddrBtn = styled.button`
     width: 50px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #000;
    border-radius: 5px;
    max-width: 16rem;
    color: #111;
    font-size: 14.2px;
    font-weight: 600;
    float: left; 
    margin-right: 10px;
    
    &:hover{
      background-color: #0D326F;
      border: 1px solid #0D326F;
      color: #fff;
    }
`


export default UserUpdate;
