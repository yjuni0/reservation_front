import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../../assets/imgs/header_search.svg";





function CommnonSearch () {

    return(
        <SearchBox>
            
        <input type="search" placeholder="검색어를 입력해주세요."></input>
        <Link to="/">
        <img src={searchIcon} />
       
      </Link>
    </SearchBox>
    );
}
const SearchBox = styled.button`
  //right: 5px;
  top: 20px;
  float: right;
  //width: 190px;
  //height: 25px;
  //background-color: transparent;
  border: none;
  font-size: 12px;
  cursor: pointer;
  position: relative;

  width: 260px;
  height: 30px;
  border-radius: 15px 13px;

  outline: none;
  input {
    //height: 25px;
    //width: 190px;
    //border: none;
    //border-bottom: 1px solid rgba(0,0,0,0.2);
    //padding-bottom: 2px;

    font-size: 13px;
    font-weight: 300;
    border: none;
    background: rgb(255, 255, 255);
    width: 260px;
    height: 30px;
    border-radius: 15px 13px;
    outline: none;
    text-align: end;
  }
  input:focus {
    outline: none;
  }
  img {
    bottom: 5px;
    left: 0px;
    padding-left: 10px;
    position: absolute;
  }
`;
export default CommnonSearch;