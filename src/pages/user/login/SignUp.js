import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import logo_b from "../../../assets/imgs/logo_b.png";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [forms, setForms] = useState([
    { id: Date.now(), petName: "", breed: "", age: "" },
  ]);
  const [hasPet, setHasPet] = useState(false); // 반려동물 유무 상태 추가

  const addForm = () => {
    setHasPet(true);
    setForms([
      ...forms,
      { id: Date.now(), petName: "", breed: "", age: "" }, // breed 값을 빈 문자열로 초기화
    ]);
  };
  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const handlePetInfoChange = (e, id, field) => {
    const value = e.target.value;
    setForms(
      forms.map((form) => (form.id === id ? { ...form, [field]: value } : form))
    );
  };
  // --------------------------------------------------------------------------
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setpasswordCheckError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const handleCodeChange = (e) => {
    const codeValue = e.target.value;
    setCode(codeValue);

    if (codeValue.length < 6) {
      setCodeError("인증 코드는 6자 이상이어야 합니다.");
    } else {
      setCodeError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // 비밀번호 유효성 검사 (예: 길이, 특수 문자 포함 여부 등)
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError("비밀번호는 8자 이상, 숫자를 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handlepasswordCheckdChange = (e) => {
    setpasswordCheck(e.target.value);
    // 비밀번호 확인 값 일치 여부 검사
    if (password !== e.target.value) {
      setpasswordCheckError("비밀번호가 일치하지 않습니다.");
    } else {
      setpasswordCheckError("");
    }
  };

  const handleSendVerificationEmail = async () => {
    if (emailError) {
      return; // 이메일 형식이 잘못되었으면 실행 안 함
    }

    setIsLoading(true); // 로딩 시작

    try {
      // 🔹 1. 이메일 중복 체크
      await axios.get("/api/checkEmail", { params: { email } });

      // 🔹 2. 중복이 아니면 인증 메일 전송
      const sendResponse = await axios.post("/api/email/send", null, {
        params: { receiver: email },
      });

      setMessage(sendResponse.data); // 성공 메시지 표시
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("메일 전송 실패:", error);
        setMessage("메일 전송 실패");
      } else {
        console.log("이미 사용 중인 이메일 주소입니다.");
        alert("이미 사용 중인 이메일 주소입니다.");
        setMessage("이미 사용 중인 이메일 주소입니다.");
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  // ---------------------------------------------------------
  const handleVerifyCode = async () => {
    if (codeError || !code) {
      return; // 코드가 없거나 형식에 오류가 있으면 전송하지 않음
    }

    try {
      const response = await axios.post("/api/email/verify", null, {
        params: { receiver: email, code: code }, // 사용자가 입력한 코드 검증
      });

      if (response.status === 200) {
        setMessage("인증이 완료되었습니다.");
      }
    } catch (error) {
      setMessage("인증 코드 확인 실패");
    }
  };

  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleNickNameCheck = async () => {
    if (!nickName) {
      setNickNameError("닉네임을 입력해주세요.");
    }

    try {
      const response = await axios.get("/api/checkNickName", {
        params: { nickName },
      });

      // 중복되지 않으면 성공 메시지
      if (response.status === 200) {
        setNickNameMessage("사용 가능한 닉네임입니다.");
        setNickNameError("");
      }
    } catch (error) {
      // 중복일 경우 처리
      if (error.response && error.response.status === 400) {
        setNickNameMessage("서버 오류가 발생했습니다.");
        setNickNameError("");
      } else {
        setNickNameMessage("이미 존재하는 닉네임입니다.");
        setNickNameError("닉네임을 다시 입력해주세요.");
      }
    }
  };
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
    setBirth(value);
  };

  const handlePhoneNumChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    setPhoneNum(value);
  };
  const handleSubmit = async () => {
    if (passwordError || passwordCheckError) {
      alert("비밀번호가 유효하지 않습니다.");
    }
    if (
      emailError ||
      codeError ||
      passwordError ||
      passwordCheckError ||
      nickNameError ||
      !email ||
      !password ||
      !passwordCheck ||
      !nickName ||
      !name ||
      !addr ||
      !birth ||
      !phoneNum
    ) {
      let missingFields = [];

      if (!email || emailError) missingFields.push("이메일");
      if (!password || passwordError) missingFields.push("비밀번호");
      if (!passwordCheck || passwordCheckError)
        missingFields.push("비밀번호 확인");
      if (!nickName || nickNameError) missingFields.push("닉네임");
      if (!name) missingFields.push("이름");
      if (!addr) missingFields.push("주소");
      if (!birth) missingFields.push("생년월일");
      if (!phoneNum) missingFields.push("전화번호");

      alert(`${missingFields.join(", ")}을(를) 모두 입력해주세요.`);
    }
    const memberData = {
      email,
      password: password,
      nickName,
      name,
      addr: addr,
      birth,
      phoneNum,
      pets: hasPet
        ? forms.map((form) => ({
            petName: form.petName,
            breed: form.breed,
            age: form.age,
          }))
        : [], // hasPet 상태에 따라 pets 정보 포함 여부 결정
    };

    try {
      const response = await axios.post("/api/register", memberData);
      console.log("회원가입 성공:", response.data); // 성공 로그 추가
      alert("회원가입이 성공적으로 완료되었습니다.");

      // 펫 정보 등록
      if (hasPet) {
        await Promise.all(
          forms.map(async (pet) => {
            await axios.post(`/api/member/${response.data.memberId}/pet`, {
              petName: pet.petName,
              breed: pet.breed,
              age: pet.age,
            });
          })
        );
      }

      navigate("/signIn");
    } catch (error) {
      console.error("회원가입 실패:", error.response); // 오류 로그 수정
      if (error.response && error.response.data) {
        alert("실패"); // 서버에서 받은 오류 메시지 표시
      } else {
        alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const [postcode, setPostcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 우편번호 검색 결과 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소

  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    setPostcode(data.zonecode); // 우편번호 저장
    setAddress(data.address); // 우편번호 검색 결과 주소 저장
    setAddr(data.zonecode + " " + data.address); // addr에 우편번호 + 검색 주소 저장
    setIsOpen(false);
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
    setAddr(postcode + " " + address + " " + e.target.value); // addr 업데이트 (우편번호 + 검색 주소 + 상세 주소)
  };

  return (
    <SignupContainer>
      <LoginBox>
        <LoginTitle>일반 회원가입</LoginTitle>
        <LoginSub>
          회원가입 시 진료예약, 예약조회 등 개인화 서비스를 제공받으실 수
          있습니다.
        </LoginSub>
      </LoginBox>

      <SignupBox>
        <SignupTitle>회원정보 입력</SignupTitle>
        <SignupSub>
          <span className="point">*</span>&nbsp;은 필수 입력 항목입니다.
        </SignupSub>
      </SignupBox>

      {/*회원가입 최종 박스*/}
      <SignupSection>
        {/* 시작*/}
        <MailBox>
          {/*1.아이디*/}
          <Table>
            <tr className="th_title">
              이메일<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={handleEmailChange}
                />
              </td>
            </tr>
            <button
              type="button"
              onClick={handleSendVerificationEmail}
              disabled={emailError}
            >
              중복확인
            </button>
          </Table>

          {/*2.인증*/}
          <Table>
            <tr className="th_title">
              인증코드<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  value={email}
                  onChange={handleCodeChange}
                />
              </td>
            </tr>
            <button type="button" onClick={handleVerifyCode}>
              확인
            </button>
            <tr>
              <td className="idError">
                {(emailError || message) && (
                  <small style={{ color: emailError ? "red" : "green" }}>
                    {emailError || message}
                  </small>
                )}
              </td>
            </tr>
          </Table>

          {/*2.비밀번호*/}
          <Tables>
            <tr className="th_title">
              비밀번호<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호를 입력해주세요 "
                  theme="underLine"
                  maxLength={16}
                />
              </td>
            </tr>
          </Tables>
          <Article>영문, 숫자포힘 8자 이상 입력해주세요.</Article>

          {/* 3.비밀번호 확인 */}
          <Table>
            <tr className="th_title">
              비밀번호 확인<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="password"
                  value={passwordCheck}
                  onChange={handlepasswordCheckdChange}
                  placeholder="비밀번호 확인"
                  theme="underLine"
                  maxLength={16}
                />
              </td>
            </tr>

            <tr>
              <td>
                <td>
                  {(passwordError || passwordCheckError) && (
                    <small style={{ color: "red" }}>
                      {passwordError || passwordCheckError}
                    </small>
                  )}
                </td>
              </td>
            </tr>
          </Table>

          {/* 4.닉네임 */}
          <Table>
            <tr className="th_title">
              닉네임<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                {" "}
                <input
                  type="text"
                  value={nickName}
                  onChange={handleNickNameChange}
                  placeholder="닉네임을 입력하세요"
                />
              </td>
            </tr>

            <td className="idError">
              {nickNameError && (
                <small style={{ color: "red" }}>{nickNameError}</small>
              )}
              {nickNameMessage && (
                <small style={{ color: nickNameError ? "red" : "green" }}>
                  {nickNameMessage}
                </small>
              )}
            </td>

            <tr>
              <button type="button" onClick={handleNickNameCheck}>
                확인
              </button>
            </tr>
          </Table>

          {/* 5.이름*/}
          <Table>
            <tr className="th_title">
              이름<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={email}
                  onChange={handleEmailChange}
                />
              </td>
            </tr>
          </Table>

          {/*6.주소*/}
          <Tabless>
            <tr className="th_title">
              주소<span className="point"></span>
            </tr>
            <tr className="th_form">
              <button type="button" onClick={() => setIsOpen(true)}>
                검색
              </button>

              <td>
                <input
                  type="text"
                  value={address} // 우편번호 검색 결과 주소 표시
                  placeholder="우편번호를 검색하세요"
                  readOnly
                />
              </td>
            </tr>
          </Tabless>

          {/*6-2.상세주소*/}
          <TableBox>
            <tr>
              <td>
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
              </td>
            </tr>
          </TableBox>
          {/*7.생년월일*/}
          <Table>
            <tr className="th_title">
              생년월일<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="text"
                  placeholder="연도-월-일"
                  value={birth}
                  onChange={handleBirthChange}
                />
              </td>
            </tr>
          </Table>

          {/*8.전화번호*/}
          <Table>
            <tr className="th_title">
              전화번호<span className="point">&nbsp;*</span>
            </tr>
            <tr className="th_form">
              <td>
                <input
                  type="text"
                  placeholder="하이픈(-)추가 입력"
                  value={phoneNum}
                  onChange={handlePhoneNumChange}
                />
              </td>
            </tr>
          </Table>
        </MailBox>

        <AnimalBox>
          <table>
            <tr>
              <td>
                {" "}
                <AnimalBoxButton>
                  <button onClick={addForm}>추가</button>
                </AnimalBoxButton>{" "}
              </td>{" "}
            </tr>
          </table>

          {forms.map((form) => (
            <Formtable key={form.id}>
              <tr>
                <td>
                  <AnimalH1>
                    <h1>반려동물정보</h1>
                  </AnimalH1>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="동물이름"
                    value={form.petName}
                    onChange={(e) => handlePetInfoChange(e, form.id, "petName")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    value={form.breed || ""}
                    onChange={(e) => handlePetInfoChange(e, form.id, "breed")}
                  >
                    {" "}
                    <option value="" disabled>
                      선택
                    </option>
                    <option value="DOG">DOG</option>
                    <option value="CAT">CAT</option>
                  </select>
                  <input
                    className="selectInput"
                    type="text"
                    value={form.breed}
                    disabled // input을 disabled 상태로 변경
                    placeholder="종류 (선택)" // placeholder 변경
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="동물나이"
                    value={form.age}
                    onChange={(e) => handlePetInfoChange(e, form.id, "age")}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <AnimalBoxButton>
                    <button danger="true" onClick={() => removeForm(form.id)}>
                      삭제
                    </button>
                  </AnimalBoxButton>{" "}
                </td>{" "}
              </tr>
            </Formtable>
          ))}
        </AnimalBox>
        <SignupSectionE>
          <button type="submit" onClick={handleSubmit}>
            회원가입
          </button>
        </SignupSectionE>
      </SignupSection>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  padding-bottom: 90px;
`;

// 1.로그인 문구_박스
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 60px;
  margin-bottom: 30px;
`;
const LoginTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
  text-align: center;
`;
const LoginSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;

//2.회원가입_하위타이틀_박스
const SignupBox = styled.div`
  width: 900px;
  margin: 0 auto;
  margin-top: 45px;
`;
const SignupTitle = styled.h3`
  height: 43px;
  margin-bottom: 20px;
  font-size: 27px;
  color: #111;
  font-weight: 900;
  text-align: left;
`;
const SignupSub = styled.p`
  height: 14px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #888;
  font-weight: 300;
  text-align: right;

  .point {
    color: #ff27a3;
  }
`;

//3 회원가입 최종 박스
const SignupSection = styled.div`
  width: 900px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 45px 20px 20px 20px;
  border-top: 1.5px solid #000;
  border-bottom: 1.5px solid #eeeeee;
`;

const Article = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #888;
  max-width: 477px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  text-indent: 20px;
  height: 20px;
  margin-bottom: 35px;
`;

const Table = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 30px;

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

//비밀번호 확인~
const Tables = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: left;

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

//상세주소 (TableBox)
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

const MailBox = styled.div`
  width: 900px;
  //display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 20px 20px;

  .th_title {
    font-size: 14px;
    font-weight: 600;
    color: #111;
  }
  .point {
    color: #ff27a3;
  }
  td {
    position: relative;
  }

  //인풋
  input {
    width: 477px;
    height: 54px;
    padding: 0 32px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    outline: none;
    font-size: 14.2px;
    color: #111;
    font-weight: 400;
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
    font-size: 16px;
    font-weight: 600;

    &:hover {
      background-color: #0d326f;
      border: 1px solid #0d326f;
      color: #fff;
    }
  }

  .idError {
    display: none;
    //padding-top: 8px;
    //width: 460px;
    //height: 20px;
  }
  small {
    padding-left: 10px;
    font-size: 12px;
    color: #ff27a3;
  }
`;

//주소 검색(버튼 왼쪽(Tabless)
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
    font-size: 16px;
    font-weight: 600;
    float: left; 
    margin-right: 10px;
    
    &:hover{
      background-color: #0D326F;
      border: 1px solid #0D326F;
      color: #fff;
    }
`;

// ------------------------------------------------------------------------
const OtherBox = styled.div`
  width: 900px;
  //display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 20px 20px;

  .th_title {
    font-size: 14px;
    font-weight: 600;
    color: #111;
  }
  .point {
    color: #ff27a3;
  }
  td {
    position: relative;
  }

  //인풋
  input {
    width: 477px;
    height: 54px;
    padding: 0 32px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    outline: none;
    font-size: 14.2px;
    color: #111;
    font-weight: 400;
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
    font-size: 16px;
    font-weight: 600;

    &:hover {
      background-color: #0d326f;
      border: 1px solid #0d326f;
      color: #fff;
    }
  }

  .idError {
    display: none;
    //padding-top: 8px;
    //width: 460px;
    //height: 20px;
  }
  small {
    padding-left: 10px;
    font-size: 12px;
    color: #ff27a3;
  }
`;
// -----------------------------------------------------------------
const AnimalBox = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  justify-content: center;

  select {
    position: relative;
    left: 420px;
    top: 0px;
    z-index: 1;
    width: 70px;
    height: 26px;
  }

  .selectInput {
    position: relative;
    left: -35px;
  }
`;

const AnimalBoxButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  button {
    font-size: 18px;
    background-color: #ffffff;
    padding: 10px 20px;
    border: 1px solid #ccc;
    cursor: pointer;
    margin: 5px;
  }
`;

const AnimalH1 = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 28px;
    font-weight: 700;
  }
`;

const Formtable = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 10px auto;
  border-collapse: collapse;

  td {
    padding: 2px;
    text-align: center;
    vertical-align: middle;
  }

  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    width: 100%;
    max-width: 460px;
    height: 60px;
    border: none;
    font-size: 16px;
    padding-left: 20px;
  }
`;

// ----------------------------------------------------------
const SignupSectionE = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
  button {
    font-size: 20px;
    font-weight: 700;
    width: 460px;
    height: 60px;
    background-color: #111111;
    color: #fff;
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

// const SignupContainer = styled.div`
//   width: 1920px;
//   height: 100%;
//   min-height: 1340px;
//   width: 100%;
//   max-width: 1920px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SignupSection = styled.div`
//   margin: auto;
//   align-items: center;
//   margin-top: 130px;
//   padding-top: 30px;
//   width: 600px;
//   min-height: 1074px;
//   background-color: #f4f4f4;
//   margin-bottom: 100px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// `;
// // -------------------------------------------------------------------
// const SignupLogo = styled.div`
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   width: 600px;
//   height: 40px;
//   background-color: #f4f4f4;
//   margin-bottom: 30px;
//   img {
//     width: 145px;
//     height: 35px;
//   }
// `;

// const SignupTitle = styled.div`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   width: 600px;
//   height: 40px;
//   margin-bottom: 30px;
//   h1 {
//     font-size: 36px;
//     color: #111111;
//     font-weight: bold;
//   }
// `;

// // -----------------------------------------------------------------
// const MailBox = styled.div`
//   width: 600px;

//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-family: "Noto Sans KR", serif;
//     outline: none;
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
//   .idError {
//     padding-top: 8px;
//     width: 460px;
//     height: 20px;
//   }
//   small {
//     padding-left: 10px;
//     font-size: 12px;
//   }
// `;
// // ------------------------------------------------------------------------
// const PwBox = styled.div`
//   width: 600px;

//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-family: "Noto Sans KR", serif;
//     outline: none;
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
//   .idError {
//     padding-top: 8px;
//     width: 460px;
//     height: 20px;
//   }
//   small {
//     padding-left: 10px;
//     font-size: 12px;
//   }
// `;
// // ------------------------------------------------------------------------

// const NickBox = styled.div`
//   width: 600px;
//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-family: "Noto Sans KR", serif;
//     outline: none;
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
//   .idError {
//     padding-top: 8px;
//     width: 460px;
//     height: 20px;
//   }
//   small {
//     padding-left: 10px;
//     font-size: 12px;
//   }
// `;
// // ------------------------------------------------------------------------
// const OtherBox = styled.div`
//   width: 600px;
//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-family: "Noto Sans KR", serif;
//     outline: none;
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
// `;
// // -----------------------------------------------------------------
// const AnimalBox = styled.div`
//   width: 100%;
//   max-width: 600px;
//   background-color: #f4f4f4;

//   display: flex;
//   flex-direction: column; /* 세로 정렬 */
//   align-items: center;
//   justify-content: center;

//   select {
//     position: relative;
//     left: 420px;
//     top: 0px;
//     z-index: 1;
//     width: 70px;
//     height: 26px;
//   }

//   .selectInput {
//     position: relative;
//     left: -35px;
//   }
// `;

// const AnimalBoxButton = styled.div`
//   background-color: #f4f4f4;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   button {
//     font-size: 18px;
//     background-color: #ffffff;
//     padding: 10px 20px;
//     border: 1px solid #ccc;
//     cursor: pointer;
//     margin: 5px;
//   }
// `;

// const AnimalH1 = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   h1 {
//     font-size: 28px;
//     font-weight: 700;
//   }
// `;

// const Formtable = styled.table`
//   width: 100%;
//   max-width: 800px;
//   background-color: #f4f4f4;
//   margin: 10px auto;
//   border-collapse: collapse;

//   td {
//     padding: 2px;
//     text-align: center;
//     vertical-align: middle;
//   }

//   input {
//     font-family: "Noto Sans KR", serif;
//     outline: none;
//     width: 100%;
//     max-width: 460px;
//     height: 60px;
//     border: none;
//     font-size: 16px;
//     padding-left: 20px;
//   }
// `;

// // ----------------------------------------------------------
// const SignupSectionE = styled.div`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   width: 600px;
//   height: 60px;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   button {
//     font-size: 20px;
//     font-weight: 700;
//     width: 460px;
//     height: 60px;
//     background-color: #111111;
//     color: #fff;
//   }
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
// `;

// const Overlay = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
// `;

// const PostcodeWrapper = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   position: relative;
// `;

export default SignUp;
