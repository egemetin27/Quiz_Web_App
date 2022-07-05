import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Quiz from "./components/Quiz";
import Leadership from "./components/Leadership";
import { UserContext } from "./userContext";
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="Quiz Application"></Header>
          <Routes>
            <Route path="/" exact element={<Welcome />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/leadership" element={<Leadership />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
