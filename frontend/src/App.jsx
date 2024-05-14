import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/task/:_id" element={<TaskDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
