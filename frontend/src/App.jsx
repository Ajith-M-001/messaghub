import { BrowserRouter, Route, Routes } from "react-router"; // Correct import
import { Suspense, lazy } from "react";
import { MUILayoutCircularLoader } from "./components/loaders";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const HomeWithLayout = lazy(() => import("./pages/HomeWithLayout"));
const Login = lazy(() => import("./pages/Login"));
const ChatWithLayout = lazy(() => import("./pages/ChatWithLayout"));
const Group = lazy(() => import("./pages/Group"));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
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

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
