import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";

function Comment(props) {
  const comment = props.comment;
  const commentId = props.comment.id;
  const page = props.page;
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const deleteComment = async () => {
    await axios
      .delete(
        `/api/member/comment/${commentId}`,
        { headers: headers }
      )
      .then((resp) => {
        console.log("[BbsComment.js] deleteComment() success :D");
        console.log(resp.data);

        alert("답글을 성공적으로 삭제했습니다 :D");
        //삭제된 댓글 목록 다시 불러오기
        props.getCommentList(page);
      })
      .catch((err) => {
        console.log("[BbsComment.js] deleteComment() error :<");
        console.log(err);
      });
  };


  return (
    <Container>
      <CommentBox>
        <Table>
          <tbody>
            <tr>
              <Td>{comment.nickName}</Td>
            </tr>
            <tr>
              <Td>{comment.content}</Td>
            </tr>
            <tr>
              <Td>{comment.createdDate}</Td>
            </tr>
          </tbody>
        </Table>

        <BtnBox>
          <Btn onClick={deleteComment}>삭제</Btn>
        </BtnBox>
      </CommentBox>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const Table = styled.table`
  width: 100%;
`;

const Td = styled.td`
  padding: 5px;
  font-size: 14px;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  width: 50px;
  height: 30px;
  border: 1px solid #111111;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export default Comment;
