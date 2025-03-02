import { Outlet, Route, Routes } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";

// 공지사항
import NoticeLayout from "../pages/notice/NoticeLayout";
import Notice from "../pages/notice/Notice";
import NoticeWrite from "../pages/notice/NoticeWrite";
import NoticeDetail from "../pages/notice/NoticeDetail";
import NoticeUpdate from "../pages/notice/NoticeUpdate";

// 온라인 상담
import OnlineCounselLayout from "../pages/onlinecounsel/OnlineCounselLayout";
import OnlineCounsel from "../pages/onlinecounsel/OnlineCounsel";
import OnlineCounselWrite from "../pages/onlinecounsel/OnlineCounselWrite";
import OnlineCounselDetail from "../pages/onlinecounsel/OnlineCounselDetail";
import OnlineCounselUpdate from "../pages/onlinecounsel/OnlineCounselUpdate";

// 후기
import ReviewLayout from "../pages/reviews/ReviewLayout";
import Review from "../pages/reviews/Review";
import ReviewWrite from "../pages/reviews/ReviewWrite";
import ReviewDetail from "../pages/reviews/ReviewDetail";
import ReviewUpdate from "../pages/reviews/ReviewUpdate";
import AdminUserList from "../pages/admin/user/AdminUserList";
import AdminReservationList from "../pages/admin/reservation/AdminReservationList";
import AdminLayout from "../pages/admin/AdminHome";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />}>
        <Route path="notice" element={<NoticeLayout />}>
          <Route index element={<Notice />} />
          <Route path="write" element={<NoticeWrite />} />
          <Route path=":noticeId" element={<Outlet />}>
            <Route index element={<NoticeDetail />} />
            <Route path=":noticeId/update" element={<NoticeUpdate />} />
          </Route>
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
  );
};
export default AdminRouter;
