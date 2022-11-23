// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import Login from "./Pages/LoginForm";
// import Register from "./Pages/RegisterForm";
import { Routes, Route, Link } from "react-router";
import reactGA from "react-ga";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Dashboard from "./Pages/BloggerDashboard1";
import VerifyUser from "./Pages/VerifyUser";
import ForgetPassword from "./Pages/ForgetPassword";
import NewPassword from "./Pages/NewPassword";
//import Box from "@mui/material/Box";
import SignInSide from "./Pages/LoginFromMui";
import SignUp from "./Pages/RegisterFormMui";
import ReaderDashboard from "./Pages/ReaderDashboard/ReaderDashboard";
import AdminDashboard from "./Pages/AdminDashboardPages/AdminDashboard";
//import YourProfile from "./components/ProfileComps/ProfileInfo";
import AdminLogin from "./Pages/AdminLogin";
import Welcome from "./Pages/ReaderDashboard/Welcome";
import UserProtectedRoute from "./components/ProtectedRoutes/UserProtectedRoute";
import AdminProtectedRoute from "./components/ProtectedRoutes/AdminProtectedRoutes";

const TRACKING_ID = "UA-167584801-1";
reactGA.initialize(TRACKING_ID, {
  gaOptions: {
    userId: 123,
  },
});

const validateAdmin = () => {
  if (localStorage.getItem("adminToken")) {
    return true;
  } else {
    return false;
  }
};

const validateUserToken = (token) =>
  new Promise((resolve, reject) => {
    axios
      .post("http://127.0.0.1:5000/me", null, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(false);
      });
  });

const checkUserSession = () => {
  if (localStorage.getItem("token")) {
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    // let value = JSON.parse(localStorage.getItem('token'));
    // let token ='Bearer ';
    // if(value!==null){
    //   token = token +value.token;
    // }
    return validateUserToken(token)
      .then((res) => {
        return true;
      })
      .catch(() => {
        console.log("----------");
        return false;
      });
  } else {
    console.log("===========");
    return false;
  }
};

function App() {
  return (
    <div style={{ margin: 0, padding: 0 }} className="App">
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
        <Route element={<UserProtectedRoute isAuth={checkUserSession} />}>
          <Route exact path="/welcome" element={<Welcome />} />
          <Route path="/bloggerdashboard/*" element={<Dashboard />} />
          <Route path="/readerdashboard/*" element={<ReaderDashboard />} />
        </Route>
        <Route element={<AdminProtectedRoute isAuth={validateAdmin} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
        <Route exact path="/admin" element={<AdminLogin />} />

        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
