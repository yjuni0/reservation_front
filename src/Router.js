import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// 메인
import Home from "./components/common/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Introduce from "./pages/introduce/Introduce";
import Directions from "./pages/introduce/Directions";
import Department from "./pages/introduce/Department";

import UserReserv from "./pages/reservation/UserReserv";
import NonUserReserve from "./pages/reservation/NonUserReserve";

import SignIn from "./pages/user/login/SignIn";
import SignUp from "./pages/user/login/SignUp";
import FindId from "./pages/user/login/FindId";
import FindPw from "./pages/user/login/FindPw";

import AdminHome from "./pages/admin/AdminHome";

// 공지사항
import NoticeLayout from "./pages/notice/NoticeLayout";
import Notice from "./pages/notice/Notice";
import NoticeWrite from "./pages/notice/NoticeWrite";
import NoticeDetail from "./pages/notice/NoticeDetail";
import NoticeUpdate from "./pages/notice/NoticeUpdate";

// 온라인 상담
import OnlineCounselLayout from "./pages/onlinecounsel/OnlineCounselLayout";
import OnlineCounsel from "./pages/onlinecounsel/OnlineCounsel";
import OnlineCounselWrite from "./pages/onlinecounsel/OnlineCounselWrite";
import OnlineCounselDetail from "./pages/onlinecounsel/OnlineCounselDetail";
import OnlineCounselUpdate from "./pages/onlinecounsel/OnlineCounselUpdate";

// 후기
import ReviewLayout from "./pages/reviews/ReviewLayout";
import Review from "./pages/reviews/Review";
import ReviewWrite from "./pages/reviews/ReviewWrite";
import ReviewDetail from "./pages/reviews/ReviewDetail";
import ReviewUpdate from "./pages/reviews/ReviewUpdate";
import AdminUserList from "./pages/admin/user/AdminUserList";
import AdminReservationList from "./pages/admin/reservation/AdminReservationList";

import MyPage from "./pages/user/mypage/MyPage";
import UserProfile from "./pages/user/mypage/UserProfile";
import UserUpdate from "./pages/user/mypage/UserUpdate";
import ReservationCheck from "./pages/user/mypage/ReservationCheck";

// admin
import AdminRouter from "./components/AdminRouter";
import Oauth2 from "./pages/user/login/oauth2";
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/oauth2" element={<Oauth2 />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypage/UserProfile" element={<UserProfile />}></Route>
        <Route path="/mypage/UserUpdate" element={<UserUpdate />}></Route>
        <Route
          path="/mypage/ReservationCheck"
          element={<ReservationCheck />}
        ></Route>
        <Route path="/" element={<Home />} />
        <Route path="introduce" element={<Introduce />} />
        <Route path="directions" element={<Directions />} />
        <Route path="department" element={<Department />} />

        <Route path="/userreserv" element={<UserReserv />}></Route>
        <Route path="/nonuserreserve" element={<NonUserReserve />}></Route>

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />

        <Route path="notice" element={<NoticeLayout />}>
          <Route index element={<Notice />} />
          <Route path="write" element={<NoticeWrite />} />
          <Route path=":noticeId" element={<NoticeDetail />} />
          <Route path=":noticeId/update" element={<NoticeUpdate />} />
        </Route>

        <Route path="/onlineCounsel" element={<OnlineCounselLayout />}>
          <Route index element={<OnlineCounsel />} />
          <Route path="write" element={<OnlineCounselWrite />} />
          <Route path=":onlineCounselId" element={<OnlineCounselDetail />} />
          <Route
            path=":onlineCounselId/update"
            element={<OnlineCounselUpdate />}
          />
        </Route>

        <Route path="/review" element={<ReviewLayout />}>
          <Route index element={<Review />} />
          <Route path="write" element={<ReviewWrite />} />
          <Route path=":reviewId" element={<ReviewDetail />} />
          <Route path=":reviewId/update" element={<ReviewUpdate />} />
        </Route>

        <Route path="/admin" element={<AdminHome />}>
          <Route path="notice" element={<NoticeLayout />}>
            <Route index element={<Notice />} />
            <Route path="write" element={<NoticeWrite />} />
            <Route path=":noticeId" element={<NoticeDetail />} />
            <Route path=":noticeId/update" element={<NoticeUpdate />} />
          </Route>
          <Route path="onlineCounsel" element={<OnlineCounselLayout />}>
            <Route index element={<OnlineCounsel />} />
            <Route path="write" element={<OnlineCounselWrite />} />
            <Route path=":onlineCounselId" element={<OnlineCounselDetail />} />
            <Route
              path=":onlineCounselId/update"
              element={<OnlineCounselUpdate />}
            />
          </Route>

          <Route path="review" element={<ReviewLayout />}>
            <Route index element={<Review />} />
            <Route path="write" element={<ReviewWrite />} />
            <Route path=":reviewId" element={<ReviewDetail />} />
            <Route path=":reviewId/update" element={<ReviewUpdate />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
