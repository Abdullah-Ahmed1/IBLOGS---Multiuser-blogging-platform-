import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/LoginForm";
import Register from "./Pages/RegisterForm";
import { Routes, Route, Link } from "react-router";

import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Dashboard from "./Pages/BloggerDashboard1";
import VerifyUser from "./Pages/VerifyUser";
import ForgetPassword from "./Pages/ForgetPassword";
import NewPassword from "./Pages/NewPassword";
//import Box from "@mui/material/Box";
import SignInSide from "./Pages/LoginFromMui";
import SignUp from "./Pages/RegisterFormMui";

function App() {
  return (
    <div className="App">
      {/* <h1>Hello world</h1> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<SignInSide />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/forget" element={<ForgetPassword />} />
        <Route
          exact
          path="/users/:id/forget/:token"
          element={<NewPassword />}
        />
        <Route exact path="/users/:id/verify/:token" element={<VerifyUser />} />

        <Route path="/bloggerdashboard/*" element={<Dashboard />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
