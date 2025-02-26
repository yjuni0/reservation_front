import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Header from "./components/common/Header.js";
import Home from "./components/common/Home";

import Introduce from "./components/introduce/Introduce.js";
import Directions from "./components/introduce/Directions.js";
import Department from "./components/introduce/Department.js";

import Notice from "./components/board/notice/Notice.js";

import UserReserv from "./components/reservation/UserReserv.js";
import NonUserReserve from "./components/reservation/NonUserReserve.js";

import OnlineCounsel from "./components/board/onlinecounsel/OnlineCounsel.js";
import OnlineCounselWrite from "./components/board/onlinecounsel/OnlineCounselWrite.js";
import OnlineCounselUpdate from "./components/board/onlinecounsel/OnlineCounselUpdate.js";
import OnlineCounselDetail from "./components/board/onlinecounsel/OnlineCounselDetail.js";

import Review from "./components/board/review/Review.js";
import ReviewUpdate from "./components/board/review/ReviewUpdate.js"
import ReviewWrite from "./components/board/review/ReviewWrite.js";


import SignIn from "./components/user/login/SignIn.js";
import SignUp from "./components/user/login/SignUp.js";
import FindId from "./components/user/login/FindId.js";
import FindPw from "./components/user/login/FindPw.js";

import MyPage from "./components/user/mypage/MyPage.js";

import AdminHome from "./components/admin/AdminHome.js";
import Footer from "./components/common/Footer.js";

import NoticeUpdate from "./components/board/notice/NoticeUpdate.js"
import NoticeWrite from "./components/board/notice/NoticeWrite.js";
import NoticeDetail from "./components/board/notice/NoticeDetail.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/directions" element={<Directions />} />
        <Route path="/department" element={<Department />} />
        <Route path="/notice" element={<Notice />}></Route>

        <Route path="/noticeUpdate" element={<NoticeUpdate />}></Route>
        <Route path="/noticeWrite" element={<NoticeWrite />}></Route>
        <Route path="/noticedetail/:noticeId" element={<NoticeDetail />}></Route>

        <Route path="/userreserv" element={<UserReserv />}></Route>
        <Route path="/nonuserreserve" element={<NonUserReserve />}></Route>
        <Route path="/onlineCounsel" element={<OnlineCounsel />}></Route>
        <Route
          path="/onlineCounselWrite"
          element={<OnlineCounselWrite />}
        ></Route>
        <Route
          path="/onlienCounselUpdate"
          element={<OnlineCounselUpdate />}
        ></Route>
         <Route
          path="/onlineCounselDetail"
          element={<OnlineCounselDetail />}
        ></Route>


        <Route path="/review" element={<Review />}></Route>

        <Route path="/reviewUpdate" element={<ReviewUpdate />}></Route>
        <Route path="/reviewWrite" element={<ReviewWrite />}></Route>

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/adminhome" element={<AdminHome />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};
export default Router;
