import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Success from './Components/Success';
import Header from './Components/Header';
import Blogs from './Components/Blogs';
import UserBlogs from './Components/UserBlogs';
import BlogDetail from './Components/BlogDetail';
import AddBlog from './Components/AddBlog';
import { useSelector } from 'react-redux';
import Auth from './Components/Auth';


function App() {
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <div className="App">
      
      <BrowserRouter> 
      <Header />
     
      <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs/>} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
            </>
          )}
        </Routes>


    
      </BrowserRouter>

      
    </div>
  );
}

export default App;
