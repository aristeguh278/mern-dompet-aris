import { Button, Space } from "antd";
import "./styles/form-elements.css";
import "./styles/custom-components.css";
import "./styles/aligments.css";
import "./styles/theme.css";
import "./styles/layouts.css";
import "./styles/typography.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Transaction from "./pages/Transaction";
import Users from "./pages/Users";
import Requests from "./pages/Requests";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transaction",
    element: (
      <ProtectedRoute>
        <Transaction />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/request",
    element: (
      <ProtectedRoute>
        <Requests />
      </ProtectedRoute>
    ),
  },
];

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
