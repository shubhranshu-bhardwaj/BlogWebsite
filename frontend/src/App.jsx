import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './Pages/Home'
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Pages/CreatePost";
import PostDetails from "./Pages/PostDetails";
import EditPost from "./Pages/EditPost";
import Profile from "./Pages/Profile";
import MyBlogs from "./Pages/MyBlogs";
import UserContextProvider from "./Context/UserContext";

function App() {
  

  return (
    <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/Post/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myblogs/:id" element={<MyBlogs />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
    </UserContextProvider>
  )
}

export default App
