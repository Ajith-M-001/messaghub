import { BrowserRouter, Route, Routes } from "react-router"; // Correct import
import { Suspense, lazy, useEffect } from "react";
import { MUILayoutCircularLoader } from "./components/loaders";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { getMyProfile } from "./components/constants/config";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, userExists, userNotExists } from "./redux/slices/auth";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const HomeWithLayout = lazy(() => import("./pages/HomeWithLayout"));
const Login = lazy(() => import("./pages/Login"));
const ChatWithLayout = lazy(() => import("./pages/ChatWithLayout"));
const Group = lazy(() => import("./pages/Group"));

const ChatsManagement = lazy(() => import("./pages/admin/ChatsManagement"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector(selectAuth);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(getMyProfile, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        dispatch(userExists(response.data.user));
      } catch (error) {
        dispatch(userNotExists());
        console.log(error);
      }
    };

    getUser();
  }, []);

  return loader ? (
    <MUILayoutCircularLoader />
  ) : (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Suspense fallback={<MUILayoutCircularLoader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<HomeWithLayout />} />
            <Route path="/chat/:chatId" element={<ChatWithLayout />} />
          </Route>
          <Route path="/group" element={<Group />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />{" "}
              </ProtectedRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatsManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
