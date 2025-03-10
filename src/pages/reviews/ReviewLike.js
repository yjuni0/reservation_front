import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ReviewLike() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();
  const { reviewId } = useParams(); // 리뷰 ID 가져오기
  const [isOff, setIsOff] = useState(false); // 좋아요 상태 관리

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

  // 좋아요 상태를 서버에 저장하는 함수
  const reviewLike = async () => {
    if (!auth) {
      alert("로그인 후 사용 가능합니다.");
      return;
    }
  

    const req = {
        reviewId,   // 리뷰 ID
        // memberId,   // 로그인된 사용자의 ID
      };

    try {
      const response = await axios
      .post(`/member/review/${reviewId}/like/toggle`, req, { headers:headers });

      // 서버 응답에 따라 좋아요 상태 업데이트
      if (response.status === 200) {
        setIsOff(!isOff); // 상태를 반전시켜 좋아요/비활성화 버튼 전환
      }
    } catch (error) {
      console.error("Error occurred while toggling like:", error);
    }
  };

  // 초기 상태 로딩: 이미 좋아요가 눌려있는지 확인하는 코드 (예시)
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await axios.get(`/member/review/${reviewId}/like/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setIsOff(response.data.isLiked); // 서버에서 받은 좋아요 상태 설정
      } catch (error) {
        console.error("Error loading like status:", error);
      }
    };

    checkLikeStatus(); // 컴포넌트가 마운트 될 때 좋아요 상태 확인
  }, [reviewId]);

  return (
    <button type="button" onClick={reviewLike}>
      {isOff ? "ON" : "OFF"}
    </button>
  );
}

export default ReviewLike;
