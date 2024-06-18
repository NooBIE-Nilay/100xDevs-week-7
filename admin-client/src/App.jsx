import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Appbar from "./components/Appbar.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { Landing } from "./components/Landing.jsx";
import { useEffect, useState } from "react";
import { BASE_URL } from "./config.js";
import axios from "axios";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const init = async () => {
    const res = await axios.get(`${BASE_URL}/admin/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (res.data.username) {
      setUserEmail(res.data.username);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <Router>
        <Appbar userEmail={userEmail} />
        <Routes>
          <Route path={"/addcourse"} element={<AddCourse />} />
          <Route path={"/course/:courseId"} element={<Course />} />
          <Route path={"/courses"} element={<Courses />} />
          <Route
            path={"/signin"}
            element={<Signin setUserEmail={setUserEmail} />}
          />
          <Route
            path={"/signup"}
            element={<Signup setUserEmail={setUserEmail} />}
          />
          <Route path={"/"} element={<Landing userEmail={userEmail} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
